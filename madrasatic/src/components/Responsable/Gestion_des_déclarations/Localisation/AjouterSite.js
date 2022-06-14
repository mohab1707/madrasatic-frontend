import {useState } from 'react'
import { Redirect } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
// import './Declaration.css'
export const AjouterSite =()=>{
    const [objet,setObjet]=useState("");
    const [reussi , setReussi ] = useState(false);
    const token = sessionStorage.getItem("key");
    const saveBloc=((e)=>{
      e.preventDefault(); 
      fetch("http://localhost:8000/madrasatic/sites/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
      body:JSON.stringify({site:objet})
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
      <h2>L'ajout d'un site</h2>
      <hr style={{border: '2px solid #b78429'}}/>
      <form >
        <label>Nom du site :</label>
        <input 
          type="text" 
          required 
          placeholder='Nom du site'
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