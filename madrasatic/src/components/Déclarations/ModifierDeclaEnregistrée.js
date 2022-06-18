// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { MdSentimentSatisfied } from 'react-icons/md';
import { Redirect, useParams } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
import './Declaration.css'
export const ModifierDeclarationEnregistrée =()=>{
    const [image, setImage] = useState(null);
    const [categories,setCategories]=useState([]);
    const [objet,setObjet]=useState("");
    const [auteur,setAuteur]=useState("");
    const [corps,setCorps]=useState("");
    const [priorité,setPriorité]=useState("1");
    const [categorie,setCategorie]=useState("santé");
    const [lieu,setLieu]=useState("");
    const{ idDeclaration}=useParams();
    const [blocs,setBlocs]=useState([]);
    const [sites,setSites]=useState([]);
    const [endroits,setEndroits]=useState([]);
    const [lieux,setLieux]=useState([]);
    const [bloc,setBloc]=useState();
    const [site,setSite]=useState();
    const [endroit,setEndroit]=useState();
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
      console.log("id Declaration + "+idDeclaration)
      fetch(path+`madrasatic/declarationdelete/${idDeclaration}/`, {
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
      setLieu(data.lieu);
      setBloc(data.bloc);
      setSite(data.site);
      setEndroit(data.endroit);
    });
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
          return response.json();
        })
        .then((data) => {
          setEndroits(data);
        });
      fetch(path+"madrasatic/lieux/", {
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
          setLieux(data);
        });
    },[]);
    const saveDeclaration=((e)=>{ 
      const form_data = new FormData();
      form_data.append("auteur",auteur);
      form_data.append("priorité", priorité);
      form_data.append("catégorie", categorie);
      form_data.append("objet",objet);
      form_data.append("corps", corps);
      form_data.append("lieu", lieu);
      form_data.append("corps", corps);
      form_data.append("site",site);
      form_data.append("bloc",bloc);
      form_data.append("endroit",endroit);
      form_data.append("etat", "brouillon");
      if(image !== null){
        form_data.append('image', image);
      }
      e.preventDefault(); 
      fetch(path+`madrasatic/declarationedit/${idDeclaration}/`, {
      method: "PATCH",
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
      form_data.append("corps", corps);
      form_data.append("site",site);
      form_data.append("bloc",bloc);
      form_data.append("endroit",endroit);
      if(image !== null){
        form_data.append('image', image);
      }
      e.preventDefault(); 
      fetch(path+`madrasatic/declarationedit/${idDeclaration}/`, {
      method: "PATCH",
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
    const supprimerDeclaration=((e)=>{
      e.preventDefault(); 
        fetch(path+`madrasatic/declarationdelete/${idDeclaration}/`, {
      method: "DELETE",
      headers: {
        "Authorization":`Token ${token}`
      },
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
            reussi? <Redirect to='/HomePage' /> : null
      }
      <h2>Modifier la déclaration enregistrée</h2>
      <hr style={{border: '2px solid #b78429'}}/>
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
        <label>Sa désignation :</label>
          <select onChange={e=>{setLieu(e.target.value)}}>
            <option >Les désignations</option>
            {lieux.filter(item => item.endroit == endroit).map(lieu => (
              <option value={lieu.id}>{lieu.identification}</option>
              ))}
        </select>
        <label>Photo la décrivant:</label>
        <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => setImage(e.target.files[0])}
          />
        <table>
            <tr>
            <td ><button onClick={saveDeclaration} class="btn btn-dark" style={{margin:'90px',width:'140px'}}>Enregistrer</button></td>
            <td ><button onClick={validateDeclaration} class="btn btn-dark" style={{margin:'90px',width:'140px'}}>Valider</button></td>
            <td><button onClick={supprimerDeclaration} class="btn btn-dark" style={{margin:'90px',width:'140px'}}>Supprimer</button></td>
            </tr>
        </table>
      </form>
    </div>
      </MDBContainer>
    
    )
}