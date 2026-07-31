import { useState } from "react";

import { 
    signInWithGooglePopup, 
    signInUserAuthEmail,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils.js"

import FormInput from "../../components/form-input/form-input.component.jsx";
import Button from "../../components/button/button.component.jsx"

import "./sign-in-form.styles.css";



const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        //createUserDocumentFromAuth(user);
    };

    const changeHandler = (event) => {
        const whichFieldToPick = event.target.name;
        const setThisValue = event.target.value;
        setFormFields( {...formFields, [whichFieldToPick]: setThisValue } );
        
    };

    const resetFormFields = () => {
        setFormFields( defaultFormFields );
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        try {

            //const { user } = await createUserAuthEmail(email, password);
            //await createUserDocumentFromAuth(user, {displayName});
            //console.log(user)
            const {user} = await signInUserAuthEmail(email, password);
            resetFormFields();

        }catch(error){

            switch(error.code){
                case "auth/invalid-credential":
                    alert("Email or password is incorrect.");
                    break;
                default:
                    alert("Sign in has encountered an error. Try again or wait for a few moment.");
                    break;
            }

            console.log("User authentication encountered an error\n",error);
            /*if(error.code === `auth/invalid-credential`){
                alert("Email or password is incorrect.");
                console.log(error);
                return;
            }

            alert("Sign in has encountered an error. Try again or wait for a few moment.");
            console.log("User authentication encountered an error\n",error);
            */
        };
    };

    console.log(formFields);


    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in to get started</span>
            <form onSubmit={ submitHandler } >

                <FormInput 
                    label="Email"
                    type="email"
                    onChange={changeHandler}
                    name="email"
                    value={email}
                    required
                />

                <FormInput 
                    label="Password"
                    type="password"
                    onChange={changeHandler}
                    name="password"
                    value={password}
                    required
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Sign In with Google</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;