import React from 'react';

const Input = (props) => {
  const { label, type, value, placeholder, onChange } = props;

  return (
    <div className='form-control my-6'>
      <label className='input-group'>
        <span>{label}</span>
        <input
          className='input input-bordered w-full'
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
