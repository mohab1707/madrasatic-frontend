import { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Table} from 'react-bootstrap';
import './Declaration.css'
import { MDBContainer } from 'mdb-react-ui-kit';
import ReactPaginate from "react-paginate";
export const AfficherRapports =()=>{
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState([]);
    const [completer,setCompleter]=useState(false);
    const [idRapport,setIdRapport]=useState();
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState();
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/reports/", {
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
    },[])
    const complet =(e)=>{
      setIdRapport(e);
      setCompleter(true);
    }
    const ChangePage=((data)=>{
        console.log(data.selected);
        setPageCourrente(data.selected+1);
        if(data.selected == 0){
          fetch("http://127.0.0.1:8000/madrasatic/reports/", {
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
          fetch(`http://127.0.0.1:8000/madrasatic/reports/?page=${data.selected + 1}`, {
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
    return(
    <MDBContainer >
        {completer ? <Redirect to={`/DetailRapport/${idRapport}`}/> :null}
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
                                  }}>Liste des rapports</Card.Title>
                            </Card.Header>
                            {MyData.map(rapport => (
                            <Card.Body className='px-0 py-2'  onClick={(e)=>complet(rapport.id)}>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td>
                                            <h2 >{rapport.title}</h2>
                                            <h6 className="text-muted">Déscription:{rapport.desc}</h6>
                                        </td>
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
    )
}