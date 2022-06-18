// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { Redirect, useParams } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
import './Declaration.css'
export const CompleterRapport =()=>{
    const [objet,setObjet]=useState("");
    const [service,setService]=useState("");
    const [idDeclaration,setIdDeclaration]=useState("")
    const [corps,setCorps]=useState("");
    const{ idRapport}=useParams()
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
        setService(data.id);
      });
      fetch(path+`madrasatic/reports/${idRapport}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
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
      const form_data = new FormData();
      form_data.append("title",objet);
      form_data.append("desc",corps);
      form_data.append("service",service);
      form_data.append("declaration",idDeclaration);
      form_data.append("status",'brouillon');
      if( image !== null){
        form_data.append("image",image);
      }
      fetch(path+`madrasatic/reports/${idRapport}/`, {
      method: "PUT",
      headers: {
        "Authorization":`Token ${token}`
      },
      body:form_data,
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
        fetch(path+`madrasatic/responsable_declarations/${idDeclaration}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({etat:'traitée'}),
            })
            const form_data = new FormData();
            form_data.append("title",objet);
            form_data.append("desc",corps);
            form_data.append("service",service);
            form_data.append("declaration",idDeclaration);
            form_data.append("status",'publié');
            if( image !== null){
              form_data.append("image",image);
            }
            fetch(path+`madrasatic/reports/${idRapport}/`, {
                method: "PUT",
                headers: {
                  "Authorization":`Token ${token}`
                },
                body:form_data,
              }).then((response)=>{
                if(response.ok)
                {
                    setReussi(true);
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
        <label>Image:</label>
        <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => setImage(e.target.files[0])}
          />
        <table>
            <tr>
            <td ><button onClick={saveRapport} style={{margin:'90px'}}>Enregistrer</button></td>
            <td ><button onClick={validateRapport}style={{margin:'90px'}}>Valider</button></td>
            </tr>
        </table>
      </form>
    </div>
      </MDBContainer>
    
    )
}