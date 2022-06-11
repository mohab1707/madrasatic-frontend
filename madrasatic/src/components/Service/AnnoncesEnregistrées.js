import { useEffect, useState } from 'react';
import {Redirect } from "react-router-dom";
import './Decla.css'
import { MDBContainer } from 'mdb-react-ui-kit';
import {BsCalendar2Date } from 'react-icons/bs'
import {AiOutlineDelete} from 'react-icons/ai'
import {BiTime} from 'react-icons/bi'
import ReactPaginate from "react-paginate";
export const AnnoncesEnregistrées =()=>{
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState([]);
    const [completer,setCompleter]=useState(false);
    const [idRapport,setIdRapport]=useState();
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState();
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/savedannonces/", {
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
            setMyData(data.results);
            setNombre(data.count);
            setNombresPages(Math.ceil(data.count /5));
          });
    },[MyData])
    const complet =(e)=>{
      setIdRapport(e);
      setCompleter(true);
    }
    const ChangePage=((data)=>{
      console.log(data.selected);
      setPageCourrente(data.selected+1);
      if(data.selected == 0){
        fetch("http://127.0.0.1:8000/madrasatic/draft_reports/", {
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
            setMyData(data.results);
          });
      }else{
        fetch(`http://127.0.0.1:8000/madrasatic/draft_reports/?page=${data.selected + 1}`, {
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
            setMyData(data.results);
          });
      }
    })
    const supprimerRapport=((idRapp)=>{
        fetch(`http://localhost:8000/madrasatic/annoncedelete/${idRapp}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
    })
    })
    return(
    <MDBContainer >
        {completer ? <Redirect to={`/ModifierAnnonceEnregistrée/${idRapport}`}/> :null}
                    <div class="container d-flex justify-content-center">

<ul class="list-group mt-5 text-white">
{MyData.map(rapport => (
  <li class="list-group-item d-flex justify-content-between align-content-center">
  
    <div class="d-flex flex-row" onClick={(e)=>complet(rapport.id)}>
    <div class="event-img">
        <img src={rapport.image} alt="image" style={{width: '60px',
    height: '60px',
    borderRadius: '8px',
    marginTop:'7px'}}/>
    </div>
      <div class="ml-2">
        <h6 class="mb-0" style={{fontWeight:'bold'}}>{rapport.objet}</h6>
        <div class="about">
          <span><BsCalendar2Date style={{width :'8%',marginBottom:'3px',marginRight:'2px'}}/>
            {rapport.pubDate.substring(
                0,
                rapport.pubDate.indexOf("T")
            )}
            </span>
          <span>
            <BiTime style={{width :'10%',marginBottom:'3px'}}/>
            {rapport.pubDate.substring(
                rapport.pubDate.indexOf("T") + 1,
                rapport.pubDate.indexOf("T")+6
            )}</span>
        </div>
        <div class="about">
          <span><BsCalendar2Date style={{width :'8%',marginBottom:'3px',marginRight:'2px'}}/>
            {rapport.dateFin.substring(
                0,
                rapport.dateFin.indexOf("T")
            )}
            </span>
          <span>
            <BiTime style={{width :'10%',marginBottom:'3px'}}/>
            {rapport.dateFin.substring(
                rapport.dateFin.indexOf("T") + 1,
                rapport.dateFin.indexOf("T")+6
            )}</span>
        </div>
      </div>
    </div>
    <div class="check" style={{
                position: "absolute",
                left:"90%",
                fontSize:"25px",
                // right:"10%",
                marginTop: "4%",
                padding: "0% 0%",
                color: "red",
            }} onClick={e=>{supprimerRapport(rapport.id)}}>
      <AiOutlineDelete />
    </div>

  </li>
  ))} 
  
</ul>

</div>
  </MDBContainer>
    )
}