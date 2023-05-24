import React from 'react';
import Style from './Dropdown.module.scss';

const Dropdown = ({ options, defaultOption, onSelect }) => {

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">{defaultOption}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
