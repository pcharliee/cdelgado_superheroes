import React, { useState } from 'react';
import './Counter.scss';

function Counter() {
  const [count, setCount] = useState(1);

  const handleMinusClick = () => {
    if (count <= 1) return;
    setCount(prevState => prevState - 1);
  };

  const handlePlusClick = () => {
    if (count >= 10) return;
    setCount(prevState => prevState + 1);
  };

  return (
    <div className='counter'>
     <p>Random Count: {count}</p>
      <div className='counter-buttons'>
        <button onClick={handleMinusClick}>-</button>
        <button onClick={handlePlusClick}>+</button>
      </div>
    </div>
  );
};

export default Counter;
