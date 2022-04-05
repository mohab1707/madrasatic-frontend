import { useState } from "react";
import { BsFillPersonFill  } from "react-icons/bs";
import {RiLockPasswordFill} from "react-icons/ri"
import {MdEmail} from "react-icons/md"
import { Redirect } from "react-router-dom"

export const Inscription = () => {
    const [nom , setNom] = useState('');
    const [email , setEmail] = useState('');
    const [motDePasse , setMotDePasse] = useState('');
    const [adresse , setAdresse] = useState('mon-adresse');
    const [tel , setTel] = useState('0548963215');
    const [motDePasseConfirmation , setmotDePasseConfirmation] = useState('');
    const [reussi , setReussi ] = useState(false);
    const [erreur,setErreur]=useState('');
    const register = (e) => {
        e.preventDefault(); 
        fetch("http://127.0.0.1:8000/madrasatic/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json",'Accept': 'application/json' },
          body: JSON.stringify({username : nom , email: email , password1: motDePasse ,password2: motDePasseConfirmation}), 
        }).then((response) => {
            if(response.ok)
            {
                console.log("hiii");
                setReussi(true);
            }else
            {
                console.log("y'a une erreur");
                console.log(response.json());
            }
            
        })
        // .catch(Error=>{
        //     console.log(Error)
        //     setErreur(Error.toString);
        // })
      }
    return(
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
                        requiered
                        placeholder="Nom"
                        value = {nom}
                        onChange = {(e) => setNom(e.target.value)}
                    />
                </div>
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
                <div className="inputField">
                    <div className="icon">
                        <RiLockPasswordFill />
                    </div>
                    <input
                        type="password"
                        requiered
                        placeholder="Confirmez votre mot de passe"
                        value = {motDePasseConfirmation}
                        onChange = {(e) => setmotDePasseConfirmation(e.target.value)}
                    />
                </div>
            </form> 
            <div className="insc">
                <button type='submit' onClick={register}> S'inscrire </button>
            </div>
            <br></br>
            <div>
                {erreur? <p>{erreur}</p> : null}
            </div>
        </div>
    );
}