// ToggleButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const ToggleButton = ({ label, name, value, handleChange }) => {
  // If you want to double-check what’s actually being passed in:

  const onSwitchChange = (_, checked) => {
    handleChange({
      target: {
        name,
        value: checked,
      },
    });
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={value === true}
          onChange={onSwitchChange}
          name={name}
          color="primary"
        />
      }
      label={label}
    />
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default ToggleButton;
