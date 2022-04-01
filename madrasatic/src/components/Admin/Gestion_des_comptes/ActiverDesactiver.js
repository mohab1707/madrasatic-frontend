import React from 'react';
import { MDBRadio } from 'mdb-react-ui-kit';

export const ActiverDesactiver = () => {
  return (
    <div>
    <MDBRadio name='flexRadioDefault' id='1' label='Activer' />
    <MDBRadio name='flexRadioDefault' id='2' label='Désectiver'/>
  </div>
  )
}
