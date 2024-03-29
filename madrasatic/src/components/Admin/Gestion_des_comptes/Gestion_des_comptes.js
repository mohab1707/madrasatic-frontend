import React , { useState } from 'react'
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
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
    } from 'mdb-react-ui-kit';
    import { Redirect } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Gestion_des_comptes = () => {
    const [showNavRight, setShowNavRight] = useState(false);
    const [reussi , setReussi ] = useState(false);
    const path=sessionStorage.getItem("path");
    const deconnexion =(e) => {
        e.preventDefault();
        fetch(path+"madrasatic/logout/", {
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
        <MDBNavbar expand='lg' light style={{backgroundColor:'#24344f'}} fixed='top'>
            <MDBContainer fluid>
            <MDBNavbarBrand href='/Home'style={{color:'#ffffff'}}>MADRASA-TIC</MDBNavbarBrand>

            <MDBNavbarToggler
            type='button'
            data-target='#navbarRightAlignExample'
            aria-controls='navbarRightAlignExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavRight(!showNavRight)}
            style={{color:'#ffffff'}}
            >
            <MDBIcon icon='bars' fas style={{color:'#ffffff'}} />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showNavRight}>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/Home' style={{color:'#ffffff'}}>Gestion des comptes</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/UtilisateursStatistiques' style={{color:'#ffffff'}}>Statistiques des comptes</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/DeclarationsStatistiques' style={{color:'#ffffff'}}>Statistiques des déclarations</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle tag='a' className='nav-link' style={{color:'#ffffff'}}>
                                
                                 <i class="fas fa-user" style={{color:'#ffffff'}}></i>
        
                            </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/ProfilAdmin'>Mon Profil</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
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
