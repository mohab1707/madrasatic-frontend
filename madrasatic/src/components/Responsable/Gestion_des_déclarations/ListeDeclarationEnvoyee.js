import {MDBContainer,MDBRow,MDBCol,MDBCheckbox} from 'mdb-react-ui-kit';
import React, { useReducer, useState,useEffect }  from 'react';
import DeclarationEnvoyee from './DeclarationEnvoyee';
import './blogdeclaration.css';
import { Link, Redirect } from 'react-router-dom';
export const ListeDeclarationEnvoyee = ( {MyData}) => {
    const [Consulter,setConsulter]=useState(false);
    const detail=(()=>{
        setConsulter(true);
    })
    return (
        <MDBContainer style={{backgrounColor: 'white'}}>
            
            {MyData.map(decla =>(
                <Link to={`/DeclarationEnvoyer/${decla.id}`}>
                    <MDBRow className='declaration'>
                        {/* {Consulter ? <Redirect to={`/DeclarationEnvoyer/${decla.id}` }/> :null} */}
                        <MDBCol md='1'>
                            <MDBCheckbox name='checkNoLabel' id='checkboxNoLabel' value='' aria-label='...' />
                        </MDBCol>
                        <MDBCol md='7'>
                            <h6>Objet :{decla.objet}</h6>
                            <p>Envoyée par :{decla.id}</p>
                            <p>Etat : {decla.etat}</p>
                        </MDBCol>
                        <MDBCol md='2'>
                            <p>Catégorie :{decla.catégorie}</p>
                        </MDBCol>
                        <MDBCol md='1'>
                            <p>Priorité :{decla.priorité}</p>
                        </MDBCol>
                        {/* <MDBCol md='1'>
                            <button onClick={detail}>Consulter</button>
                        </MDBCol> */}
                       
                    </MDBRow>
                    </Link>
            ) )}
            
        </MDBContainer>
    );

}