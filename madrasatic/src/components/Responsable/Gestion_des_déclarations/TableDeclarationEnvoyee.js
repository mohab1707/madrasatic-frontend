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
    return (
            <MDBContainer>
                  <ListeDeclarationEnvoyee></ListeDeclarationEnvoyee>
            </MDBContainer>
    
    );
}



