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
import {FaThumbsUp,FaThumbsDown,FaCogs} from 'react-icons/fa'
export default function DetailDeclaration() {
    const [modifier,setModifier]=useState(false);
    const [rediger,setRediger]=useState(false);
    const [rapportEnregistrés,setRapportsEnregistrés]=useState([]);
    const [nombreRapportsEnregistrés,setNombreRapportsEnregistrés]=useState('');
    const [idRapport,setIdRapport]=useState("");
    const token = sessionStorage.getItem("key");
    const [id2,setId]=useState();
    const [categories,setCategories]=useState([]);
    const [auteur,setAuteur]=useState("");
    const [etat,setEtat]=useState("");
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
    const [blocs,setBlocs]=useState([]);
    const [sites,setSites]=useState([]);
    const [endroits,setEndroits]=useState([]);
    const [lieux,setLieux]=useState([]);
    const [bloc,setBloc]=useState('');
    const [site,setSite]=useState("");
    const [endroit,setEndroit]=useState("");
    const [nombreBlocs,setNombreBlocs]=useState();
    const [nombreSites,setNombreSites]=useState();
    const [nombreEndroits,setNombreEndroits]=useState();
    const [nombreLieux,setNombreLieux]=useState();
    const [declaPrio,setDeclaprio]=useState();
    const [declaCateg,setDeclaCateg]=useState();
    const [rapport,setRapport]=useState([]);
    const [Consulter,setConsulter]=useState(false);
    const [nombreRapports,setNombreRapports]=useState("");
    const path=sessionStorage.getItem("path");
    const [completerRapport,setCompleterRapport]=useState(false);
    useEffect(()=>{
      fetch(path+"madrasatic/draft_reports/", {
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
            setRapportsEnregistrés(data);
          });
      fetch(path+"madrasatic/reports/", {
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
              setRapport(data);
            });
      fetch(path+"madrasatic/responsable_declarations/", {
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
            setCategories(data);
          });
          fetch(path+"madrasatic/blocs/", {
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
            setBlocs(data);
            
        });
  
        fetch(path+"madrasatic/sites/", {
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
          setSites(data);
          
        });
        fetch(path+"madrasatic/endroits/", {
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
          setEndroits(data);
          
        });
      fetch(path+"madrasatic/lieux/", {
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
          setLieux(data);
         
        });
    },[])
    const detail=((id)=>{
        setId(id);
        setConsulter(true);
        
    })
    useEffect(()=>{
      fetch(path+"madrasatic/responsable_declarations/", {
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
            fetch(path+"madrasatic/service_declarations/", {
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
            fetch(path+`madrasatic/service_declarations/?priorité=${val}`, {
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
            fetch(path+`madrasatic/service_declarations/?etat=${val}`, {
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
        fetch(path+`madrasatic/responsable_declarations/${id}/`, {
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
            setSite(data.site);
            setBloc(data.bloc);
            setEndroit(data.endroit);
            setLieu(data.lieu);
            setImage(data.image);
            setObjet(data.objet);
            setPriorité(data.priorité);
            setEtat(data.etat);
          });
    },[]);
    const EnCoursDeTraitement=(()=>{
        fetch(path+`madrasatic/responsable_declarations/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({auteur:auteur,etat:'en_cours_de_traitement'}),
            }).then(()=>{
                setReussi(true);
            })
    })
    const ChangePage=((data)=>{
        setPageCourrente(data.selected+1);
        if(data.selected == 0){
          fetch(path+"madrasatic/responsable_declarations/", {
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
          fetch(path+`madrasatic/responsable_declarations/?page=${data.selected + 1}`, {
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
      const modifierRapport=((val)=>{
        setModifier(true);
        setIdRapport(val)
      })
      const CompleterRapportIncomplet=((val)=>{
        setCompleterRapport(true);
        setIdRapport(val);
      })
      const supprimerRapport=((val,e)=>{
        e.preventDefault(); 
          fetch(path+`madrasatic/draft_reports/${val}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization":`Token ${token}`
        },
      }).then((response)=>{
        if(response.ok)
        {
            setReussi(true);
        }
      })
      })
      const validerRapport=((val,e)=>{
        e.preventDefault();
        fetch(path+`madrasatic/responsable_declarations/${id}/`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization":`Token ${token}`
          },
          body: JSON.stringify({etat:'en_cours_de_traitement'}),
          })
        fetch(path+`madrasatic/draft_reports/${val}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            }).then((response)=>{
              if(response.ok){
                console.log("oh cool detail rapport recup")
              }
              return response.json();
            }).then(data =>{
              fetch(path+`madrasatic/draft_reports/${val}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization":`Token ${token}`
                },
                body: JSON.stringify({title:data.title ,desc:data.desc, service:data.service, declaration:data.declaration ,status:'validé'}),
                }).then((response)=>{
                  if(response.ok){
                    setReussi(true);
                    console.log("oh cool")
                  }
                  return response.json();
                }).then(data =>{
                  console.log(data)
                })
            })
      })
  return (
    <>
  <div class="container">
        {reussi ? <Redirect to="/HomeService"/> : null}
        {rediger ? <Redirect to={`/AjoutRapport/${id}`}/> : null}
        {modifier ? <Redirect to={`/ModifierRapportEnregistré/${idRapport}`}/> :null}
        {completerRapport ? <Redirect to={`/CompleterRapport/${idRapport}`}/> :null}
<div class="mt-5" style={{backgroundColor:'white'}}>
      <div class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm">
        <div class="row align-items-center">
          <div class="col-12 col-md-4">
              {/* <img src={image} alt='Une image' style={{width: '300px',borderRadius:'8px'}}/> */}
              <div class="card" style={{width: "300px",marginLeft:'20px'}}>
                  <img src={image} alt='Une image' style={{borderRadius:'8px'}}/>
                  <div class="card-body">
                    <p class="card-text">{corps}</p>
                  </div>
                </div>
            </div>

          <ul class="list-unstyled mb-0 col-12 col-md-4 text-dark-l1 text-90 text-left my-4 my-md-0">
            <li>
            <i className="fa fa-circle f-10 m-r-15"/>
              <span class="text-110">{objet}</span>
            </li>

            <li class="mt-25">
            {
              categories.filter(cat => cat.id === catégorie).map(
                categ =>(
                  <span><i className="fa fa-circle f-10 m-r-15"/>Catégorie :{categ.name}</span>
                )
              )
            }
            </li>

            <li class="mt-25">
            { 
                priorité == 1 ? <h6><i className="fa fa-circle f-10 m-r-15"/>Priorité : Urgente</h6> : null
              }
              { 
                priorité == 2 ? <h6><i className="fa fa-circle f-10 m-r-15"/>Priorité : etat critique</h6> : null
              }
              { 
                priorité == 3 ? <h6><i className="fa fa-circle f-10 m-r-15"/>Priorité : etat normal</h6> : null
            }
            </li>
            <li>
              <h6><i className="fa fa-circle f-10 m-r-15"/>Etat : {etat}</h6>
            </li>

            <li>
              {
                sites.filter(item => item.id == site).map(item=>(
                  <h6 ><i className="fa fa-circle f-10 m-r-15"/> Site :{item.site}</h6>
                ))
              }
              {
                blocs.filter(item => item.id == bloc).map(item=>(
                  <h6 ><i className="fa fa-circle f-10 m-r-15"/> Bloc :{item.blocc}</h6>
                ))
              }
              {
                endroits.filter(item => item.id == endroit).map(item=>(
                  <h6><i className="fa fa-circle f-10 m-r-15"/> Endroit :{item.endroit}</h6>
                ))
              }
              {
                lieux.filter(item => item.id == lieu).map(item=>(
                  <h6 ><i className="fa fa-circle f-10 m-r-15"/> Lieu :{item.identification}</h6>
                ))
              }
            </li>
          </ul>

          <div class="col-12 col-md-4 text-center">
            <ul class ="list-unstyled">
              <li>
                <button onClick={()=>{setRediger(true)}} class="btn btn-dark" style={{width:'280px',margin:'5px'}}>Rédiger rapport</button>
              </li>
              <li>
                <button onClick={EnCoursDeTraitement} class="btn btn-dark" style={{width:'280px',margin:'5px'}}>En cours de traitement</button>
              </li>
            </ul>
          </div>
          <br></br> <br></br>
          
          
          
        </div>
        <h5 style={{marginTop:'5%'}}>Rapport associé :</h5>
          {
            rapport.filter(item => item.declaration == id).map(item => (
                <div class="card" style={{width: "500px",marginLeft:'30%'}}>
                  <img class="card-img-top" src={item.image} alt="Image" style={{borderRadius:'8px'}}/>
                  <div class="card-body">
                    <h5 class="card-title">{item.title}</h5>
                    <p class="card-text">{item.desc}</p>
                    {
                      item.status === 'incomplet' ? <MDBRow>
                      <MDBCol >
                        <a href="" class="btn btn-dark" style={{width:"130px"}} onClick={()=>CompleterRapportIncomplet(item.id)}>Modifier</a>
                      </MDBCol>
                    </MDBRow> : null 
                    }
                  </div>
              </div>
            ))
          }
          {
            rapportEnregistrés.filter(item => item.declaration == id).map( item => (
              <div class="card" style={{width: "500px",marginLeft:'30%'}}>
              <img class="card-img-top" src={image} alt="Image" style={{borderRadius:'8px'}}/>
              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <p class="card-text">{item.desc}</p>
                <MDBRow>
                  <MDBCol>
                    <a href="#" class="btn btn-dark" style={{width:"130px"}} onClick={(e)=>{ validerRapport(item.id,e)}}>Valider</a>
                  </MDBCol>
                  <MDBCol >
                    <a href="" class="btn btn-dark" style={{width:"130px"}} onClick={()=>modifierRapport(item.id)}>Modifier</a>
                  </MDBCol>
                  <MDBCol>
                    <a href="#" class="btn btn-dark" style={{width:"130px"}} onClick={(e)=>supprimerRapport(item.id,e)}>Supprimer</a>
                  </MDBCol>
                </MDBRow>
              </div>
          </div>
            ))
          }
        <Col md={10} xl={12} style={{marginTop:'10%'}}>
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
                                                                       categories.filter(cat => cat.id === dec.catégorie).map(
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
      </div>



      </div>
</div>
    </>
  )
}
