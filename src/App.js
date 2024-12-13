import React, { useState } from "react";
import "./styles.css";
import UIInput from "./UIInput";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeInputId, setActiveInputId] = useState(null); // Track focused input

  const handleSignIn = () => {
    console.log("Sign In Clicked");
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="App">
      <div className="login-form">
        <h1>Irfan's User Login</h1>

        {/* Username Field */}
        <UIInput
          id="username"
          activeInputId={activeInputId}
          setActiveInputId={setActiveInputId}
          isPassword={false}
          onValueChange={(value) => setUsername(value)}
          placeholder="Enter Username Here"
        />

        {/* Password Field */}
        <UIInput
          id="password"
          activeInputId={activeInputId}
          setActiveInputId={setActiveInputId}
          isPassword={true}
          onValueChange={(value) => setPassword(value)}
          placeholder="Enter Password Here"
        />

        {/* Sign In Button */}
        <button className="sign-in-button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default App;
