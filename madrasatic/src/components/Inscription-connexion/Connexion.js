import {useState } from "react";
import {MdEmail} from "react-icons/md"
import {RiLockPasswordFill, RiSendToBack} from "react-icons/ri"
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
export const Connexion = () => {
    const [email , setEmail] = useState('');
    const [motDePasse , setMotDePasse] = useState('');
    const [admin , setAdmin ] = useState(false);
    const [responsable , setResponsable ] = useState(false);
    const [utilisateur ,setUtilisateur] = useState(false);
    const [erreurEmail,setErreurEmail]=useState();
    const [erreurPassword,setErreurPassword]=useState();
    const [erreur_non_field_errors,setErreur_non_field_errors]=useState();
    const [isPending,setIsPending]=useState(false);
    const login = (e) => {
        e.preventDefault();  
        setIsPending(true);  
        fetch("http://127.0.0.1:8000/madrasatic/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({email: email , password: motDePasse }), 
        }).then((response) => {
            if(response.ok)
            {
                console.log("reussi");
                const token=sessionStorage.getItem("key");
                console.log("tokeeen est :" + token);
                fetch("http://127.0.0.1:8000/madrasatic/user/", {
                method: "GET",
                headers: { "Content-Type": "application/json",'Accept': 'application/json',"Authorization":`Token ${token}`}, 
                }).then((response) => {
                    if(response.ok)
                    {
                        console.log("donnees recup");
                    }else
                    {
                        console.log("la reponse ",response);
                        console.log("y'a une erreur");
                       
                    }
                    return response.json();
                }).then(data => {
                    console.log("rooooole + "+data.role);
                    console.log(data.is_superuser);
                    if(data.role=="('Utilisateur', 'User')"){
                        setUtilisateur(true);
                    }
                    if (data.is_superuser==true){
                        setAdmin(true);
                    }else{
                        if(data.role=='Responsable'){
                            setResponsable(true);
                        }else{
                        setUtilisateur(true);
                        }
                    }
                    setIsPending(false);
                })                
            }
            else{
                console.log("erreur");
                setIsPending(false);
            }
             return response.json();   
        }).then((data) => {
            const key = data.key;
            sessionStorage.setItem("key", key);
            setErreurEmail(data.email);
            setErreurPassword(data.password);
            setErreur_non_field_errors(data.non_field_errors);
            setIsPending(false);
        }
        )
        
      }
    return ( 
        <>
        {isPending ? <div class="spinner-border" role="status" style={{marginLeft:'35%',marginTop:'15%'}}>
                <span class="visually-hidden" >Loading...</span>
            </div> : 
        <div className="Connexion">
            
            {
            admin? <Redirect to='/Home' /> : null
            }
            {
            utilisateur? <Redirect to='/HomePage' /> : null
            }
            {
            responsable? <Redirect to='/HomeResponsable' /> : null
            }
            <form>
                <div className="inputField">
                    <div className="icon">
                        <MdEmail />
                    </div>
                    <input
                        type="email"
                        requiered
                        placeholder="Adresse email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    
                </div>
                {erreurEmail ? <p style={{color: 'red'} }>{erreurEmail}</p> : null}
                <div className="inputField">
                    <div className="icon">
                        <RiLockPasswordFill />
                    </div>
                    <input
                        type="password"
                        requiered
                        placeholder="Mot de passe"
                        value = {motDePasse}
                        onChange = {(e) => setMotDePasse(e.target.value)}
                    />
                </div>
                {erreurPassword ? <p style={{color: 'red'} }>{erreurPassword}</p> : null}
                {erreur_non_field_errors ? <p style={{color: 'red'} }>{erreur_non_field_errors}</p> : null}
            </form>
            <div className="forgottenpassword">
                    <Link to="/ForgetPassword">Mot de passe oublié?</Link>
                    <div className="conx">
                        <button onClick={login}> Connexion </button>
                    </div>
            </div>
            <br></br>
            <br></br>
        </div> 
        }
        </>
     );
}