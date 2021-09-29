import React, { useState } from 'react';
import Button from '../Button/Button';
import './Counter.scss';

function Counter(props) {
  const [ itemDetails, setItemDetails ] = useState({ 
    count: props.item.quantity,
    price: props.item.price
  });

  const unitPrice = props.item.price;

  const handleMinusClick = () => {
    if (itemDetails.count <= 1) return;
    setItemDetails({
      count: itemDetails.count - 1,
      price: itemDetails.price - unitPrice
    });
    props.setPrice(prevState => prevState - unitPrice);
  };

  const handlePlusClick = () => {
    setItemDetails({
      count: itemDetails.count + 1,
      price: unitPrice * (itemDetails.count + 1)
    });
    props.setPrice(prevState => prevState + unitPrice);
  };

  return (
    <div className='counter-buttons-container'>
      <div className="counter-item-details">
        <p>Unit price: {unitPrice}</p>
        <p>Price: {itemDetails.price}</p>
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
