import { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom"
import { MDBContainer } from 'mdb-react-ui-kit';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {BsCalendar2DateFill} from 'react-icons/bs'
import ReactPaginate from "react-paginate";
import './annonce.css'
// import './Declaration.css'
export const AfficherAnnonces=()=>{
    const [annonces,setAnnonces]=useState([]);
    const [nombre,setNombre]=useState("");
    const [nombrePages,setNombresPages]=useState("");
    const [pageCourrente,setPageCourrente]=useState();
    const token = sessionStorage.getItem("key");
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/madrasatic/annonceslist/", {
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
        setAnnonces(data.results);
        setNombre(data.count);
        setNombresPages(Math.ceil(data.count /5));
      });
    },[]);
    const ChangePage=((data)=>{
        console.log(data.selected);
        setPageCourrente(data.selected+1);
        if(data.selected == 0){
          fetch("http://127.0.0.1:8000/madrasatic/annonceslist/", {
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
              setAnnonces(data.results);
            });
        }else{
          fetch(`http://127.0.0.1:8000/madrasatic/annonceslis/?page=${data.selected + 1}`, {
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
              setAnnonces(data.results);
            });
        }
      })
    return(
        <div>
        <MDBContainer className='categories'>
            {/* <h2 id='title'>Liste des annonces</h2>
            <hr style={{border: '2px solid #b78429'}}/> */}
            <br></br>
            <div className="blog-list">
            <div class="event-schedule-area-two bg-color pad10">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade active show" id="home" role="tabpanel">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">Date</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Objet et dates</th>
                                                <th scope="col" style={{width :'20%'}}>Corps</th>
                                                {/* <th class="text-center" scope="col">Venue</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            annonces.map(ann =>(
                                                <tr class="inner-box">
                                                <th scope="row">
                                                    <div class="event-date">
                                                        <span>{ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +4, 
                                                            ann.pubDate.lastIndexOf("T")
                                                        )}</span>
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '01' ?  <p>Janvier</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '02' ?  <p>Fevrier</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '03' ?  <p>Mars</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '04' ?  <p>Avril</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '05' ?  <p>Mai</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '06' ?  <p>Juin</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '07' ?  <p>Juillet</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '08' ?  <p>Août</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '09' ?  <p>Semptembre</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '10' ?  <p>Octobre</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '11' ?  <p>Novembre</p> : null
                                                        }
                                                        {
                                                           ann.pubDate.substring(
                                                            ann.pubDate.indexOf("-") +1, 
                                                            ann.pubDate.lastIndexOf("-")
                                                        ) === '12' ?  <p>Décembre</p> : null
                                                        }
                            
                                                    </div>
                                                </th>
                                                <td>
                                                    <div class="event-img">
                                                        <img src={ann.image} alt="image" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="event-wrap">
                                                        <h3 style={{fontWeight: 'bold'}}><a href="">{ann.objet}</a></h3>
                                                        <div class="meta">
                                                            <div class="time">
                                                                <span>
                                                                    <BsCalendar2DateFill style={{width :'7%'}}/>
                                                                    {'                     '}
                                                                    {ann.pubDate.substring(
                                                                        0,
                                                                        ann.pubDate.indexOf("T")
                                                                    )}
                                                                    {'                     '}
                                                                    {ann.pubDate.substring(
                                                                        ann.pubDate.indexOf("T") + 1,
                                                                        ann.pubDate.indexOf("Z")
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div class="time">
                                                                <span>
                                                                    <BsCalendar2DateFill style={{width :'7%'}}/>
                                                                    {ann.dateFin.substring(
                                                                        0,
                                                                        ann.dateFin.indexOf("T")
                                                                    )}
                                                                    {'  '}
                                                                    {ann.dateFin.substring(
                                                                        ann.dateFin.indexOf("T") + 1,
                                                                        ann.dateFin.indexOf("Z")
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="event-date">
                                                        <span style={{fontWeight: 'bold'}}>{ann.corps}</span>
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    <div class="primary-btn">
                                                        <a class="btn btn-primary" href="#">Read More</a>
                                                    </div>
                                                </td> */}
                                            </tr>
                                            ))
                                        }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
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
    </div>
    
    )
}