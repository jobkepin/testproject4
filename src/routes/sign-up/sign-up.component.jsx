import { useState } from "react";
import { createUserAuthEmail, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils.js"

import "./sign-up.styles.css";
import FormInput from "../../components/form-input/form-input.component.jsx";
import J from "../../components/button/button.component.jsx"


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};



const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;


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

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        };

        try {
            const { user } = await createUserAuthEmail(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            console.log(user);
            resetFormFields();

        }catch(error){
            console.log(error);
            if(error.code === `auth/email-already-in-use`){
                console.log("Cannot create user, email is already in use");
            }

            console.log("User creation encountered an error\n",error);
        };

    };


    console.log(formFields);

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ submitHandler } >
                <FormInput 
                    label= "Display Name"
                    type="text"
                    onChange={changeHandler}
                    name="displayName"
                    value={displayName}
                    required
                />

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

                <FormInput 
                    label="Confirm Password"
                    type="password"
                    onChange={changeHandler}
                    name="confirmPassword"
                    value={confirmPassword}
                    required
                />

                <J type="submit">Sign Up</J>
            </form>
        </div>
    );
};

export default SignUp;