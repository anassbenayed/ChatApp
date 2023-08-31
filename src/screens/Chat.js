import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import RemoveCircleIcon from "@mui/icons-material/DeleteOutlineRounded";
import AttachFile from "@mui/icons-material/AttachFile";
import MoreVert from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  onSnapshot,
  getDocs,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import db from "../api/firebase";
import "./Chat.css";
import { useSelector } from "react-redux";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    let unsubscribeRoom;
    let unsubscribeMessages;

    async function fetchData() {
      if (roomId) {
        const roomDocRef = doc(db, "rooms", roomId);

        unsubscribeRoom = onSnapshot(roomDocRef, (snapshot) => {
          setRoomName(snapshot.data()?.name);
        });

        const messagesCollectionRef = collection(roomDocRef, "messages");
        const messagesQuery = query(
          messagesCollectionRef,
          orderBy("timestamp", "asc")
        );

        unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
          const messageData = snapshot.docs.map((doc) => doc.data());
          setMessages(messageData);
        });
      }
    }

    fetchData();

    return () => {
      if (unsubscribeRoom) {
        unsubscribeRoom();
      }
      if (unsubscribeMessages) {
        unsubscribeMessages();
      }
    };
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.trim() !== "") {
      const messagesCollectionRef = collection(
        doc(db, "rooms", roomId),
        "messages"
      );

      try {
        await addDoc(messagesCollectionRef, {
          message: input,
          name: user.displayName,
          timestamp: serverTimestamp(),
        });

        setInput("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const formatMessageDate = (timestamp) => {
    try {
      const date = new Date(timestamp?.toDate());
      const options = {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (error) {
      new Date(timestamp?.toDate()).toUTCString();
    }
  };

  const removeMessage = async (message) => {
    try {
      const messageDocRef = doc(
        db,
        "rooms",
        message.roomId,
        "messages",
        message.id
      );
      await deleteDoc(messageDocRef);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          {!!messages[messages.length - 1] ? (
            <p>
              Last Seen at{" "}
              {formatMessageDate(messages[messages.length - 1].timestamp)}
            </p>
          ) : (
            <p>This room is empty.</p>
          )}
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message?.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message?.name}</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{message.message}</span>
              <span className="chat__timestamp">
                {formatMessageDate(message.timestamp)}
              </span>
              {/* <IconButton onClick={() => removeMessage(message)}>
                <RemoveCircleIcon color="error" />
              </IconButton> */}
            </div>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
