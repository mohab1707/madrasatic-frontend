import { useState ,useEffect} from "react";
import {RiLockPasswordFill} from "react-icons/ri";
import { Redirect } from "react-router-dom"
import { useParams } from "react-router-dom";
export const ChangePassword= () => {
    const [reussi , setReussi ] = useState(false);
    const [ancienMotDePasse , setAncienMotDePasse] = useState('');
    const [motDePasse , setMotDePasse] = useState('');
    const [motDePasseConfirmation , setmotDePasseConfirmation] = useState('');
    const [erreurPassword1,setErreurPassword1]= useState('');
    const [erreurPassword2,setErreurPassword2]= useState('');
    const [erreurPassword,setErreurPassword]= useState('');
    const is_superuser=sessionStorage.getItem("is_superuser");
    const [service,setService]=useState(null);
    const [responsable,setResponsable]=useState(null);
    const [admin, setAdmin] = useState(false);
    const [Utilisateur, setUtilisateur] = useState(false);
    const token=sessionStorage.getItem("key");
    useEffect(() => {
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
            if (data.role==='Admin')
            {
              setAdmin(true);
            }else if(data.role==='Responsable'){
                setResponsable(true);
            }else if(data.role==='Service'){
                setService(true);
            }
            else{
              setUtilisateur(true);
            }
          });
      }, []);
    const changePassword = (e) => {
        e.preventDefault();    
        fetch(`http://localhost:8000/madrasatic/password-change/`, {
          method: 'POST',
          headers: { "Content-Type": "application/json","Authorization":`Token ${token}`},
          body: JSON.stringify({old_password:ancienMotDePasse ,new_password1 : motDePasse, new_password2: motDePasseConfirmation}), 
        }).then((response) => {
            if (response.ok)
            {
                setReussi(true);
            }  
            return response.json();     
        }).then((data) => {
            console.log(data);
            setErreurPassword(data.old_password);
            setErreurPassword1(data.new_password1);
            setErreurPassword2(data.new_password2);
            // setDetail(data.detail);
        } )
      }
    return(

        <div className="inscription">
            {
            reussi && admin ? <Redirect to="/Home"/>: null
            }
            {
            reussi && Utilisateur ? <Redirect to="/HomePage"/>: null
            }
            {
            reussi && responsable ? <Redirect to="/HomeResponsable"/>: null
            }
            {
            reussi && service ? <Redirect to="/HomeService"/>: null
            }
            <div className="inputField">
                    <br></br>
                    <label><b>Changer mot de passe:</b></label>
                    <br></br><br></br>
                    <div className="icon">
                        <RiLockPasswordFill />
                    </div>
                    <input
                       type="password"
                       requiered
                       placeholder="Ancien mot de passe"
                       value = {ancienMotDePasse}
                       onChange = {(e) => setAncienMotDePasse(e.target.value)}
                    />
                    {erreurPassword ? <p style={{color: 'red',marginLeft:'9%'} }>{erreurPassword}</p> : null}
                    <div className="icon">
                        <RiLockPasswordFill />
                    </div>
                    <input
                       type="password"
                       requiered
                       placeholder="Nouveau mot de passe"
                       value = {motDePasse}
                        onChange = {(e) => setMotDePasse(e.target.value)}
                    />
                    {erreurPassword1 ? <p style={{color: 'red',marginLeft:'9%'} }>{erreurPassword1}</p> : null}
                    <div className="icon">
                        <RiLockPasswordFill />
                    </div>
                    <input
                       type="password"
                       requiered
                       placeholder="Confirmer votre nouveau mot de passe"
                       value = {motDePasseConfirmation}
                        onChange = {(e) => setmotDePasseConfirmation(e.target.value)}
                    />
                    {erreurPassword2 ? <p style={{color: 'red',marginLeft:'9%'} }>{erreurPassword2}</p> : null}
            </div>
            <div className="insc">
            <button onClick={changePassword}>Confirmer</button>
            </div>
            <br></br> <br></br>
        </div>
    );
}