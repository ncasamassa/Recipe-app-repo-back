const express = require("express");
const server = express();
const PORT = 3001;
const mysql = require("mysql2");

server.use(express.json());
server.use(cors());

const db = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "ingredientsDB",
  // table: "inventory"
});

server.get("/", (req, res) => {
  res.send("This is the Express Backend");
});

server.get("/inventory", (req, res) => {
  db.query("SELECT * FROM inventory", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

server.post("/create", (req, res) => {
  const { quantity, category, ingredient } = req.body;

  db.query(
    "INSERT INTO inventory (quantity, category, ingredient) VALUES (?,?,?)",
    [quantity, category, ingredient],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

server.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM inventory WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
