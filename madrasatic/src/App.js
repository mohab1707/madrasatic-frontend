import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePage } from './components/HomePage';
import { Gestion_des_comptes } from './components/Admin/Gestion_des_comptes/Gestion_des_comptes';
import { NavBar } from './components/Inscription-connexion/NavBar';
import { InscriptionOuConnexion } from './components/Inscription-connexion/Iscription-connexion';
import { Connexion } from './components/Inscription-connexion/Connexion';
import { Inscription } from './components/Inscription-connexion/Inscription';
import { MotDePasseOublie } from './components/Inscription-connexion/MotDePasseOublie';
import { RecupererMotDePasseOublie } from './components/Inscription-connexion/RecupererMotDePasse';
import { EmailEnvoye } from './components/Inscription-connexion/EmailEnvoye';
import { Bare } from './components/PageAcceuil/Bare';
import { Profil } from './components/PageAcceuil/Profil';
import { ChangePassword } from './components/Inscription-connexion/ChangePassword';
import {MDBContainer} from 'mdb-react-ui-kit';
import { TableUsers } from './components/Admin/Gestion_des_comptes/TableUsers';
import { AjoutDeclaration } from './components/Déclarations/AjoutDeclarations';
import { Declaration } from './components/Déclarations/Declaration';
import { Gestion_des_declarations } from './components/Responsable/Gestion_des_déclarations/Gestion_des_declarations';
import { TableDeclarationEnvoyee } from './components/Responsable/Gestion_des_déclarations/TableDeclarationEnvoyee';
import DeclarationEnvoyee from './components/Responsable/Gestion_des_déclarations/DeclarationEnvoyee';
import { DeclarationDelete } from './components/Responsable/Gestion_des_déclarations/DeclarationDelete';
import { DemanderComplement } from './components/Responsable/DemanderComplement';
import { MesDeclarationsEnregistrées } from './components/Déclarations/DeclarationsEnregistrées';
import { MesDéclarationCompleter } from './components/Déclarations/MesDéclarationsACompleter';
import { CompleterDeclaration } from './components/Déclarations/CompleterDeclaration';
import { ModifierDeclarationEnregistrée } from './components/Déclarations/ModifierDeclaEnregistrée';
import { Footer } from './components/Inscription-connexion/Footer';
export default function App() {

  return (
    <Router>
      <Switch >
        < Route exact path="/">
          <NavBar />
          <div className='shadow shadow-5'>
            <br></br>
              <InscriptionOuConnexion />
              <Connexion />
          </div>
          <div style={{marginTop:'150px'}}>
            <Footer></Footer>
          </div>
        </Route>
        < Route exact path="/inscription">
          <NavBar />
          <div className='shadow shadow-5'>
            <br></br>
            <InscriptionOuConnexion />
            <Inscription />
          </div>
        </Route>
        < Route path="/forgetPassword">
          <NavBar />
          <div className='shadow shadow-5'>
            <MotDePasseOublie />
          </div>
          <div style={{marginTop:'150px'}}>
            <Footer></Footer>
          </div>
        </Route>
        < Route exact path="/Home">
          <Gestion_des_comptes></Gestion_des_comptes>
          <MDBContainer fluid>
            <MDBContainer style={{margin:'10%'}}>
               <TableUsers/>
            </MDBContainer>
        </MDBContainer>
        </Route>
        < Route path="/madrasatic/password-reset-confirm/:uidb64/:token">
          <NavBar />
          <br></br>
          <div className='shadow shadow-5'>
            <RecupererMotDePasseOublie></RecupererMotDePasseOublie>
          </div>
        </Route>
        < Route path="/emailEnvoye">
          <div className='shadow shadow-5'>
              <EmailEnvoye />
            </div>
        </Route>
        < Route exact path="/HomePage">
          <Bare />
          {/* <div className='shadow1 shadow-5'> */}
          <br></br>
            <Declaration />
          {/* </div> */}
        </Route>
        < Route exact path="/HomeResponsable">
          <Gestion_des_declarations />
          <br></br>
            <TableDeclarationEnvoyee />
        </Route>
        < Route exact path="/Profil">
          <Bare />
          <div className='shadow1 shadow-5'>
          <br></br>
            <Profil />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'50px' }}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ProfilAdmin">
          <Gestion_des_comptes />
          <div className='shadow1 shadow-5'>
          <br></br>
            <Profil />
          </div>
        </Route>
        < Route exact path="/ChangePassword">
          <Bare />
          <div className='shadow1 shadow-5'>
            <ChangePassword />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'50px' }}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ChangePasswordAdmin">
          <Gestion_des_comptes />
          <div className='shadow1 shadow-5'>
            <ChangePassword />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'50px' }}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/NewDeclaration">
          <Bare />
          <div className='shadow1 shadow-5'>
          <br></br>
            <AjoutDeclaration/>
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'50px' }}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/Declaration">
          <Bare />
          <div className='shadow1 shadow-5'>
          <br></br>
            <Declaration />
          </div>
        </Route>
        < Route exact path="/DeclarationEnvoyer/:id">
          <Gestion_des_declarations />
          <br></br>
            <DeclarationEnvoyee />
        </Route>
        < Route exact path="/RejeterDecla/:id">
          <Gestion_des_declarations />
          <div className='shadow1 shadow-5'>
            <DeclarationDelete />
          </div>
        </Route>
        < Route exact path="/DeclarationIncomplete/:id">
          <Gestion_des_declarations />
          <div className='shadow1 shadow-5'>
            <DemanderComplement />
          </div>
        </Route>
        < Route exact path="/MesDéclarationsACompleter">
        <Bare />
          {/* <div className='shadow1 shadow-5'> */}
            <MesDéclarationCompleter />
          {/* </div> */}
        </Route>
        < Route exact path="/MesDeclarationsEnregistrées">
          <Bare />
          {/* <div className='shadow1 shadow-5'> */}
            <MesDeclarationsEnregistrées />
          {/* </div> */}
        </Route>
        < Route exact path="/CompleterDeclaration/:idDeclaration">
          <Bare />
          <div className='shadow1 shadow-5'>
          <br></br>
            <CompleterDeclaration />
          </div>
        </Route>
        < Route exact path="/ModifierDeclarationEnregistrée/:idDeclaration">
          <Bare />
          <div className='shadow1 shadow-5'>
          <br></br>
            <ModifierDeclarationEnregistrée />
          </div>
        </Route>
      </Switch>
     
    </ Router>
    
  );
}