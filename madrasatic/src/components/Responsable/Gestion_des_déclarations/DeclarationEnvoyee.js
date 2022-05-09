import React, { useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';

import './declaration.css'
import { Redirect, useParams } from 'react-router-dom';

export default function DeclarationEnvoyee() {
    const [categories,setCategories]=useState([]);
    const [auteur,setAuteur]=useState("");
    const [delet,setDelete]=useState(false);
    const {id}=useParams();
    const [lieu,setLieu]=useState("");
    const [objet,setObjet]=useState("");
    const [catégorie,setCatégorie]=useState("");
    const [priorité,setPriorité]=useState("");
    const [corps,setCorps]=useState("");
    const [image,setImage]=useState(null);
    const token = sessionStorage.getItem("key");
    const [complement,setComplement]=useState(false);
    const [reussi,setReussi]=useState(false);
    useEffect(()=>{
        console.log('iddd ++'+ id);
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/${id}/`, {
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
            setCatégorie(data.catégorie);
            setAuteur(data.auteur);
            setCorps(data.corps);
            setLieu(data.lieu);
            setImage(data.image);
            setObjet(data.objet);
            setPriorité(data.priorité);
            console.log(data);
          });
          fetch("http://127.0.0.1:8000/madrasatic/categories/", {
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
                setCategories(data.results);
            });
    },[]);
    const supp =(()=>{
        setDelete(true);
    })
    const demanderComplement=(()=>{
        setComplement(true);
    })
    const enregistrerModification =((auteur)=>{
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({catégorie:catégorie,priorité:priorité}),
            }).then((response) => {
                if (response.ok) {
                console.log("donnees envoyée");
                setReussi(true);
                } else {
                console.log("y'a une erreur");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.results);
            });
    })
    const validerDeclaration=(()=>{
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({catégorie:catégorie,etat:'non traitée'}),
            }).then((response) => {
                if (response.ok) {
                console.log("donnees envoyée");
                setReussi(true);
                } else {
                console.log("y'a une erreur");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.results);
            });
    })
  return (
    <MDBContainer className='content'>
        {delet ? <Redirect to={`/RejeterDecla/${id}`}/> : null}
        {complement ? <Redirect to={`/DeclarationIncomplete/${id}`}/> : null}
        {reussi ? <Redirect to="/HomeResponsable"/> : null}
        <MDBContainer style={{}}>
        <MDBRow className='buttons'>
            <MDBCol md='6'></MDBCol>
            <MDBCol md='3'>
               <button onClick={enregistrerModification}>Sauvegarder Modifications</button>
            </MDBCol>
            <MDBCol md='3'>
            <button onClick={demanderComplement}>Demander Complément</button>
            </MDBCol>
        </MDBRow>
        <MDBRow className='infos'>
            <MDBCol md='5'>
                <h5>Objet : {objet}</h5>
                <p>Lieu: {lieu}</p>
            </MDBCol>

            <MDBCol md='4'>
                <MDBRow>
                    <MDBCol><h5>Catégorie:</h5></MDBCol>
                    <MDBCol><p>{catégorie}</p></MDBCol>
                    <MDBCol>
                    <select onChange={e=>{setCatégorie(e.target.value)}}>
                    <option >Catégorie</option>
                    {categories.map(cat => (
                        <option value={cat.id}>{cat.name}</option>
                    ))}
                    </select>
                    </MDBCol>
                </MDBRow>
            </MDBCol>
            <MDBCol md='2'>
                <MDBRow>
                    <MDBCol><h5>Priorité:</h5></MDBCol>
                    <MDBCol><p>{priorité}</p></MDBCol>
                    <MDBCol>
                    <select onChange={e=>{setPriorité(e.target.value)}}>
                        <option>prio</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        </MDBRow>
        <hr style={{border: '2px solid #24344d'}}/>
        <MDBContainer>
            <h5>Déscription :</h5>
            <p>{corps}</p>
        </MDBContainer>
        <MDBContainer>
            <h5>Photo :</h5>
            <img src={image} alt='Une image' style={{width: '70%'}}/>
        </MDBContainer>
        </MDBContainer>  
        <MDBRow className='buttons'>
            <MDBCol md='10'></MDBCol>
            <MDBCol md='1'>
               <button onClick={validerDeclaration}>Valider</button>
            </MDBCol>
            <MDBCol md='1'>
            <button onClick={supp}>Rejeter</button>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  )
}
