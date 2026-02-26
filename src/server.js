import http from "http";
import { parse } from "url";
import { json } from "stream/consumers";

let chamados = [];
let currentId = 1;

const sendJSON = (res, statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
};
const server = http.createServer(async (req, res) => {
    const { pathname } = parse(req.url, true);

    if (req.method === "GET" && pathname === "/health") {
        return sendJSON(res, 200, { status: "ok" });
    }

    if (req.method === "GET" && pathname === "/chamados") {
        return sendJSON(res, 200, chamados);
    }

    if (req.method === "GET" && pathname.startsWith("/chamados/")) {
        const id = parseInt(pathname.split("/")[2]);
        if (isNaN(id)) {
            return sendJSON(res, 400, { error: "ID inválido" });
        }

        const chamado = chamados.find(c => c.id === id);
        if (!chamado) {
            return sendJSON(res, 404, { error: "Chamado não encontrado" });
        }
        return sendJSON(res, 200, chamado);
    }

if (req.method === "POST" && pathname === "/chamados") {
    try {
        const data = await json(req);

        const { solicitante, descricao, prioridade } = data;

        if (!solicitante || !descricao || !prioridade) {
            return sendJSON(res, 422, {
                erro: "Campos obrigatórios: solicitante, descricao, prioridade"
            });
        }

        const novoChamado = {
            id: currentId++,
            solicitante,
            descricao,
            prioridade
        };

        chamados.push(novoChamado);

        return sendJSON(res, 201, novoChamado);

    } catch (error) {
        return sendJSON(res, 400, { erro: "JSON inválido" });
    }
}
    // ===============================
    // Rota não encontrada
    // ===============================
    return sendJSON(res, 404, { erro: "Rota não encontrada" });

});

server.listen(3000, () => {
    console.log("Servidor HTTP executando na porta 3000");
});