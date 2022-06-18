import { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Table} from 'react-bootstrap';
import './Declaration.css'
import { MDBContainer } from 'mdb-react-ui-kit';
import {BsCalendar2Date } from 'react-icons/bs'
import { RiAppleFill } from 'react-icons/ri';
import {AiOutlineDelete} from 'react-icons/ai'
import {BiTime} from 'react-icons/bi'
import ReactPaginate from "react-paginate";
export const MesRapportsEnregistrées =()=>{
    const token = sessionStorage.getItem("key");
    const[MyData,setMyData]=useState([]);
    const [completer,setCompleter]=useState(false);
    const [idRapport,setIdRapport]=useState();
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState();
    const path=sessionStorage.getItem("path");
    useEffect(()=>{
      fetch(path+"madrasatic/draft_reports/", {
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
        fetch(path+"madrasatic/draft_reports/", {
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
        fetch(path+`madrasatic/draft_reports/?page=${data.selected + 1}`, {
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
        fetch(path+`madrasatic/draft_reports/${idRapp}/`, {
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
        {completer ? <Redirect to={`/ModifierRapportEnregistré/${idRapport}`}/> :null}
                    <div class="container d-flex justify-content-center">

<ul class="list-group mt-5 text-white">
{MyData.map(rapport => (
  <li class="list-group-item d-flex justify-content-between align-content-center">
  
    <div class="d-flex flex-row" onClick={(e)=>complet(rapport.id)}>
      <img src="https://img.icons8.com/color/100/000000/folder-invoices.png" width="40" />
      <div class="ml-2">
        <h6 class="mb-0">{rapport.title}</h6>
        <div class="about">
          <span><BsCalendar2Date style={{width :'8%',marginBottom:'3px',marginRight:'2px'}}/>
            {rapport.created_on.substring(
                0,
                rapport.created_on.indexOf("T")
            )}
            </span>
          <span>
            <BiTime style={{width :'10%',marginBottom:'3px'}}/>
            {rapport.created_on.substring(
                rapport.created_on.indexOf("T") + 1,
                rapport.created_on.indexOf("T")+6
            )}</span>
        </div>
      </div>
    </div>
    <div class="check" style={{
                position: "absolute",
                left:"90%",
                fontSize:"25px",
                // right:"10%",
                marginTop: "0%",
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