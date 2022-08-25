import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const footer = () => {
  return (
    <footer id='footer'>
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore"/>
        <img src={appStore} alt="Appstore"/>
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        {/* link will add here (fb,insta etc); */}
      </div>

    </footer>
  )
}

export default footer