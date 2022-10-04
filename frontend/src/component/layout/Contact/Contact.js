import React from "react";
import "./Contact.css";
import {Typography} from "@material-ui/core";
// import lmail from "@material-ui/icons/Email";
// import lphone from "@material-ui/icons/ContactPhone";
import {HiMail} from "react-icons/hi";

const Contact = () => {
  return (
   
    <div className="contact">
    <div></div>
    <div className="contactGradient"></div>
    <div className="contactContainer">
      <Typography component="h1">Contact Us</Typography>

<div className="outer">
      <div className="leftdiv">
                <HiMail
                  style={{
                    width: "2rem",
                    height: "2rem",
                  }}
                />
        </div>
     <div className="rightdiv" >
      <a
          href="mailto:gridharkumar279@gmail.com"
          target="_blank"
          rel="noreferrer"
          >
          gridharkumar279@gmail.com
          <lmail className="llmail"/>

        </a>
    </div>
      </div>
    </div>
    </div>
    
  );
};

export default Contact;
