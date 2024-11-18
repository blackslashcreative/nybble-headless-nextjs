import React, { useState } from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineTakeoutDining } from "react-icons/md";

const CheckoutSwitcher = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className="checkout-switcher">
      <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <span className='label flex items-center text-sm font-light'>
          <TbTruckDelivery /> <span className="ml-2">Delivery</span>
        </span>
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-[#9333ea]' : 'bg-[#5b21b6]'
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-[28px]' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-light'>
          <MdOutlineTakeoutDining /> <span className="ml-2">Takeout</span>
        </span>
      </label>
    </div>
  )
}

export default CheckoutSwitcher