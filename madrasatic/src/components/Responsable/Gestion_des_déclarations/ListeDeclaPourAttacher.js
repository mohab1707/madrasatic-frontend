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
    const {idparent}=useParams();
    const [categorie,setCategorie]=useState("");
    const [etat,setEtat]=useState();
    const [priorité,setPriorité]=useState("");
    const [envoyer,setEnvoyer]=useState(false);
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState();
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Token ${token}`
          },
        }).then((response) => {
            if (response.ok){
                    console.log("decla du service recuuup")
            }else{
                console.log("y'a une erreeeuuur")
            }
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
    const putData = (dec)=>{
      setEnvoyer(true)
      fetch(`http://localhost:8000/madrasatic/responsable_declarations/${dec.id}/`, {
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
              async function getCategorie(){
                  fetch(`http://localhost:8000/madrasatic/responsable_declarations/${dec.id}/`, {
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
              }
                getCategorie()
                async function putParent(){

                
                fetch(`http://localhost:8000/madrasatic/responsable_declarations/${dec.id}/`, {
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
                        <button onClick={attacher} style={{width:'100px'}}>confirmer</button>
                            <Card.Title as='h2' style={{
                                  fontSize: '25px',
                                  marginTop: '30px',
                                  padding: '2%',
                                  marginBottom: '30px',
                                  backgroundColor: '#1f2833',
                                  color: 'white',
                                  textAlign: 'center'
                                  }}>Liste Des Déclarations</Card.Title>
                            <table>
                                <tr>
                                    <td>
                                        {/* <br></br> */}
                                        <p>Etat : </p>
                                    </td>
                                    <td>
                                        <select onChange={(e)=>{afficher(e.target.value)}}>
                                            <option value='tout'>Toutes</option>
                                            <option value='publiée'>Etat: publiée</option>
                                            <option value='incompléte'>Etat: incompléte</option>
                                            {/* <option value='rejetée'>Etat: rejetée</option> */}
                                            <option value='non traitée'>Etat: non traitée</option>
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
                        {MyData.filter(decla=>decla.parent_declaration === null).filter(decla=>decla.id != idparent).map(dec => (
                        <Card.Body className='px-0 py-2'>      
                            <Table responsive hover>
                                <tbody>
                                <tr className="unread">
                                    <td><input  type="checkbox" onChange={()=>{ajouterSupprimer(dec)}}/></td>
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
    
    );
}



