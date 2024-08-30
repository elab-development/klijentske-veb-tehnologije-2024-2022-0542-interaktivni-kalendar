import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../Models/User";

const CreateUserComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); //za navigaciju
  const handleCreateUser = () => {
    const newUser = new User(username, password, email);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log(newUser.getUserInfo());
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleCreateUser}>Create User</button>
      <button className="goback" onClick={() => navigate(-1)}>
        Go Back
      </button>{" "}
      {/* Novo dugme Go Back*/}
    </div>
  );
};

export default CreateUserComponent;
