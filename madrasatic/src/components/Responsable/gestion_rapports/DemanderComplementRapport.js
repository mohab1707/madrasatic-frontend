import { useEffect, useState } from "react";
import { Redirect, useParams  } from "react-router-dom"
export const DemanderComplementRapport= () => {
        const {idRapport}=useParams();
        const token = sessionStorage.getItem("key");
        const [idResponsable,setIdResponsable]=useState();
        const [raison,setRaison]=useState("");
        const [pageAcceuil,setPageAcceuil]=useState(false);
        const [erreurReason,setErrorReason]=useState("");
        const [title,setTitle]=useState("");
        const [desc,setDesc]=useState("");
        const [service,setService]=useState("");
        const [declaration,setDeclaration]=useState("");
        const path=sessionStorage.getItem("path");
        useEffect(()=>{
            fetch(path+"madrasatic/user/", {
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
                fetch(path+"madrasatic/reports/"+idRapport+"/", {
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
                    setService(data.service)
                    setTitle(data.title);
                    setDesc(data.desc);
                    setDeclaration(data.declaration);
                });
        },[])
        const demandercomplement=((e)=>{
            e.preventDefault(); 
            fetch(path+`madrasatic/reports/${idRapport}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({title:title,desc:desc,service:service,declaration:declaration,status:'incomplet'}),
            })
            fetch(path+`madrasatic/report_complement_demand/`, {
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

        <div className="card" style={{backgroundColor:'#e8e8e8',borderRadius:'17px'}}>
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