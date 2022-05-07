import React , { useState } from 'react'
import { TableDeclarations } from './TableDeclarations';
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
import { MdOutlineMoped } from 'react-icons/md';

export const LesDeclarations = () => {
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
                        <MDBDropdown>
                            <MDBDropdownToggle tag='a' className='nav-link'>
                                Gestion des déclarations
                            </MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem>
                                    <MDBDropdownLink href=''>Les déclarations</MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>Mes déclarations</MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink >Mes brouillons</MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>Créer une déclaration</MDBDropdownLink>
                                </MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle tag='a' className='nav-link' style={{color:'#ffffff'}}>
                                
                                 <i class="fas fa-user" style={{color:'#ffffff'}}></i>
        
                            </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem>
                                <MDBDropdownLink >Mon Profil</MDBDropdownLink>
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
        <TableDeclarations></TableDeclarations>
    </header>
    
  )
}

export default LesDeclarations;
