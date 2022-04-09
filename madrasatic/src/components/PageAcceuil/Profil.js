import { useEffect, useState } from "react";
import { BsFillPersonFill  } from "react-icons/bs";
import {RiLockPasswordFill} from "react-icons/ri"
import {MdEmail} from "react-icons/md"
import { Redirect } from "react-router-dom"
import {FaRegAddressBook} from "react-icons/fa"
import {BsFillTelephoneFill} from "react-icons/bs"
import { MDBTooltip} from 'mdb-react-ui-kit';

export const Profil = () => {
    const [nom , setNom] = useState('');
    const [image , setImage] = useState('');
    const [motDePasse , setMotDePasse] = useState('');
    const [id,setId] = useState();
    const [adresse , setAdresse] = useState('');
    const [tel , setTel] = useState('');
    const [reussi , setReussi ] = useState(false);
    const [errors, setErrors] = useState();
    const [erreurUsername,setErreurUsername]=useState();
    const [erreurAddress,setErreurAddress]=useState();
    const [erreurTel,setErreurTel]=useState();
    // useEffect(()=> {
    //     fetch("http://127.0.0.1:8000/madrasatic/user/", {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json",'Accept': 'application/json' }, 
    //     }).then((response) => {
    //         if(response.ok)
    //         {
    //             console.log("donnees recup");
    //         }else
    //         {
    //             console.log("y'a une erreur");
    //         }
    //         return response.json();
    //     }).then(data => {
    //         setAdresse(data.address);
    //         setId(data.id);
    //         setNom(data.username);
    //         setTel(data.tel);
    //         // console.log(data);
    //     })
    // },[]);
    const update = (e) => {
        e.preventDefault(); 
        fetch(`http://localhost:8000/madrasatic/updateprofile/${id}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json",'Accept': 'application/json' },
          body: JSON.stringify({username : nom , address : adresse , tel : tel , img : image}), 
        }).then((response) => {
            if(response.ok)
            {
                console.log("reussi");
                setReussi(true);
            }else
            {
                console.log("y'a une erreur");
            }
            return response.json();
        }).then(data => {
            console.log(data);
            setErrors(data.detail);
            setErreurUsername(data.username);
            setErreurAddress(data.address);
            setErreurTel(data.tel);
        })
      }
    return(
        <div className="inscription">
            {
            reussi? <Redirect to='/HomePage' /> : null
            }
            <form >
            <div className="inputField">
                    <div className="icon">
                        <BsFillPersonFill />
                    </div>
                    <input
                        type="text"
                        // requiered
                        
                        placeholder="Nom"
                        value = {nom}
                        onChange = {(e) => setNom(e.target.value)}
                    />
                </div>
                {erreurUsername ? <p style={{color: 'red'} }>{erreurUsername}</p> : null}
                <div className="inputField">
                    <div className="icon">
                        <FaRegAddressBook />
                    </div>
                    <input
                        type="text"
                        // requiered
                        placeholder="Adresse"
                        value = {adresse}
                        onChange = {(e) => setAdresse(e.target.value)}
                    />    
                </div>
                {erreurAddress ? <p style={{color: 'red'} }>{erreurAddress}</p> : null}
                <div className="inputField">
                    <div className="icon">
                        <BsFillTelephoneFill />
                    </div>
                    <input
                        type="tel"
                        placeholder="Numéro de téléphone"
                        value = {tel}
                        onChange = {(e) => setTel(e.target.value)}
                    />
                </div>
                {erreurTel ? <p style={{color: 'red'} }>{erreurTel}</p> : null}
                <div className="inputField">
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange = {(e) => setImage(e.target.value)}
                    />
                </div>
            </form> 
            <div className="insc">
                <button type='submit' onClick={update}> Confirmer</button>
            </div>
            <br></br>
            {/* <div>
                {erreur? <p>{erreur}</p> : null}
            </div> */}
        </div>
    );
}