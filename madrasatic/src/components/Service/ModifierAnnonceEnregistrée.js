// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// import './Declaration.css'
export const ModifierAnnonceEnregistrée=()=>{
    const [objet,setObjet]=useState("");
    const {idAnnonce}= useParams();
    const [dateDebut, setDateDebut]=useState(null);
    const [dateValue, setDate]=useState(null);
    const [auteur,setAuteur]=useState("");
    const [corps,setCorps]=useState("");
    const [reussi , setReussi ] = useState(false);
    const [utilisateur,setUtilisateur]=useState(false);
    const [service,setService]=useState(false);
    const token = sessionStorage.getItem("key");
    const [image, setImage] = useState("image");
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
        if(data.role === "Président du club"){
          setUtilisateur(true);
        }else{
          setService(true);
        }
      });
      fetch("http://127.0.0.1:8000/madrasatic/annonceedit/"+idAnnonce+"/", {
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
        setAuteur(data.auteur);
        setObjet(data.objet);
        setCorps(data.corps);
        setDateDebut(new Date(data.pubDate));
        setDate(new Date(data.dateFin));
      });
    },[]);
    const saveAnnonce=((e)=>{
      const form_data = new FormData();
      form_data.append("auteur",auteur);
      form_data.append("objet",objet);
      form_data.append("corps", corps);
      form_data.append("pubDate",dateDebut.toLocaleDateString('fr-CA'));
      form_data.append("dateFin",dateValue.toLocaleDateString('fr-CA'));
      form_data.append("etat", "brouillon");
      if(image !== "image"){
            form_data.append('image', image);
        }
      e.preventDefault(); 
      fetch("http://localhost:8000/madrasatic/annonceedit/"+idAnnonce+"/", {
      method: "PUT",
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
      form_data.append("pubDate",dateDebut.toLocaleDateString('fr-CA'));
      form_data.append("dateFin",dateValue.toLocaleDateString('fr-CA'));
      if( utilisateur === true){
        form_data.append("etat", "publiée");
      }else if( service === true){
        form_data.append("etat", "validé");
      }
      if(image !== "image"){
        form_data.append('image', image);
    }
      e.preventDefault(); 
      fetch("http://localhost:8000/madrasatic/annonceedit/"+idAnnonce+"/", {
      method: "PUT",
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
            reussi && service ? <Redirect to='/HomeService' /> : null
      }
      {
            reussi && utilisateur ? <Redirect to='/HomePage' /> : null
      }
      <h2>Modifier l'annonce</h2>
      <hr style={{border: '2px solid #b78429'}}/>
      <form >
        <label>Objet de l'annonce:</label>
        <input 
          type="text" 
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
          <DatePicker
              selected={dateDebut}
              onChange={date=>setDateDebut(date)}
              dateFormat = "yyyy-MM-dd"
          />
        <label>Date fin :</label>
            <DatePicker
            selected={dateValue}
            onChange={date=>setDate(date)}
            dateFormat = "yyyy-MM-dd"
          />
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