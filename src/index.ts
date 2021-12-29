import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8085 });

var online = 0;

wss.on('connection', (ws) => {
    online++;
    let user = { name: `游客${online}`, age: 12, content: `游客${online}加入群聊，当前在线人数：${online}人` };
    console.log("New connection!", user.name);
    sendAll(JSON.stringify(user));
    ws.on('message', (message) => {
        console.log(`${nowTimes()}: ${message}`);
        let jsonObj = JSON.parse(message.toString());
        switch (jsonObj.type) {
            case "1":
                user.content = jsonObj.content;
                sendAll(JSON.stringify(user));
                break;
            case "2":
                let lastName = user.name;
                user.name = jsonObj.content;
                user.content = `${lastName}修改为${user.name}`;
                ws.send(JSON.stringify(user), (error) => { console.log("error:" + error) });
                break;
            default:
                break;
        }
    })
    ws.on('close', () => {
        online--;
        user.content = `${user.name}已离开！当前在线人数：${online}人`;
        sendAll(JSON.stringify(user));
    });
});

function sendAll(msg: string) {
    wss.clients.forEach(clients => {
        clients.send(msg, (err) => {
            if (err) {
                console.log(`error: ${err}`);
            }
        });
    })
}
function nowTimes() {
    const time = new Date()
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()
    const hour = time.getHours()
    const min = time.getMinutes()
    const sec = time.getSeconds()
    return year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec + " "
}
console.log('就绪： port 8085');