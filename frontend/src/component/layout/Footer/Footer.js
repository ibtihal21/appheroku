import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id='footer'>
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore"/>
        <img src={appStore} alt="Appstore"/>
      </div>

      <div className="midFooter">
        <h1>SUPERSHOP</h1>
        <p>High Quality is our first priority</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/__gauravjha__/">

        <InstagramIcon className="instagramSvgIcon" />

        </a>
        <a href="https://www.youtube.com/channel/UCbpFB6_KJJPYKdgAwPgqJww">
        <YouTubeIcon className='utubeSvgIcon'/>
        </a>
      </div>

    </footer>
  );
};

export default Footer