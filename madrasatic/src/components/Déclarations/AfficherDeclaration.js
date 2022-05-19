import { Link } from "react-router-dom";
import './Declaration.css'
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Table} from 'react-bootstrap';
import { Categories } from "../Catégories/Catégories";
import { useEffect, useState } from "react";
import {BsThreeDotsVertical} from "react-icons/bs"
import {
  MDBContainer,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBBtn
  } from 'mdb-react-ui-kit';
  import ReactPaginate from "react-paginate";
export const AfficherDeclaration= () => {
    const [nomCategorie,setNomCategorie]=useState("");
    const [confirmé,setConfirmé]=useState("");
    const [signalé,setSignalé]=useState("");
    const [nombre,setNombre]=useState("");
    const [nombrePages,setNombresPages]=useState("");
    const token = sessionStorage.getItem("key");
    const [pageCourrente,setPageCourrente]=useState(1);
    const[declaration,setMyData]=useState([]);
    useEffect(()=>{
      if (pageCourrente == 1){
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
            }else{
              fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/?page=${pageCourrente}`, {
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
    },[declaration]);
    const Categories=(cat)=>{
        fetch("http://127.0.0.1:8000/madrasatic/categories/"+cat+"/", {
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
        console.log(data.name);
        setNomCategorie(data.name);
      });
    }
    const confirmer=(id)=>{
        console.log("elle est confirmé par :" + confirmé);
        fetch(`http://localhost:8000/madrasatic/responsable_declarations/${id}/`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization":`Token ${token}`
          },
          body:JSON.stringify({confirmée_par:confirmé+1})
          }).then((response) => {
              if (response.ok) {
              console.log("confirmé modifier");
              } else {
              console.log("y'a une erreur");
              }
              return response.json();
          })
    }
    const recupdata=((id)=>{
      fetch(`http://localhost:8000/madrasatic/responsable_declarations/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Token ${token}`
        },
        }).then((response) => {
            if (response.ok) {
            console.log("signalé par et recup par récuperer");
            } else {
            console.log("y'a une erreur");
            }
            return response.json();
        }).then((data)=>{
          setSignalé(data.signalée_par);
          setConfirmé(data.confirmée_par);
        })
    })
    const signaler=(id,e)=>{
        e.preventDefault();
          console.log("elle est signalé par :",signalé)
            fetch(`http://localhost:8000/madrasatic/responsable_declarations/${id}/`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization":`Token ${token}`
              },
              body:JSON.stringify({signalée_par:signalé+1})
              }).then((response) => {
                  if (response.ok) {
                  console.log("signalé par  modifié");
                  } else {
                  console.log("y'a une erreur");
                  }
                  return response.json();
              })
        
    }
    const ChangePage=((data)=>{
      console.log(data.selected);
      setPageCourrente(data.selected+1);
      if(pageCourrente == 1){
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
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/?page=${pageCourrente}`, {
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
      <MDBContainer>
        <div >
          <Col md={10} xl={12} style={{marginTop:'7%'}}>
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
                                  }}>Liste Des Déclarations</Card.Title>
                            </Card.Header>
                            {declaration.filter(decla=>decla.parent_declaration === null).filter(decl=>decl.signalée_par < 3).map(dec => (
                            <Card.Body className='px-0 py-2'  onClick={()=>{recupdata(dec.id)}}>
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
                                        <br></br><br></br>
                                          <MDBDropdown>
                                       <MDBDropdownToggle tag='a' className='nav-link'style={{left:"90%",
                                              fontSize:"30px",
                                              padding: "0% 0%",color:'black'}}>                                          
                                      </MDBDropdownToggle >
                                     
                                  <MDBDropdownMenu>
                                      <MDBDropdownItem>
                                          <MDBDropdownLink onClick={(e)=>{confirmer(dec.id,e)}}>Confirmer</MDBDropdownLink>
                                      </MDBDropdownItem>
                                      <MDBDropdownItem>
                                          <MDBDropdownLink onClick={(e)=>{signaler(dec.id,e)}}>Signaler</MDBDropdownLink>
                                      </MDBDropdownItem>
                                      
                                    <MDBDropdownItem>
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                        </MDBDropdown>
                                       
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
      </MDBContainer>
        
    );
}