import React, { useEffect, useState} from 'react';
import './tabledeclarations.css';
import {Col, Card,Table} from 'react-bootstrap';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    } from 'mdb-react-ui-kit';
import { useParams ,Redirect} from 'react-router-dom';
import ReactPaginate from "react-paginate";
export const ListeDeclaPourAttacher = () => {
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState([]);
    const [check,setChecked]=useState(false);
    const [declarations,setDeclarations]=useState([]);
    const [catégories,setCatégories]=useState ([]);
    const {idparent}=useParams();
    const [categorie,setCategorie]=useState("");
    const [etat,setEtat]=useState();
    const [priorité,setPriorité]=useState("");
    const [envoyer,setEnvoyer]=useState(false);
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState(0);
    const path=sessionStorage.getItem("path");
    const [categFiltrage,setCategFiltrage]=useState("");
    const [prioFiltrage,setPrioFiltrage]=useState("");
    const [etatFiltrage,setEtatFiltrage]=useState("");
    useEffect(()=>{
          fetch(path+"madrasatic/categories/", {
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
            setCatégories(data);
          });
    },[]);
    useEffect(()=>{
      if(pageCourrente == 0){
        fetch(path+"madrasatic/responsable_declarations/?priorité="+prioFiltrage+"&etat="+etatFiltrage+"&catégorie="+categFiltrage, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Token ${token}`
          },
        }).then((response) => {
            if(response.ok){
              console.log("coool");
            }else {
              console.log("erreuuuur");
            }
            return response.json();
          })
          .then((data) => {
            setMyData(data.results);
            setNombre(data.count);
            if((data.count % 5) == 0){
              setNombresPages(Math.ceil(data.count /5) - 1);
            }else{
              setNombresPages(Math.ceil(data.count /5));
            }
          });
      }else{
        fetch(path+"madrasatic/responsable_declarations/?page="+pageCourrente+"&priorité="+prioFiltrage+"&etat="+etatFiltrage+"&catégorie="+categFiltrage, {
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
            if((data.count % 5) == 0){
              setNombresPages(Math.ceil(data.count /5) - 1);
            }else{
              setNombresPages(Math.ceil(data.count /5));
            }
          });
      }
    },[MyData]);
    const ChangePage=((data)=>{
      setPageCourrente(data.selected+1);
    });
    const putData = (dec)=>{
      setEnvoyer(true)
      fetch(path+`madrasatic/responsable_declarations/${dec.id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Token ${token}`
        },
        body:JSON.stringify({catégorie:categorie ,parent_declaration:idparent})
        }).then((response) => {
            if (response.ok) {
            console.log("parent modifié");
            setChecked(true);
            } else {
            console.log("y'a une erreur");
            }
            return response.json();
        })
    }
    const attacher=(e)=>{
        e.preventDefault();
            declarations.map(dec=>{
                  fetch(path+`madrasatic/responsable_declarations/${dec.id}/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization":`Token ${token}`
                    },
                    body:JSON.stringify({parent_declaration:idparent})
                    }).then((response) => {
                        if (response.ok) {
                        console.log("parent modifié");
                        setChecked(true);
                        } else {
                        console.log("y'a une erreur");
                        }
                        return response.json();
                    })
                
                
        })
            
    }
    const ajouterSupprimer=(decla)=>{
        // console.log("objet de la decla checked est :"+decla.objet);
        if (declarations.some(item=> item.id === decla.id)){
            console.log("existe deja doit etre supprimerrr")
            setDeclarations(item=>(
                item.filter(val=>(val.id != decla.id))
            ))
        }else{
            setDeclarations(previousState =>(
                [...previousState,decla]
            ));
        }
    }
    return (
        <MDBContainer >
            {check ? <Redirect to='/HomeResponsable' /> : null}
            <Col md={10} xl={12} style={{marginTop:'5%'}}>
                    <Card className='Recent-Users' style={{
                          border: '2px solid #b78429',
                          borderRadius: '8px',
                          padding:'0',
                          marginTop: '5%',
                          backgroundColor: 'white'
                          }}>
                        <Card.Header>
                        {/* <button onClick={attacher} style={{width:'100px'}}>confirmer</button> */}
                            <Card.Title as='h2' style={{
                                  fontSize: '25px',
                                  marginTop: '30px',
                                  padding: '2%',
                                  marginBottom: '30px',
                                  backgroundColor: '#1f2833',
                                  color: 'white',
                                  textAlign: 'center'
                                  }}>Liste Des Déclarations</Card.Title>
                            <div class="row align-items-center">
                              <MDBRow style={{marginTop:'10px', marginBottom:'40px'}}>
                                  <MDBCol>
                                    <select class="custom-select" onChange={(e)=>{setEtatFiltrage(e.target.value)}}>
                                            <option value=''>Toutes les etats</option>
                                            <option value='publiée'>Etat: publiée</option>
                                            <option value='non_traitée'>Etat: non traitée</option>
                                            <option value='traitée'>Etat : traitée</option>
                                            <option value='en_cours_de_traitement'>Etat : en cours de traitement</option>
                                    </select>
                                  </MDBCol>
                                  <MDBCol>
                                    <select class="custom-select" onChange={(e)=>{setPrioFiltrage(e.target.value)}}>
                                                <option value=''>Toute les priorités</option>
                                                <option value="1">Urgent</option>
                                                <option value="2">Etat critique</option>
                                                <option value="3">Etat normal</option>
                                    </select>
                                  </MDBCol>
                                  <MDBCol>
                                  <select class="custom-select">
                                          <option value=''>Toutes les catégories</option>
                                          {
                                            catégories.map(
                                              categ =>(
                                                <option value={categ.id}>{categ.name}</option>
                                              )
                                            )
                                           }
                                        </select>
                                  </MDBCol>
                                  <MDBCol>
                                    <button onClick={attacher} class="btn btn-dark" style={{width:'200px',margin:'5px'}}>Attacher</button>
                                  </MDBCol>
                                </MDBRow>
                            </div>
                            
                        </Card.Header>
                        {MyData.filter(decla=>decla.parent_declaration === null).filter(decla=>decla.id != idparent).map(dec => (
                                <Card.Body className='px-0 py-2' >
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread" class="candidates-list" >
                                        <td><input  type="checkbox" onChange={()=>{ajouterSupprimer(dec)}}/></td>
                                        <td class="title" ><img  style={{width :'200px',borderRadius:'8px'}} src={dec.image} alt="Image du signalement"/></td>
                                        <td style={{width:'400px'}}>
                                            <div class="candidate-list-details">
                                              <div class="candidate-list-info">
                                                <div class="candidate-list-title">
                                                  <h5 class="mb-0">{dec.objet}</h5>
                                                </div>
                                                <div class="candidate-list-option">
                                                  <ul class="list-unstyled">
                                                  <p className="m-0">Etat :{dec.etat}</p>
                                                    
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                        </td>
                                        <td style={{width :'300px'}}>
                                          {
                                            catégories.filter(cat => cat.id === dec.catégorie).map(
                                              categ =>(
                                                <h6 ><i className="fa fa-circle f-10 m-r-15"/>Catégorie :{categ.name}</h6>
                                              )
                                            )
                                          }
                                            { 
                                              dec.priorité == 1 ? <h6><i className="fa fa-circle f-10 m-r-15"/>Priorité : Urgente</h6> : null
                                            }
                                            { 
                                              dec.priorité == 2 ? <h6><i className="fa fa-circle f-10 m-r-15"/>Priorité : etat critique</h6> : null
                                            }
                                            { 
                                              dec.priorité == 3 ? <h6><i className="fa fa-circle f-10 m-r-15"/>Priorité : etat normal</h6> : null
                                            }
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
    
    );
}



