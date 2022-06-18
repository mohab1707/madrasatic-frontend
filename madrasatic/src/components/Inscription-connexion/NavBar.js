import React, { useEffect } from 'react';
// import './index.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
export const NavBar = () => {
  useEffect(()=>{
    const path = "http://159.89.109.229:8000/";
    sessionStorage.setItem("path", path);
  },[]);
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
