import {useEffect, useState } from 'react'
import { Redirect } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
// import './Declaration.css'
export const AjouterBloc =()=>{
    const [objet,setObjet]=useState("");
    const [reussi , setReussi ] = useState(false);
    const token = sessionStorage.getItem("key");
    const [sites,setSites]=useState([]);
    const [site,setSite]=useState("");
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/sites/", {
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
          setSites(data.results);
        });
    },[]);
    const saveBloc=((e)=>{
      e.preventDefault(); 
      fetch("http://localhost:8000/madrasatic/blocs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
      body:JSON.stringify({blocc:objet,site:site})
    }).then((response)=>{
      if(response.ok)
      {
          console.log("ça marche!!");
          setReussi(true);
          
      }else
      {
          console.log("y'a une erreur");
      }
      return response.json();
    }).then((data)=>{
      console.log(data);
    })
    })
    return(
      <MDBContainer className='form'>
        <div className="create">
      {
            reussi? <Redirect to='/HomeResponsable' /> : null
      }
      <h2>L'ajout d'un bloc</h2>
      <hr style={{border: '2px solid #b78429'}}/>
      <form >
        <label>Le site associé:</label>
        <select onChange={e=>{setSite(e.target.value)}}>
          <option >Les sites</option>
          {sites.map(site => (
            <option value={site.id}>{site.site}</option>
            ))}
        </select>      
        <label>Nom du bloc :</label>
        <input 
          type="text" 
          required 
          placeholder='nom du bloc'
          value={objet}
          onChange={e=>setObjet(e.target.value)}
        />
        <button onClick={saveBloc} style={{marginLeft:'90%'}}>Enregistrer</button>
      </form>
      
    </div>
    <br></br><br></br>
      </MDBContainer>
    
    )
}