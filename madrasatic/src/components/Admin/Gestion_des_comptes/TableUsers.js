import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import UserList from './UserList';
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
            <MDBContainer>
                <MDBRow>
                    <MDBCol><h4>ID</h4></MDBCol>
                    <MDBCol><h4>Nom d'utilisateur</h4></MDBCol>
                    <MDBCol><h4>Email</h4></MDBCol>
                    <MDBCol><h4>Role</h4></MDBCol>
                    <MDBCol><h4>Etat</h4></MDBCol>
                    <MDBCol><h4>Affecter le Role</h4></MDBCol>
                    <MDBCol><h4>Activer/Désactiver</h4></MDBCol>
                    <MDBCol><h4>Enregistr</h4></MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer>
                {MyData && <UserList MyData={MyData}></UserList>}
            </MDBContainer>
        </MDBContainer>
    
    );
}

export default TableUsers;

