import React, { useState } from "react";
import "./styles.css";
import UIInput from "./UIInput";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Sign In Clicked");
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="App">
      <div className="login-form">
        <h1>User Login</h1>

        {/* Username Field */}
        <UIInput
          isPassword={false}
          onValueChange={(value) => setUsername(value)}
          placeholder="Enter Username Here"
        />

        {/* Password Field */}
        <UIInput
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
