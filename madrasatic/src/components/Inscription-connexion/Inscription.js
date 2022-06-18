import { useState } from "react";
import { BsFillPersonFill  } from "react-icons/bs";
import {RiLockPasswordFill} from "react-icons/ri"
import {MdEmail} from "react-icons/md"
import { Redirect } from "react-router-dom"

export const Inscription = () => {
    const [nom , setNom] = useState('');
    const [email , setEmail] = useState('');
    const [motDePasse , setMotDePasse] = useState('');
    const [motDePasseConfirmation , setmotDePasseConfirmation] = useState('');
    const [reussi , setReussi ] = useState(false);
    const [erreurUsername,setErreurUsername]=useState();
    const [erreurEmail,setErreurEmail]=useState();
    const [erreurPassword1,setErreurPassword1]=useState();
    const [erreurPassword2,setErreurPassword2]=useState();
    const [erreur_non_field_errors,setErreur_non_field_errors]=useState();
    const path=sessionStorage.getItem("path");
    const [isPending,setIsPending]=useState(false);
    const register = (e) => {
        e.preventDefault(); 
        setIsPending(true);
        fetch(path+"madrasatic/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json",'Accept': 'application/json' },
          body: JSON.stringify({username : nom , email: email , password1: motDePasse ,password2: motDePasseConfirmation}), 
        }).then((response) => {
            if(response.ok)
            {
                console.log("ça marche!!");
                setReussi(true);
                setIsPending(false);
                
                
            }else
            {
                console.log("y'a une erreur");
                setIsPending(false);
            }
            return response.json();
        }).then(data => {
            setErreurUsername(data.username);
            setErreurEmail(data.email);
            setErreurPassword1(data.password1);
            setErreurPassword2(data.password2);
            setErreur_non_field_errors(data.non_field_errors);
        })
      }
    return(
        <>
            {isPending ? <div class="spinner-border" role="status" style={{marginLeft:'35%',marginTop:'15%'}}>
                <span class="visually-hidden" >Loading...</span>
            </div> : 
        <div className="inscription">
            {
            reussi? <Redirect to='/' /> : null
            }
            <form >
            <div className="inputField">
                    <div className="icon">
                        <BsFillPersonFill />
                    </div>
                    <input
                        type="text"
                        required
                        placeholder="Nom"
                        value = {nom}
                        onChange = {(e) => setNom(e.target.value)}
                    />
                    {erreurUsername ? <p style={{color: 'red'} }>{erreurUsername}</p> : null}
                </div>
                <div className="inputField">
                    <div className="icon">
                        <MdEmail />
                    </div>
                    <input
                        type="email"
                        required
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
                        required
                        placeholder="Mot de passe"
                        value = {motDePasse}
                        onChange = {(e) => setMotDePasse(e.target.value)}
                    />
                </div>
                {erreurPassword1 ? <p style={{color: 'red'} }>{erreurPassword1}</p> : null}
                <div className="inputField">
                    <div className="icon">
                        <RiLockPasswordFill />
                    </div>
                    <input
                        type="password"
                        required
                        placeholder="Confirmez votre mot de passe"
                        value = {motDePasseConfirmation}
                        onChange = {(e) => setmotDePasseConfirmation(e.target.value)}
                    />
                </div>
                {erreurPassword2 ? <p style={{color: 'red'} }>{erreurPassword2}</p> : null}
                {erreur_non_field_errors ? <p style={{color: 'red'} }>{erreur_non_field_errors}</p> : null}
            </form> 
            <div className="insc">
                <button type='submit' onClick={register}> S'inscrire </button>
            </div>
            <br></br>
        </div>
}
    </>
    );
}