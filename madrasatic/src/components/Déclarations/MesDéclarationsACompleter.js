import { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import './Declaration.css'
import {Col, Card,Table} from 'react-bootstrap';
import { MDBContainer } from 'mdb-react-ui-kit';
export const MesDéclarationCompleter =()=>{
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState([]);
    const [completer,setCompleter]=useState(false);
    const [catégories,setCatégories]=useState ([]);
    const [id, setId] = useState();
    const [idDeclaration,setIdDeclaration]=useState();
    useEffect(()=>{
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
      fetch("http://127.0.0.1:8000/madrasatic/user/", {
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
        setId(data.id);
      });
      fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/?etat=incompléte", {
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
    },[])
    const complet =(e)=>{
      setIdDeclaration(e);
      setCompleter(true);
    }
    return(
    <MDBContainer >
        {completer ? <Redirect to={`/CompleterDeclaration/${idDeclaration}`}/> :null}
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
                                  }}>Mes déclarations incomplètes</Card.Title>
                            </Card.Header>
                            {MyData.filter(declaration=>declaration.auteur === id).map(dec => (
                            // <Card.Body className='px-0 py-2'  onClick={(e)=>complet(dec.id)}>
                            //     <Table responsive hover>
                            //         <tbody>
                            //         <tr className="unread">
                            //             <td><img  style={{width: '150px'}} src={dec.image} alt="activity-user"/></td>
                            //             <td>
                            //                 <h6 className="mb-1">Objet :{dec.objet}</h6>
                            //                 <p className="m-0">Etat :{dec.etat}</p>
                            //             </td>
                            //             <td>
                            //                 <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>Catégorie :{dec.catégorie}</h6>
                            //                 <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>Priorité :{dec.priorité}</h6>
                            //             </td>
                            //             {/* <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td> */}
                            //         </tr>
                            //       </tbody>
                            //     </Table>
                            //   </Card.Body>

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
                                      </tr>
                                    </tbody>
                                  </Table>
                                </Card.Body>
                              ))} 
                        </Card>
                    </Col>
  </MDBContainer>
    )
}