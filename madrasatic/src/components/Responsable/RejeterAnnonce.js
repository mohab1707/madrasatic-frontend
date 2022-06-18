import { useEffect, useState } from "react";
import { Redirect, useParams  } from "react-router-dom"
export const RejeterAnnonce= () => {
        const {id}=useParams();
        const token = sessionStorage.getItem("key");
        const [idResponsable,setIdResponsable]=useState();
        const [raison,setRaison]=useState("");
        const [pageAcceuil,setPageAcceuil]=useState(false);
        const [erreurReason,setErrorReason]=useState("");
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
        },[])
        const RejeterAnnonce=((e)=>{
            e.preventDefault(); 
            fetch(path+`madrasatic/annonce_rejection/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization":`Token ${token}`
                },
                body: JSON.stringify({responsable:idResponsable ,raison:raison ,  annonce:id}), 
                }).then((response) => {
                    if (response.ok) {
                        setPageAcceuil(true);
                    } else {
                    console.log("y'a une erreur");
                    }
                    return response.json();
                }).then((data)=>{
                    setErrorReason(data.reason);
                })
    })
    return(

        <div className="card" style={{backgroundColor:'white',borderRadius:'17px',width:'700px',marginLeft:'200px'}}>
            {
                pageAcceuil? <Redirect to ="/HomeResponsable"></Redirect> : null
            }
            <div className="email">
                    <label><b>La raison du rejet</b></label>
                    <br></br>
                    <textarea
                        placeholder='Raison'
                        value={raison}
                        onChange={e=>setRaison(e.target.value)}
                        style={{marginLeft:'10%', width:'50%',marginBottom:'3%',marginTop:'3%'}}
                    ></textarea>
                    {erreurReason ? <p style={{color: 'red',marginLeft:'10%'} }>{erreurReason}</p> : null}
            </div>
            <br></br>
            <button onClick={RejeterAnnonce} style={{marginLeft:'325px'}}>Confirmer</button>
            <br></br> <br></br><br></br> <br></br><br></br> 
        </div>
    );
}