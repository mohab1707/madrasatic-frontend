import { Link } from "react-router-dom";
import './Declaration.css'
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Table} from 'react-bootstrap';
import { Categories } from "../Catégories/Catégories";
import { useState } from "react";
export const AfficherDeclaration= ( {declaration}) => {
    const [nomCategorie,setNomCategorie]=useState("");
    const token = sessionStorage.getItem("key");
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
    return (
        <div >
          <Col md={10} xl={10} style={{marginTop:'5%'}}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h3'>Liste des déclarations</Card.Title>
                            </Card.Header>
                            {declaration.filter(decla=>decla.parent_declaration === null).map(dec => (
                            <Card.Body className='px-0 py-2'  onClick={()=>{console.log("j'ai cliqué sur +" + dec.id)}}>
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