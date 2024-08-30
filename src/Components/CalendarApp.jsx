import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import User from "../Models/User";
import Event from "../Models/Event";
import React from "react";
import LoginPage from "./LogInPage";
import Navbar from "./Navbar";
import CreateEventComponent from "./CreateEventComponent";
import CreateUserComponent from "./CreateUserComponent";
import EventListComponent from "./EventListComponent";
import UserListComponent from "./UserListComponent";
import ProfilPage from "./ProfilPage";
import RegisterPage from "./RegisterPage";
import SuggestionPage from "./SuggestionPage";

const CalendarApp = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Ovde su navedeni hook-voi koje koristimo u projektu
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // Broj dana u mesecu / dan u sedmici za prvi dan meseca
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Funkcija koja vraca za jedan mesec nazad
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  // Funkcija koja pomera za jedan mesec u napred
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  // Proverava da li je kliknuti datum danasnji dan ili neki posle tog i ako jeste daje nam opciju da unesemo event
  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
      setEditingEvent(null);
    }
  };

  // Proverava da li su dva datuma ista, tj da li se odrzavaju iste godine istog meseca istog dana
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Ova funkcija sluzi za proveru podataka koje korisnik zeli da azurira ili doda u event list-u
  const handleEventSubmit = () => {
    // Kreiramo novi dogadjaj
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    // Kopiramo postojeci niz eventu u upadatedEvents zbog azuriranja
    let updatedEvents = [...events];

    // Preko map funkcije menjamo vec postojeci event a ako ne postoji onda samo dodajemo na kraj
    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updatedEvents.push(newEvent);
    }

    // Sortira niz od najmanjeg do najveceg, tj od onog koji ce prvo da se desi do onog koji ce poslednji da se desi
    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Azurira event da bude spreman za unos sledeceg i postavlja novi niz da bude azuriran
    setEvents(updatedEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  // Sluzi za uredjivanje postojecih event-ova u kalendaru
  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(":")[0],
      minutes: event.time.split(":")[1],
    });
    setEventText(event.text);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  // Pravi se nova lista ciji elementi nemoju "eventId"
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);

    setEvents(updatedEvents);
  };

  // Sluzi za azuriranje vremena event-ova
  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    }));
  };

  return (
    <div className="calendar-app">
      <div className="calendar">
        <Link to="/Navbar" className="navbar">
          <h1 className="heading">Calendar</h1>
        </Link>
        <div className="navigate-date">
          {/* Uzimamo vrednost meseca da bude sadasnji mesec */}
          <h2 className="month"> {monthsOfYear[currentMonth]},</h2>
          {/* Uzimamo verdnost godine da bude sadasnja godina */}
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            {/*Klikom na strelicu levo vracamo mesec u nazad */}
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            {/* Klikom na strelicu desno pomeramo mesec u napred */}
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {/* Pomocu funkcije map ispisujemo sve dane, da ne bi morali da hard code-ujemo */}
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {/* Prikazujemo prazne dane u mesecu */}
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {/* Prikazujemo dane u mesecu npr 1,2,3...,31, sa tim da na danasnji dan stavljamo da bude current-day, i omogucava sa onClick delom nam omogucava da pozovemo prethodno objasnjenu funkciju */}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
        {/* Klikom na Log in nas salje na "/login" strannicu */}
        <div className="login-button">
          <Link to="/login" className="login">
            Log in
          </Link>
        </div>
        <p className="questions">
          If u have any questions u can ask{" "}
          {/* Klikom na link "here!" nas salje na /questions stranicu */}
          <Link to="/questions" className="questions-link">
            here!
          </Link>
        </p>
      </div>
      <div className="events">
        {/* Prikazivanje eventova */}
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              {/* Unos sati */}
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={handleTimeChange}
              />
              {/* Unost minuta */}
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={handleTimeChange}
              />
            </div>
            {/* Unos teksta, oganicen na 60 karaktera */}
            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            {/* Dugme za dodavanje ili editovanje event-a */}
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? "Update Event" : "Add Event"}
            </button>
            {/* Dugme za brisanje event-a */}
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}
        {/* izbacuje svaki event kao zaseban div */}
        {events.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthsOfYear[event.date.getMonth()]
              } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              {/* editovanje eventa */}
              <i
                className="bx bxs-edit-alt"
                onClick={() => handleEditEvent(event)}
              ></i>
              {/* Brisanje eventa */}
              <i
                className="bx bxs-message-alt-x"
                onClick={() => handleDeleteEvent(event.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Metso gde se nalaze sve stranice
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarApp />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/questions" element={<SuggestionPage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/create-event" element={<CreateEventComponent />} />
        <Route path="/create-user" element={<CreateUserComponent />} />
        <Route path="/event-list" element={<EventListComponent />} />
        <Route path="/user-list" element={<UserListComponent />} />
      </Routes>
    </Router>
  );
};

export const sortByDate = (events) => {
  return events.sort((a, b) => new Date(a.date) - new Date(b.date));
};

export default App;
//export { LoginPage };
