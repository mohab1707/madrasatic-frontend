import {MDBContainer,MDBRow,MDBCol,} from 'mdb-react-ui-kit';
import React, { useReducer, useState,useEffect }  from 'react';
import { MDBRadio } from 'mdb-react-ui-kit';
import './user.css'
import ReactPaginate from "react-paginate";
const UserList = () => {
    const [role,setRole]=useState(sessionStorage.getItem("role"));
    const [is_active,setIs_active]=useState(sessionStorage.getItem("is_active"));
    const [nombre,setNombre]=useState("");
    const [nombrePages,setNombresPages]=useState("");
    const token = sessionStorage.getItem("key");
    const [pageCourrente,setPageCourrente]=useState(1);
    const[MyData,setMyData]=useState([]);
      useEffect(() => {
        const pageCourrante=sessionStorage.getItem("pageCourrante");
          if(pageCourrante == 1){
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
            fetch(`http://127.0.0.1:8000/madrasatic/manageusers/?page=${pageCourrante}`, {
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
          }
      }, [MyData]);
    const sauvegarde=(id,e)=>{
        e.preventDefault();
        if((role == "('Utilisateur', 'User')"))
        {
            setRole('Utilisateur')
        };
         fetch(`http://127.0.0.1:8000/madrasatic/manageusers/${id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",'Accept': 'application/json',"Authorization":`Token ${token}`}, 
            body: JSON.stringify({is_active:is_active, is_banned:false,role:role})
            }).then((response) => {
                return response.json();
            })
    }
            const ChangePage=((data)=>{
                console.log(data.selected);
                setPageCourrente(data.selected+1);
                const pageCourrante = data.selected+1;
                sessionStorage.setItem("pageCourrante", pageCourrante);
                if(data.selected == 0){
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
                    });
                }else{
                  fetch(`http://127.0.0.1:8000/madrasatic/manageusers/?page=${data.selected + 1}`, {
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
    return (
        <MDBContainer className='users'>
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
                        <select onChange={e=>{setRole(e.target.value); console.log("roole"+role)}}>
                            <option value='Utilisateur'>Utilisateur</option>
                            <option value='Admin'>Admin</option>
                            <option value='Responsable'>Responsable</option>
                            <option value='Service'>Service</option>
                        </select>
                        {/* <Select ></Select> */}

                    </MDBCol>
                    <MDBCol md='2'>
                        <MDBRadio  name='flexRadioDefault' id='1' value='Activer' label='Activer' onChange={(e)=>{setIs_active(true)}}/>
                        <MDBRadio name='flexRadioDefault' id='2' label='Désacttiver' value='Désactiver' onChange={(e)=>{setIs_active(false)}}/>
                    </MDBCol>
                    <MDBCol md='1'>
                    <button onClick={(e)=>sauvegarde(user.id,e)}>sauvegarder</button>

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