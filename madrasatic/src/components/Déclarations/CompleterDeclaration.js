// import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react'
import { MdSentimentSatisfied } from 'react-icons/md';
import { Redirect, useParams } from "react-router-dom"
import './Declaration.css'
export const CompleterDeclaration =()=>{
    const [image, setImage] = useState(null);
    const [categories,setCategories]=useState([]);
    const [objet,setObjet]=useState("");
    const [auteur,setAuteur]=useState("");
    const [corps,setCorps]=useState("");
    const [priorité,setPriorité]=useState("1");
    const [categorie,setCategorie]=useState("santé");
    const [lieu,setLieu]=useState("");
    // const [etat,setEtat]=useState("");
    const{ idDeclaration}=useParams()
    const [reussi , setReussi ] = useState(false);
    const token = sessionStorage.getItem("key");
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
        setAuteur(data.id);
      });

      fetch(path+"madrasatic/categories/", {
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
        setCategories(data);
      });
      fetch(path+`madrasatic/responsable_declarations/${idDeclaration}/`, {
      method: "GET",
      headers: {
        "Authorization":`Token ${token}`
      },
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      setObjet(data.objet);
      setCategorie(data.catégorie);
      setCorps(data.corps);
    })
    },[]);
    const saveDeclaration=((e)=>{
      const form_data = new FormData();
      form_data.append("auteur",auteur);
      form_data.append("priorité", priorité);
      form_data.append("catégorie", categorie);
      form_data.append("objet",objet);
      form_data.append("corps", corps);
      form_data.append("lieu", lieu);
      form_data.append("etat", "brouillon");
      if(image !== null){
        form_data.append('image', image);
      }
      e.preventDefault(); 
      fetch(path+`madrasatic/responsable_declarations/${idDeclaration}/`, {
      method: "PUT",
      headers: {
        "Authorization":`Token ${token}`
      },
      body:form_data
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
    const validateDeclaration=((e)=>{
      const form_data = new FormData();
      form_data.append("auteur",auteur);
      form_data.append("priorité", priorité);
      form_data.append("catégorie", categorie);
      form_data.append("objet",objet);
      form_data.append("corps", corps);
      form_data.append("lieu", lieu);
      form_data.append("etat", "publiée");
      if(image !== null){
        form_data.append('image', image);
      }
      e.preventDefault(); 
      fetch(path+`madrasatic/responsable_declarations/${idDeclaration}/`, {
      method: "PUT",
      headers: {
        "Authorization":`Token ${token}`
      },
      body:form_data
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
            reussi? <Redirect to='/HomePage' /> : null
      }
      <h2>Complèter la déclaration </h2>
      <form >
        <label>Objet de la déclaration:</label>
        <input 
          type="text" 
          required 
          placeholder='Objet'
          value={objet}
          onChange={e=>setObjet(e.target.value)}
        />
        <label>Déscription de la déclaration:</label>
        <textarea
            placeholder='Déscription'
            value={corps}
            onChange={e=>setCorps(e.target.value)}
        ></textarea>
        <label>Catégorie de la déclaration: </label>
        <select onChange={e=>{setCategorie(e.target.value)}}>
          <option >Catégorie</option>
          {categories.map(cat => (
            <option value={cat.id}>{cat.name}</option>
      ))}
        </select>
        <label>Priorité:</label>
        <select onChange={e=>{setPriorité(e.target.value)}}>
          <option value="1">Urgence</option>
          <option value="2">Etat critique</option>
          <option value="3">Etat normal</option>
        </select>
        <label>Photo la décrivant:</label>
        <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => setImage(e.target.files[0])}
          />
        <button onClick={saveDeclaration}>Enregistrer</button>
        <button onClick={validateDeclaration}>Valider</button>
      </form>
    </div>

      </MDBContainer>
   
    )
}