import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const SelectBox = ({
  handleChange,
  defaultValue = false,
  optionArr,
  placeholder,
  fontFamily,
  borderRadius,
  name,
}) => {
  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={defaultValue && optionArr[0]}
        name={name || 'dummy'}
        options={optionArr || []}
        onChange={handleChange || null}
        styles={Styles(fontFamily, borderRadius)}
        placeholder={placeholder || 'Select'}
      />
    </div>
  );
};

SelectBox.propTypes = {
  handleChange: PropTypes.func || null,
  defaultValue: PropTypes.bool,
  optionArr: PropTypes.array,
  placeholder: PropTypes.any,
  fontFamily: PropTypes.string,
  borderRadius: PropTypes.string || PropTypes.number,
  name: PropTypes.string,
};

const Styles = (fontFamily, borderRadius) => {
  return {
    control: (base) => ({
      ...base,
      backgroundColor: '#fff',
      padding: '1px 5px',
      borderRadius: borderRadius || '8px',
    }),
    option: (base, { isSelected }) => {
      return {
        ...base,
        color: isSelected ? '#fff' : '#000',
        backgroundColor: isSelected && '#1C77FF',
        fontFamily: fontFamily || 'Inter',
        fontWeight: '500',
        '&:hover': {
          backgroundColor: '#1C77FF',
        },
      };
    },
    placeholder: (base) => ({
      ...base,
      color: '#999',
      fontFamily: fontFamily || 'Inter',
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: 'none',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#1C1B1F',
    }),
    singleValue: (base) => ({
      ...base,
      fontFamily: fontFamily || 'Inter',
      color: '#000',
      fontWeight: '500',
    }),
  };
};

export default SelectBox;
