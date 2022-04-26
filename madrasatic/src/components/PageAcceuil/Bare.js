import React , { useState } from 'react'
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBBtn
    } from 'mdb-react-ui-kit';
import { Redirect } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';

export const Bare = () => {
    const [showNavRight, setShowNavRight] = useState(false);
    const [reussi , setReussi ] = useState(false);
    const deconnexion =(e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/madrasatic/logout/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
            if(response.ok)
            {
                setReussi(true);
            }else
            {
                console.log("y'a une erreur");
            }
        })
    }

  return (
    <header>
        {
            reussi? <Redirect to='/' /> : null
        }
        <MDBNavbar expand='lg' light fixed='top' style={{backgroundColor:'#24344f'}}>
            <MDBContainer fluid>
            <MDBNavbarBrand href='/HomePage'style={{color:'#ffffff'}}>MADRASA-TIC</MDBNavbarBrand>

            <MDBNavbarToggler
            type='button'
            data-target='#navbarRightAlignExample'
            aria-controls='navbarRightAlignExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavRight(!showNavRight)}
            style={{color:'#ffffff'}}
            >
            <MDBIcon icon='bars' fas style={{color:'#ffffff'}}/>
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showNavRight}>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='' style={{color:'#ffffff'}}>Annonces</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle tag='a' className='nav-link'style={{color:'#ffffff'}}>
                                
                                 <i class="fas fa-user" style={{color:'#ffffff'}}></i>
        
                            </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/Profil'>Mon Profil</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                {/* <MDBDropdownLink href='/deconnexion'>Se déconnecter</MDBDropdownLink> */}
                                <MDBBtn className='text-white' color='dark' onClick={deconnexion}>Se déconnecter</MDBBtn>
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    </header>
    
  )
}
