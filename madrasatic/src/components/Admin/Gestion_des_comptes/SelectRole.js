import React, { Component }  from 'react';
import Select from 'react-select';

export const SelectRole = () => {
    const options = [
        { value: 'Administrateur', label: 'Administrateur' },
        { value: 'Responsable', label: 'Responsable' },
        { value: 'Chef Service', label: 'Chef Service' },
        { value: 'Autres', label: 'Autres' }
      ]
  return (
    <Select options={options} />
  )
}
