import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <p className="p-login">Please enter your email and password!</p>
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
          <i className="bx bxl-facebook"></i>
        </a>
        <a href="https://twitter.com" className="bx-link-login">
          <i className="bx bxl-twitter"></i>
        </a>
        <a href="https://www.google.com" className="bx-link-login">
          <i className="bx bxl-google"></i>
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

export default LoginPage;
