import { useEffect, useState } from "react";
import { Redirect, useParams  } from "react-router-dom"
export const DemanderComplement= () => {
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
        const demandercomplement=((e)=>{
            e.preventDefault(); 
            console.log("id decla"+id +" idresponsable +" + idResponsable);
            fetch(`http://127.0.0.1:8000/madrasatic/declaration_complement_demand/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization":`Token ${token}`
                },
                body: JSON.stringify({responsable:idResponsable ,description:raison ,  declaration:id}), 
                }).then((response) => {
                    if (response.ok) {
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
                    <label><b>Déscription de ce qui manque pour la déclaration :</b></label>
                    <br></br>
                    <textarea
                        placeholder='Description'
                        value={raison}
                        onChange={e=>setRaison(e.target.value)}
                        style={{marginLeft:'10%', width:'50%',marginBottom:'3%',marginTop:'3%'}}
                    ></textarea>
                    {erreurReason ? <p style={{color: 'red',marginLeft:'10%'} }>{erreurReason}</p> : null}
            </div>
            <button onClick={demandercomplement}>Confirmer</button>
            <br></br> <br></br>
        </div>
    );
}