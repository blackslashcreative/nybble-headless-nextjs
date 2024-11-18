'use client';
import { useAppContext } from '../appContext';
import Link from 'next/link';
import { MdOutlineShoppingCart } from "react-icons/md";
import CheckoutSwitcher from './checkoutSwitcher';

function Cart() {

  const { cart, addItem, removeItem } = useAppContext();

  // Render items in cart
  const renderItems = () => {
    let {items} = cart;
    
    if (!items.length) return <p className="empty-cart"><MdOutlineShoppingCart size={24} /><br/>Your cart is empty!</p>

    let itemList = items.map((item => {
      if(item.quantity > 0) {
        return (
          <div
            className="cart-item"
            key={item.dishId}
          >
            <div className="item-name">{item.dishFields.dishName}<br/><span className="item-price">${item.dishFields.price}</span></div>
              <div className="quantity">
                <div>x{item.quantity}</div>
                <div className="update-quantity">
                  <button onClick={() => removeItem(item)}>-</button>
                  <button onClick={() => addItem(item)}>+</button>
                </div>
              </div>
          </div>
        )
      }
    }));
    return itemList;
  }

  const checkoutItems = () => {
    return (
      <div className="cart-footer">
        <Link legacyBehavior href="/contact?checkout">
          <button className="button">Checkout</button>
        </Link>
        <div className="cart-total">Total: ${cart.total.toFixed(2)}</div>
      </div>
    )
  }

  return (
    <section id="cart">
      <h2>Your Order:</h2>
      <CheckoutSwitcher />
      <hr />
      <div>
        {renderItems()}
      </div>
      <div>
        {checkoutItems()}
      </div>
    </section>
  )
}

export default Cart;