import { useEffect, useState } from "react";
import {MdEmail} from "react-icons/md"
import { Redirect, useParams  } from "react-router-dom"
export const DeclarationDelete= () => {
        const {id}=useParams();
        const token = sessionStorage.getItem("key");
        const [idResponsable,setIdResponsable]=useState();
        const [raison,setRaison]=useState("");
        const [pageAcceuil,setPageAcceuil]=useState(false);
        const [erreurReason,setErrorReason]=useState("");
        useEffect(()=>{
            fetch("http://127.0.0.1:8000/madrasatic/user/", {
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
                    setIdResponsable(data.id);
                });
        },[])
        const supprimerDeclaration=((e)=>{
            e.preventDefault(); 
            console.log("id decla"+id +" idresponsable +" + idResponsable);
        fetch(`http://127.0.0.1:8000/madrasatic/declaration_rejection/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({reason:raison , responsable:idResponsable , declaration:id}), 
            }).then((response) => {
                if (response.ok) {
                    console.log("déclaration supprimé");
                    setPageAcceuil(true);
                } else {
                console.log("y'a une erreur");
                }
                return response.json();
            }).then((data)=>{
                console.log(data);
                setErrorReason(data.reason);
            })
    })
    return(

        <div className="card">
            {
                pageAcceuil? <Redirect to ="/HomeResponsable"></Redirect> : null
            }
            <div className="email">
                    <label><b>La raison du rejet de la déclaration :</b></label>
                    <br></br>
                    <textarea
                        placeholder='Raison'
                        value={raison}
                        onChange={e=>setRaison(e.target.value)}
                        style={{marginLeft:'10%', width:'50%',marginBottom:'3%',marginTop:'3%'}}
                    ></textarea>
                    {erreurReason ? <p style={{color: 'red',marginLeft:'10%'} }>{erreurReason}</p> : null}
            </div>
            <button onClick={supprimerDeclaration}>Confirmer</button>
            <br></br> <br></br>
        </div>
    );
}