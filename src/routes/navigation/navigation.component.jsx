import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router";

//import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
//<CrwnLogo className="logo"/>

import { userContext } from "../../context/user.context.jsx"
import { signOutUser } from "../../utils/firebase/firebase.utils.js"
import logo from "../../assets/k logo.png"

import "./navigation.styles.css";



const Navigation = () => {
  
  const { currentUser } = useContext(userContext);
  
  const signOutHandler = async () => {
    await signOutUser();
  }; 

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

          {
            currentUser ? (
              <span className="nav-link" onClick={signOutHandler}>
                SIGN OUT
              </span>
            ) : (
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
            )
          }

        </div>
        
      </div>
      <Outlet/>

    </Fragment>
  );
};

export default Navigation;