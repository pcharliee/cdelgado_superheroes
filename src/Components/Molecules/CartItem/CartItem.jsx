import React from 'react';
import Image from '../../Atoms/Image/Image';
import Title from '../../Atoms/Title/Title';
import Counter from '../../Atoms/Counter/Counter';
import './CartItem.scss'

function CartItem(props) {
  const handleClick = () => {
    props.handleRemoveItem(props.item.id);
  };

  return (
    <div className='cart-item-container'>
      <Image img={props.item.images.md} alt={props.item.name} />
        <div className='cart-item-details-container'>
          <Title text={props.item.name} />
          <Counter item={props.item} />
          <p className='cart-item-remove-icon' onClick={handleClick}>X</p>
        </div>
    </div>
  )
};

export default CartItem;