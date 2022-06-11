import React, { useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';

import './declaration.css'
import { Redirect, useParams } from 'react-router-dom';
import {Col, Card,Table} from 'react-bootstrap';
import ReactPaginate from "react-paginate";
export default function DetailDeclaration() {
    const [rediger,setRediger]=useState(false);
    const token = sessionStorage.getItem("key");
    const [id2,setId]=useState();
    const [categories,setCategories]=useState([]);
    const [auteur,setAuteur]=useState("");
    const {id}=useParams();
    const [lieu,setLieu]=useState("");
    const [objet,setObjet]=useState("");
    const [catégorie,setCatégorie]=useState("");
    const [priorité,setPriorité]=useState("");
    const [corps,setCorps]=useState("");
    const [image,setImage]=useState(null);
    const [reussi,setReussi]=useState(false);
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState();
    const[MyData,setMyData]=useState([]);
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/", {
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
            setMyData(data.results);
            setNombre(data.count);
            setNombresPages(Math.ceil(data.count /5));
          });
    },[])
    const afficher=(val)=>{
        if(val === 'tout'){
            fetch("http://127.0.0.1:8000/madrasatic/service_declarations/", {
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
            setMyData(data.results);
          });
        }else if(val === '1' || val=== '2' || val ==='3'){
            fetch(`http://127.0.0.1:8000/madrasatic/service_declarations/?priorité=${val}`, {
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
            setMyData(data.results);
          });
        }else{
            fetch(`http://127.0.0.1:8000/madrasatic/service_declarations/?etat=${val}`, {
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
            setMyData(data.results);
          });
        }
    }
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
    const EnCoursDeTraitement=(()=>{
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({auteur:auteur,etat:'en cours de traitement'}),
            }).then(()=>{
                setReussi(true);
            })
    })
    const ChangePage=((data)=>{
        console.log(data.selected);
        setPageCourrente(data.selected+1);
        if(data.selected == 0){
          fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/", {
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
              setMyData(data.results);
            });
        }else{
          fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/?page=${data.selected + 1}`, {
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
              setMyData(data.results);
            });
        }
      })
  return (
    <>
    <MDBContainer className='content'>
        {reussi ? <Redirect to="/HomeService"/> : null}
        {rediger ? <Redirect to={`/AjoutRapport/${id}`}/> : null}
        <MDBContainer style={{}}>
        <MDBRow className='buttons'>
            <MDBCol md='9'></MDBCol>
            <MDBCol md='3'>
            <button onClick={()=>{setRediger(true)}}>Rédiger rapport</button>
            </MDBCol>
        </MDBRow>
        <MDBRow className='infos'>
        <MDBCol md='5'>
                <h5>Objet : {objet}</h5>
                <MDBRow>
                {
                      categories.filter(cat => cat.id === catégorie).map(
                        categ =>(
                          <MDBCol style={{marginRight:'15%'}}><h6 ><i className="fa fa-circle f-10 m-r-15"/>Catégorie :{categ.name}</h6></MDBCol>
                        )
                      )
                    }
                    <MDBRow>
                    <MDBCol style={{marginRight:'22%'}}><h6><i className="fa fa-circle f-10 m-r-15"/>Priorité :{priorité}</h6></MDBCol>
                </MDBRow>
                    </MDBRow>
                    
            </MDBCol>
        </MDBRow>
        <hr style={{border: '2px solid #b78429'}}/>
        <p>Lieu: {lieu}</p>
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
            <MDBCol md='9'></MDBCol>
            <MDBCol md='3'>
               <button onClick={EnCoursDeTraitement}>En cours de traitement</button>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
    <MDBContainer className='form' >
          <Col md={10} xl={12} style={{marginTop:'5%'}}>
                        <Card className='Recent-Users' >
                            <Card.Header>
                                <Card.Title as='h2'  style={{
                                  fontSize: '25px',
                                  marginTop: '30px',
                                  padding: '2%',
                                  marginBottom: '30px',
                                  backgroundColor: '#1f2833',
                                  color: 'white',
                                  textAlign: 'center'
                                  }}>Liste des déclarations</Card.Title>
                                <table>
                                    <tr>
                                        <td>
                                            {/* <br></br> */}
                                            <p>Etat : </p>
                                        </td>
                                        <td>
                                             <select onChange={(e)=>{afficher(e.target.value)}}>
                                                <option value='tout'>Toutes</option>
                                                <option value='non traitée'>Etat: non traitée</option>
                                                <option value='traitée'>Etat: traitée</option>
                                            </select>
                                        </td>
                                        <td>
                                            <p>  Catégorie : </p>
                                        </td>
                                        <td>
                                            <select onChange={(e)=>{afficher(e.target.value)}}>
                                                <option value='tout'>Toutes</option>
                                                <option value='1'>Urgence</option>
                                                <option value='2'>Etat critique</option>
                                                <option value='3'>Etat normal</option>
                                            </select>
                                        </td>
                                    </tr>

                                </table>
                            </Card.Header>
                            {MyData.filter(decla=>decla.parent_declaration == id).map(dec => (
                            <Card.Body className='px-0 py-2'>       
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td><img  style={{width: '150px'}} src={dec.image} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Objet :{dec.objet}</h6>
                                            <p className="m-0">Etat :{dec.etat}</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>Catégorie :{dec.catégorie}</h6>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>Priorité :{dec.priorité}</h6>
                                        </td>
                                        {/* <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td> */}
                                    </tr>
                                  </tbody>
                                </Table>
                              </Card.Body>
                              ))} 
                        </Card>
                        <ReactPaginate 
                                previousLabel={"<<"}
                                nextLabel={">>"}
                                breakLabel={"..."}
                                pageCount={nombrePages}
                                onPageChange={ChangePage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}/>
                    </Col>
      
  </MDBContainer>
    </>
  )
}
