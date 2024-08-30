import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Event from "../Models/Event";
import CreateEventComponent from "./CreateEventComponent";

const EventListComponent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); //za navigaciju
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const events = storedEvents.map(
      (event) => new Event(event.name, event.date, event.description)
    );
    setEvents(events);
  }, []);

  return (
    <div>
      {events.map((event, index) => (
        <div key={index} className="event-list">
          <p>{event.name}</p>
          <p>{event.date}</p>
          <p>{event.description}</p>
        </div>
      ))}
      <button className="goback" onClick={() => navigate(-1)}>
        Go Back
      </button>{" "}
      {/* Novo dugme Go Back*/}
    </div>
  );
};

export default EventListComponent;
