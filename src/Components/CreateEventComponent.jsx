import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Event from "../Models/Event";
import EventListComponent from "./EventListComponent";

const CreateEventComponent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); //za navigaciju
  const handleCreateEvent = () => {
    const newEvent = new Event(name, date, description);
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));
    console.log(newEvent.getEventDetails());
  };
  return (
    <div className="create-event">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Event Name"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Event Date"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event Description"
      ></textarea>
      <button onClick={handleCreateEvent}>Create Event</button>
      <button className="goback" onClick={() => navigate(-1)}>
        Go Back
      </button>{" "}
      {/* Novo dugme Go Back*/}
    </div>
  );
};

export default CreateEventComponent;
