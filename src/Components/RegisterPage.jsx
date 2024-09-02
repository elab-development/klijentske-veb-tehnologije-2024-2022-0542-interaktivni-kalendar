import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

export default RegisterPage;
