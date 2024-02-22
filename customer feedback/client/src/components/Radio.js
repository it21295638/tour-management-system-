import React, { useState } from 'react';

function RadioList() {
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { value: 'option1', id:'VP' },
    { value: 'option2', id: 'P' },
    { value: 'option3', id: 'N' },
    { value: 'option4', id: 'G' },
    { value: 'option5', id: 'E' },
  ];

  
  const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>  
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleOptionChange}
            style={{marginRight:'75px',}}
          />
          {option.label}
        </label>
      ))}
    </div>  
  );
}

export default RadioList;

