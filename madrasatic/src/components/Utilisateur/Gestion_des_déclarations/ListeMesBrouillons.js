import {MDBContainer,MDBRow,MDBCol,MDBCheckbox} from 'mdb-react-ui-kit';
import React, { useReducer, useState,useEffect }  from 'react';
import { MDBRadio } from 'mdb-react-ui-kit';
import DeclarationEnregistree from './DeclarationEnregistree';


import './blogdeclaration.css';


export const ListeMesBrouillons = ({MyData}) => {
  return (
    <MDBContainer style={{backgrounColor: 'white'}}>
            {MyData.map(blog =>(
                
            <MDBRow className='declaration' key={blog.id}>
                <MDBCol md='1'>
                    <MDBCheckbox name='checkNoLabel' id='checkboxNoLabel' value='' aria-label='...' />
                </MDBCol>
                <MDBCol md='7'>
                    <h6>Intitulé :{blog.nomD}</h6>
                    <p>Envoyée par : moi</p>
                    <p>{blog.email}</p>
                </MDBCol>
                <MDBCol md='2'>
                    <p>Catégorie :{blog.catg}</p>
                </MDBCol>
                <MDBCol md='1'>
                    <p>Priorité :{blog.priorite}</p>
                </MDBCol>
                <MDBCol md='1'>
                    <button onClick={<DeclarationEnregistree></DeclarationEnregistree>}>Modifier</button>
                </MDBCol>
            </MDBRow>
            ) )}
            
        </MDBContainer>
  )
}

export default ListeMesBrouillons;
