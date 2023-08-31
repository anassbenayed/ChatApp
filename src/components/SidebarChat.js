import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import db from "../api/firebase";
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import "./SidebarChat.css";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const [newRoomName, setNewRoomName] = useState(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  console.log("SideBarChat", id, name, addNewChat);

  useEffect(() => {
    const getMessages = () => {
      if (id) {
        const messagesCollectionRef = collection(
          doc(db, "rooms", id),
          "messages"
        );
        const messagesQuery = query(
          messagesCollectionRef,
          orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const messageData = snapshot.docs.map((doc) => doc.data());
          setMessages(messageData);
        });
      }
    };

    getMessages();
  }, [id]);

  const createChat = () => {
    if (newRoomName) {
      addDoc(collection(db, "rooms"), {
        name: newRoomName,
      });
      setShowCreateRoom(false);
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          {messages[0]?.message ? (
            <div key={messages[0]?.id} className="message-container">
              <p className="truncated-text">{messages[0]?.message}</p>
            </div>
          ) : (
            <p style={{ color: "gray" }}>No messages yet.</p>
          )}
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat">
      <div onClick={() => setShowCreateRoom(true)}>
        <h3>Create a Room</h3>
      </div>
      {showCreateRoom && (
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "12px" }}
        >
          <input
            type="text"
            style={{ display: "flex", width: "70%" }}
            placeholder="Please enter name for chat room"
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <Button onClick={() => createChat()}>Create</Button>
          <Button
            onClick={() => {
              setNewRoomName(null);
              setShowCreateRoom(false);
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default SidebarChat;
