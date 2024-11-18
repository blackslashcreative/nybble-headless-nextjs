'use client';
import { createContext, useContext, useState } from 'react';
const AppContext = createContext({});
 
export const AppContextProvider = ({ children }) => {
  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const cart = {
    items: [],
    total: 0,
  };
  const [cartState, setCartState] = useState({cart:cart});

  const addItem = (item) => {
    let { items } = cartState.cart;
    // check if item already in cart, or add it
    let foundItem = true;
    if(items.length > 0) {
      foundItem = items.find((i) => i.dishId === item.dishId);
      if(!foundItem) foundItem = false;
    }
    else {
      foundItem = false;
    }
    // if item is not new, add to cart, set quantity to 1 
    if (!foundItem) {
      // set quantity to 1
      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      let newCart = {
        items: [...cartState.cart.items,temp],
        total: Number(cartState.cart.total + item.dishFields.price),
      }
      setCartState({ cart : newCart });
    } else {
      // we already have it so just increase quantity ++
      console.log(`Total before adding:  ${cartState.cart.total}`)
      let newCart = {
        items: items.map((item) =>{
          if(item.dishId === foundItem.dishId){
            return Object.assign({}, item, { quantity: item.quantity + 1 })
            }else{
          return item;
        }}),
        total: cartState.cart.total + item.dishFields.price,
      }
      setCartState({ cart : newCart });
    }
  };

  const removeItem = (item) => {
    let { items } = cartState.cart;
    // check for item already in cart
    const foundItem = items.find((i) => i.dishId === item.dishId);
    if (foundItem.quantity > 1) {
      // more than one, remove one
      var newCart = {
        items: items.map((item) => {
        if(item.dishId === foundItem.dishId) {
          return Object.assign({}, item, { quantity: item.quantity - 1 });
        } else {
          return item;
        }}),
        total: cartState.cart.total - item.dishFields.price,
      }
    } else {
      // only 1 in the cart so remove the item entirely from cart
      console.log(`Trying to remove item... ${JSON.stringify(foundItem)}`);
      const index = items.findIndex((i) => i.dishId === foundItem.dishId);
      items.splice(index, 1);
      var newCart = { items: items, total: cartState.cart.total - item.dishFields.price };
    }
    setCartState({cart:newCart});
  }
  
  return (
    <AppContext.Provider value={{ 
      cart: cartState.cart, 
      addItem: addItem, 
      removeItem: removeItem, 
      setCartState, 
      error, setError, 
      successMessage, setSuccessMessage
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);