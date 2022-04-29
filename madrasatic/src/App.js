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
          <div className='shadow1 shadow-5'>
          <br></br>
            <Declaration />
          </div>
        </Route>
        < Route exact path="/Profil">
          <Bare />
          <div className='shadow1 shadow-5'>
          <br></br>
            <Profil />
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
        </Route>
        < Route exact path="/ChangePasswordAdmin">
          <Gestion_des_comptes />
          <div className='shadow1 shadow-5'>
            <ChangePassword />
          </div>
        </Route>
        < Route exact path="/NewDeclaration">
          <Bare />
          <div className='shadow1 shadow-5'>
          <br></br>
            <AjoutDeclaration/>
          </div>
        </Route>
        < Route exact path="/Declaration">
          <Bare />
          <div className='shadow1 shadow-5'>
          <br></br>
            <Declaration />
          </div>
        </Route>
      </Switch>
     
    </ Router>
    
  );
}