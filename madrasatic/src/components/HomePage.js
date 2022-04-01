import React, { useState } from 'react';
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
  MDBValidationItem
  } from 'mdb-react-ui-kit';
  import './HomePage.css';

export const HomePage = () => {
    const [showNavRight, setShowNavRight] = useState(false);
    const [formValue, setFormValue] = useState({
      nom: '',
      prenom: '',
      email: '',
      message: '',
    });
  
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
                        <MDBNavbarLink href='#acceuil'>Acceuil</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='#annonces'>Annonces</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='#a-propos'>A Propos</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='#contact'>Contact</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBBtn rounded className='mx-2' color='primary'>S'identifier</MDBBtn>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>

        <MDBContainer fluid id='acceuil' className='p-5 bg-image' style={{ height: '100vh' }}>
        <div>
          <h1 className='mb-3' style={{margin:'10%',color:'#24344d'}}>Bienvenue sur MADRASA-TIC</h1>
        </div>
        </MDBContainer>

        <MDBContainer fluid id='annonces' className='p-5 text-center' style={{height: '100vh' }}>
            <div className='text-dark'>
              <h1 className='mb-3' style={{color:'#24344d'}}>Annonces</h1>
              <hr style={{border: '2px solid #b78429'}}/>
            </div>
        </MDBContainer>

        <MDBContainer fluid id='a-propos' style={{height: '100vh' }}>
          <MDBContainer fluid className='p-5 text-center'>
            <div className='text-dark'>
              <h1 className='mb-3' style={{color:'#24344d'}}>A Propos</h1>
              <hr style={{border: '2px solid #b78429'}}/>
            </div>
          </MDBContainer>
          <MDBContainer>
            <MDBRow>
                <MDBCol md='6' id='cartedevisite1' ></MDBCol>
                <MDBCol md='6' id='cartedevisite2' ></MDBCol>
            </MDBRow>
          </MDBContainer>  
        </MDBContainer>

        <MDBContainer fluid id='contact' className='p-5'>
          <MDBContainer fluid className='p-5 text-center'>
            <div className='text-dark'>
              <h1 className='mb-3' style={{color:'#24344d'}}>Contact</h1>
              <hr style={{border: '2px solid #b78429'}}/>
            </div>
          </MDBContainer>
          <MDBContainer>
          <MDBRow>
                <MDBCol md='6'>
                    <MDBValidation>
                      <div>
                        <h6 style={{color:'#24344d'}}>Nom :</h6>
                      <MDBValidationItem tooltip className='col-md-8'>
                        <MDBInput
                          
                          name='Nom'
                          
                          id='validationCustom01'
                          required
                          label='Nom'
                        />
                      </MDBValidationItem>

                      </div>
                      <div>
                        <h6 style={{color:'#24344d'}}>Prénom :</h6>
                        <MDBValidationItem tooltip className='col-md-8'>
                        <MDBInput
                          
                          name='Prenom'
                          
                          id='validationCustom02'
                          required
                          label='Prénom'
                        />
                      </MDBValidationItem>
                      </div>
                      <div>
                        <h6 style={{color:'#24344d'}}>Email :</h6>
                        <MDBValidationItem feedback="Saisir l'Email ici." invalid className='col-md-8'>
                        <MDBInput
                          type='email'
                          className='form-control'
                          id='validationCustomEmail'
                          placeholder='Email'
                          required
                          label='Email'
                        />

                      </MDBValidationItem>
                      </div>
                      <div>
                        <h6 style={{color:'#24344d'}}>Message :</h6>
                        <MDBValidationItem feedback="Saisir le Message ici." invalid className='col-md-8'>
                        <MDBTextArea 
                          label='Message' 
                          id='validationTextArea' 
                          required
                          rows={4} 
                        />
                      </MDBValidationItem>
                      </div>
                      <div style={{margin:'30px'}}>
                        
                        <MDBBtn type='submit'>Envoyer</MDBBtn>
                        
                      </div>
                    </MDBValidation>
                   
                    
                </MDBCol>
                <MDBCol md='6' id='Contact' >

                </MDBCol>
            </MDBRow>

          </MDBContainer>
        </MDBContainer>
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      

      <section className='d-flex border'>
        <div className='container text-center text-md-start mt-5'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem me-3'></i>Futuristic Community
              </h6>
              <p>
                
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  
                </a>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                 
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  
                </a>
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <i className='fas fa-home me-3'></i> Sidi Bel-Abbés
              </p>
              <p>
                <i className='fas fa-envelope me-3'></i> futuristic22community@gmail.com
              </p>
              <p>
                <i className='fas fa-phone me-3'></i> 
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          
        </a>
      </div>
    </MDBFooter>

      </header>
    
  )
}
