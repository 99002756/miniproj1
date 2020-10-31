const app = require("express")();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get("/form.html", (req, res) => {
    res.sendFile(__dirname + "/form.html");
})
app.get("/login.html", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})
app.get("/search", (req, res) => {
    res.sendFile(__dirname + "/search.html");
})
app.listen(3333, () => {
    console.log("Client App running at 3333");
})