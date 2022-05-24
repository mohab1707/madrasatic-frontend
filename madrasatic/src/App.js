import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import { AjoutCatégorie } from './components/Catégories/NouvelleCatégorie';
import { Categories } from './components/Catégories/Catégories';
import { ListeDeclaPourAttacher } from './components/Responsable/Gestion_des_déclarations/ListeDeclaPourAttacher';
import {service_worker} from './components/Notifications/service-worker';
import { HomeService } from './components/Service/HomeService';
import { BareService } from './components/Service/BareService';
import DetailDeclaration from './components/Service/DetailDeclaration';
import { AjoutRapport } from './components/Rapports/AjoutRapport';
import { MesRapportsEnregistrées } from './components/Rapports/RapportsEnregistrés';
import { ModifierRapportEnregistrée } from './components/Rapports/ModifierRapportEnregistré';
import { AfficherRapports } from './components/Responsable/gestion_rapports/AfficherRapports';
import DetailRapport from './components/Responsable/gestion_rapports/DetailsRapport';
import { DemanderComplementRapport } from './components/Responsable/gestion_rapports/DemanderComplementRapport';
export default function App() {

  return (
    <Router>
      <Switch >
        < Route exact path="/">
          <NavBar />
          <div className='shadow shadow-5' style={{marginLeft:'27%'}}>
            <br></br>
              <InscriptionOuConnexion />
              <Connexion />
          </div>
          <div style={{marginTop:'3%'}}>
            <Footer></Footer>
          </div>
        </Route>
        < Route exact path="/inscription">
          <NavBar />
          <div className='shadow shadow-5' style={{marginLeft:'27%'}}>
            <br></br>
            <InscriptionOuConnexion />
            <Inscription />
          </div>
          <div style={{marginTop:'3%'}}>
            <Footer></Footer>
          </div>
        </Route>
        < Route path="/forgetPassword">
          <NavBar />
          <div className='shadow shadow-5' style={{marginLeft:'27%'}}>
            <MotDePasseOublie />
          </div>
          <div style={{marginTop:'3%'}}>
            <Footer></Footer>
          </div>
        </Route>
        < Route exact path="/Home">
          <Gestion_des_comptes></Gestion_des_comptes>
          <div className='gestiondescomptes'>
            <br />
               <TableUsers/>
               <br /><br />
        </div>
        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
        </div>
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
          <div className='listedeclarations'>
          <br></br>
            <Declaration />
            <br /><br />
          </div> 
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/HomeResponsable">
          <Gestion_des_declarations />
          <div className='listedeclarations'>
            <br />
            <TableDeclarationEnvoyee />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/AttacherDeclaration/:idparent">
          <Gestion_des_declarations />
          <br></br>
          <div className='listedeclarations'>
            <br />
            <ListeDeclaPourAttacher />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/Profil">
          <Bare />
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
          <br></br>
            <Profil />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'4%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ProfilAdmin">
          <Gestion_des_comptes />
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
          <br></br>
            <Profil />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'4%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ProfilResponsable">
          <Gestion_des_declarations/>
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
          <br></br>
            <Profil />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'4%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ProfilService">
          <BareService/>
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
          <br></br>
            <Profil />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'4%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/NewCatégorie">
          <Gestion_des_declarations/>
          <div className='ajoutcategorieclass'>
          <br></br>
            <AjoutCatégorie />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/Categories">
          <Gestion_des_declarations />
          <div className='categoriesclass'>
            <br />
            <Categories />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ChangePassword">
          <Bare />
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
            <ChangePassword />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'5.5%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ChangePasswordAdmin">
          <Gestion_des_comptes />
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
            <ChangePassword />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'5.5%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ChangePasswordResponsable">
           <Gestion_des_declarations/>
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
            <ChangePassword />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'5.5%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ChangePasswordService">
          <BareService />
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
            <ChangePassword />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'5.5%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/NewDeclaration">
          <Bare />
          <div className='ajoutdeclarationclass'>
          <br></br>
            <AjoutDeclaration/>
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/Declaration">
          <Bare />
          <div className='listedeclarations'>
          <br></br>
            <Declaration />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/DeclarationEnvoyer/:id">
          <Gestion_des_declarations />
          <div className='listedeclarations'>
            <br />
            <DeclarationEnvoyee />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/RejeterDecla/:id">
          <Gestion_des_declarations />
          <div className='shadow1 shadow-5'>
            <DeclarationDelete />
          </div>
        </Route>
        < Route exact path="/DeclarationIncomplete/:id">
          <Gestion_des_declarations />
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
            <DemanderComplement />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',position:'fixed', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/MesDéclarationsACompleter">
        <Bare />
          <div className='mesdeclarations'>
            <br />
            <MesDéclarationCompleter />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/MesDeclarationsEnregistrées">
          <Bare />
          <div className='mesdeclarations'> 
          <br />
            <MesDeclarationsEnregistrées />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/CompleterDeclaration/:idDeclaration">
          <Bare />
          <div className='ajoutdeclarationclass'>
          <br></br>
            <CompleterDeclaration />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ModifierDeclarationEnregistrée/:idDeclaration">
          <Bare />
          <div className='ajoutdeclarationclass'>
          <br></br>
            <ModifierDeclarationEnregistrée />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/service-worker.js">
            <service_worker />
        </Route>
        < Route exact path="/HomeService">
            <BareService />
            <div className='listedeclarations'>
              <br />
              <HomeService />
              <br /><br />
            </div>
            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/DeclarationDetail/:id">
        <BareService />
          <div className='listedeclarations'>
            <br />
            <DetailDeclaration />
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/AjoutRapport/:id">
        <BareService />
          <div className='ajoutdeclarationclass'>
          <br></br>
            <AjoutRapport/>
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/RapportsEnregistrés">
          <BareService />
          <div className='ajoutdeclarationclass'>
          <br></br>
            <MesRapportsEnregistrées/>
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/ModifierRapportEnregistré/:idRapport">
          <BareService />
          <div className='ajoutdeclarationclass'>
          <br></br>
            <ModifierRapportEnregistrée/>
            <br /><br />
          </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%' , left: '0', bottom: '0', width: '100%'}}>
            &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/Rapports">
          <Gestion_des_declarations />
          <div className='ajoutdeclarationclass'>
            <br />
            <AfficherRapports />
            <br /><br />
            </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/DetailRapport/:idRapport">
          <Gestion_des_declarations />
          <div className='ajoutdeclarationclass'>
            <br />
            <DetailRapport />
            <br /><br />
            </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'0%', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
        < Route exact path="/RapportIncomplet/:idRapport">
          <Gestion_des_declarations />
          <div className='shadow1 shadow-5' style={{marginLeft:'27%'}}>
            <DemanderComplementRapport />
            </div>
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',position:'fixed', left: '0', bottom: '0', width: '100%'}}>
              &copy; {new Date().getFullYear()} Copyright:{'Futuristic Community'}
          </div>
        </Route>
      </Switch>
    </ Router>
    
  );
}