import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineDelete} from "react-icons/ai"
import { MDBContainer } from 'mdb-react-ui-kit';

export const Categories = () => {
    const [catégories,setCatégories]=useState ([]);
    const [reussi , setReussi ] = useState(false);
    const token = sessionStorage.getItem("key");
    function refreshPage() {
        window.location.reload(false);
      }
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/categories/", {
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
        setCatégories(data.results);
      });
    },[catégories]);
    const supprimerCatégorie=((id)=>{
        console.log("id de la cat est : "+id)
        fetch("http://127.0.0.1:8000/madrasatic/categories/"+id+"/", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization":`Token ${token}`
            },
          }).then((response) => {
              if (response.ok) {
                console.log("Categorie supprimer");
              } else {
                console.log("y'a une erreur");
              }
            })
    })
  return (
    <MDBContainer className='categories'>
       <h2 id='title'>Liste des catégories</h2>
       <hr style={{border: '2px solid #b78429'}}/>
      <div className="blog-list" style={{width:'55%',marginLeft:'20%'}}>
      {catégories.map(cat => (
        <div className="blog-categorie" key={cat.id} >
            <div style={{
                position: "absolute",
                left:"65%",
                fontSize:"25px",
                // right:"10%",
                marginTop: "0%",
                padding: "0% 0%",
                color: "red",
            }} onClick={()=>{supprimerCatégorie(cat.id)}}>
                <AiOutlineDelete />
            </div>
            <h2>{ cat.name }</h2>
            
        </div>
      ))}
    </div>
    </MDBContainer>
    
  );
}