import { Link } from "react-router-dom";
import './Declaration.css'
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Table} from 'react-bootstrap';
export const AfficherDeclaration= ( {declaration}) => {
    return (
        <div >
      
          {/* // <div className="blog-preview" >
          //   <Link to="/HomePage">
          //     <h2>Objet :{dec.objet}</h2>
          //     <p>Catégorie :{dec.catégorie}</p>
          //     <p>priorité :{dec.priorité}</p>
          //   </Link>
          // </div> */}
          <Col md={10} xl={10} style={{marginTop:'5%'}}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h3'>Liste des déclarations</Card.Title>
                            </Card.Header>
                            {declaration.map(dec => (
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