import http from "http";
import { parse } from "path";

let chamados = [];
let currentId = 1;

const sendJSON = (res, statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
};
const server = http.createServer((req, res) => {
    const { pathname } = parse(req.url, true);

    if (req.method === "GET" && req.url === "/health") {
        return sendJSON(res, 200, { status: "ok" });
    }

    if (req.method === "GET" && req.url === "/chamados") {
       return sendJSON(res, 200, chamados);
    }

});

server.listen(3000, () => {
    console.log("Servidor HTTP executando na porta 3000");
});