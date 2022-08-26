import './App.css';
import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import WebFont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/footer/footer.js";
import Home from "./component/Home/Home.js";
import Loader from './component/layout/Loader/Loader.js';
function App() {

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:['Roboto','Droid Sans','Chilanka'],
      },
    });
  },[]);

  return( 
  <Router>
    <Header/>
     
     <Routes>
     <Route exact path="/" element={<Home/>}/>
     <Route exact path="/sad" element={<Loader/>}/>

     </Routes>

    <Footer/>
  </Router>
  );
};

export default App;
