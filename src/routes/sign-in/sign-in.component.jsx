import SignUp from "../sign-up/sign-up.component.jsx";

import {  
  signInWithGooglePopup, 
  createUserDocumentFromAuth 
  }
from "../../utils/firebase/firebase.utils.js";



const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);

    const userDocRef = createUserDocumentFromAuth(user);


  };

  return(
    <div>
      <h1>This is a Sign-in page.</h1>
        <button onClick={logGoogleUser}>
          Sign in with Google
        </button>
      
      <SignUp />
    </div>
  );
};

export default SignIn;