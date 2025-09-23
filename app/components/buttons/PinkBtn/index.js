import React from 'react';
import { PropTypes } from 'prop-types';

const PinkBtn = ({ text, size, disabled, onClick, css }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${
        disabled
          ? 'cursor-not-allowed bg-[#f9c9d4] opacity-50'
          : 'bg-[#f9c9d4]  '
      } bet-btn flex flex-col items-center justify-center gap-[6px] ${css}`}
    >
      <span className="text-12 font-semibold leading-none"> {text}</span>
      {size && (
        <span className="text-[9px] leading-none truncate"> {size}</span>
      )}
    </button>
  );
};

PinkBtn.propTypes = {
  text: PropTypes.string,
  size: PropTypes.string,
  css: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PinkBtn;
