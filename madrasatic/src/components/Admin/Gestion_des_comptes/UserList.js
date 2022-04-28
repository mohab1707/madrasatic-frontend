import {MDBContainer,MDBRow,MDBCol,} from 'mdb-react-ui-kit';
import React, { useState }  from 'react';
import { MDBRadio } from 'mdb-react-ui-kit';
import Select from 'react-select';
const UserList = ( {MyData}) => {
    const options = [
        { value: 'Admin', label: 'Administrateur' },
        { value: 'Responsable', label: 'Responsable' },
        { value: 'Chef Service', label: 'Chef Service' },
        // { value: 'Autres', label: 'Autres' }
      ]
    const [ActiveDesactive,setActiveDesactive]=useState();
    const [role,setRole]=useState();
    const [is_active,setIs_active]=useState();
    const token=sessionStorage.getItem("key");
    const changeActive=(e=>{
      e.preventDefault();
      setActiveDesactive(e.target.value);
      console.log("is active ou desactive + "+ActiveDesactive);
      if(ActiveDesactive == 'Activer')
      {
        setIs_active(true);
        console.log("activeeer");
      }
      else if(ActiveDesactive == 'Désactiver')
      {
        setIs_active(false);
        console.log("desactiiiiveeer"+is_active);
      }    
    })

    const changeRole=(e=>{
        console.log("rooole + "+e.target.value);
        setRole(e.target.value);
    })

    const sauvegarde=(id)=>{
        console.log('id+ '+id);
        const token = sessionStorage.getItem("key");
        // const id = id;
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
            });          
            }
    return (
        <MDBContainer>
            {MyData.map(user =>(
                <MDBRow >
                    {console.log(user.id)}
                    <MDBCol>{user.id}</MDBCol>
                    <MDBCol>{user.username}</MDBCol>
                    <MDBCol>{user.email}</MDBCol>
                    <MDBCol>{user.role}</MDBCol>
                   {user.is_active ? <MDBCol>Activé</MDBCol> : <MDBCol>Desactivé</MDBCol>}
                    <MDBCol>
                        <select value={role} onChange={e=>{setRole(e.target.value)}}>
                            <option>Utilisateur</option>
                            <option>Admin</option>
                        </select>

                    </MDBCol>
                    <MDBCol>
                        {/* <p>activer/desactiverbutton</p> */}
                        <MDBRadio name='flexRadioDefault' id='1' value='Activer' label='Activer' onChange={(e)=>{changeActive(e)}}/>
                        <MDBRadio name='flexRadioDefault' id='2' label='Désactiver' value='Désactiver' onChange={(e)=>{changeActive(e)}}/>

                    </MDBCol>
                    <MDBCol>
                    <button onClick={()=>sauvegarde(user.id)}>sauvegarder</button>

                    </MDBCol>
                </MDBRow>
            ) )}

        </MDBContainer>

    );

}
export default UserList;