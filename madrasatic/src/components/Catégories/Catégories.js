import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineDelete} from "react-icons/ai"
import { MDBContainer } from 'mdb-react-ui-kit';
import ReactPaginate from "react-paginate";
export const Categories = () => {
    const [catégories,setCatégories]=useState ([]);
    const [nbD,setNbD]=useState();
    const [reussi , setReussi ] = useState(false);
    const token = sessionStorage.getItem("key");
    const [nombreDecla,setNombreDecla]=useState(0);
    const[data,setMyData]=useState([]);
    function refreshPage() {
        window.location.reload(false);
      }
      useEffect(()=>{
        fetch("http://127.0.0.1:8000/madrasatic/responsable_declarations/", {
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
            setNombreDecla(Math.ceil(data.count /5));
            setMyData(data.results);
          });
          fetch("http://127.0.0.1:8000/madrasatic/categories/", {
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
            setCatégories(data);
          });
      },[])
      useEffect(()=>{
        if(nombreDecla > 0){
          fetch(`http://127.0.0.1:8000/madrasatic/responsable_declarations/?page=${nombreDecla}`, {
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
              setNombreDecla(nombreDecla - 1);
              setMyData(previousState =>(
                [...previousState,data.results]
            ));
            });
        }
      },[nombreDecla])
    const supprimerCatégorie=((id)=>{     
               if (data.some(item=> item.catégorie === id)){
                console.log("existe deja ne doit pas etre supprimerrr dans : ");
              }else{
                fetch(`http://127.0.0.1:8000/madrasatic/categories/${id}/`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization":`Token ${token}`
                },
              }).then((response) => {
                  return response.json();
                })
              }
    })
  return (
    <MDBContainer className='categories'>
       <h2 id='title'>Liste des catégories</h2>
       <hr style={{border: '2px solid #b78429'}}/>
      <div className="blog-list" style={{width:'55%',marginLeft:'20%'}}>
      {catégories.map(cat => (
        <div className="blog-categorie" key={cat.id} >
            <div style={{
                position: "absolute",
                left:"65%",
                fontSize:"25px",
                // right:"10%",
                marginTop: "0%",
                padding: "0% 0%",
                color: "red",
            }} onClick={()=>{supprimerCatégorie(cat.id)}}>
                <AiOutlineDelete />
            </div>
            <h2>{ cat.name }</h2>
            
        </div>
      ))}
    </div>
    </MDBContainer>
    
  );
}