import { Link } from "react-router-dom";
import './Declaration.css'
import { Col, Card,Table} from 'react-bootstrap';
import { useEffect, useState } from "react";
import {FaThumbsUp,FaThumbsDown,FaCogs} from 'react-icons/fa'
import {
  MDBContainer,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  } from 'mdb-react-ui-kit';
  import ReactPaginate from "react-paginate";
export const AfficherDeclaration= () => {
    const [nomCategorie,setNomCategorie]=useState();
    const [confirmé,setConfirmé]=useState();
    const[listeConfirmé,setListeConfirmé]=useState([]);
    const [peutConfirmer,setPeutConfirmer]=useState(true);
    const [peutSignaler,setPeutSignaler]=useState(true);
    const [listeSignaler,setListeSignaler]=useState([]);
    const [changer,setChanger]=useState(false);
    const [signalé,setSignalé]=useState();
    const [nombre,setNombre]=useState();
    const [nombrePages,setNombresPages]=useState();
    const token = sessionStorage.getItem("key");
    const [pageCourrente,setPageCourrente]=useState(0);
    const [catégories,setCatégories]=useState ([]);
    const[declaration,setMyData]=useState([]);
    const [utilisateur,setUtilisateur]=useState("")
    useEffect(()=>{
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
            setUtilisateur(data.id);
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
            setCatégories(data.results);
          });
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
    },[]);
    useEffect(()=>{
      if (pageCourrente==0){
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
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/?page=${pageCourrente + 1}`, {
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
            if (declaration.length == 0){
              setPageCourrente(0);
            }
          
          });
      }    
},[declaration]);
    const confirmer=(id)=>{
              fetch(`http://localhost:8000/madrasatic/responsable_declarations/${id}/`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization":`Token ${token}`
              },
              body:JSON.stringify({confirmée_par:listeConfirmé})
              }).then((response)=>{
                if(response.ok){
                  console.log("liste changer")
                  setListeConfirmé([]);
                  setListeSignaler([]);
                }else{
                  console.log("erreur dans le fetch")
                }
                setPeutConfirmer(!peutConfirmer);
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
            setListeConfirmé(data.confirmée_par);
            setSignalé(data.signalée_par);
            if (data.confirmée_par.some(item=> item === utilisateur)){
              console.log("existe deja dans liste confirmé")
            }else{
              console.log("existe pas dans liste confirmé")
                setListeConfirmé(previousState =>(
                    [...previousState,utilisateur]
                ));
            }
            if (data.signalée_par.some(item=> item === utilisateur)){
              console.log("existe deja dans liste signalé")
            }else{
              console.log("existe pas dans liste signalé")
                setListeSignaler(previousState =>(
                    [...previousState,utilisateur]
                ));
            }
        })
    })
    const signaler=(id,e)=>{
        e.preventDefault();
            fetch(`http://localhost:8000/madrasatic/responsable_declarations/${id}/`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization":`Token ${token}`
              },
              body:JSON.stringify({signalée_par:listeSignaler})
              }).then((response) => {
                if(response.ok){
                  console.log("liste changer")
                  setListeConfirmé([]);
                  setListeSignaler([]);
                }else{
                  console.log("erreur dans le fetch")
                }
                setPeutConfirmer(!peutConfirmer);
              })
        
    }
    const ChangePage=((data)=>{
      setPageCourrente(data.selected);
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
                            {declaration.filter(decla=>decla.parent_declaration === null).filter(decl=>decl.signalée_par.length < 3).map(dec => (
                            <Card.Body className='px-0 py-2'  onClick={()=>{recupdata(dec.id)}}>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread" class="candidates-list">
                                        <td class="title"><img  style={{width :'200px',borderRadius:'8px'}} src={dec.image} alt="Image du signalement"/></td>
                                        <td style={{width:'400px'}}>
                                            <div class="candidate-list-details">
                                              <div class="candidate-list-info">
                                                <div class="candidate-list-title">
                                                  <h5 class="mb-0">{dec.objet}</h5>
                                                </div>
                                                <div class="candidate-list-option">
                                                  <ul class="list-unstyled">
                                                    <li><FaCogs style={{marginRight:'2px',marginBottom:'3px'}}/> {dec.etat}</li>
                                                    {
                                                      dec.confirmée_par.some(item => item === utilisateur) ? <li><FaThumbsUp  style={{marginRight:'2px',marginBottom:'6px'}}/>1</li> : <li><FaThumbsUp  style={{marginRight:'2px',marginBottom:'6px'}}/>0</li>
                                                    }
                                                    {
                                                      dec.signalée_par.some(item => item === utilisateur) ? <li><FaThumbsDown  style={{marginRight:'2px',marginTop:'4px'}}/>1</li> : <li><FaThumbsDown  style={{marginRight:'2px',marginTop:'4px'}}/>0</li>
                                                    }
                                                    
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                        </td>
                                        <td style={{width :'300px'}}>
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
                                         <td style={{width :'100px'}}>
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
                                            </MDBDropdownMenu>
                                          </MDBDropdown>
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
      
  </div>
      </MDBContainer>
        
    );
}