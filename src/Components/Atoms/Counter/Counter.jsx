import React, { useState } from 'react';
import { useCart } from '../../../Context/CartContext';
import Button from '../Button/Button';
import './Counter.scss';

function Counter(props) {
  const { cartItems, setCartItems, setPrice } = useCart();
  const [ itemDetails, setItemDetails ] = useState({ 
    count: props.item.quantity,
    price: props.item.price
  });

  const unitPrice = props.item.price;

  const handleMinusClick = () => {
    let newCount = itemDetails.count -1;
    let newPrice = itemDetails.price - unitPrice;
    if (itemDetails.count <= 1) return;
    setItemDetails({
      count: newCount,
      price: newPrice
    });
    const updatedCartItems = cartItems.map(item => {
      if (item.id === props.item.id) Object.assign(item, { quantity: newCount })
      return item;
    })
    setCartItems(updatedCartItems);
    setPrice(prevState => prevState - unitPrice);
  };

  const handlePlusClick = () => {
    let newCount = itemDetails.count + 1;
    let newPrice = itemDetails.price + unitPrice;
    setItemDetails({
      count: newCount,
      price: newPrice
    });
    const updatedCartItems = cartItems.map(item => {
      if (item.id === props.item.id) Object.assign(item, { quantity: newCount })
      return item;
    });
    setCartItems(updatedCartItems);
    setPrice(prevState => prevState + unitPrice);
  };

  return (
    <div className='counter-buttons-container'>
      <div className="counter-item-details">
        <p>Unit price: <span>${unitPrice}</span></p>
        <p>Price: <span>${props.item.price * itemDetails.count}</span></p>
      </div>
      <div className="counter-buttons">
        <Button text="-" onClick={handleMinusClick} />
          <p>{itemDetails.count}</p>
        <Button text="+" onClick={handlePlusClick} />
      </div>
    </div>
  );
};

export default Counter;
