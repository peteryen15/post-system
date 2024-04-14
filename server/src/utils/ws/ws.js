import WebSocket, { WebSocketServer } from "ws";

let wss;

export const startWebSocketServer = (server) => {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("error", console.error);
    console.log("客戶端已連線");

    ws.on("message", (message) => {
      console.log(`接收到訊息：${message}`);

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });

    ws.on("close", () => [console.log("client 已斷開連線")]);
  });

  console.log("WebSocket 伺服器已啟動");
};
