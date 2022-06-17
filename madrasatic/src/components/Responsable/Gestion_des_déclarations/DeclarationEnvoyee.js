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
    const [idRapport,setIdDRapport]=useState("");
    const [nombreRapports,setNombreRapports]=useState("");
    const [completerRapport,setCompleterRapport]=useState(false);
    const [declarations,setDeclarations]=useState([]);
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/reports/", {
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
            setCatégories(data);
          });
          fetch("http://127.0.0.1:8000/madrasatic/blocs/", {
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
  
        fetch("http://127.0.0.1:8000/madrasatic/sites/", {
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
        fetch("http://127.0.0.1:8000/madrasatic/endroits/", {
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
      fetch("http://127.0.0.1:8000/madrasatic/lieux/", {
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
            setSite(data.site);
            setBloc(data.bloc);
            setEndroit(data.endroit);
            setAuteur(data.auteur);
            setCorps(data.corps);
            setLieu(data.lieu);
            setImage(data.image);
            setObjet(data.objet);
            setPriorité(data.priorité);
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
            body: JSON.stringify({catégorie:declaCateg,priorité:declaPrio}),
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
    const CompleterRapport =((val)=>{
      setCompleterRapport(true);
      setIdDRapport(val);

    })
    const validerRapport=((val,titre,desc,service,declaration,e)=>{
      e.preventDefault();
        fetch(`http://127.0.0.1:8000/madrasatic/reports/${val}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({title:titre,desc:desc,service:service,declaration:declaration,status:'validé'}),
            }).then(()=>{
              setReussi(true);
            })
    })
    const ajouterSupprimer=(decla)=>{
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
  const Dettacher =(()=>{
    declarations.map(dec=>{
      fetch(`http://localhost:8000/madrasatic/responsable_declarations/${dec.id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Token ${token}`
        },
        body:JSON.stringify({parent_declaration:null})
        }).then((response) => {
            if (response.ok) {
            console.log("parent modifié");
            setReussi(true);
            } else {
            console.log("y'a une erreur");
            }
            return response.json();
        })
    })
  })
  return (
    <>
<div class="container">
        {delet ? <Redirect to={`/RejeterDecla/${id}`}/> : null}
        {complement ? <Redirect to={`/DeclarationIncomplete/${id}`}/> : null}
        {reussi ? <Redirect to="/HomeResponsable"/> : null}
        {attacher ? <Redirect to={`/AttacherDeclaration/${id}`}/> :null}
        {completerRapport ? <Redirect to={`/RapportIncomplet/${idRapport}`}/> : null}
<div class="mt-5" style={{backgroundColor:'white'}}>
      <div class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm">
        <div class="row align-items-center">
        <MDBRow style={{marginTop:'10px', marginBottom:'40px'}}>
            <MDBCol>
              <select class="custom-select" onChange={e=>{setDeclaCateg(e.target.value)}}>
                      <option >Catégorie</option>
                      {catégories.map(cat => (
                          <option value={cat.id}>{cat.name}</option>
                      ))}
              </select>
            </MDBCol>
            <MDBCol>
              <select class="custom-select" onChange={e=>{setDeclaprio(e.target.value)}}>
                          <option>Priorité</option>
                          <option value="1">Urgent</option>
                          <option value="2">Etat critique</option>
                          <option value="3">Etat normal</option>
              </select>
            </MDBCol>
          </MDBRow>
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
              catégories.filter(cat => cat.id === catégorie).map(
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
                <button onClick={()=>{setAttacher(true)}} class="btn btn-dark" style={{width:'280px',margin:'5px'}}>Attacher Déclaration</button>
              </li>
              <li>
                <button onClick={enregistrerModification} class="btn btn-dark" style={{width:'280px',margin:'5px'}}>Sauvegarder Modifications</button>
              </li>
              <li>
                <button onClick={demanderComplement} class="btn btn-dark" style={{width:'280px',margin:'5px'}}>Demander Complément</button>
              </li>
              <li>
               <button onClick={validerDeclaration} class="btn btn-dark" style={{width:'280px',margin:'5px'}}>Valider</button>
              </li>
              <li>
                <button onClick={supp} class="btn btn-dark" style={{width:'280px',margin:'5px'}}>Rejeter</button>
              </li>
            </ul>
          </div>
          <br></br> <br></br>          
        </div>
        
          {
            rapport.filter(item => item.declaration == id).map(item => (
              <>
                <h5 style={{marginTop:'5%'}}>Rapport associé :</h5>
              
                <div class="card" style={{width: "450px",marginLeft:'0%'}}>
                  <img class="card-img-top" src={item.image} alt="Image" style={{borderRadius:'8px'}}/>
                  <div class="card-body">
                    <h5 class="card-title">{item.title}</h5>
                    <p class="card-text">{item.desc}</p>
                    <MDBRow>
                  <MDBCol>
                    { item.status === "publié" ? <a href="#" class="btn btn-dark" style={{width:"200px",height:'60px'}} onClick={(e)=>{ validerRapport(item.id,item.title,item.desc,item.service,item.declaration,e)}}>Valider</a> : null}
                  </MDBCol>
                  <MDBCol >
                    { item.status === "publié" ? <a href="" class="btn btn-dark" style={{width:"200"}} onClick={()=>CompleterRapport(item.id)}>demander complément</a> : null}
                  </MDBCol>
                  
                </MDBRow>
                  </div>
              </div>
              </>
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
                            <a href="" class="btn btn-dark" style={{width:"300px",marginLeft:"70%",marginTop:"20px",marginBottom:"20px"}} onClick={()=>Dettacher()}>Dettacher</a>
                            {MyData.filter(decla=>decla.parent_declaration == id).map(dec => (
                                                           <Card.Body className='px-0 py-2'  onClick={()=>{detail(dec.id)}}>       
                                                           <Table responsive hover>
                                                               <tbody>
                                                               <tr className="unread" class="candidates-list">
                                                                    <td>
                                                                      <input class="form-check-input" type="checkbox" onChange={()=>{ajouterSupprimer(dec)}} />
                                                                    </td>
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
      </div>



      </div>
</div>
    
    </>
  )
}