import React from 'react'
import {
    MDBFooter
    } from 'mdb-react-ui-kit';

export const Footer = () => {
  return (
    <MDBFooter className='text-center text-lg-start text-muted' style={{ backgroundColor: '#e8e8e8' }}>
      

      <section className='d-flex border'>
        <div className='container text-center text-md-start mt-5'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem me-3'></i>Futuristic Community
              </h6>
              <p>
              Boite de développement informatique orientée développement logiciel web ,mobile , ebergement .. bienvenue !
              </p>
            </div>
            <div className='col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contacter nous</h6>
              <p>
                <i className='fas fa-home me-3'></i> Sidi Bel-Abbés
              </p>
              <p>
                <i className='fas fa-envelope me-3'></i> futuristic22community@gmail.com
              </p>
              <p>
                {/*<i className='fas fa-phone me-3'></i>*/} 
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
         &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
      </div>
    </MDBFooter>
  )
}
