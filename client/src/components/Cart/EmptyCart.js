import React from 'react'
import Empty from '../../testImages/empty_cart.png'
import './Empty.css'
const EmptyCart = () => {
  return (
    <div className='empty'>
      <img src={Empty} alt="empty_cart" />
    </div>
  )
}

export default EmptyCart
