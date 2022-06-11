import {MDBContainer,MDBRow,MDBCol,} from 'mdb-react-ui-kit';
import React, { useReducer, useState,useEffect }  from 'react';
import { MDBRadio } from 'mdb-react-ui-kit';
import './user.css'
import ReactPaginate from "react-paginate";
const UserList = () => {
    const [role,setRole]=useState("role");
    const [is_active,setIs_active]=useState("is_active");
    const [recherche,setRecherche]=useState();
    const [nombre,setNombre]=useState("");
    const [nombrePages,setNombresPages]=useState("");
    const token = sessionStorage.getItem("key");
    const [pageCourrente,setPageCourrente]=useState(0);
    const [RechercheFaite, setRechercheFaite]=useState(false);
    const [filtrage,setFiltrage]=useState(false);
    const[MyData,setMyData]=useState([]);
      useEffect(() => {
        if(RechercheFaite == true){
          fetch(`http://127.0.0.1:8000/madrasatic/manageusers/?search=${recherche}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization":`Token ${token}`
            },
          }).then((response) => {
              return response.json();
              console.log(recherche);
            })
            .then((data) => {
              setMyData(data.results);
              setNombre(data.count);
              setNombresPages(Math.ceil(data.count /5));
            });
        }else{
          if(filtrage == false){
          if(pageCourrente == 0){
        fetch("http://127.0.0.1:8000/madrasatic/manageusers/", {
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
          });}else{
            fetch(`http://127.0.0.1:8000/madrasatic/manageusers/?page=${pageCourrente +1}`, {
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
          }}else{
          
          }
        }
      }, [MyData]);
    const sauvegarde=(id,userRole,user_is_active,e)=>{
        e.preventDefault();
          console.log("rooole : "+role + " is_active : "+is_active);
                if(role ==="role"){
                    setRole(userRole);
                  }
                  if(is_active ==="is_active"){
                    setIs_active(user_is_active);
                  }
                  console.log("user role"+ userRole);
              console.log("rooole : "+role + " is_active : "+is_active);
              if(role === "role" && is_active !=="is_active"){
                console.log("haja1");
                fetch(`http://127.0.0.1:8000/madrasatic/manageusers/${id}/`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json",'Accept': 'application/json',"Authorization":`Token ${token}`}, 
                  body: JSON.stringify({is_active:is_active,role:userRole})
                  }).then((response) => {
                      return response.json();
                  }).then(()=>{
                    setIs_active("is_active");
                    setRole("role");
                    console.log("coool ca marche")
                    setMyData([]);
                  })
              }else if(role !=="role" && is_active !== "is_active"){
                console.log("haja2");
                fetch(`http://127.0.0.1:8000/madrasatic/manageusers/${id}/`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json",'Accept': 'application/json',"Authorization":`Token ${token}`}, 
                  body: JSON.stringify({is_active:is_active,role:role})
                  }).then((response) => {
                      return response.json();
                  }).then(()=>{
                    setIs_active("is_active");
                    setRole("role");
                    console.log("coool ca marche")
                    setMyData([]);
                  })
              }else if(is_active==="is_active" && role!=="role"){
                console.log("haja3");
                fetch(`http://127.0.0.1:8000/madrasatic/manageusers/${id}/`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json",'Accept': 'application/json',"Authorization":`Token ${token}`}, 
                  body: JSON.stringify({role:role,is_active:user_is_active})
                  }).then((response) => {
                      return response.json();
                  }).then(()=>{
                    setIs_active("is_active");
                    setRole("role");
                    console.log("coool ca marche")
                    setMyData([]);
                  })
              } 
    }
    const ChangePage=((data)=>{
        setPageCourrente(data.selected);
      })
      const Rechercher=(e)=>{
        e.preventDefault();
        setFiltrage(false);
        setRechercheFaite(true);
        setMyData([]);
      }
      const afficher=(val)=>{
        if(val === 'tout'){
          fetch("http://127.0.0.1:8000/madrasatic/manageusers/", {
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
          setRechercheFaite(false);
          setFiltrage(true);
          setMyData(data.results);
        });
      }else if(val === 'Responsable' || val=== 'Admin' || val ==='Service' || val === 'Utilisateur'){
          fetch(`http://127.0.0.1:8000/madrasatic/manageusers/?role=${val}`, {
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
          setRechercheFaite(false);
          setFiltrage(true);
          setMyData(data.results);
        });
      }else{
          fetch(`http://127.0.0.1:8000/madrasatic/manageusers/?is_active=${val}`, {
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
          setRechercheFaite(false);
          setFiltrage(true);
          setMyData(data.results);
        });
      }
      }
    return (
        <MDBContainer className='users'>
          <div class="row">
                <div class="col-lg-10 mx-auto">
                    <div class="career-search mb-60">

                        <form action="#" class="career-form mb-60">
                            <div class="row">
                                <div class="col-md-6 col-lg-3 my-3">
                                    <div class="input-group position-relative">
                                        <input type="text" class="form-control" placeholder="Recherche" id="keywords" 
                                        value={recherche}
                                        onChange={e=>setRecherche(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 my-3">
                                    <div class="select-container">
                                        <select class="custom-select" onChange={(e)=>{afficher(e.target.value)}}>
                                                <option value='tout'>Tous les roles</option>
                                                <option value='Admin'>Admin</option>
                                                <option value='Responsable'>Responsable</option>
                                                <option value='Service'>Service</option>
                                                <option value='Utilisateur'>Utilisateurs</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 my-3">
                                    <div class="select-container" onChange={(e)=>{afficher(e.target.value)}}>
                                        <select class="custom-select">
                                            <option selected="tout">Tous les comptes</option>
                                            <option value="true">Activé</option>
                                            <option value="false">Désactivé</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 my-3">
                                    <button type="button" class="btn btn-lg btn-block btn-light btn-custom" id="contact-submit" onClick={(e)=>{Rechercher(e)}}>
                                        Rechercher
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    </div>
            {MyData.map(user =>(
                <MDBRow className='user' key={user.id}>
                    {
                        sessionStorage.setItem("role",user.role)
                    }
                    {
                        sessionStorage.setItem("is_active",user.is_active)
                    }
                    <MDBCol md='1'>{user.id}</MDBCol>
                    <MDBCol md='2'>{user.username}</MDBCol>
                    <MDBCol md='2'>{user.email}</MDBCol>
                    <MDBCol md='1'>{user.role}</MDBCol>
                   {user.is_active ? <MDBCol md='1'>Activé</MDBCol> : <MDBCol md='1'>Desactivé</MDBCol>}
                    <MDBCol md='2'>
                        <select class="form-select" onChange={e=>{setRole(e.target.value); console.log("roole"+role)}}>
                            <option value='role'>Role</option>
                            <option value='Utilisateur'>Utilisateur</option>
                            <option value='Admin'>Admin</option>
                            <option value='Responsable'>Responsable</option>
                            <option value='Service'>Service</option>
                        </select>
                        {/* <Select ></Select> */}

                    </MDBCol>
                    <MDBCol md='2'>
                        <MDBRadio name='flexRadioDefault' id='1' value='Activer' label='Activer' onChange={(e)=>{setIs_active(true)}}/>
                        <MDBRadio name='flexRadioDefault' id='2' label='Désacttiver' value='Désactiver' onChange={(e)=>{setIs_active(false)}}/>
                    </MDBCol>
                    <MDBCol md='1'>
                    <button onClick={(e)=>sauvegarde(user.id,user.role,user.is_active,e)}>sauvegarder</button>

                    </MDBCol>
                </MDBRow>
            ) )}
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

    );

}
export default UserList;