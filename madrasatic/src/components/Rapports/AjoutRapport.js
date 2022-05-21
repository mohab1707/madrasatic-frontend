// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { MdSentimentSatisfied } from 'react-icons/md';
import { Redirect, useParams } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
import './Declaration.css'
export const AjoutRapport =()=>{
    const {id}=useParams()
    const [objet,setObjet]=useState("");
    const [auteur,setAuteur]=useState("");
    const [corps,setCorps]=useState("");
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
        setAuteur(data.id);
        console.log("auteeeuuur est :"+data.id)
      });
    },[]);
    const saveRapport=((e)=>{
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({etat:'traitée'}),
            })
      fetch("http://localhost:8000/madrasatic/reports/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
      body:JSON.stringify({title:objet,desc:corps,service:auteur,declaration:id,status:'brouillon'}),
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
    const validateRapport=((e)=>{
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({etat:'traitée'}),
            })
      fetch("http://localhost:8000/madrasatic/reports/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
      body:JSON.stringify({title:objet,desc:corps,service:auteur,declaration:id,status:'publié'}),
    }).then((response)=>{
      if(response.ok)
      {
          console.log("rapport creer")
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
          {
            reussi? <Redirect to='/HomeService' /> :
              <div className="create">
      <h2>Ajout d'un rapport</h2>
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
        <label>Déscription du rapport:</label>
        <textarea
            placeholder='Déscription'
            value={corps}
            onChange={e=>setCorps(e.target.value)}
        ></textarea>
        <button onClick={saveRapport}>Enregistrer</button>
        <button onClick={validateRapport}>Valider</button>
      </form>
    </div>
}
      </MDBContainer>
    
    )
}