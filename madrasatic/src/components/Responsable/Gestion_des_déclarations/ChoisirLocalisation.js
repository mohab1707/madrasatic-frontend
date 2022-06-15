import React , { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
export const ChoisirLocalisation = () => {
  return (
    <div >
        <br></br><br></br><br></br><br></br>
        <div className="card" style={{ width :'600px',marginLeft:'30%',borderRadius:'8px',border:'2px solid #b78429'}}>
            <div className="email" style={{}}>
                    <label style={{color:'black'}}><b>Que vouliez vous ajouter ?</b></label>
                    <table style={{marginLeft:'10%'}}>
                        <tr>
                            <td >
                                <a href='/AjouterSite' style={{color:'#24344f'}}>Un site ?</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href='/AjouterBloc' style={{color:'#24344f'}}>Un bloc ?</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href='/AjouterEndroit' style={{color:'#24344f'}}>Un endroit ?</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href='/AjouterIdentification' style={{color:'#24344f'}}>Une identification ?</a>
                            </td>
                        </tr>
                    </table>
                    <br></br>
            </div>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
    
  )
}
