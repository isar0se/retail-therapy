import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {lockInPriceForCheckout, processCartForCheckout} from '../reducers/cart'
import Cart from '../components/cart'

class CartContainer extends Component {
  constructor(props) {
    super(props)
    this.renderCheckout = this.renderCheckout.bind(this)
  }
  
  renderCheckout() {
    return (
      <button className="btn btn-danger" onClick={evt => {
        evt.preventDefault()
        this.props.processCartForCheckout(this.props.cart[0].order_id)
        browserHistory.push(`/${this.props.user.id}/checkout`)
      }}>
      Checkout
      </button> 
    )
  }
  
  render() {
    return (  
      <div>
        <h3>Cart</h3>
        <Cart />
        {this.props.cart.length && this.props.user.id ? this.renderCheckout() : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  processCartForCheckout: orderId => {
    dispatch(processCartForCheckout(orderId))
  },
  lockInPriceForCheckout: (orderId, productId) => {
    dispatch(lockInPriceForCheckout(orderId, productId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)