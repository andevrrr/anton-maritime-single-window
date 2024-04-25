import React, { useEffect, useState } from "react";
import {
  initiateSocketConnection,
  disconnectSocket,
  subscribeToUpdates,
} from "./socketServer";

import { Container } from "@mui/material";
import PortETA from "./components/PortETA";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    initiateSocketConnection();

    subscribeToUpdates((newMessage) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newMessage,
      ]);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const [portCalls, setPortCalls] = useState([]);

  useEffect(() => {
    fetch("https://meri.digitraffic.fi/api/port-call/v1/port-calls")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPortCalls(data.portCalls || []);
        console.log(`There are ${data.portCalls.length} portcalls.`);
      })
      .catch((error) => {
        console.error("Failed to fetch port calls:", error);
      });
  }, []);

  return (
    <Container style={{ margin: "30px auto" }}>
      <PortETA portCalls={portCalls} />
      <h1>Notifications</h1>
      {notifications.map((note, index) => (
        <div key={index}>{note}</div>
      ))}
    </Container>
  );
}

export default App;
