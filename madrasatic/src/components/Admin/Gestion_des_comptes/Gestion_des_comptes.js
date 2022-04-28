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
import TableUsers from './TableUsers';

export const Gestion_des_comptes = () => {
    const [showNavRight, setShowNavRight] = useState(false);
  return (
    <header>
        <MDBNavbar expand='lg' light style={{backgroundColor:'#24344f'}} fixed='top'>
            <MDBContainer fluid>
            <MDBNavbarBrand href='#'style={{color:'#ffffff'}}>MADRASA-TIC</MDBNavbarBrand>

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
                        <MDBNavbarLink href='' style={{color:'#ffffff'}}>Gestion des comptes</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle tag='a' className='nav-link' style={{color:'#ffffff'}}>
                                
                                 <i class="fas fa-user" style={{color:'#ffffff'}}></i>
        
                            </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/Profil'>Mon Profil</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBDropdownLink>Se déconnecter</MDBDropdownLink>
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
                {/* <TableComptes></TableComptes> */}
                <TableUsers/>
            </MDBContainer>
        

        </MDBContainer>
    </header>
    
  )
}
