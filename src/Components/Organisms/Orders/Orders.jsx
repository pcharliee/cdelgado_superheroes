import React from 'react';
import { useUser } from '../../../Context/UserContext.js';
import Loading from '../../Atoms/Loading/Loading';
import Title from '../../Atoms/Title/Title.jsx';
import Button from '../../Atoms/Button/Button.jsx';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Orders.scss';

function Orders() {
  const { loading, currentUserOrders } = useUser();
  const MySwal = withReactContent(Swal)

  const handleClick = (order) => {
    let items = order.items.map(item => {
      return item.name;
    });
    MySwal.fire({
      title: order.buyer.name,
      text: `You bought ${items.join(', ')} for USD$ ${order.totalPrice}`,
      confirmButtonColor: '#af070f',
    });
  };

  const renderOrders = () => {
    return currentUserOrders?.map((order, index) => {
     return (
      <article className='order-container' key={index}>
        <div className='order-details'>
          <div className='order-date-details'>
            <h5>{`Order#${index+1}`}</h5>
            <h6>{order.date}</h6>
          </div>
          <p className='order-tracking-details'>Tracking#: <span>{order._id}</span></p>
          <div className='order-quantity-details'>
            <p>Quantity <span>{order.items.length}</span></p>
            <p>Price USD$ <span>{`${order.totalPrice}.00`}</span></p>
          </div>
          <Button
            text='Details'
            type='add-to'
            onClick={() => { handleClick(order) }}/>
        </div>
      </article>
     )
    });
  };

  return (
    <div className='my-orders-container'>
      { loading && <Loading /> }
      { !loading && 
        <>
          <Title text='My orders'/>
          <div className="my-orders">
            { renderOrders() }
          </div>
          <p className='orders-summary'>Total orders: {currentUserOrders.length}</p>
        </>
      }
    </div>
  );
};

export default Orders;
