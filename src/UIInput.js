import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function UIInput({
  id,
  isPassword = false,
  activeInputId,
  setActiveInputId,
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
      if (isFocused && activeInputId === id) {
        setCursorVisible((prev) => !prev);
      }
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isFocused, activeInputId, id]);

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
    setActiveInputId(id); // Mark current input as active
  };

  const handleBlur = () => setIsFocused(false);

  // Handle physical keyboard input
  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      handleBackspace();
    } else if (e.key.length === 1) {
      const newValue = input + e.key;
      setInput(newValue);
      updateMaskedValue(newValue);
      if (onValueChange) onValueChange(newValue); // Update parent state
    }
  };

  const handleBackspace = () => {
    const newValue = input.slice(0, -1);
    setInput(newValue);
    updateMaskedValue(newValue);
    if (onValueChange) onValueChange(newValue); // Update parent state
  };

  // Handle on-screen keyboard input
  const handleKeyboardInput = (value) => {
    if (activeInputId !== id) return; // Only update focused input
    if (value === "{bksp}") {
      handleBackspace();
    } else if (value.length === 1) {
      const newValue = input + value;
      setInput(newValue);
      updateMaskedValue(newValue);
      if (onValueChange) onValueChange(newValue); // Update parent state
    }
  };

  const toggleShowHide = () => {
    setIsHidden((prev) => !prev);
    setDisplayValue(!isHidden ? input.replace(/./g, "*") : input);
  };

  return (
    <div
      className="ui-input-wrapper"
      tabIndex={0}
      onClick={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className={`ui-input-container ${isFocused ? "focused" : ""}`}>
        {!input && !isFocused && (
          <div className="placeholder">{placeholder}</div>
        )}
        <div className="ui-input">
          {displayValue}
          {isFocused && cursorVisible && activeInputId === id && (
            <span className="cursor">|</span>
          )}
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
      {showKeyboard && activeInputId === id && (
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
