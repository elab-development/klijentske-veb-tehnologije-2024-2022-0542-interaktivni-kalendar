import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfilPage = () => {
  return (
    <div className="profile">
      <h1 className="nameSurname">Klijentske Klijentske</h1>
      <div className="icon">
        <i className="bx bxs-face-mask"></i>
      </div>
      <div className="info">
        <div className="info1">
          <i className="bx bxs-face-mask"></i>
          <p className="info1-text">Name: Klijentske</p>
        </div>
        <div className="info1">
          <i className="bx bxs-balloon"></i>
          <p className="info1-text">Surname: Klijentske</p>
        </div>
        <div className="info1">
          <i className="bx bx-money-withdraw"></i>
          <p className="info1-text">Job: Student</p>
        </div>
        <div className="info1">
          <i className="bx bx-home"></i>
          <p className="info1-text">Addres: Jove Ilica</p>
        </div>
        <div className="info1">
          <i className="bx bxs-mobile"></i>
          <p className="info1-text">Phone: +381 64 </p>
        </div>
      </div>

      <Link to="/login" className="goback">
        Previous page
      </Link>
    </div>
  );
};

export default ProfilPage;
