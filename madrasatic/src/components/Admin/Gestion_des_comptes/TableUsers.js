import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import UserList from './UserList';
import './tableusers.css';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';



const TableUsers = () => {

    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/madrasatic/manageusers/", {
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
            console.log("element 0 :"+MyData);
            
          });
      }, []);

    return (

        <MDBContainer>
            <MDBContainer className='head'>
                <MDBRow>
                    <MDBCol md='1'><h6>Id</h6></MDBCol>
                    <MDBCol md='2'><h6>Nom d'utilisateur</h6></MDBCol>
                    <MDBCol md='2'><h4>Email</h4></MDBCol>
                    <MDBCol md='1'><h6>Role</h6></MDBCol>
                    <MDBCol md='1'><h6>Etat</h6></MDBCol>
                    <MDBCol md='2'><h6>Affecter le Role</h6></MDBCol>
                    <MDBCol md='2'><h6>Activer/Désactiver</h6></MDBCol>
                    <MDBCol md='1'><h6>Enregistrer</h6></MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer className='users'>
                {MyData && <UserList MyData={MyData}></UserList>}
            </MDBContainer>
        </MDBContainer>
    
    );
}

export default TableUsers;

