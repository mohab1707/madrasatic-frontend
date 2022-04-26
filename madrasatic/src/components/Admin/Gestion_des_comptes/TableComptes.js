import React, { useEffect, useState } from "react";
import SortableTbl from "react-sort-search-table";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { SelectRole } from "./SelectRole";
import { ActiverDesactiver } from "./ActiverDesactiver";


export const TableComptes = () => {
    const Wrap = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;
const token = sessionStorage.getItem("key");
const[MyData,setMyData]=useState(null);
useEffect(() => {
    fetch("http://127.0.0.1:8000/madrasatic/manageusers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":`Token ${token}`
      },
    }).then((response) => {
        if (response.ok) {
          console.log("donnees recup");
        } else {
          console.log("y'a une erreur");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.results);
		setMyData(data.results);
		
      });
  }, []);
const AffecterRole = (props) => {
	const { rowData, tdData } = props;
	function editRol() {
		alert("Affecter Role " + rowData.Role);
		console.log(rowData, tdData);
	}
	return (
		<td>
            <SelectRole onClick={editRol}></SelectRole>
		</td>
	);
};

const ChangerEtat = (props) => {
	const { rowData, tdData } = props;
	function edit() {
		alert("Affecter Role " + rowData.ActiveDesactive);
		console.log(rowData, tdData);
	}
	return (
		<td>
            <ActiverDesactiver  onClick={edit}></ActiverDesactiver>
		</td>
	);
};

const ComptesTblPage = (props) => {
	let col = [
		"id",
		"username",
		"email",
		"role",
		"is_active",
		"AffecterRole",
		"ActiverDesactiver",
	];
	let tHead = [
		"#",
		"Nom et Prénom",
		"Email",
		"Role",
		"Active/Desactive",
		"Affecter Role",
		"Activer/Desactiver",
	];
    return (
		<Wrap>
			{MyData && <SortableTbl
				tblData={MyData}
				tHead={tHead}
				customTd={[
					{ custd: AffecterRole, keyItem: "AffecterRole" },
					{ custd: ChangerEtat, keyItem: "ActiverDesactiver" },
				]}
				dKey={col}
				search={true}
			/>}
		</Wrap>
	);
};
  return (
    <ComptesTblPage></ComptesTblPage>
  )
}

