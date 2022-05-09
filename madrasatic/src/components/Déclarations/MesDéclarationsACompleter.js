import { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import './Declaration.css'
import {Col, Card,Table} from 'react-bootstrap';
export const MesDéclarationCompleter =()=>{
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState([]);
    const [completer,setCompleter]=useState(false);
    const [id, setId] = useState();
    const [idDeclaration,setIdDeclaration]=useState();
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/user/", {
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
            if (response.ok) {
              console.log("donnees recup");
            } else {
              console.log("y'a une erreur");
            }
            return response.json();
          })
          .then((data) => {
            console.log("les decla rejetees")
            console.log(data.results);
            setMyData(data.results);
            console.log(MyData);
          });
    },[])
    const complet =(e)=>{
      setIdDeclaration(e);
      setCompleter(true);
    }
    return(
    <div >
        {/* <h2 style={{textAlign:'center'}}>Liste des déclarations</h2> */}
        {/* {MyData && <AfficherDeclaration declaration={MyData}/>} */}
        {completer ? <Redirect to={`/CompleterDeclaration/${idDeclaration}`}/> :null}
        <Col md={10} xl={10} style={{marginTop:'5%'}}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h3'>Liste des déclarations</Card.Title>
                            </Card.Header>
                            {MyData.filter(declaration=>declaration.auteur === id).map(dec => (
                            <Card.Body className='px-0 py-2'  onClick={(e)=>complet(dec.id)}>
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
    )
}