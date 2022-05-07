import React from 'react'
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
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';
import './declaration.css'
export default function DeclarationValidee() {
  return (
    <MDBContainer className='content'>
    <MDBContainer style={{}}>
    <MDBRow className='infos'>
        <MDBCol md='7'>
            <h5>Intitulé : intitulé de la déclaration</h5>
            <h5>Envoyée par : p.nom@esi-sba.dz</h5>
            </MDBCol>

        <MDBCol md='3'>
        
                <MDBCol><h5>Catégorie :santé</h5></MDBCol>
        
        </MDBCol>
        <MDBCol md='2'>
        
                <MDBCol><h5>Priorité :1</h5></MDBCol>
            
        </MDBCol>
    </MDBRow>
    <hr style={{border: '2px solid #b78429'}}/>
    <MDBContainer>
        <h5>Déscription :</h5>
        <p>uheudhuehdeuzidhezuidhezuidnuieznduezdhezuidhezuidhezudhezuidhezudhezudhezudhezudhezudhezudhezuidhezudhezuidhezudhezudhezudh</p>
    </MDBContainer>
    <MDBContainer>
        <h5>Photo :</h5>
    </MDBContainer>

    </MDBContainer>

</MDBContainer>
    
  )
}
