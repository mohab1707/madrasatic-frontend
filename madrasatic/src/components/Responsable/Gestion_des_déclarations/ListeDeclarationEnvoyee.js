import {MDBContainer,MDBRow,MDBCol,MDBCheckbox} from 'mdb-react-ui-kit';
import React, {useState,useEffect }  from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Col, Card,Table} from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import {FaThumbsUp,FaThumbsDown,FaCogs} from 'react-icons/fa'
import './list.css'
export const ListeDeclarationEnvoyee = () => {
    const [Consulter,setConsulter]=useState(false);
    const [recherche,setRecherche]=useState();
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState();
    const token = sessionStorage.getItem("key");
    const[data,setMyData]=useState([]);
    const [RechercheFaite, setRechercheFaite]=useState(false);
    const [filtrage,setFiltrage]=useState(false);
    const [catégories,setCatégories]=useState ([]);
    const [id,setId]=useState();
    const detail=((id)=>{
        setId(id);
        setConsulter(true);
        
    })
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
              console.log("response +"+data.results);
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
        
},[]);
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
    const Rechercher=(e)=>{
      e.preventDefault();
      setFiltrage(false);
      setRechercheFaite(true);
      setMyData([]);
    }
    return (
        <div className='responsables_declarations'>
            {Consulter ? <Redirect to={`/DeclarationEnvoyer/${id}`}/> : null}
          <Col md={10} xl={12} style={{marginTop:'5%'}}>
                        <Card className='Recent-Users' style={{
                          border: '2px solid #b78429',
                          borderRadius: '8px',
                          padding:'0',
                          marginTop: '5%',
                          backgroundColor: 'white'
                          }}>
                            <Card.Header>
                                <Card.Title as='h2' style={{
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
                            {data.filter(decla=>decla.parent_declaration === null).map(dec => (
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
                              {/* ///////////////////////////////////// */}
                             

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
    );

}