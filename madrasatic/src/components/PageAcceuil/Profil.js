// import { useEffect, useState } from "react";
// import { BsFillPersonFill  } from "react-icons/bs";
// import {RiLockPasswordFill} from "react-icons/ri"
// import {MdEmail} from "react-icons/md"
// import { Redirect } from "react-router-dom"
// import {FaRegAddressBook} from "react-icons/fa"
// import {BsFillTelephoneFill} from "react-icons/bs"
// import { MDBTooltip} from 'mdb-react-ui-kit';

// export const Profil = () => {
//     const [nom , setNom] = useState('');
//     const [image , setImage] = useState(null);
//     const [motDePasse , setMotDePasse] = useState('');
//     const [id,setId] = useState();
//     const [adresse , setAdresse] = useState('');
//     const [tel , setTel] = useState('');
//     const [reussi , setReussi ] = useState(false);
//     const [errors, setErrors] = useState();
//     const [erreurUsername,setErreurUsername]=useState();
//     const [erreurAddress,setErreurAddress]=useState();
//     const [erreurTel,setErreurTel]=useState();
//     const token = sessionStorage.getItem("key");
//     useEffect(()=> {
//         fetch("http://127.0.0.1:8000/madrasatic/user/", {
//           method: "GET",
//           headers: { "Content-Type": "application/json",'Accept': 'application/json' , "Authorization":`Token ${token}`}, 
//         }).then((response) => {
//             if(response.ok)
//             {
//                 console.log("donnees recup");
//             }else
//             {
//                 console.log("y'a une erreur");
//             }
//             return response.json();
//         }).then(data => {
//             setAdresse(data.address);
//             setId(data.id);
//             setNom(data.username);
//             setTel(data.tel);
//             // console.log(data);
//         })
//     },[]);
//     const update = (e) => {
//         // let form_data = new FormData();
//         // form_data.append('image', this.image);
//         // form_data.append('', this.state.title);
//         // form_data.append('content', this.state.content);
//         e.preventDefault(); 
//         fetch(`http://localhost:8000/madrasatic/updateprofile/${id}/`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json",'Accept': 'application/json' ,"Authorization":`Token ${token}`},
//           body: JSON.stringify({username : nom , address : adresse , tel : tel , img : image}), 
//         }).then((response) => {
//             if(response.ok)
//             {
//                 console.log("reussi");
//                 setReussi(true);
//             }else
//             {
//                 console.log("y'a une erreur");
//             }
//             return response.json();
//         }).then(data => {
//             console.log(data);
//             console.log(image);
//             setErrors(data.detail);
//             setErreurUsername(data.username);
//             setErreurAddress(data.address);
//             setErreurTel(data.tel);
//         })
//       }
//     // const update = (e) => {
//     //         let form_data = new FormData();
//     //         form_data.append('img', this.state.image, this.state.image.name);
//     //         form_data.append('tel', this.tel);
//     //         form_data.append('address', this.adresse);
//     //         form_data.append('username', this.nom);
//     //         e.preventDefault(); 
//     //         fetch(`http://localhost:8000/madrasatic/updateprofile/${id}/`, {
//     //           method: "PATCH",
//     //           headers: { 'content-type': 'multipart/form-data','Accept': 'application/json' ,"Authorization":`Token ${token}`},
//     //           body: form_data
//     //         }).then((response) => {
//     //             if(response.ok)
//     //             {
//     //                 console.log("reussi");
//     //                 setReussi(true);
//     //             }else
//     //             {
//     //                 console.log("y'a une erreur");
//     //             }
//     //             return response.json();
//     //         }).then(data => {
//     //             console.log(data);
//     //             console.log(image);
//     //             setErrors(data.detail);
//     //             setErreurUsername(data.username);
//     //             setErreurAddress(data.address);
//     //             setErreurTel(data.tel);
//     //         })
//     //       }
//     return(
//         <div className="inscription">
//             {
//             reussi? <Redirect to='/HomePage' /> : null
//             }
//             <form >
//             <div className="inputField">
//                     <div className="icon">
//                         <BsFillPersonFill />
//                     </div>
//                     <input
//                         type="text"
//                         // requiered
                        
