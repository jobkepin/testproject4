import "./button.styles.css";

const BUTTON_TYPE_LIST = {
    google: "google-sign-in",
    inverted: "inverted"
};

const Button = ( {children, buttonType, ...otherProps}) => {
    return(
        <button
            className= {`button-container ${BUTTON_TYPE_LIST[buttonType]}`} 
            {...otherProps}
        > 
        {children} 
        </button>
    );
};

export default Button;