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
        < Route path="/Home">
          <Gestion_des_comptes></Gestion_des_comptes>
        </Route>
        < Route path="/password-reset-confirm/:uidb64/:token">
          <NavBar />
          <div className='shadow shadow-5'>
            <br></br>
            <RecupererMotDePasseOublie></RecupererMotDePasseOublie>
          </div>
        </Route>
        < Route path="/emailEnvoye">
          <div className='shadow shadow-5'>
              <EmailEnvoye />
            </div>
        </Route>
      </Switch>
     
    </ Router>
    
  );
}