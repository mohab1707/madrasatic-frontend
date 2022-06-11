import React, { useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';
import {FaThumbsUp,FaThumbsDown,FaCogs} from 'react-icons/fa'
import './declaration.css'
import { Redirect, useParams } from 'react-router-dom';
import {Col, Card,Table} from 'react-bootstrap';
import ReactPaginate from "react-paginate";
export default function DeclarationEnvoyee() {
    const [Consulter,setConsulter]=useState(false);
    const token = sessionStorage.getItem("key");
    const [id2,setId]=useState();
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
    const [complement,setComplement]=useState(false);
    const [reussi,setReussi]=useState(false);
    const [attacher,setAttacher]=useState(false);
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState();
    const[MyData,setMyData]=useState([]);
    const [catégories,setCatégories]=useState ([]);
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
            setMyData(data.results);
            setNombre(data.count);
            setNombresPages(Math.ceil(data.count /5));
          });
          fetch("http://127.0.0.1:8000/madrasatic/categories/", {
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
            setCatégories(data.results);
          });
    },[])
    //
    const detail=((id)=>{
        setId(id);
        setConsulter(true);
        
    })
    const afficher=(val)=>{
      if(val === 'tout'){
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
    }else if(val === '1' || val=== '2' || val ==='3'){
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/?priorité=${val}`, {
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
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/?etat=${val}`, {
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
        {delet ? <Redirect to={`/RejeterDecla/${id}`}/> : null}
        {complement ? <Redirect to={`/DeclarationIncomplete/${id}`}/> : null}
        {reussi ? <Redirect to="/HomeResponsable"/> : null}
        {attacher ? <Redirect to={`/AttacherDeclaration/${id}`}/> :null}
        <MDBContainer style={{}}>
        <MDBRow className='buttons'>
            <MDBCol md='3'></MDBCol>
            <MDBCol md='3'>
               <button onClick={()=>{setAttacher(true)}}>Attacher Déclaration</button>
            </MDBCol>
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
                <MDBRow>
                {
                      categories.filter(cat => cat.id === catégorie).map(
                        categ =>(
                          <MDBCol style={{marginRight:'15%'}}><h6 ><i className="fa fa-circle f-10 m-r-15"/>Catégorie :{categ.name}</h6></MDBCol>
                        )
                      )
                    }
                    
                    <MDBCol>
                    <select class="custom-select" onChange={e=>{setCatégorie(e.target.value)}}>
                    <option >Catégorie</option>
                    {categories.map(cat => (
                        <option value={cat.id}>{cat.name}</option>
                    ))}
                    </select>
                    </MDBCol>
                    <MDBRow>
                    <MDBCol style={{marginRight:'22%'}}><h6><i className="fa fa-circle f-10 m-r-15"/>Priorité :{priorité}</h6></MDBCol>
                    <MDBCol>
                    <select class="custom-select" onChange={e=>{setPriorité(e.target.value)}}>
                        <option>prio</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    </MDBCol>
                </MDBRow>
                    </MDBRow>
                    
            </MDBCol>

            <MDBCol md='4'>
                
                    
                
            </MDBCol>
            <MDBCol md='3'>
                
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
            <MDBCol md='10'></MDBCol>
            <MDBCol md='1'>
               <button onClick={validerDeclaration}>Valider</button>
            </MDBCol>
            <MDBCol md='1'>
            <button onClick={supp}>Rejeter</button>
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
                                
                                <div class="row" style={{marginLeft:'25%'}}>
                <div class="col-lg-20 mx-auto">
                    <div class="career-search mb-60">

                        <form action="#" class="career-form mb-60">
                            <div class="row">
                                <div class="col-md-8 col-lg-4 my-4">
                                    <div class="select-container">
                                        <select class="custom-select" onChange={(e)=>{afficher(e.target.value)}}>
                                                <option value='tout'>Tous les états</option>
                                                <option value='publiée'>Etat: publiée</option>
                                                <option value='incompléte'>Etat: incompléte</option>
                                                {/* <option value='rejetée'>Etat: rejetée</option> */}
                                                <option value='non traitée'>Etat: non traitée</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-8 col-lg-4 my-4">
                                    <div class="select-container" onChange={(e)=>{afficher(e.target.value)}}>
                                        <select class="custom-select">
                                                <option value='tout'>Toutes les priorités</option>
                                                <option value='1'>Urgence</option>
                                                <option value='2'>Etat critique</option>
                                                <option value='3'>Etat normal</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    </div>
                            </Card.Header>
                            {MyData.filter(decla=>decla.parent_declaration == id).map(dec => (
                                                           <Card.Body className='px-0 py-2'  onClick={()=>{detail(dec.id)}}>       
                                                           <Table responsive hover>
                                                               <tbody>
                                                               <tr className="unread" class="candidates-list">
                                                                   <td class="title"><img  style={{width: '50px'}} src={dec.image} alt="Image du signalement"/></td>
                                                                   <td>
                                                                       <div class="candidate-list-details">
                                                                         <div class="candidate-list-info">
                                                                           <div class="candidate-list-title">
                                                                             <h5 class="mb-0"><a href={`/DeclarationEnvoyer/${id}`} style={{color:'black'}}>{dec.objet}</a></h5>
                                                                           </div>
                                                                           <div class="candidate-list-option">
                                                                             <ul class="list-unstyled">
                                                                               <li><FaCogs style={{marginRight:'2px',marginBottom:'3px'}}/> {dec.etat}</li>
                                                                               <li><FaThumbsUp  style={{marginRight:'2px',marginBottom:'6px'}}/>{dec.confirmée_par.length}</li>
                                                                               <li><FaThumbsDown  style={{marginRight:'2px',marginTop:'4px'}}/> {dec.signalée_par.length}</li>
                                                                             </ul>
                                                                           </div>
                                                                         </div>
                                                                       </div>
                                                                   </td>
                                                                   <td>
                                                                      {
                                                                       catégories.filter(cat => cat.id === dec.catégorie).map(
                                                                         categ =>(
                                                                           <h6 ><i className="fa fa-circle f-10 m-r-15"/>Catégorie :{categ.name}</h6>
                                                                         )
                                                                       )
                                                                      }
                                                                       
                                                                       <h6><i className="fa fa-circle f-10 m-r-15"/>Priorité :{dec.priorité}</h6>
                                                                   </td>
                                                                    
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
