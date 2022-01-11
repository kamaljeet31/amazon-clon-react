import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from './axios'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link, useHistory } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { getBasketTotal } from './Reducer'
import { useStateValue } from './StateProvider'
import { db } from './firebase'

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue()
  const history = useHistory()

  const stripe = useStripe()
  const elements = useElements()

  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState('')
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  useEffect(() => {
    //This Code Snippet is very important 6:20Time
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          //Stripe expects the total in currencies subunits
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        })

        setClientSecret(response.data.clientSecret)
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    getClientSecret()
  }, [basket])

  // console.log('THE SECRET IS >>>>', clientSecret)

  const handleSubmit = async (event) => {
    //do all the fancy stripe stuff
    event.preventDefault()
    setProcessing(true)

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation

        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          })

        setSucceeded(true)
        setError(null)
        setProcessing(false)

        dispatch({
          type: 'EMPTY_BASKET',
        })

        history.replace('/orders')
      })
  }
  const handleChange = (event) => {
    //Listen for changes in the card elements
    //and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <>
      <div className='payment'>
        <div className='payment__container'>
          <h1>
            Checkout(<Link to='/checkout'>{basket?.length} items</Link>)
          </h1>
          {/* payment section - delivery address */}
          <div className='payment__section'>
            <div className='payment__title'>
              <h3>Delivery Address</h3>
            </div>
            <div className='payment__address'>
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p>Los Angeles, CA</p>
            </div>
          </div>
          {/* payment section - Review Items */}
          <div className='payment__section'>
            <div className='payment__title'>
              <h3>Review Items and Delivery</h3>
            </div>
            <div className='payment__items'>
              {basket.map((item, index) => (
                <CheckoutProduct
                  key={index}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>

          {/* payment section - Payment method */}
          <div className='payment__section'>
            <div className='payment__title'>
              <h3>Payment Method</h3>
              <span className='header__optionLineTwo2'>
                Fill 42424242 in Payment Field
              </span>
            </div>
            <div className='payment__details'>
              {/* stripe magic here */}
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className='payment__priceContainer'>
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <h3>Order Total:{value}</h3>
                      </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                  <button
                    className='btn'
                    disabled={processing || disabled || succeeded}
                  >
                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                  </button>
                </div>
                {/* Errors */}
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
