// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { MdSentimentSatisfied } from 'react-icons/md';
import { Redirect, useParams } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
import './Declaration.css'
export const ModifierRapportEnregistrée =()=>{
    const [objet,setObjet]=useState("");
    const [service,setService]=useState("");
    const [idDeclaration,setIdDeclaration]=useState("")
    const [corps,setCorps]=useState("");
    const{ idRapport}=useParams()
    const [reussi , setReussi ] = useState(false);
    const token = sessionStorage.getItem("key");
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
        setService(data.id);
      });
      fetch(`http://localhost:8000/madrasatic/draft_reports/${idRapport}/`, {
      method: "GET",
      headers: {
        "Authorization":`Token ${token}`
      },
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      setObjet(data.title);
      setCorps(data.desc);
      setService(data.service);
      setIdDeclaration(data.declaration);
    })
    },[]);
    const saveRapport=((e)=>{ 
      e.preventDefault(); 
      fetch(`http://localhost:8000/madrasatic/draft_reports/${idRapport}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
      body:JSON.stringify({title:objet,desc:corps,service:service,declaration:idDeclaration,status:'brouillon'}),
    }).then((response)=>{
      if(response.ok)
      {
          setReussi(true);
      }
      return response.json();
    })
    })
    const validateRapport=((e)=>{
        e.preventDefault();
        fetch(`http://localhost:8000/madrasatic/draft_reports/${idRapport}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization":`Token ${token}`
            },
            body:JSON.stringify({title:objet,desc:corps,service:service,declaration:idDeclaration,status:'publié'}),
          }).then((response)=>{
            if(response.ok)
            {
                setReussi(true);
            }
            return response.json();
          })
    })
    const supprimerRapport=((e)=>{
      e.preventDefault(); 
        fetch(`http://localhost:8000/madrasatic/draft_reports/${idRapport}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
    }).then((response)=>{
      if(response.ok)
      {
          setReussi(true);
      }
    })
    })
    return(
      <MDBContainer className='form'>
        <div className="create">
      {
            reussi? <Redirect to='/HomeService' /> : null
      }
      <h2>Modifier le rapport enregistré</h2>
      <hr style={{border: '2px solid #b78429'}}/>
      <form >
        <label>Titre du rapport:</label>
        <input 
          type="text" 
          required 
          placeholder='Objet'
          value={objet}
          onChange={e=>setObjet(e.target.value)}
        />
        <label>Déscription:</label>
        <textarea
            placeholder='Déscription'
            value={corps}
            onChange={e=>setCorps(e.target.value)}
        ></textarea>
        <table>
            <tr>
            <td ><button onClick={saveRapport} style={{margin:'90px'}}>Enregistrer</button></td>
            <td ><button onClick={validateRapport}style={{margin:'90px'}}>Valider</button></td>
            <td><button onClick={supprimerRapport}style={{margin:'90px'}}>Supprimer</button></td>
            </tr>
        </table>
        
      </form>
    </div>
      </MDBContainer>
    
    )
}