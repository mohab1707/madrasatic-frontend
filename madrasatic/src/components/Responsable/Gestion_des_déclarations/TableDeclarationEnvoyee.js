import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from "react-dom";
import { ListeDeclarationEnvoyee } from './ListeDeclarationEnvoyee';
import './tabledeclarations.css';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';



export const TableDeclarationEnvoyee = () => {
    const [MyData,setDeclaration]=useState(
        [
        {nomU:"utilisateur1",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Santé",priorite:"1"},
        {nomU:"utilisateur2",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Hygiène",priorite:"2"},
        {nomU:"utilisateur3",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Objet perdu",priorite:"3"},
        {nomU:"utilisateur4",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Sécurité",priorite:"4"},
        ]);

    
    return (

        <MDBContainer>
            <MDBContainer className='head'>
                <h2 style={{textAlign:'center'}}>Liste des déclarations Envoyées</h2>
            </MDBContainer>
            <MDBContainer>
            {MyData && <ListeDeclarationEnvoyee MyData={MyData}></ListeDeclarationEnvoyee>}
            </MDBContainer>
        </MDBContainer>
    
    );
}



