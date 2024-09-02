import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../Models/User";

const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); //za navigaciju
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(
      storedUsers.map(
        (user) => new User(user.username, user.password, user.email)
      )
    );
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} className="user-list">
          <h>{user.username}</h>
          <p>{user.email}</p>
        </div>
      ))}
      <button className="goback" onClick={() => navigate(-1)}>
        Go Back
      </button>{" "}
      {/* Novo dugme Go Back*/}
    </div>
  );
};

export default UserListComponent;
