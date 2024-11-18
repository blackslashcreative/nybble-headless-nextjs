'use client';
import React, { useState } from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { motion } from 'framer-motion';
import Cart from '../cart';
import { useAppContext } from '../../appContext';

const modalAnimations = {
  open: {
    height: "calc(100vh - 80px)",
    width: "100%"
  }, 
  closed: {
    height: 0,
    width: 0
  }
}

export default function Toggle() {

  const [ isOpen, setIsOpen ] = useState(false);

  const { cart } = useAppContext();
  //console.log("modal load cart..." + JSON.stringify(cart));
  let {items} = cart;
    
  let numberOfItemsInCart = 0;
  if (items.length) {
    console.log("Cart contents...");
    console.log({cart});
    items.forEach(element => {
      numberOfItemsInCart += element.quantity;
    });
  }


  return (
    <>
      {numberOfItemsInCart !== 0 && (
        <div>{numberOfItemsInCart}</div>
      )}
      <div className="toggle" onClick={() => {setIsOpen(!isOpen)}}>
        <motion.div 
          className="animate-toggle"
          animate={{top: isOpen ? "-100%" : "0"}}
          transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1]}}
        >
          <MdOutlineShoppingCart size={24} />
          <MdClose size={24} /> 
        </motion.div>
      </div>
      <motion.div 
        className={"modal " + (isOpen ? "is-open" : "is-closed")}
        variants={modalAnimations}
        animate={isOpen ? "open" : "closed"}
        initial="closed"
      >
        <Cart />
      </motion.div>
    </>
  )
}
