import { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Table} from 'react-bootstrap';
import './Declaration.css'
import { MDBContainer } from 'mdb-react-ui-kit';
import ReactPaginate from "react-paginate";
import {BsCalendar2Date } from 'react-icons/bs'
import {BiTime} from 'react-icons/bi'
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
        {/* <Col md={10} xl={12} style={{marginTop:'5%'}}>
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
                    </Col> */}
                     <div class="container d-flex justify-content-center">

<ul class="list-group mt-5 text-white">
{MyData.map(rapport => (
  <li class="list-group-item d-flex justify-content-between align-content-center" onClick={(e)=>complet(rapport.id)}>
  
    <div class="d-flex flex-row" onClick={(e)=>complet(rapport.id)}>
      <img src="https://img.icons8.com/color/100/000000/folder-invoices.png" width="40" />
      <div class="ml-2">
        <h6 class="mb-0">{rapport.title}</h6>
        <div class="about">
          <span><BsCalendar2Date style={{width :'8%',marginBottom:'3px',marginRight:'2px'}}/>
            {rapport.created_on.substring(
                0,
                rapport.created_on.indexOf("T")
            )}
            </span>
          <span>
            <BiTime style={{width :'10%',marginBottom:'3px'}}/>
            {rapport.created_on.substring(
                rapport.created_on.indexOf("T") + 1,
                rapport.created_on.indexOf("T")+6
            )}</span>
        </div>
      </div>
    </div>

  </li>
  ))} 
  
</ul>

</div>
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