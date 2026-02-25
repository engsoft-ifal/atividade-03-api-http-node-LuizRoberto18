import http from "http"; // Importa o módulo HTTP nativo

const server = http.createServer((req, res) => { // Cria o servidor e define a função para cada requisição
    if (req.method === "GET" && req.url === "/chamados") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            status: "ok", result: [{
                "solicitante": "solocitante1",
                "descricao": "descrição1",
                "prioridade": "prioriedade"
            }]
        }));
        return;
    }
    if (req.method === "GET" && req.url === "/health") { // Verifica rota GET /health
        res.writeHead(200, { "Content-Type": "application/json" }); // Define status 200 e tipo JSON
        res.end(JSON.stringify({ status: "ok" })); // Envia JSON e encerra
        return; // Interrompe execução
    }

    if (req.method === "GET" && req.url.startsWith("/student")) { // Verifica rota GET /student
        res.writeHead(200, { "Content-Type": "application/json" }); // Define status 200 e tipo JSON
        res.end(JSON.stringify({ id: 1, name: "João Silva" })); // Retorna estudante fictício
        return; // Interrompe execução
    }

    if (req.method === "POST" && req.url === "/student") { // Verifica rota POST /student
        res.writeHead(201, { "Content-Type": "text/html" }); // Define status 201 e tipo HTML
        res.end("<h1>Estudante cadastrado com sucesso</h1>"); // Retorna mensagem HTML
        return; // Interrompe execução
    }

    res.writeHead(404); // Define status 404 para rota inexistente
    res.end(); // Finaliza resposta
});

server.listen(3000, () => { // Inicia o servidor na porta 3000
    console.log("Servidor HTTP executando na porta 3000"); // Log informativo
});