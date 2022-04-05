import { useState } from "react";
import {MdEmail} from "react-icons/md"
import {RiLockPasswordFill} from "react-icons/ri"
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
export const Connexion = () => {
    const [email , setEmail] = useState('');
    const [motDePasse , setMotDePasse] = useState('');
    const [reussi , setReussi ] = useState(false);

    const login = (e) => {
        e.preventDefault();    
        fetch("http://127.0.0.1:8000/madrasatic/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({email: email , password: motDePasse }), 
        }).then((response) => {
            if(response.ok)
            {

                console.log(response);
                
                // sessionStorage.setItem("key", key);
                setReussi(true);
            }
            else{
                console.log(response);
            }
             return response.json();   
        }).then((data) => {
            const key = data.key;
            sessionStorage.setItem("key", key);
            console.log(data.key);
        }
        ).catch(Error)
        {
            console.log(Error);
        }
      }
    return ( 
        <div className="Connexion">
            {
            reussi? <Redirect to='/Home' /> : null
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
     );
}