import React, {component, useState, useEffect} from "react";
import Axios from 'axios';

function TopScore(){
  const [PlayerName, setPlayerName] = useState('');
  const [PlayerList, setPlayerList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3002/api/top').then((response) => {
      setPlayerList(response.data)
    })
  },[])

  return (
    <div className="Top Score by Country">
      <h1>Search</h1>

      <div>
        {
          PlayerList.map((val) => {
          return (
            <div className = "card">
              <h1> Player Name: {val.PlayerName} </h1>
              <p> Goals/Assists/Shots: {val.Goals}/{val.Assists}/{val.Shots}</p>
              <p> Country: {val.CountryName}</p>
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopScore;

