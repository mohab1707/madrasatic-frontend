// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { MdSentimentSatisfied } from 'react-icons/md';
import { Redirect } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
import './Declaration.css'
export const AjoutDeclaration =()=>{
    const [image, setImage] = useState("");
    const [categories,setCategories]=useState([]);
    const [objet,setObjet]=useState("");
    const [auteur,setAuteur]=useState("");
    const [corps,setCorps]=useState("");
    const [priorité,setPriorité]=useState("1");
    const [categorie,setCategorie]=useState("santé");
    const [blocs,setBlocs]=useState([]);
    const [sites,setSites]=useState([]);
    const [endroits,setEndroits]=useState([]);
    const [lieux,setLieux]=useState([]);
    const [bloc,setBloc]=useState();
    const [site,setSite]=useState();
    const [endroit,setEndroit]=useState(2);
    const [lieu,setLieu]=useState("");
    // const [etat,setEtat]=useState("");
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
      });

      fetch("http://127.0.0.1:8000/madrasatic/categories/", {
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
      fetch("http://127.0.0.1:8000/madrasatic/blocs/", {
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
  
        fetch("http://127.0.0.1:8000/madrasatic/sites/", {
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
        fetch("http://127.0.0.1:8000/madrasatic/endroits/", {
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
      fetch("http://127.0.0.1:8000/madrasatic/lieux/", {
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
      form_data.append("site",site);
      form_data.append("bloc",bloc);
      form_data.append("endroit",endroit);
      form_data.append("lieu", lieu);
      form_data.append("etat", "brouillon");
      form_data.append('image', image);
      e.preventDefault(); 
      fetch("http://localhost:8000/madrasatic/declarationcreate/", {
      method: "POST",
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
      form_data.append("site",site);
      form_data.append("bloc",bloc);
      form_data.append("endroit",endroit);
      form_data.append("lieu", lieu);
      form_data.append("etat", "publiée");
      form_data.append('image', image);
      e.preventDefault(); 
      fetch("http://localhost:8000/madrasatic/declarationcreate/", {
      method: "POST",
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
    });
    return(
      <MDBContainer className='form'>
        <div className="create">
      {
            reussi? <Redirect to='/HomePage' /> : null
      }
      <h2>Ajouter Une Déclaration</h2>
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
        <label>Catégorie de la déclaration:</label>
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
        {/* <label>Lieux :</label>
        <textarea
            placeholder='Lieux'
            value={corps}
            onChange={e=>setLieu(e.target.value)}
        ></textarea> */}
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