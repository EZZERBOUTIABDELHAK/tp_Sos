const http = require("http");

const Livres = [
    { id: 1, name: "livre 1" },
    { id: 2, name: "livre 2" }
];

const server = http.createServer((req, res) => {
    
    if (req.url === "/") {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.write("Holla");
        res.end();
    } 
    else if (req.url === "/api/livres") {
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(Livres));
        res.end();
    } 
    else {
        res.statusCode = 404;
        res.end("Page introuvable");
    }
});

server.listen(5000, () => {
    console.log("Serveur en cours d'execution sur le port 5000");
});