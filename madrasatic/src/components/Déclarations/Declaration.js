import { useEffect, useState } from 'react';
import { MdYoutubeSearchedFor } from 'react-icons/md';
import { Link } from "react-router-dom";
import { AfficherDeclaration } from './AfficherDeclaration';
import './Declaration.css'
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Table} from 'react-bootstrap';
export const Declaration =()=>{
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState(null);
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/declarationslist/", {
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
    },[])
    return(
    <div>
        {MyData && <AfficherDeclaration declaration={MyData}/>}
        {/* <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Hover Table</Card.Title>
                                <span className="d-block m-t-5">use props <code>hover</code> with <code>Table</code> component</span>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> */}                           
  </div>
    )
}