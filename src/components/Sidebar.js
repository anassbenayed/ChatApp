import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import db from "../api/firebase";
import "./Sidebar.css";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    async function getRooms() {
      const collectionRef = collection(db, "rooms");
      const snapshot = await getDocs(collectionRef);
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    }
    getRooms();
  }, []);

  const initiateUserLogout = () => {
    dispatch({ type: "LOGOUT", payload: null });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Avatar src={user?.photoURL} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <span>
              Welcome,{" "}
              <span style={{ fontWeight: "bold" }}>{user?.displayName}</span>
            </span>
            <span style={{ fontSize: "small" }}>{user?.email}</span>
          </div>
        </div>

        <div className="">
          <IconButton onClick={() => initiateUserLogout()}>
            <LogoutOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="Search or start new chat"
            type="text"
            style={{ width: "90%", height: "100%" }}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms
          .filter((item) => item.data?.name?.includes(searchText))
          .map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
