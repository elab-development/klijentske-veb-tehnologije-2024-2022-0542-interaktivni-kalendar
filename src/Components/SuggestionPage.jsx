import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

export default SuggestionPage;
