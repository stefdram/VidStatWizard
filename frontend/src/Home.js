import React from "react"
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logoImage from "./vswizlogo.png";

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();
    
    const onButtonClick = () => {
        navigate("/Login");
    }

    return <div className="mainContainer">
        <img src={logoImage} alt="VidStatWizard Logo" className="logo" />

      <header style={{ fontSize: "40px", fontWeight: "bold" , marginBottom: "20px"}}>
        Welcome to VidStatWizard!
      </header>
        <div className={"buttonContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"login / signup"} />
        </div>
    </div>
}

export default Home