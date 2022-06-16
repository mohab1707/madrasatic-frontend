import { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Table} from 'react-bootstrap';
import './Declaration.css'
import { MDBContainer } from 'mdb-react-ui-kit';
import {AiOutlineDelete} from "react-icons/ai"
import ReactPaginate from "react-paginate";
export const MesDeclarationsEnregistrées =()=>{
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState([]);
    const [completer,setCompleter]=useState(false);
    const [idDeclaration,setIdDeclaration]=useState();
    const [catégories,setCatégories]=useState ([]);
    const [nombre,setNombre]=useState();
    const [nombrePages,setNombresPages]=useState();
    const [pageCourrente,setPageCourrente]=useState(0);
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/saveddeclarationslist/", {
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
    },[]);
    useEffect(()=>{
      if (pageCourrente==0){
        fetch("http://127.0.0.1:8000/madrasatic/saveddeclarationslist/", {
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
      }else{
        fetch(`http://127.0.0.1:8000/madrasatic/saveddeclarationslist/?page=${pageCourrente + 1}`, {
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
            if (MyData.length == 0){
              setPageCourrente(0);
            }
          
          });
      }    
},[MyData]);
    const complet =(e)=>{
      setIdDeclaration(e);
      setCompleter(true);
    }
    const ChangePage=((data)=>{
      setPageCourrente(data.selected);
    });
    const supprimerDeclaration=((e,idDeclaration)=>{
      e.preventDefault(); 
        fetch(`http://localhost:8000/madrasatic/declarationdelete/${idDeclaration}/`, {
      method: "DELETE",
      headers: {
        "Authorization":`Token ${token}`
      },
    }).then((response)=>{
      return response.json();
    })});
    return(
    <MDBContainer >
        {/* <h2 style={{textAlign:'center'}}>Liste des déclarations Enregistrées </h2> */}
        {/* {MyData && <AfficherDeclaration declaration={MyData}/>} */}
        {completer ? <Redirect to={`/ModifierDeclarationEnregistrée/${idDeclaration}`}/> :null}
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
                                  }}>Mes déclarations enregistrées</Card.Title>
                            </Card.Header>
                            {MyData.map(dec => (
                            <Card.Body className='px-0 py-2' >
                            <Table responsive hover>
                                <tbody>
                                <tr className="unread" class="candidates-list" >
                                    <td class="title" onClick={(e)=>complet(dec.id)}><img  style={{width :'200px',borderRadius:'8px'}} src={dec.image} alt="Image du signalement"/></td>
                                    <td style={{width:'400px'}} onClick={(e)=>complet(dec.id)}>
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
                                    <td style={{width :'300px'}} onClick={(e)=>complet(dec.id)}>
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
                                    <td>
                                    <div style={{
                                            position: "relative",
                                            // left:"25%",
                                            fontSize:"25px",
                                            // right:"10%",
                                            marginBotton: "25%",
                                            padding: "0% 0%",
                                            color: "red",
                                        }} onClick={(e)=>{supprimerDeclaration(e,dec.id)}}>
                                            <AiOutlineDelete />
                                        </div>
                                    </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Card.Body>
                              ))} 
                        </Card>
                    </Col>
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
  </MDBContainer>
    )
}