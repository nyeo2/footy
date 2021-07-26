import React, {component, useState, useEffect} from "react";
import Axios from 'axios';

function Insert(){
  const [PlayerName, setPlayerName] = useState('');
  const [Stats, setStats] = useState("");
  const [CountryName, setCountryName] = useState("");
  const [PlayerList, setPlayerList] = useState([]);

  const insertPlayer = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      PlayerName: PlayerName,
      Stats: Stats,
      CountryName: CountryName
    });
    alert("Inserted");
  };

  return (
    <div className="Insert">
      <h1>Insert</h1>

      <div className="form">
        <label> Player Name:</label>
        <input type="text" onChange={(e) => {
          setPlayerName(e.target.value)
        } }/>
        <label> Stats:</label>
        <input type="text" onChange={(e) => {
          setStats(e.target.value)
        }}/>
        <label> Country:</label>
        <input type="text" onChange={(e) => {
          setCountryName(e.target.value)
        }}/>

        <button onClick={insertPlayer}>Insert</button>
      </div>
      
    </div>
  );
}

export default Insert;
