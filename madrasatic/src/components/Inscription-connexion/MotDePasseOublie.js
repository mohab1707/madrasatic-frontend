import { useState } from "react";
import {MdEmail} from "react-icons/md"
import { Redirect  } from "react-router-dom"
export const MotDePasseOublie= () => {
    const [email , setEmail] = useState('');
    const [reussi , setReussi ] = useState(false);
    const [erreurEmail,setErreurEmail]=useState();
    const forgotPassword = (e) => {
        e.preventDefault();  
        fetch('http://localhost:8000/madrasatic/password-reset/', {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({email: email }), 
        }).then((response) => {
            if (response.ok)
            {
                setReussi(true);
            }  
            return response.json();     
        }).then((data) => {
            console.log(data);
            setErreurEmail(data.email);
            // setDetail(data.detail);
        } )
      }
    return(

        <div className="card" style={{backgroundColor:'#e8e8e8',borderRadius:'17px'}}>
            {
            reussi? <>
                    <p>Un email de confirmaion vous a été envoyé</p>
                    <Redirect to ="/emailEnvoye"></Redirect>
                </> : null
            }
            <div className="email">
                    <label><b>Entrez votre adresse email :</b></label>
                    <br></br>
                    <div className="iconemail">
                        <MdEmail />
                    </div>
                    <input
                        type="email"
                        required
                        placeholder="Adresse email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    {erreurEmail ? <p style={{color: 'red',marginLeft:'9%'} }>{erreurEmail}</p> : null}
            </div>
            <button onClick={forgotPassword}>Confirmer</button>
            <br></br> <br></br>
        </div>
    );
}