const express = require('express');
const server = express();
const PORT = 3001;
const mysql = require("mysql2");
server.use(express.json());

server.get('/', (req,res) => {
    res.send('This is the Express Backend');
});

const db = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    database: "ingredientsDB",
  });

server.get("placeholder", (req, res) => {
    db.query("SELECT * FROM placeholder", (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      });
})

server.post("/create", (req, res) => {
    const first = req.body.name;
    const second = req.body.name;
    const third = req.body.name;
    const fourth = req.body.name;

    db.query(
        "INSERT INTO placeholder (first, second, third, fourth) VALUES (?,?,?,?)",
        [first, second, third, fourth],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
})

server.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
  
    db.query("DELETE FROM placeholder WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    })
  })


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});