import React, {component, useState, useEffect} from "react";
import Axios from 'axios';

function Search(){
  const [PlayerName, setPlayerName] = useState('');
  const [PlayerList, setPlayerList] = useState([]);
  const [Goals, setGoals] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setPlayerList(response.data)
    })
  },[])

  const searchPlayer = () => { 
    Axios.post('http://localhost:3002/api/search', {
      PlayerName: PlayerName
    }).then((response) => {
      setPlayerList(response.data)
    })
  };

  const deletePlayer = (PlayerName) => {
    Axios.delete(`http://localhost:3002/api/delete/${PlayerName}`);
  };

  const updatePlayer = (PlayerName) => {
    Axios.put(`http://localhost:3002/api/update`, {
      PlayerName: PlayerName,
      Goals: Goals
    });
    setGoals("")
  };

  return (
    <div className="Search">
      <h1>Search</h1>

      <div className="form">
        <label> Player Name:</label>
        <input type="text" name="PlayerName" onChange={(e) => {
          setPlayerName(e.target.value)
        } }/>

        <button onClick={searchPlayer}>Search</button>

        {
          PlayerList.map((val) => {
          return (
            <div className = "card">
              <h1> Player Name: {val.PlayerName} </h1>
              <p> Goals/Assists/Shots: {val.Goals}/{val.Assists}/{val.Shots}</p>
              <p> Country: {val.CountryName}</p>
              <button onClick={() => { 
                deletePlayer(val.PlayerName);
              }}> Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setGoals(e.target.value)
              } }/>
              <button onClick={() => {
                updatePlayer(val.PlayerName);
              }}> Update</button>
              </div>
          );
          
          ;
        })}
        

      </div>
      
    </div>
  );
}

export default Search;

