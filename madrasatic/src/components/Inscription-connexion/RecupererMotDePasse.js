import { useState } from "react";
import {RiLockPasswordFill} from "react-icons/ri";
import { Redirect } from "react-router-dom"
import { useParams } from "react-router-dom";
export const RecupererMotDePasseOublie= () => {
    const [reussi , setReussi ] = useState(false);
    const [motDePasse , setMotDePasse] = useState('');
    const [motDePasseConfirmation , setmotDePasseConfirmation] = useState('');
     const {uidb64 , token} = useParams();
     const path=sessionStorage.getItem("path");
    const changePassword = (e) => {
        e.preventDefault();    
        fetch(path+`madrasatic/password-reset-confirm/${uidb64}/${token}/`, {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({new_password1 : motDePasse, new_password2: motDePasseConfirmation , uid: uidb64 , token : token}), 
        }).then((response) => {
            if (response.ok)
            {
                setReussi(true);
            }  
            return response.json();     
        }).then((data) => {
            console.log(data);
            // setDetail(data.detail);
        } )
      }
    return(

        <div className="card">
            {
            reussi? <Redirect to="/Home"/>: null
            }
            <div className="email">
                    <label><b>Entrez votre nouveau mot de passe :</b></label>
                    <br></br>
                    <div className="iconemail">
                        <RiLockPasswordFill />
                    </div>
                    <input
                       type="password"
                       required
                       placeholder="Mot de passe"
                       value = {motDePasse}
                       onChange = {(e) => setMotDePasse(e.target.value)}
                    />
                    <br></br>
                    <div className="iconemail">
                        <RiLockPasswordFill />
                    </div>
                    <input
                       type="password"
                       required
                       placeholder="Confirmation du mot de passe"
                       value = {motDePasseConfirmation}
                        onChange = {(e) => setmotDePasseConfirmation(e.target.value)}
                    />
            </div>
            <button onClick={changePassword}>Confirmer</button>
            <br></br> <br></br>
        </div>
    );
}