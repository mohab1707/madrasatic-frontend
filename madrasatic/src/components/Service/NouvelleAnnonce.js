// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
// import './Declaration.css'
export const NouvelleAnnonce =()=>{
    const [objet,setObjet]=useState("");
    const [dateDebut, setDateDebut]=useState(null);
    const [dateValue, setDate]=useState(null);
    const [auteur,setAuteur]=useState("");
    const [corps,setCorps]=useState("");
    const [reussi , setReussi ] = useState(false);
    const token = sessionStorage.getItem("key");
    const [image, setImage] = useState("");
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
      });
    },[]);
    const saveAnnonce=((e)=>{
      const form_data = new FormData();
      form_data.append("auteur",auteur);
      form_data.append("objet",objet);
      form_data.append("corps", corps);
      form_data.append("pubDate",dateDebut.toJSON());
      form_data.append("dateFin",dateValue.toJSON());
      form_data.append("etat", "brouillon");
      form_data.append('image', image);
      e.preventDefault(); 
      fetch("http://localhost:8000/madrasatic/annoncecreate/", {
      method: "POST",
      headers: {
        "Authorization":`Token ${token}`
      },
      body : form_data,
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
    })
    })
    const validateAnnonce=((e)=>{
      const form_data = new FormData();
      form_data.append("auteur",auteur);
      form_data.append("objet",objet);
      form_data.append("corps", corps);
      form_data.append("pubDate",dateDebut.toJSON());
      form_data.append("dateFin",dateValue.toJSON());
      form_data.append("etat", "publiée");
      form_data.append('image', image);
      e.preventDefault(); 
      fetch("http://localhost:8000/madrasatic/annoncecreate/", {
      method: "POST",
      headers: {
        "Authorization":`Token ${token}`
      },
      body : form_data,
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
    })
    })
    return(
      <MDBContainer className='form'>
        <div className="create">
      {
            reussi? <Redirect to='/HomeService' /> : null
      }
      <h2>Ajouter une annonce</h2>
      <hr style={{border: '2px solid #b78429'}}/>
      <form >
        <label>Objet de l'annonce:</label>
        <input 
          type="text" 
          required 
          placeholder='Objet'
          value={objet}
          onChange={e=>setObjet(e.target.value)}
        />
        <label>Corps de l'annonce:</label>
        <textarea
            placeholder='Déscription'
            value={corps}
            onChange={e=>setCorps(e.target.value)}
        ></textarea>
        <label>Date début :</label>
            <Datetime 
                value={dateDebut}
                onChange={date=>setDateDebut(date)}
                />
        <label>Date fin :</label>
            <Datetime placeholder='Date fin'
                value={dateValue}
                onChange={date=>setDate(date)}
            > </ Datetime>
        <label>Image :</label>
        <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => setImage(e.target.files[0])}
          />
        <button onClick={saveAnnonce}>Enregistrer</button>
        <button onClick={validateAnnonce}>Valider</button>
      </form>
    </div>
      </MDBContainer>
    
    )
}