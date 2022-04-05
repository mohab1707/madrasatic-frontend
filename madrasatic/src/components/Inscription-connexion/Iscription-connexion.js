import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import './index.css';
export const InscriptionOuConnexion=() => {
  return (
        <div className="auth">
            <div className="auth1">
                <Link to="/">S'identifier</Link>
                <hr></hr>
            </div>
            <div className="auth2">
                <Link to="/Inscription">S'inscrire</Link>
                <hr></hr>
            </div>      
        </div>
  );
}