import io from 'socket.io-client';

let socket;

export const initiateSocketConnection = () => {
    socket = io.connect('http://localhost:3000');
    console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
};

export const subscribeToUpdates = (callback) => {
    if (!socket) return(true);
    socket.on('update', message => {
        console.log('Received message:', message);
        callback(message);
    });
};

export const getSocket = () => socket;
