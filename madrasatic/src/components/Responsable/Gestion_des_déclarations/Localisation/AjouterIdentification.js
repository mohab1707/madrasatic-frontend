import {useState,useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
// import './Declaration.css'
export const AjouterIdentification =()=>{
    const [objet,setObjet]=useState("");
    const [reussi , setReussi ] = useState(false);
    const [blocs,setBlocs]=useState([]);
    const [sites,setSites]=useState([]);
    const [endroits,setEndroits]=useState([]);
    const [bloc,setBloc]=useState('');
    const [site,setSite]=useState("");
    const [endroit,setEndroit]=useState("");
    const token = sessionStorage.getItem("key");
    const path=sessionStorage.getItem("path");
    useEffect(()=>{
        fetch(path+"madrasatic/blocs/", {
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
            setBlocs(data);
        });
  
        fetch(path+"madrasatic/sites/", {
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
          setSites(data);
        });
        fetch(path+"madrasatic/endroits/", {
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
          setEndroits(data);
        });
      },[]);
    const saveBloc=((e)=>{
      e.preventDefault(); 
      fetch(path+"madrasatic/lieux/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
      body:JSON.stringify({endroit:endroit,identification:objet})
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
      <h2>L'ajout d'une désignation</h2>
      <hr style={{border: '2px solid #b78429'}}/>
      <form >
        <label>Le site associé:</label>
        <select onChange={e=>{setSite(e.target.value)}}>
          <option >Les sites</option>
          {sites.map(site => (
            <option value={site.id}>{site.site}</option>
            ))}
        </select>
        <label>Le bloc associé:</label>
        <select onChange={e=>{setBloc(e.target.value)}}>
          <option >Les blocs</option>
          {blocs.filter(item => item.site == site).map(bloc => (
            <option value={bloc.id}>{bloc.blocc}</option>
            ))}
        </select>
        <label>L'endroit associé :</label>
        <select onChange={e=>{setEndroit(e.target.value)}}>
          <option >Les endroits</option>
          {endroits.filter(item => item.blocc == bloc).map(endr => (
            <option value={endr.id}>{endr.endroit}</option>
            ))}
        </select>
        <label>La désignation :</label>
        <input 
          type="text" 
          required 
          placeholder='désignation'
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