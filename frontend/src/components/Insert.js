import React, {component, useState, useEffect} from "react";
import Axios from 'axios';

function Insert(){
  const [PlayerName, setPlayerName] = useState('');
  const [Goals, setGoals] = useState("");
  const [CountryName, setCountryName] = useState("");
  const [PlayerList, setPlayerList] = useState([]);
  const [NewGoals, setNewGoals] = useState("");

  const insertPlayer = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      PlayerName: PlayerName,
      Goals: Goals,
      CountryName: CountryName
    });
    alert("Inserted");
  };

  return (
    <div className="Insert">
      <h1>Insert</h1>

      <div className="form">
        <label> Player Name:</label>
        <input type="text" name="PlayerName" onChange={(e) => {
          setPlayerName(e.target.value)
        } }/>
        <label> Goals:</label>
        <input type="text" name="Goals" onChange={(e) => {
          setGoals(e.target.value)
        }}/>
        <label> Country:</label>
        <input type="text" name="CountryName" onChange={(e) => {
          setCountryName(e.target.value)
        }}/>

        <button onClick={insertPlayer}>Insert</button>
      </div>
      
    </div>
  );
}

export default Insert;
