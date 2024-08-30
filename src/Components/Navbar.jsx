import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); //za navigaciju
  return (
    <div className="Navbar">
      <button className="goback" onClick={() => navigate(-1)}>
        Go Back
      </button>{" "}
      {/* Novo dugme Go Back*/}
      <Link to="/" className="nav-link">
        Calendar
      </Link>
      <Link to="/create-event" className="nav-link">
        Create Event
      </Link>
      <Link to="/create-user" className="nav-link">
        Create User
      </Link>
      <Link to="/event-list" className="nav-link">
        Event List
      </Link>
      <Link to="/user-list" className="nav-link">
        User List
      </Link>
    </div>
  );
};

export default Navbar;
