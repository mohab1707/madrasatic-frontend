// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { MdSentimentSatisfied } from 'react-icons/md';
import { Redirect } from "react-router-dom"
import '../Déclarations/Declaration.css'
export const AjoutCatégorie =()=>{
    const [services,setServices]=useState([]);
    const [nom,setNom]=useState("");
    const [Service,setService]=useState("");
    const [reussi , setReussi ] = useState(false);
    const token = sessionStorage.getItem("key");
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/services_list/", {
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
        console.log(data.results);
        setServices(data.results);
      });
    },[]);
    const validateCategorie=((e)=>{
        console.log("serviiiice +" + Service + "noom + "+ nom)
    e.preventDefault(); 
      fetch("http://localhost:8000/madrasatic/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
      body:JSON.stringify({name:nom , service:Service})
    }).then((response)=>{
      if(response.ok)
      {
          console.log("ça marche!!!!");
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
    <div className="create">
      {
            reussi? <Redirect to='/HomeResponsable' /> : null
      }
      <h2>Ajouter une catégorie</h2>
      <hr style={{border: '2px solid #b78429'}}/>
      <form >
        <label>Nom de la catégorie:</label>
        <input 
          type="text" 
          required 
          placeholder='Nom'
          value={nom}
          onChange={e=>setNom(e.target.value)}
        />
        <label>Service associé:</label>
        <select onChange={e=>{setService(e.target.value)}}>
          <option >Services</option>
          {services.map(ser => (
            <option value={ser.id}>{ser.username}</option>
      ))}
        </select>
        <button onClick={validateCategorie}>Valider</button>
      </form>
    </div>
    )
}