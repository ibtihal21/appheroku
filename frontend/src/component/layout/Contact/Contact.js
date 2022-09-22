import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:gridharkumar279@gmail.com">
        <Button ><span>Contact : Mail Id :-gridharkumar279@gmail.com</span></Button>
        

      </a>
    </div>
  );
};

export default Contact;
