import Header from './Header.js'
import Home from './Home.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './Checkout'
import Payment from './Payment'
import Login from './Login'
import { useEffect } from 'react'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders'
import config from './config.js'
import Footer from './Footer.js'
var key = config.apiKey
const promise = loadStripe(`${key}`)

function App() {
  const [{ basket }, dispatch] = useStateValue()

  useEffect(() => {
    //
    auth.onAuthStateChanged((authUser) => {
      // console.log('authUer is ', authUser)
      if (authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
    /*eslint-disable */
  }, [])
  /*eslint-enable */
  return (
    //BEM
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  )
}

export default App
