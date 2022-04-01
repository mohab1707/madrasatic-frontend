import React from "react";
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

let MyData = [
	{
		N: 1,
		_id: "151155",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
	{
		N: 2,
		_id: "1511585",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 3,
		_id: "158225",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 4,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 5,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 6,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 7,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 8,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 9,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 10,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 11,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 12,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 13,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 14,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 15,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
    {
		N: 16,
		_id: "15118456",
		Nomprenom: "ABABSA MOHAMED",
		Email: "m.ababsa@esi-sba.dz",
		Role: "Etudiant",
		ActiveDesactive: "Active",
	},
];

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
		"N",
		"Nomprenom",
		"Email",
		"Role",
		"ActiveDesactive",
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
			<SortableTbl
				tblData={MyData}
				tHead={tHead}
				customTd={[
					{ custd: AffecterRole, keyItem: "AffecterRole" },
					{ custd: ChangerEtat, keyItem: "ActiverDesactiver" },
				]}
				dKey={col}
				search={true}
			/>
		</Wrap>
	);
};
  return (
    <ComptesTblPage></ComptesTblPage>
  )
}

