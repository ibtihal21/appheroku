import React from "react";
import "./Contact.css";
import {Typography} from "@material-ui/core";
import lmail from "@material-ui/icons/Email";
import lphone from "@material-ui/icons/ContactPhone";

const Contact = () => {
  return (
   
    <div className="contact">
    <div></div>
    <div className="contactGradient"></div>
    <div className="contactContainer">
      <Typography component="h1">Contact Us</Typography>
     <div>
      <a
          href="mailto:gridharkumar279@gmail.com"
          target="_blank"
          rel="noreferrer"
          >
          gridharkumar279@gmail.com
        </a>
      </div>
    </div>
    </div>
    
  );
};

export default Contact;
