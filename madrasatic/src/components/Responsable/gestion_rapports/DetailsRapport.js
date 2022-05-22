import React, { useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';

import '../Gestion_des_déclarations/declaration.css'
import { Redirect, useParams } from 'react-router-dom';
import {Col, Card,Table} from 'react-bootstrap';
import ReactPaginate from "react-paginate";
export default function DetailRapport() {
    const [Consulter,setConsulter]=useState(false);
    const [service,setService]=useState("");
    const token = sessionStorage.getItem("key");
    const [id2,setId]=useState();
    const [categories,setCategories]=useState([]);
    const [auteur,setAuteur]=useState("");
    const [delet,setDelete]=useState(false);
    const {idRapport}=useParams();
    const [lieu,setLieu]=useState("");
    const [objet,setObjet]=useState("");
    const [catégorie,setCatégorie]=useState("");
    const [priorité,setPriorité]=useState("");
    const [corps,setCorps]=useState("");
    const [image,setImage]=useState(null);
    const [complement,setComplement]=useState(false);
    const [reussi,setReussi]=useState(false);
    const [title,setTitile]=useState("");
    const [description,setDescription]=useState("");
    const[MyData,setMyData]=useState([]);
    useEffect(()=>{
        // informations du rapport
        fetch(`http://127.0.0.1:8000/madrasatic/reports/${idRapport}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Token ${token}`
          },
        }).then((response) => {
            return response.json();
          }).then((data) => {
            setTitile(data.title);
            setDescription(data.desc);
            setId(data.declaration);
            setService(data.service);
            console.log(data.declaration);
          }).then(()=>{
                fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/${id2}/`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization":`Token ${token}`
                    },
                }).then((response) => {
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
                    });
          })
    },[id2])
    const demanderComplement=(()=>{
        setComplement(true);
    })
    const validerRapport=(()=>{
        fetch(`http://127.0.0.1:8000/madrasatic/reports/${idRapport}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({title:objet,desc:corps,service:service,declaration:id2,status:'rejeté'}),
            }).then(()=>{
                setReussi(true);
            })
    })
  return (
    <>
    <MDBContainer className='content'>
        {complement ? <Redirect to={`/RapportIncomplet/${idRapport}`}/> : null}
        {reussi ? <Redirect to="/HomeResponsable"/> : null}
        <MDBContainer style={{}}>
        <MDBRow className='infos'>
            <MDBCol md='5'>
                <h5>Objet : {title}</h5>
                <p>Corps: {description}</p>
            </MDBCol>
        </MDBRow>
        </MDBContainer>  
        <MDBRow className='buttons'>
            <MDBCol md='10'></MDBCol>
            <MDBCol md='1'>
               <button onClick={validerRapport}>Valider</button>
            </MDBCol>
            <MDBCol md='3'>
            <button onClick={demanderComplement}>Demander Complément</button>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
    {/* //Declaration associé au rapport */}
    <MDBContainer className='content'>
        <MDBContainer style={{}}>
        <MDBRow className='infos'>
            <MDBCol md='5'>
                <h5>Objet : {objet}</h5>
                <p>Lieu: {lieu}</p>
            </MDBCol>

            <MDBCol md='4'>
                <MDBRow>
                    <MDBCol><h5>Catégorie:</h5></MDBCol>
                    <MDBCol><p>{catégorie}</p></MDBCol>
                </MDBRow>
            </MDBCol>
            <MDBCol md='2'>
                <MDBRow>
                    <MDBCol><h5>Priorité:</h5></MDBCol>
                    <MDBCol><p>{priorité}</p></MDBCol>
                </MDBRow>
            </MDBCol>
        </MDBRow>
        <hr style={{border: '2px solid #b78429'}}/>
        <MDBContainer>
            <h5>Déscription :</h5>
            <p>{corps}</p>
        </MDBContainer>
        <MDBContainer>
            <h5>Photo :</h5>
            <img src={image} alt='Une image' style={{width: '70%'}}/>
        </MDBContainer>
        </MDBContainer>  
    </MDBContainer>
    </>
  )
}
