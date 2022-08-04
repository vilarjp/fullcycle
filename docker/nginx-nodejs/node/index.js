const express = require("express");
const { faker } = require("@faker-js/faker");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const createTable =
  "CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id));";
connection.query(createTable);
connection.end();

app.get("/", (req, res) => {
  const connection = mysql.createConnection(config);

  const insert = `INSERT INTO people(name) values("${faker.name.firstName()}");`;
  connection.query(insert);

  connection.query("SELECT * from people;", function (_, result) {
    const html = `
      <h1>Full Cycle Rocks!</h1>
      <div>${result.map((row) => row.name)}</div>
    `;

    res.send(html);
  });

  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
