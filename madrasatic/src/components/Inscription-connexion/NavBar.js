import React, { useEffect } from 'react';
// import './index.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
export const NavBar = () => {
  useEffect(()=>{
    const path = "http://192.168.43.193:8000/";
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
