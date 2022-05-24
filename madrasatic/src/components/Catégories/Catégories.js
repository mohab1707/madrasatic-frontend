import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineDelete} from "react-icons/ai"
import { MDBContainer } from 'mdb-react-ui-kit';
import ReactPaginate from "react-paginate";
export const Categories = () => {
    const [catégories,setCatégories]=useState ([]);
    const [reussi , setReussi ] = useState(false);
    const token = sessionStorage.getItem("key");
    const [nombrePages,setNombresPages]=useState();
    const [nombre,setNombre]=useState("");
    const [pageCourrente,setPageCourrente]=useState(0);
    function refreshPage() {
        window.location.reload(false);
      }
      // useEffect(()=>{
      //   fetch("http://127.0.0.1:8000/madrasatic/categories/", {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Accept": "application/json",
      //       "Authorization":`Token ${token}`
      //     },
      //   }).then((response) => {
      //       return response.json();
      //     })
      //     .then((data) => {
      //       setCatégories(data.results);
      //       setNombre(data.count);
      //       setNombresPages(Math.ceil(data.count /5));
      //     });
      // },[])
    useEffect(()=>{
      if(pageCourrente== 0){
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
            setCatégories(data.results);
            setNombre(data.count);
            setNombresPages(Math.ceil(data.count /5));
          });
      }else{
        fetch(`http://127.0.0.1:8000/madrasatic/categories/?page=${pageCourrente + 1}`, {
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
            setCatégories(data.results);
            setNombre(data.count);
            setNombresPages(Math.ceil(data.count /5));
          });
      }
      
    },[catégories]);
    const supprimerCatégorie=((id)=>{
        console.log("id de la cat est : "+id)
        fetch("http://127.0.0.1:8000/madrasatic/categories/"+id+"/", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization":`Token ${token}`
            },
          })
    })
    const ChangePage=((data)=>{
      setPageCourrente(data.selected);
      // if(data.selected == 0){
      //   fetch("http://127.0.0.1:8000/madrasatic/categories/", {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Accept": "application/json",
      //       "Authorization":`Token ${token}`
      //     },
      //   }).then((response) => {
      //       return response.json();
      //     })
      //     .then((data) => {
      //       setCatégories(data.results);
      //     });
      // }else{
      //   fetch(`http://127.0.0.1:8000/madrasatic/categories/?page=${data.selected + 1}`, {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Accept": "application/json",
      //       "Authorization":`Token ${token}`
      //     },
      //   }).then((response) => {
      //       return response.json();
      //     })
      //     .then((data) => {
      //       setCatégories(data.results);
      //     });
      // }
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
    <ReactPaginate 
                                previousLabel={"<<"}
                                nextLabel={">>"}
                                breakLabel={"..."}
                                pageCount={nombrePages}
                                onPageChange={ChangePage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}/>
    </MDBContainer>
    
  );
}