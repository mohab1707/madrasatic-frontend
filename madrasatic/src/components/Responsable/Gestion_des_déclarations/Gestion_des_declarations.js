import React , { useState ,useEffect} from 'react';
import { TableDeclarationEnvoyee } from './TableDeclarationEnvoyee';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
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
    } from 'mdb-react-ui-kit';
    import { Redirect } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Pusher from 'pusher-js';
export const Gestion_des_declarations = () => {
    const [showNavRight, setShowNavRight] = useState(false);
    const [reussi , setReussi ] = useState(false);
    const path=sessionStorage.getItem("path");
    const [nom,setNom]=useState("");
    const [image,setImage]=useState(null);
    const token = sessionStorage.getItem("key");
    const [isNotifated, setIsNotifated] = useState(false);
    useEffect(()=>{
        fetch(path+"madrasatic/user/", {
          method: "GET",
          headers: { "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization":`Token ${token}` },
        }).then((response) => {
            return response.json();
        }).then((data)=>{
            setImage(data.img);
            setNom(data.username);
        })
    },[]);
    useEffect(()=>{
          const pusher = new Pusher("718db103e05e52a72795", {
            cluster: "eu",
            authEndpoint: path+"madrasatic/pusher/auth",
          });
          var channel3 = pusher.subscribe("Declaration");
          channel3.bind("Modification", function ({ message }) {
            setIsNotifated(true);
            return toast(message.title + message.body);
          });
          var channel4 = pusher.subscribe("Rapport");
          channel4.bind("Creation", function ({ message }) {
            setIsNotifated(true);
            return toast(message.title + message.body);
          });
    },[isNotifated])
    const deconnexion =(e) => {
        e.preventDefault();
        fetch(path+"madrasatic/logout/", {
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
        <MDBNavbar expand='lg' light style={{backgroundColor:'#24344f'}} fixed='top'>
            <MDBContainer fluid>
            <MDBNavbarBrand href=''style={{color:'#ffffff'}}>{
                image ? <img src={image} alt='Une image' style={{borderRadius:'50%',width:'50px',height:'50px'}} /> : null
            } {nom}</MDBNavbarBrand>

            <MDBNavbarToggler
            type='button'
            data-target='#navbarRightAlignExample'
            aria-controls='navbarRightAlignExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavRight(!showNavRight)}
            style={{color:'#ffffff'}}
            >
            <MDBIcon icon='bars' fas style={{color:'#ffffff'}} />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showNavRight}>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/HomeResponsable' style={{color:'#ffffff'}}>Déclarations</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/ListesAnnoncesPubliées' style={{color:'#ffffff'}}>Annonces</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/NewCatégorie' style={{color:'#ffffff'}}>Nouvelle catégorie</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle tag='a' className='nav-link' style={{color:'#ffffff'}}>
                                
                                 <i class="fas fa-user" style={{color:'#ffffff'}}></i>
        
                            </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/ProfilResponsable'>Mon Profil</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/Categories'>Catégories</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/ChoixLocalisation'>Ajouter localisation</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBDropdownLink href='/ResponsableNotifications'>Notifications</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBBtn className='text-white' color='dark' onClick={deconnexion}>Se déconnecter</MDBBtn>
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
