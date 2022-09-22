import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    //put instagram link of supershop
    window.location = "https://www.instagram.com/__gauravjha__/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              //put founder image at abc.png
              src="https://res.cloudinary.com/tripleayt/image/upload/v1631555947/products/abc.png"
              alt="Founder"
            />
            <Typography>Gaurav Kumar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by me(Gaurav Kumar).
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
            //put utube link of supershop
              href="https://www.youtube.com/channel/UCbpFB6_KJJPYKdgAwPgqJww"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>
               {/* put insta link */} 
             <a href="https://www.instagram.com/__gauravjha__/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
