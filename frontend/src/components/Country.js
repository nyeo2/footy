import React, {useState, useEffect} from "react";
import Axios from 'axios';

function Country(){
  const [CountryList, setCountryList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3002/api/country').then((response) => {
      setCountryList(response.data)
    })
  },[])

  return (
    <div className="Countries">
      <h1>Search</h1>

      <div>
        {
         CountryList.map((val) => {
          return (
            <div className = "card">
              <h1> Country: {val.CountryName} </h1>
              <p>  Grade: {val.CountryGrade}</p>
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default Country;
