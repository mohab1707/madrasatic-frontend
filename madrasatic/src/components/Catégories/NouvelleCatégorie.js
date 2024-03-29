// import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer } from 'mdb-react-ui-kit';
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
    const path=sessionStorage.getItem("path");
    useEffect(()=>{
      fetch(path+"madrasatic/services_list/", {
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
        setServices(data);
      });
    },[]);
    const validateCategorie=((e)=>{
        console.log("serviiiice +" + Service + "noom + "+ nom)
    e.preventDefault(); 
      fetch(path+"madrasatic/categories/", {
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
      <MDBContainer className='form'>
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
      </MDBContainer>
    
    )
}