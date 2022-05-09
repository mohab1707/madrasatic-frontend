import { Link } from "react-router-dom";
import './Declaration.css'
export const AfficherDeclaration= ( {declaration}) => {
    return (
        <div className="blog-list">
      {declaration.map(dec => (
          <div className="blog-preview" >
            <Link to="/HomePage">
              <h2>Objet :{dec.objet}</h2>
              <p>Catégorie :{dec.catégorie}</p>
              <p>priorité :{dec.priorité}</p>
            </Link>
          </div>
      ))} 
  </div>
    );
}