//                         placeholder="Nom"
//                         value = {nom}
//                         onChange = {(e) => setNom(e.target.value)}
//                     />
//                 </div>
//                 {erreurUsername ? <p style={{color: 'red'} }>{erreurUsername}</p> : null}
//                 <div className="inputField">
//                     <div className="icon">
//                         <FaRegAddressBook />
//                     </div>
//                     <input
//                         type="text"
//                         // requiered
//                         placeholder="Adresse"
//                         value = {adresse}
//                         onChange = {(e) => setAdresse(e.target.value)}
//                     />    
//                 </div>
//                 {erreurAddress ? <p style={{color: 'red'} }>{erreurAddress}</p> : null}
//                 <div className="inputField">
//                     <div className="icon">
//                         <BsFillTelephoneFill />
//                     </div>
//                     <input
//                         type="tel"
//                         placeholder="Numéro de téléphone"
//                         value = {tel}
//                         onChange = {(e) => setTel(e.target.value)}
//                     />
//                 </div>
//                 {erreurTel ? <p style={{color: 'red'} }>{erreurTel}</p> : null}
//                 <div className="inputField">
//                     <input
//                         type="file"
//                         accept="image/jpeg,image/png,image/gif"
//                         onChange = {(e) => setImage(e.target.files[0])}
//                     />
//                 </div>
//             </form> 
//             <div className="insc">
//                 <button type='submit' onClick={update}> Confirmer</button>
//             </div>
//             <br></br>
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Redirect } from "react-router-dom";
import { FaRegAddressBook } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MDBTooltip } from "mdb-react-ui-kit";

export const Profil = () => {
  const [nom, setNom] = useState("");
  const [image, setImage] = useState(null);
  const [motDePasse, setMotDePasse] = useState("");
  const [id, setId] = useState();
  const [adresse, setAdresse] = useState("");
  const [tel, setTel] = useState("");
  const [reussi, setReussi] = useState(false);
  const [errors, setErrors] = useState();
  const [erreurUsername, setErreurUsername] = useState();
  const [erreurAddress, setErreurAddress] = useState();
  const [erreurTel, setErreurTel] = useState();
  const token = sessionStorage.getItem("key");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/madrasatic/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
    }).then((response) => {
        if (response.ok) {
          console.log("donnees recup");
        } else {
          console.log("y'a une erreur");
        }
        return response.json();
      })
      .then((data) => {
        setAdresse(data.address);
        setId(data.id);
        setNom(data.username);
        setTel(data.tel);
        // console.log(data);
      });
  }, []);
  const update = (e) => {
    const form_data = new FormData();
    form_data.append("username",nom);
    form_data.append("address", adresse);
    form_data.append("tel", tel);
    form_data.append('img', image);
    e.preventDefault();
    console.log("img "+image+ " username "+nom+" tel "+tel);
    fetch(`http://localhost:8000/madrasatic/updateprofile/${id}/`, {
      method: "PATCH",
      headers: {
        // 'Content-Type': 'multipart/form-data',
        "Authorization":`Token ${token}`
      },
      body: form_data,
    })
      .then((response) => {
        if (response.ok) {
          console.log("reussi");
          setReussi(true);
        } else {
          console.log("y'a une erreur  ");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(image);
        setErrors(data.detail);
        setErreurUsername(data.username);
        setErreurAddress(data.address);
        setErreurTel(data.tel);
      });
  };
  // const update = (e) => {
  //         let form_data = new FormData();
  //         form_data.append('img', this.state.image, this.state.image.name);
  //         form_data.append('tel', this.tel);
  //         form_data.append('address', this.adresse);
  //         form_data.append('username', this.nom);
  //         e.preventDefault();
  //         fetch(http://localhost:8000/madrasatic/updateprofile/${id}/, {
  //           method: "PATCH",
  //           headers: { 'content-type': 'multipart/form-data','Accept': 'application/json' ,"Authorization":`Token ${token}`},
  //           body: form_data
  //         }).then((response) => {
  //             if(response.ok)
  //             {
  //                 console.log("reussi");
  //                 setReussi(true);
  //             }else
  //             {
  //                 console.log("y'a une erreur");
  //             }
  //             return response.json();
  //         }).then(data => {
  //             console.log(data);
  //             console.log(image);
  //             setErrors(data.detail);
  //             setErreurUsername(data.username);
  //             setErreurAddress(data.address);
  //             setErreurTel(data.tel);
  //         })
  //       }
  return (
    <div className="inscription">
      {reussi ? <Redirect to="/HomePage" /> : null}
      <form>
        <div className="inputField">
          <div className="icon">
            <BsFillPersonFill />
          </div>
          <input
            type="text"
            // requiered

            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        {erreurUsername ? (
          <p style={{ color: "red" }}>{erreurUsername}</p>
        ) : null}
        <div className="inputField">
          <div className="icon">
            <FaRegAddressBook />
          </div>
          <input
            type="text"
            // requiered
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>
        {erreurAddress ? <p style={{ color: "red" }}>{erreurAddress}</p> : null}
        <div className="inputField">
          <div className="icon">
            <BsFillTelephoneFill />
          </div>
          <input
            type="tel"
            placeholder="Numéro de téléphone"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        {erreurTel ? <p style={{ color: "red" }}>{erreurTel}</p> : null}
        <div className="inputField">
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </form>
      <div className="insc">
        <button type="submit" onClick={update}>
          {" "}
          Confirmer
        </button>
      </div>
      <br></br>
    </div>
  );
};