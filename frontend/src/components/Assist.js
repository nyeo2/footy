import React, {useState, useEffect} from "react";
import Axios from 'axios';

function Assist(){
  const [CountryList, setCountryList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3002/api/assist').then((response) => {
      setCountryList(response.data)
    })
  },[])

  return (
    <div className="Top 10 Assists by Country">
      <h1>Search</h1>

      <div>
        {
         CountryList.map((val) => {
          return (
            <div className = "card">
              <h1> Country: {val.CountryName} </h1>
              <p> Total Assists: {val.TotalAssists}</p>
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default Assist;
