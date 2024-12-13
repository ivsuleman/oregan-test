import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function UIInput({
  isPassword = false,
  onValueChange,
  placeholder = "Enter text",
}) {
  const [input, setInput] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(isPassword);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const maskTimeoutRef = useRef(null);

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (isFocused) setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isFocused]);

  // Handle password masking
  const updateMaskedValue = (newValue) => {
    if (isPassword && isHidden && newValue.length > 0) {
      const maskedValue =
        newValue.slice(0, -1).replace(/./g, "*") + newValue.slice(-1);
      setDisplayValue(maskedValue);

      clearTimeout(maskTimeoutRef.current);
      maskTimeoutRef.current = setTimeout(() => {
        setDisplayValue(newValue.replace(/./g, "*"));
      }, 1000);
    } else {
      setDisplayValue(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowKeyboard(true); // Show on-screen keyboard
  };

  const handleBlur = () => setIsFocused(false);

  const handleKeyPress = (e) => {
    if (e.key === "Backspace") {
      handleBackspace();
      return;
    }
    if (e.key.length === 1) {
      const newValue = input + e.key;
      setInput(newValue);
      updateMaskedValue(newValue);
      if (onValueChange) onValueChange(newValue);
    }
  };

  const handleBackspace = () => {
    const newValue = input.slice(0, -1);
    setInput(newValue);
    updateMaskedValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  const handleKeyboardInput = (value) => {
    if (value === "{bksp}") {
      handleBackspace(); // Handle Backspace on keyboard
    } else {
      setInput(value);
      updateMaskedValue(value);
      if (onValueChange) onValueChange(value);
    }
  };

  const toggleShowHide = () => {
    setIsHidden((prev) => !prev);
    if (!isHidden) {
      setDisplayValue(input.replace(/./g, "*"));
    } else {
      setDisplayValue(input);
    }
  };

  return (
    <div className="ui-input-wrapper">
      <div
        className={`ui-input-container ${input ? "filled" : ""}`}
        onClick={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        onKeyDown={handleKeyPress}
      >
        {!input && !isFocused && (
          <div className="placeholder">{placeholder}</div>
        )}
        <div className="ui-input">
          {displayValue}
          {isFocused && cursorVisible && <span className="cursor">|</span>}
        </div>
      </div>

      {/* Show/Hide Button */}
      {isPassword && (
        <button
          type="button"
          className="show-hide-button"
          onClick={toggleShowHide}
        >
          {isHidden ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}

      {/* On-Screen Keyboard */}
      {showKeyboard && (
        <div className="keyboard-container">
          <Keyboard
            onKeyPress={handleKeyboardInput}
            layoutName="default"
            display={{
              "{bksp}": "⌫",
              "{enter}": "⏎",
              "{space}": "␣",
            }}
            layout={{
              default: [
                "1 2 3 4 5 6 7 8 9 0",
                "q w e r t y u i o p",
                "a s d f g h j k l",
                "z x c v b n m {bksp}",
                "{space}",
              ],
            }}
            buttonTheme={[
              {
                class: "keyboard-button",
                buttons: "{bksp} {enter} {space}",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default UIInput;
