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

//db.connect(function(err) {
//    if (err) throw err;
//    var sql = "INSERT INTO `Players` (`id`,`PlayerName`, `Goals`) VALUES (5,'inception', 'good movie');";
//    db.query(sql, function (err, result) {
//      if (err) throw err;
//      console.log(result.affectedRows + " record(s) updated");
//    });
//  });
//
//app.get('/', (require, response) => {
//    const sqlInsert = "INSERT INTO `Players` (`PlayerName`, `Goals`) VALUES ('Spider2', 'good movie');";
//    db.query(sqlInsert, (err, result) => {
//        response.send("Hello world!!!");
//    })
//})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM Players NATURAL JOIN Country LIMIT 5";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.post("/api/insert", (require, response) => {
    const PlayerName = require.body.PlayerName;
    const Goals = require.body.Goals;

    const sqlInsert = "INSERT INTO `Players` (`PlayerName`, `Goals`) VALUES (?,?)";
    db.query(sqlInsert, [PlayerName, Goals], (err, result) => {
        if (err)
        console.log(error);
    })
});

app.delete("/api/delete/:PlayerName", (require, response) => {
    const PlayerName = require.params.PlayerName;

    const sqlDelete = "DELETE FROM `Players` WHERE `PlayerName`= ?";
    console.log(PlayerName)
    db.query(sqlDelete, PlayerName, (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.put("/api/update/", (require, response) => {
    const PlayerName = require.body.PlayerName;
    const NewGoals = require.body.NewGoals;

    const sqlUpdate = "UPDATE `Players` SET `Goals` = ? WHERE `PlayerName`= ?";
    console.log([NewGoals, PlayerName]);
    db.query(sqlUpdate, [NewGoals,PlayerName ], (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})

