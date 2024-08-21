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

  // Ova funkcija sluzi za proveur podataka koje korisnik zeli da azurira ili doda u event list-u
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

const Navbar = () => {
  return (
    <div className="Navbar">
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

const CreateEventComponent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

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
    </div>
  );
};

const CreateUserComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
    </div>
  );
};

const EventListComponent = () => {
  const [events, setEvents] = useState([]);

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
    </div>
  );
};

const UserListComponent = () => {
  const [users, setUsers] = useState([]);

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
    </div>
  );
};

const LoginPage = () => {
  // Jos neki hooks-ovi za unosenje inputa i funkcije za brisanje teksta nakon kilka na dugme
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const logIn = () => {
    if (email === "klijentske" && password === "klijentske") {
      navigate("/profil");
    } else {
      alert("Inccorect email or password!");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page">
      {/* Prebacuje na pocetnu stranicu */}
      <Link to="/" className="back-login">
        GO BACK
      </Link>
      <h1 className="h1-login">LOGIN</h1>
      <p className="p-login">please enter your email and password!</p>
      <div className="email-login">
        {/* Unos emila */}
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="email-login1"
        />
        {/* Unos sifre */}
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="email-login2"
        />
      </div>
      <i className="link-login">Forgot password?</i>
      {/* Klikom na dugme brise sve iz input-a */}
      <button className="btn-login1" onClick={logIn}>
        Log in
      </button>
      {/* Linkovi do sledecih aplikacija */}
      <div className="app-buttons">
        <a href="https://www.facebook.com" className="bx-link-login">
          <i class="bx bxl-facebook"></i>
        </a>
        <a href="https://twitter.com" className="bx-link-login">
          <i class="bx bxl-twitter"></i>
        </a>
        <a href="https://www.google.com" className="bx-link-login">
          <i class="bx bxl-google"></i>
        </a>
      </div>
      {/* Salje nas stranicu register */}
      <p className="p2-login">
        Don't have an account?{" "}
        <Link to="/register" className="register-btn">
          Sing up
        </Link>
      </p>
    </div>
  );
};

const ProfilPage = () => {
  return (
    <div className="profile">
      <h1 className="nameSurname">Klijentske Klijentske</h1>
      <div className="icon">
        <i class="bx bxs-face-mask"></i>
      </div>
      <div className="info">
        <div className="info1">
          <i class="bx bxs-face-mask"></i>
          <p className="info1-text">Name: Klijentske</p>
        </div>
        <div className="info1">
          <i class="bx bxs-balloon"></i>
          <p className="info1-text">Surname: Klijentske</p>
        </div>
        <div className="info1">
          <i class="bx bx-money-withdraw"></i>
          <p className="info1-text">Job: Student</p>
        </div>
        <div className="info1">
          <i class="bx bx-home"></i>
          <p className="info1-text">Addres: Jove Ilica</p>
        </div>
        <div className="info1">
          <i class="bx bxs-mobile"></i>
          <p className="info1-text">Phone: +381 64 </p>
        </div>
      </div>

      <Link to="/login" className="goback">
        Previous page
      </Link>
    </div>
  );
};

const RegisterPage = () => {
  // Postavljanje hook-ova za unos u  inpute
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [country, setCountry] = useState("");
  const [addres, setAddres] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const handleCountrylChange = (e) => {
    setCountry(e.target.value);
  };

  const handleAddresChange = (e) => {
    setAddres(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  // Funkcija vraca vrednosti na ""
  const register = () => {
    setAddres("");
    setCountry("");
    setPassword("");
    setPassword2("");
    setEmail("");
    setPhone("");
  };

  return (
    // Vraca nas na login stranicu
    <div className="login-page">
      <Link to="/login" className="back-login">
        GO BACK
      </Link>

      <h1 className="h1-register">REGISTER</h1>
      <p className="p-register">It’s quick and easy.</p>
      {/* inputi */}
      <div className="email-register">
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="email-register1"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="email-register1"
        />
        <input
          type="password"
          value={password2}
          onChange={handlePassword2Change}
          placeholder="Repeat password"
          className="email-register1"
        />
        <input
          type="text"
          value={country}
          onChange={handleCountrylChange}
          placeholder="Country, City"
          className="email-register1"
        />
        <input
          type="text"
          value={addres}
          onChange={handleAddresChange}
          placeholder="Addres"
          className="email-register1"
        />
        <input
          type="number"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Phone"
          className="email-register1"
        />
      </div>
      <div>
        {/* Klikom na register otvara se popup sa obavestenjem */}
        <Popup
          trigger={<button className="btn-register">REGISTER</button>}
          modal
        >
          {(close) => (
            <div className="popup-content">
              <h1 className="popup-h1">Successfully registered!</h1>
              <p className="popup-p">Thank you for your trust!</p>
              <button
                onClick={() => {
                  register();
                  close();
                }}
                className="btn-back"
              >
                Close
              </button>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

const SuggestionPage = () => {
  // Za textarea
  const [myVariable, setMyVariable] = useState("");

  // Funkcija koja ažurira state
  const handleChange = (event) => {
    setMyVariable(event.target.value);
  };

  // prazni myVariable
  const handleSend = () => {
    setMyVariable("");
  };

  return (
    <div className="suggestion-div">
      <h1 className="suggestion-h1">Your suggestion:</h1>
      <div className="suggestion-text">
        <textarea
          value={myVariable}
          onChange={handleChange}
          rows="4"
          cols="50"
          className="suggestion-textarea"
        />
      </div>
      {/* Jos jedan popup */}
      <div className="suggestion-btns">
        <Popup
          trigger={<button className="suggestion-btn">Send!</button>}
          modal
          onClose={handleSend}
        >
          {(close) => (
            <div className="popup-content">
              <p className="popup-p">Thank you on your suggestions!</p>
              <button onClick={close} className="btn-back">
                Close
              </button>
            </div>
          )}
        </Popup>
        {/* Vraca nas pocetnu stranicu */}
        <Link to="/" className="suggestion-btn">
          Go back!
        </Link>
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
export default App;
