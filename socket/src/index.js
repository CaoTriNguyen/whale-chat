
import KSUID from 'ksuid';

const port = process.env.PORT || 5000;

let openSocket = [];

const sendToEveryone = (data, groupId) => {
    openSocket.forEach(ws => {
        if(ws.data.groupId === groupId){
            ws.send(JSON.stringify(data));
        }
    });
}

const server = Bun.serve({
    port: 3200,
    async fetch(req, server) {
        const uId = await KSUID.random();

        //get username
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const username = url.searchParams.get('username');
        const groupId = url.searchParams.get('groupId');

        //upgrade the request to websocket
        if(server.upgrade(req, {
            data: {id: uId.string, groupId: groupId, userId: userId, username: username}
        })){
            return;
        } 
        return new Response('Update failed', {status: 500});
    },
    
    websocket: {
        open(ws) {
            //Ip address
            // console.log(ws.remoteAddress);

            openSocket.push(ws);
            const msg = `${ws.data.username} has entered the chat.`;
            sendToEveryone({message:msg, isAutomated: true}, ws.data.groupId);
            // retrieve previous unread messages from db
        },
        message(ws, message) {
            sendToEveryone({ userId: `${ws.data.userId}`, message: `${message}`, isAutomated: false}, ws.data.groupId);
            // server.publish(ws.data.groupId, data = {message: `${ws.data.username}: ${message}`, isAutomated: false})
            // persist data in db
        },
        close(ws, code, message) {
            const msg = `${ws.data.username} has left the chat.`;
            sendToEveryone({message:msg, isAutomated: true}, ws.data.groupId);
            const uId = ws.data?.id;
            console.log(uId, 'closed');
            openSocket = openSocket.filter(ws => ws.data.id !== uId);
        },
        drain(ws) {
            //console.log('the socket is ready to receive more data.')
        },
    },
});

console.log(`Listening to port:${server.port}`);
