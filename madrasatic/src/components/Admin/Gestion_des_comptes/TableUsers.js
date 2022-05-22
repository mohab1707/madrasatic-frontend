import React, { useEffect, useReducer, useState } from 'react';
import UserList from './UserList';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';


import './tableusers.css'
export const TableUsers = () => {
    return (

        <MDBContainer className='utilisateurs'>
            <h2>Liste des utilisateurs</h2>
            <hr style={{border: '2px solid #b78429'}}/>
            <MDBContainer className='head'>
                <MDBRow>
                    <MDBCol md='1'><h6>Id</h6></MDBCol>
                    <MDBCol md='2'><h6>Nom d'utilisateur</h6></MDBCol>
                    <MDBCol md='2'><h6>Email</h6></MDBCol>
                    <MDBCol md='1'><h6>Role</h6></MDBCol>
                    <MDBCol md='1'><h6>Etat</h6></MDBCol>
                    <MDBCol md='2'><h6>Affecter le Role</h6></MDBCol>
                    <MDBCol md='2'><h6>Activer/Désactiver</h6></MDBCol>
                    <MDBCol md='1'><h6>Enregistrer</h6></MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer className='users'>
                <UserList ></UserList>
            </MDBContainer>
        </MDBContainer>
    
    );
}

