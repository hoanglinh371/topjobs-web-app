import React from 'react';

const Button = (props) => {
  const { children, type, onClick } = props;

  return (
    <button type={type} className='btn btn-primary' onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
