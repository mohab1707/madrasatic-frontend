import React, { useState } from 'react';
import { MDBRadio } from 'mdb-react-ui-kit';

export const ActiverDesactiver = () => {
  const [ActiveDesactive,setActiveDesactive]=useState();
  const token=sessionStorage.getItem("key");
  const changeActive=(e=>{
    e.preventDefault();
    // setActiveDesactive(e.target.value);
    // console.log("is active ou desactive + "+ActiveDesactive);
    // if(ActiveDesactive == 'Activer')
    // {
    //   setIs_active(true);
    //   console.log("activeeer");
    // }
    // else if(ActiveDesactive == 'Désactiver')
    // {
    //   setIs_active(false);
    //   console.log("desactiiiiveeer"+is_active);
    // }
    // fetch(`http://127.0.0.1:8000/madrasatic/manageusers/${id}/`, {
    // method: "PUT",
    // headers: { "Content-Type": "application/json",'Accept': 'application/json',"Authorization":`Token ${token}`}, 
    // body: {is_active:is_active}
    // }).then((response) => {
    //     if(response.ok)
    //     {
    //         console.log("donnees envoyee");
    //     }else
    //     {
    //         console.log("y'a une erreur");
    //     }
    //     return response.json();
    // });          
  })
  return (
    <div>
    <MDBRadio name='flexRadioDefault' id='1' value='Activer' label='Activer' onChange={(e)=>{changeActive(e)}}/>
    <MDBRadio name='flexRadioDefault' id='2' label='Désactiver' value='Désactiver' onChange={(e)=>{changeActive(e)}}/>
  </div>
  )
}
