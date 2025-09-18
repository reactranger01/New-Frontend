import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  wrapperClassName,
  label,
  labelClassName,
  type,
  className,
  placeholder,
  value,
  onChangeHandler,
  required,
  addonLeft,
  addonRight,
  name,
}) => {
  return (
    <div className={wrapperClassName}>
      {label && <label className={`${labelClassName}`}>{}</label>}
      <div className="relative">
        {addonLeft && addonLeft}
        <input
          type={type || 'text'}
          className={`text-16 text-black outline-0 font-rajdhani focus:ring-1 focus:ring-primary-300 rounded-lg px-4 py-2 w-full font-medium num-scroll-button-hide ${className}`}
          onChange={onChangeHandler || null}
          value={value}
          placeholder={placeholder || ''}
          required={required || false}
          name={name || null}
        />
        {addonRight && addonRight}
      </div>
    </div>
  );
};

InputField.propTypes = {
  wrapperClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string | PropTypes.num]),
  value: PropTypes.oneOfType([PropTypes.string | PropTypes.num]),
  onChangeHandler: PropTypes.func,
  required: PropTypes.bool,
  addonLeft: PropTypes.element,
  addonRight: PropTypes.element,
  name: PropTypes.string,
};

export default InputField;
