import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./DeclarationStats.css";
import { Button } from "react-bootstrap";
const DeclarationStats = () => {
  const [data, setData] = useState(null);
  const [clicked, setClicked] = useState("");
  const token = sessionStorage.getItem("key");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/madrasatic/declaration_stat/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization":`Token ${token}`
        },
      }).then((response) => {
          return response.json();
        })
        .then((data) => {
          switch(clicked){
                case "urgence" :
                    setData(data.urgence);
                    break;
                case "critique" :
                    setData(data.critique);
                    break;
                case "normal" :
                    setData(data.normal);
                    break;
                default :
                    setData(data.normal);
                    break;
          }
        });
  }, [clicked]);

  const settings = data
    ? {
        series: [
          data.publiée,
          data.rejetée,
          data.incompléte,
          data.traitée,
          data.en_cours_de_traitement,
          data.non_traitée
          
        ],
        options: {
          chart: {
            width: 380,
          },
          labels: ["publiée", "rejetée", "incompléte", "traitée","en cours de traitement","non traitée"],
          responsive: [
            {
              breakpoint: 699,
              options: {
                chart: {
                  width: 400,
                  height: 350,
                },
                legend: {
                  show: false,
                },
              },
            },
            {
              breakpoint: 499,
              options: {
                chart: {
                  width: 300,
                  height: 300,
                },
                legend: {
                  show: false,
                },
              },
            },
            {
              breakpoint: 1400,
              options: {
                chart: {
                  width: 500,
                },
                legend: {
                  show: false,
                },
              },
            },
          ],
          legend: {
            position: "right",
            offsetY: 0,
            height: 230,
          },
        },
      }
    : {};

  return (
    <div className="users_stats" style={{ marginLeft:'150px'}}>
        <br></br><br></br>
      <h1 style={{ fontWeight:"bold",color:'black'}}>Statistiques des déclarations</h1>
      <div id="chart">
        {data && (
          <>
            {data.publiée === 0 &&
            data.rejetée=== 0 &&
            data.incompléte === 0 &&
            data.traitée === 0 ? (
              <div className="no_action">
                <p>Désolé aucune déclaration pour cette priorité</p>
              </div>
            ) : (
                <>
                <Chart
                    options={settings.options}
                    series={settings.series}
                    type="donut"
                    width={600}
                    height={350}
                />
              </>
            )}
          </>
        )}
        
        <div className="actions">
          <Button
            style={{
              background: "red",
            }}
            onClick={()=>{setClicked("urgence")}}
          >
            Urgente
          </Button>
          <Button
            style={{
              background: "#fbbd08",
            }}
            onClick={()=>{setClicked("critique")}}
          >
            Critique
          </Button>
          <Button color="green" onClick={()=>{setClicked("normal")}}>
            Normal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeclarationStats;
