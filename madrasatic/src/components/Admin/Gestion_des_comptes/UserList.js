import {MDBContainer,MDBRow,MDBCol,} from 'mdb-react-ui-kit';
import React, { useReducer, useState,useEffect }  from 'react';
import { MDBRadio } from 'mdb-react-ui-kit';
import './user.css'
const UserList = ( {MyData}) => {
    const [role,setRole]=useState(sessionStorage.getItem("role"));
    const [is_active,setIs_active]=useState(sessionStorage.getItem("is_active"));
    function refreshPage() {
        window.location.reload(false);
      }
    const sauvegarde=(id,e)=>{
        e.preventDefault();
        console.log('id+ '+id);
        console.log(role[2])
        const token = sessionStorage.getItem("key");
        if(role == "('Utilisateur', 'User')") 
        {
            setRole('Utilisateur')
        };
         fetch(`http://127.0.0.1:8000/madrasatic/manageusers/${id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",'Accept': 'application/json',"Authorization":`Token ${token}`}, 
            body: JSON.stringify({is_active:is_active, is_banned:false,role:role})
            }).then((response) => {
                if(response.ok)
                {
                    console.log("donnees envoyee");
                }else
                {
                    console.log("y'a une erreur");
                }
                return response.json();
            }).then((data)=>{
                console.log(data);
            }).then(()=>{
                refreshPage(); 
            });    
            }
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

        </MDBContainer>

    );

}
export default UserList;