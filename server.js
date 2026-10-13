
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "rock_zenekarok_70s",
    waitForConnections: true,
    connectionLimit: 10
});

app.get("/", (req, res) => {
    res.send("Zenekar API működik!");
});

app.get("/api/zenekar", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM zenekarok"
        );

        res.status(200).json(rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            uzenet: "Adatbázis-hiba",
            hiba: error.message
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
});