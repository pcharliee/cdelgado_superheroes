import React from 'react';
import Image from '../../Atoms/Image/Image';
import Title from '../../Atoms/Title/Title';
import Counter from '../../Atoms/Counter/Counter';
import Button from '../../Atoms/Button/Button';
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
        </div>
      <Button type='remove-icon' onClick={handleClick} />
    </div>
  )
};

export default CartItem;