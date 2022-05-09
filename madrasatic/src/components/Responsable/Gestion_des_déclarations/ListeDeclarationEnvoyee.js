import {MDBContainer,MDBRow,MDBCol,MDBCheckbox} from 'mdb-react-ui-kit';
import React, { useReducer, useState,useEffect }  from 'react';
import DeclarationEnvoyee from './DeclarationEnvoyee';
import './blogdeclaration.css';
import { Link, Redirect } from 'react-router-dom';
import {Col, Card,Table} from 'react-bootstrap';

export const ListeDeclarationEnvoyee = ( {MyData}) => {
    const [Consulter,setConsulter]=useState(false);
    const token = sessionStorage.getItem("key");
    const[data,setMyData]=useState(MyData);
    const [id,setId]=useState();
    const detail=((id)=>{
        setId(id);
        setConsulter(true);
        
    })
    const afficher=(val)=>{
        if (val === 'publiée') {
            fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/?etat=publiée", {
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
            setMyData(data.results);
            console.log(MyData);
          });
        }else if(val === 'non traitée'){
            fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/?etat=non traitée", {
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
            setMyData(data.results);
            console.log(MyData);
          });
        }
        else if(val === 'tout'){
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
            console.log(data.results);
            setMyData(data.results);
            console.log(MyData);
          });
        }
        else if(val === 'incompléte'){
            fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/?etat=incompléte", {
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
            setMyData(data.results);
            console.log(MyData);
          });
        }
        else if(val === '1'){
            fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/?priorité=1", {
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
            setMyData(data.results);
            console.log(MyData);
          });
        }
        else if(val === '2'){
            fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/?priorité=2", {
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
            setMyData(data.results);
            console.log(MyData);
          });
        }
        else if(val === '3'){
            fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/?priorité=3", {
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
            setMyData(data.results);
            console.log(MyData);
          });
        }
    }
    return (
        <div >
            {Consulter ? <Redirect to={`/DeclarationEnvoyer/${id}`}/> : null}
          <Col md={10} xl={12} style={{marginTop:'5%'}}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h3'>Liste des déclarations</Card.Title>
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
                            {data.map(dec => (
                            <Card.Body className='px-0 py-2'  onClick={()=>{detail(dec.id)}}>       
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
                    </Col>
      
  </div>
    );

}