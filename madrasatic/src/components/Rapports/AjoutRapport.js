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
    const [image,setImage]=useState(null);
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
    },[]);
    const saveRapport=((e)=>{
        e.preventDefault();
        const form_data = new FormData();
        form_data.append("title",objet);
        form_data.append("desc",corps);
        form_data.append("service",auteur);
        form_data.append("declaration",id);
        form_data.append("status",'brouillon');
        form_data.append("image",image);
        fetch(path+"madrasatic/reports/", {
        method: "POST",
        headers: {
          "Authorization":`Token ${token}`
        },
        body:form_data,
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
        fetch(path+`madrasatic/responsable_declarations/${id}/`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization":`Token ${token}`
          },
          body: JSON.stringify({etat:'en_cours_de_traitement'}),
          })
            const form_data = new FormData();
            form_data.append("title",objet);
            form_data.append("desc",corps);
            form_data.append("service",auteur);
            form_data.append("declaration",id);
            form_data.append("status",'publié');
            form_data.append("image",image);
            fetch(path+"madrasatic/reports/", {
            method: "POST",
            headers: {
              "Authorization":`Token ${token}`
            },
            body:form_data,
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
        <label>Objet du rapport:</label>
        <input 
          type="text" 
          required 
          placeholder='Objet'
          value={objet}
          onChange={e=>setObjet(e.target.value)}
        />
        <label>Corps du rapport:</label>
        <textarea
            placeholder='Corps'
            value={corps}
            onChange={e=>setCorps(e.target.value)}
        ></textarea>
        <label>Image:</label>
        <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => setImage(e.target.files[0])}
          />
        <button onClick={saveRapport}>Enregistrer</button>
        <button onClick={validateRapport}>Valider</button>
      </form>
    </div>
}
      </MDBContainer>
    
    )
}