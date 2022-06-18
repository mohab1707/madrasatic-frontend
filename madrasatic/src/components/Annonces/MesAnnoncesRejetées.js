import { useEffect, useState } from 'react';
import {Redirect } from "react-router-dom";
// import './Decla.css'
import { MDBContainer } from 'mdb-react-ui-kit';
import {BsCalendar2Date } from 'react-icons/bs'
import {AiOutlineDelete} from 'react-icons/ai'
import {BiTime} from 'react-icons/bi'
import ReactPaginate from "react-paginate";
export const MesAnnoncesRejetées =()=>{
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState([]);
    const [completer,setCompleter]=useState(false);
    const [idRapport,setIdRapport]=useState();
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState();
    const path=sessionStorage.getItem("path");
    useEffect(()=>{
      fetch(path+"madrasatic/annonce_rejection/", {
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
            setMyData(data);
          });
    },[MyData])
    return(
    <MDBContainer >
        <div class="container d-flex justify-content-center">

<ul class="list-group mt-5 text-white">
{MyData.map(rapport => (
  <li class="list-group-item d-flex justify-content-between align-content-center">
  
    <div class="d-flex flex-row" >
    <div class="event-img">
        {/* <img /> */}
    </div>
      <div class="ml-2">
        
        <h6 class="mb-0" style={{fontWeight:'bold'}}>{rapport.raison} {rapport.annonce}</h6>
        {/* <div class="about">
          <span><BsCalendar2Date style={{width :'8%',marginBottom:'3px',marginRight:'2px'}}/>
            {rapport.cre}
            </span>
        </div>
        <div class="about">
          <span><BsCalendar2Date style={{width :'8%',marginBottom:'3px',marginRight:'2px'}}/>
            {rapport.dateFin}
            </span>
        </div> */}
      </div>
    </div>
  </li>
  ))} 
  
</ul>

</div>
  </MDBContainer>
    )
}