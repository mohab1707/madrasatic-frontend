import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

export const NavBar = () => {
  return (
    <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>MADRASA-TIC</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>

      <br />
    </>
  );
}
