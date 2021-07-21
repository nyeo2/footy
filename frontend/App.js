import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import Axios from 'axios';

function App() {
  const [PlayerName, setPlayerName] = useState('');
  const [Goals, setGoals] = useState("");
  const [CountryName, setCountryName] = useState("");
  const [PlayerList, setPlayerList] = useState([]);
  const [NewGoals, setNewGoals] = useState("");

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


  const insertPlayer = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      PlayerName: PlayerName,
      Goals: Goals,
      CountryName: CountryName
    });
    
    setPlayerList([
      ...PlayerList,
      {
        PlayerName: PlayerName,
        Goals: Goals,
        CountryName: CountryName
      },
    ]);
  };

  const deletePlayer = (PlayerName) => {
    Axios.delete(`http://localhost:3002/api/delete/${PlayerName}`);
  };

  const updatePlayer = (PlayerName) => {
    Axios.put(`http://localhost:3002/api/update`, {
      PlayerName: PlayerName,
      NewGoals: NewGoals
    });
    setNewGoals("")
  };

  return (
    <div className="App">
      <h1> futbol</h1>

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
        <button onClick={searchPlayer}>Search</button>

        {
          PlayerList.map((val) => {
          return (
            <div className = "card">
              <h1> Player Name: {val.PlayerName} </h1>
              <p> Goals/Assists/Shots: {val.Goals}/{val.Assists}/{val.Shots}</p>
              <p> Country: {val.CountryName}</p>
              <button onClick={() => { deletePlayer(val.PlayerName) }}> Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewGoals(e.target.value)
              } }/>
              <button onClick={() => {
                updatePlayer(val.PlayerName)
              }}> Update</button>
              </div>
          );
          
          ;
        })}
        

      </div>
      
    </div>
  );
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


export default App;
