import React from 'react';
// import './index.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
export const NavBar = () => {
  return (
    <>
      <MDBNavbar light  style={{backgroundColor:'#24344f'}}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'style={{color:'#ffffff'}}>MADRASA-TIC</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>

      <br />
    </>
  );
}
