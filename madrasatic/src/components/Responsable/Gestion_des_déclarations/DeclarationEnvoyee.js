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

export default function DeclarationEnvoyee() {
  return (
    <MDBContainer className='content'>
        <MDBContainer style={{}}>
        <MDBRow className='buttons'>
            <MDBCol md='6'></MDBCol>
            <MDBCol md='3'>
               <button>Sauvgarder Modifications</button>
            </MDBCol>
            <MDBCol md='3'>
            <button>Demander Complément</button>
            </MDBCol>
        </MDBRow>
        <MDBRow className='infos'>
            <MDBCol md='7'>
                <h5>Intitulé : intitulé de la déclaration</h5>
                <h5>Envoyée par : p.nom@esi-sba.dz</h5>
                </MDBCol>

            <MDBCol md='3'>
                <MDBRow>
                    <MDBCol><h5>Catégorie :</h5></MDBCol>
                    <MDBCol>
                    <select>
                        <option value="Santé">Santé</option>
                        <option value="Sécurité">Sécurité</option>
                        <option value="Objet perdu">Objet perdu</option>
                        <option value="Hygiène">Hygiène</option>
                    </select>
                    </MDBCol>
                </MDBRow>
            </MDBCol>
            <MDBCol md='2'>
                <MDBRow>
                    <MDBCol><h5>Priorité :</h5></MDBCol>
                    <MDBCol>
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    </MDBCol>
                </MDBRow>
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
        
        <MDBRow className='buttons'>
            <MDBCol md='10'></MDBCol>
            <MDBCol md='1'>
               <button>Valider</button>
            </MDBCol>
            <MDBCol md='1'>
            <button>Rejeter</button>
            </MDBCol>
        </MDBRow>

    </MDBContainer>
  )
}
