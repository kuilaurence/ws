"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var WebSocketServer = ws_1.default.Server;
var wss = new WebSocketServer({
    port: 3000
});
wss.on('connection', function (ws) {
    console.log("[SERVER] connection()");
    ws.on('message', function (message) {
        console.log("[SERVER] Received: ".concat(message));
        setTimeout(function () {
            ws.send("\u6211\u6536\u5230\u4E86\u4F60\u7684\u6D88\u606F,\u5185\u5BB9\u662F".concat(message), function (err) {
                if (err) {
                    console.log("[SERVER] error: ".concat(err));
                }
            });
        }, 1000);
    });
});
console.log('ws server started at port 3000...');
// client test:
// let count = 0;
// let ws = new WebSocket('ws://localhost:3000/ws/chat');
// ws.on('open', function () {
//     console.log(`[CLIENT] open()`);
//     ws.send('Hello!');
// });
// ws.on('message', function (message) {
//     console.log(`[CLIENT] Received: ${message}`);
//     count++;
//     if (count > 3) {
//         ws.send('Goodbye!');
//         ws.close();
//     } else {
//         setTimeout(() => {
//             ws.send(`Hello, I'm Mr No.${count}!`);
//         }, 1000);
//     }
// });
