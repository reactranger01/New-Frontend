import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({
  // label,
  name,
  value,
  onChange,
  error,
  classname,
  placeHolder,
  type,
  onKeyDown,
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  return (
    <>
      <div className="form-div">
        <div className="flex flex-col">
          {isIOS ? (
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              onKeyDown={onKeyDown}
              onChange={onChange}
              placeholder={placeHolder}
              className={`form-input ${classname} ${error && 'form-error'}`}
            />
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeHolder}
              className={`form-input ${classname} ${error && 'form-error'}`}
              onFocus={() => setReadOnly(false)}
              onBlur={() => setReadOnly(true)}
              readOnly={readOnly}
              onKeyDown={onKeyDown}
            />
          )}
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  classname: PropTypes.string,
  placeHolder: PropTypes.string,
  onKeyDown: PropTypes.func,
};

export default CustomInput;
