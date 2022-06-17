import React , { useState ,useEffect} from 'react'
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBBtn
    } from 'mdb-react-ui-kit';
import { Redirect } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Pusher from 'pusher-js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { SemanticToastContainer, toast } from "react-semantic-toasts";
import 'react-semantic-toasts/styles/react-semantic-alert.css';
export const Bare = () => {
    const [showNavRight, setShowNavRight] = useState(false);
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [reussi , setReussi ] = useState(false);
    const [user,setUser]=useState(false);
    const [chefClub,setChefClub]=useState(false);
    const token = sessionStorage.getItem("key");
    const [isNotifated, setIsNotifated] = useState(false);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/madrasatic/user/", {
            method: "GET",
            headers: { "Content-Type": "application/json","Authorization":`Token ${token}`},
          }).then((response) => {
              return response.json();
          }).then(data=>{
            console.log(data.role)
            if(data.role === "Président du club"){
                setChefClub(true);
            }
          });

          const pusher = new Pusher("718db103e05e52a72795", {
            cluster: "eu",
            authEndpoint: "http://127.0.0.1:8000/madrasatic/pusher/auth",
          });
          var channel = pusher.subscribe("Declaration");
          channel.bind("Demande complement", function ({ message }) {
            setIsNotifated(true);
            return toast(message.title + message.body);
            
          });
          channel.bind("Modification", function ({ message }) {
            setIsNotifated(true);
            return toast(message.title + message.body);
          });
          channel.bind("Rejet", function ({ message }) {
            setIsNotifated(true);
            return toast(message.title + message.body);
          });
          var channel3 = pusher.subscribe("Annonce");
          channel3.bind("Rejet", function ({ message }) {
            setIsNotifated(true);
            return toast(message.title + message.body);
          });
    },[isNotifated])
    const deconnexion =(e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/madrasatic/logout/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
            if(response.ok)
            {
                setReussi(true);
            }else
            {
                console.log("y'a une erreur");
            }
        })
    }

  return (
    <header>
        {
            reussi? <Redirect to='/' /> : null
        }
        <ToastContainer 
        />
        <MDBNavbar expand='lg' light fixed='top' style={{backgroundColor:'#24344f'}}>
            <MDBContainer fluid>
            <MDBNavbarBrand href='/HomePage'style={{color:'#ffffff'}}>MADRASA-TIC</MDBNavbarBrand>
            <MDBNavbarToggler
            type='button'
            data-target='#navbarRightAlignExample'
            aria-controls='navbarRightAlignExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavRight(!showNavRight)}
            style={{color:'#ffffff'}}
            >
            <MDBIcon icon='bars' fas style={{color:'#ffffff'}}/>
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showNavRight}>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/NewDeclaration' style={{color:'#ffffff'}}>Nouvelle déclaration</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/HomePage' style={{color:'#ffffff'}}>Déclarations</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/LesAnnonces' style={{color:'#ffffff'}}>Annonces</MDBNavbarLink>
                    </MDBNavbarItem>
                    {
                        chefClub ? <MDBNavbarItem>
                        <MDBNavbarLink href='/NewAnnonce' style={{color:'#ffffff'}}>Nouvelle annonce</MDBNavbarLink>
                        </MDBNavbarItem> : null
                    }
                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle tag='a' className='nav-link'style={{color:'#ffffff'}}>
                                
                                 <i class="fas fa-user" style={{color:'#ffffff'}}></i>
        
                            </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/Profil'>Mon Profil</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/MesDeclarationsEnregistrées'>Déclarations enregistrées</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/MesDéclarationsACompleter'>Déclarations à compléter</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/Profil'>Mes annonces</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                {/* <MDBDropdownLink href='/deconnexion'>Se déconnecter</MDBDropdownLink> */}
                                <MDBBtn className='text-white' color='dark' onClick={deconnexion} style={{marginLeft:'25px'}}>Se déconnecter</MDBBtn>
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    </header>
    
  )
}
