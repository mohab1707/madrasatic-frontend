// import 'bootstrap/dist/css/bootstrap.min.css';
import './Declaration.css'
export const AjoutDeclaration =()=>{
    return(
    <div className="create">
      <h2>Ajouter une déclaration</h2>
      <form >
        <label>Intitulé de la déclaration:</label>
        <input 
          type="text" 
          required 
          placeholder='Nom'
        />
        <label>Déscription de la déclaration:</label>
        <textarea
            placeholder='Déscription'
        ></textarea>
        <label>Catégorie de la déclaration:</label>
        <select>
          <option value="Santé">Santé</option>
          <option value="Sécurité">Sécurité</option>
          <option value="Objet perdu">Objet perdu</option>
          <option value="Hygiène">Hygiène</option>
        </select>
        <label>Photo la décrivant:</label>
        <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
          />
        <button>Enregistrer</button>
        <button>Valider</button>
      </form>
    </div>
    )
}