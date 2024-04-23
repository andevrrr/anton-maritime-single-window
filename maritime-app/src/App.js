import React, { useEffect, useState } from 'react';
import { initiateSocketConnection, disconnectSocket, subscribeToUpdates } from './socketServer';

function App() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        initiateSocketConnection();

        subscribeToUpdates((newMessage) => {
            setNotifications(prevNotifications => [...prevNotifications, newMessage]);
        });

        return () => {
            disconnectSocket();
        };
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
            {notifications.map((note, index) => (
                <div key={index}>{note}</div>
            ))}
        </div>
    );
}

export default App;
