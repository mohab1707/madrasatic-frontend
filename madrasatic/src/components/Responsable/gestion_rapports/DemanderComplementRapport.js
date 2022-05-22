import { useEffect, useState } from "react";
import { Redirect, useParams  } from "react-router-dom"
export const DemanderComplementRapport= () => {
        const {idRapport}=useParams();
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
                    return response.json();
                })
                .then((data) => {
                    setIdResponsable(data.id);
                });
        },[])
        const demandercomplement=((e)=>{
            e.preventDefault(); 
            fetch(`http://127.0.0.1:8000/madrasatic/report_complement_demand/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization":`Token ${token}`
                },
                body: JSON.stringify({responsable:idResponsable , report:idRapport,description:raison }), 
                }).then((response) => {
                    if (response.ok) {
                        setPageAcceuil(true);
                    } 
                    return response.json();
                }).then((data)=>{
                    setErrorReason(data.description);
                })
    })
    return(

        <div className="card">
            {
                pageAcceuil? <Redirect to ="/HomeResponsable"></Redirect> : null
            }
            <div className="email">
                    <label><b>Déscription de ce qui manque pour le rapport:</b></label>
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