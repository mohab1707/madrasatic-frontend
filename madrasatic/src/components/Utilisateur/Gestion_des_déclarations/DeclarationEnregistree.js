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

export const DeclarationEnregistree = () => {
  return (
    <MDBContainer className='content'>
    <MDBContainer style={{}}>
    <MDBRow className='infos'>
        <MDBCol md='7'>
        <label>Intitulé de la déclaration :</label>
        <input 
          type="text" 
          required 
          placeholder='Nom'
        />
        <label>Créer par :</label>
        <input 
          type="text" 
          required 
          placeholder='Nom'
        />
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
                <MDBCol><h5>Priorité :1</h5></MDBCol>
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
        <label>Déscription de la déclaration:</label>
        <textarea
            placeholder='Déscription'
        ></textarea>
    </MDBContainer>
    <MDBContainer>
        <label>Photo la décrivant:</label>
        <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
          />
    </MDBContainer>

    </MDBContainer>
        <MDBRow className='buttons'>
            <MDBCol md='10'></MDBCol>
            <MDBCol md='1'>
               <button>Sauvgarder</button>
            </MDBCol>
            <MDBCol md='1'>
            <button>Envoyer</button>
            </MDBCol>
        </MDBRow>

</MDBContainer>
  )
}

export default DeclarationEnregistree;