let socket;

export const initWebSocket = () => {
  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
    console.log("WebSocket 連接成功");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("收到訊息：", message);
  };

  socket.onclose = () => {
    console.log("WebSocket 連接關閉");
  };

  socket.onerror = (error) => {
    console.log("WebSocket 連接錯誤：", error);
  };
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error("WebSocket 未開啟連線");
  }
};

export const closeWebSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
};
