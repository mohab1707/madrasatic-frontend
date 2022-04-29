import { useState } from 'react';
import { Link } from "react-router-dom";
import './Declaration.css'
export const Declaration =()=>{
    const [declaration,setDeclaration]=useState(
        [
        {nomU:"utilisateur1",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Santé"},
        {nomU:"utilisateur2",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Hygiène"},
        {nomU:"utilisateur3",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Objet perdu"},
        {nomU:"utilisateur4",email:"p.nom@esi-sba.dz",nomD:"intitulé de la déclaration",catg:"Sécurité"},
        ]);
    return(
    <div className="blog-list">
        <h2 style={{textAlign:'center'}}>Liste des déclarations</h2>
    {declaration.map(blog => (
      <div className="blog-preview" >
        <Link to="">
          <h2>Intitulé :{ blog.nomD }</h2>
          <p>Utilisateur :{ blog.email}</p>
          {/* <p>Catégorie :{ blog.catg }</p> */}
        </Link>
      </div>
    ))}
  </div>
    )
}