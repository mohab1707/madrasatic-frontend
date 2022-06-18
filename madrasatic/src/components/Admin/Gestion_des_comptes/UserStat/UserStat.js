import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
//? import css
import "./UsersStats.css";

const UsersStats = () => {
    const [data, setData] = useState([]);
    const token = sessionStorage.getItem("key");
    const path=sessionStorage.getItem("path");
    useEffect(() => {
        fetch(path+"madrasatic/user_stat/", {
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
                setData(data);
                console.log("all users" +data.all_users);
            });
    }, []);
  const settings = {
    series: [
      {
        data: [data.all_users, data.active_users, data.signalers, data.current_services],
      },
    ],

    options: {
      chart: {
        type: "bar",
        height: 350,
        showToolTip: "0",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Tous", "Actifs", "Signaleurs", "Services"],
      },
    },
  };

  return (
    <div className="users_stats" style={{ marginLeft:'150px'}}>
        <br></br><br></br>
      <h1 style={{ fontWeight:"bold",color:'black'}}>Statistiques des utilisateurs</h1>
      <div id="chart">
        {data.all_users ? 
        <Chart
          options={settings.options}
          series={settings.series}
          type="bar"
          height={380}
        /> : null }
      </div>
    </div>
  );
};

export default UsersStats;
