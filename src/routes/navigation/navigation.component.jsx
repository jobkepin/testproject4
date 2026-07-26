import { Fragment } from "react";
import { Outlet, Link } from "react-router";

//import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
//<CrwnLogo className="logo"/>

import logo from "../../assets/k logo.png"


import "./navigation.styles.css";


const Navigation = () => {
  return(
    <Fragment>
      
      <div className="navigation">

        <Link className="logo-container" to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>

        <div className="nav-links-container">
          
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>

        </div>
        
      </div>
      <Outlet/>

    </Fragment>
  );
};

export default Navigation;