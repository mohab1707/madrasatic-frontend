import { useEffect, useState } from 'react';
import { MdYoutubeSearchedFor } from 'react-icons/md';
import { Link } from "react-router-dom";
import { AfficherDeclaration } from './AfficherDeclaration';
import './Declaration.css'
export const Declaration =()=>{
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState(null);
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/declarationslist/", {
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
            console.log(data.results);
            setMyData(data.results);
            console.log(MyData);
          });
    },[])
    return(
    <div className="blog-list">
        <h2 style={{textAlign:'center'}}>Liste des déclarations</h2>
        {MyData && <AfficherDeclaration declaration={MyData}/>}
  </div>
    )
}