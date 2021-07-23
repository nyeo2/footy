const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
    host:'34.126.140.180',
    user: 'root',
    password:'sanitize',
    database:'footy',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM Players NATURAL JOIN Country LIMIT 5";
    db.query(sqlSelect, (err, result) => {
        if (err)
          console.log(err);
        response.send(result);
    });
});

app.get("/api/top", (require, response) => {
    const sqlSelect = "select * from ( select CountryID, MAX(Goals) as maxgoals from Players GROUP BY CountryID ) as x inner join Players on Players.CountryID = x.CountryID AND Players.Goals = x.maxgoals inner join Country on Country.CountryID = Players.CountryID ORDER BY Goals DESC;";
    db.query(sqlSelect, (err, result) => {
        if (err)
          console.log(err);
        response.send(result);
    });
});


app.post("/api/search", (require, response) => {
    const PlayerName = "%" + require.body.PlayerName + "%";
   
    const sqlSelect = "SELECT * FROM Players NATURAL JOIN Country WHERE PlayerName LIKE ?";
    db.query(sqlSelect, PlayerName, (err, result) => {
        if (err)
          console.log(err);
        console.log(result);
        response.send(result);
    })
});

app.post("/api/insert", (require, response) => {
    const PlayerName = require.body.PlayerName;
    const Goals = require.body.Goals;
    const CountryName = require.body.CountryName;
   
    const sqlInsert = "INSERT INTO Players (PlayerName, Goals, CountryID) VALUES (?,?,(SELECT CountryID FROM Country WHERE CountryName LIKE ? LIMIT 1));";
    db.query(sqlInsert, [PlayerName, Goals, CountryName], (err, result) => {
        if (err)
        console.log(err);
    })
});

app.delete("/api/delete/:PlayerName", (require, response) => {
    const PlayerName = require.params.PlayerName;

    const sqlDelete = "DELETE FROM `Players` WHERE `PlayerName`= ?";
    console.log(PlayerName)
    db.query(sqlDelete, PlayerName, (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.put("/api/update/", (require, response) => {
    const PlayerName = require.body.PlayerName;
    const Goals = require.body.Goals;

    const sqlUpdate = "UPDATE `Players` SET `Goals` = ? WHERE `PlayerName`= ?";
    db.query(sqlUpdate, [Goals,PlayerName ], (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})

