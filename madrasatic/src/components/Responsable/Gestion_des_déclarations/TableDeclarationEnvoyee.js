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
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState(null);
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Token ${token}`
          },
        }).then((response) => {
            if (response.ok) {
              console.log("donnees recup");
            } else {
              console.log("y'a une erreur");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.results);
            setMyData(data.results);
            console.log(MyData);
          });
    },[])

    
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



