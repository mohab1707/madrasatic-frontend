import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from "react-dom";
import { ListeMesDeclarations } from './ListeMesDeclarations';
import './tabledeclarations.css'

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';


export const TableMesDeclarations = () => {
    const [MyData,setDeclaration]=useState(
        [
        {nomU:"utilisateur1",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Santé",priorite:"1"},
        {nomU:"utilisateur1",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Hygiène",priorite:"2"},
        {nomU:"utilisateur1",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Objet perdu",priorite:"3"},
        {nomU:"utilisateur1",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Sécurité",priorite:"4"},
        ]);
  return (
    <MDBContainer>
            <MDBContainer className='head'>
                <h2 style={{textAlign:'center'}}>Mes déclarations</h2>
            </MDBContainer>
            <MDBContainer>
            {MyData && <ListeMesDeclarations MyData={MyData}></ListeMesDeclarations>}
            </MDBContainer>
        </MDBContainer>
  )
}

export default TableMesDeclarations;
