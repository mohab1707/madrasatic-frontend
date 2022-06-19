import React , { useState ,useEffect} from 'react'
  import 'react-toastify/dist/ReactToastify.css';
  import ReactPaginate from "react-paginate";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { SemanticToastContainer, toast } from "react-semantic-toasts";
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import {IoNotificationsSharp} from "react-icons/io5"
export const ResponsableNotifications = () => {
    const token = sessionStorage.getItem("key");
    const path=sessionStorage.getItem("path");
    const [notification ,setNotification]=useState([]);
    const [pageCourrente,setPageCourrente]=useState(0);
    const [nombre,setNombre]=useState("");
    const [nombrePages,setNombresPages]=useState("");
    const [id,setIdUser]=useState()
    useEffect(()=>{
        fetch(path+"madrasatic/user/", {
            method: "GET",
            headers: { "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Token ${token}` },
          }).then((response) => {
              return response.json();
          }).then((data)=>{
              setIdUser(data.id);
              console.log("iddd "+ data.id)
          });
          fetch(path+"madrasatic/notifications/", {
            method: "GET",
            headers: { "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Token ${token}` },
          }).then((response) => {
              return response.json();
          }).then((data)=>{
              setNotification(data.results);
              setNombre(data.count);
              setNombresPages(Math.ceil(data.count /5));
              data.results.filter(item => item.user == id).map(item =>{
                console.log(item.title)
              })
            })
    },[]);
    useEffect(()=>{
        if(pageCourrente == 0){
            fetch(path+"madrasatic/notifications/", {
                method: "GET",
                headers: { "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}` },
              }).then((response) => {
                  return response.json();
              }).then((data)=>{
                  setNotification(data.results);
                  setNombre(data.count);
                  setNombresPages(Math.ceil(data.count /5));
              })
        }else{
            fetch(path+"madrasatic/notifications/?page="+pageCourrente, {
                method: "GET",
                headers: { "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":`Token ${token}` },
              }).then((response) => {
                  return response.json();
              }).then((data)=>{
                  setNotification(data.results);
              })
        }
        
    },[notification]);
    const ChangePage=((data)=>{
        setPageCourrente(data.selected);
      })
  return (
    <>
    {
            notification.filter(item => item.responsable === id).filter( item => item.user === null).map(notif=>(
                <div class="container d-flex justify-content-center">
                    <div class="card mt-5 p-3">
                    <div class="media">
                        <IoNotificationsSharp  style={{color:'black',fontWeight:'bold'}}/>
                        <div class="media-body">
                            <h6 class="mt-2 mb-0" style={{color:'black',fontWeight:'bold'}}>{notif.title}</h6>
                            <p style={{width:'400px'}}>{notif.body}</p>
                            <small class="text" style={{color:'black'}}>
                            {
                                notif.created_on.substring(
                                    0,
                                notif.created_on.indexOf("T")
                                )
                            }
                            </small>
                        </div>
                    </div>
                </div>
            </div>
))}
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
</>
  )
}
