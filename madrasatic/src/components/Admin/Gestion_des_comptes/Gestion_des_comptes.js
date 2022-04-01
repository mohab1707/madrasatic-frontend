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
    MDBFooter,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBTextArea,
    MDBValidation,
    MDBValidationItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBTable,
    MDBTableHead,
    MDBTableBody
    } from 'mdb-react-ui-kit';
import { SelectRole } from './SelectRole';
import { ActiverDesactiver } from './ActiverDesactiver';
import { TableComptes } from './TableComptes';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Gestion_des_comptes = () => {
    const [showNavRight, setShowNavRight] = useState(false);

  return (
    <header>
        <MDBNavbar expand='lg' light bgColor='light' fixed='top'>
            <MDBContainer fluid>
            <MDBNavbarBrand href='#'>MADRASA-TIC</MDBNavbarBrand>

            <MDBNavbarToggler
            type='button'
            data-target='#navbarRightAlignExample'
            aria-controls='navbarRightAlignExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavRight(!showNavRight)}
            >
            <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showNavRight}>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                        <MDBNavbarLink href=''>Gestion des comptes</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle tag='a' className='nav-link'>
                                
                                 <i class="fas fa-user"></i>
        
                            </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem>
                                <MDBDropdownLink>Mon Profile</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBDropdownLink>Se Déconnecter</MDBDropdownLink>
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
        <MDBContainer fluid>
            <MDBContainer style={{margin:'10%'}}>
                <TableComptes></TableComptes>
            </MDBContainer>
        

        </MDBContainer>
    </header>
    
  )
}
