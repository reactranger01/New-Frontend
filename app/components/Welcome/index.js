import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUI } from '@/redux/actions';
import colors from '@/api/ui';

function Welcome() {
  const dispatch = useDispatch();

  const { color } = useSelector((state) => state.ui);

  const toggleColor = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    dispatch(setUI({ color }));
  };

  return (
    <Fragment>
      <h1 style={{ color }}>React Template with Webpack and Babel</h1>
      <p className="text-white">*Change text color by click on image</p>
      <img
        src="/images/react.png"
        className="react"
        onClick={toggleColor}
        alt="react"
        style={{ cursor: 'pointer' }}
      />
    </Fragment>
  );
}

export default Welcome;
