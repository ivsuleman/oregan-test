# Q1 Can you provide additional design considerations for the UI Input component based on the Login Page Design provided that are not mentioned/listed above?

### 1. Accessibility

- Make the screen WCAG compliant.
- Ensure UI is navigable using a physical keyboard for users who cannot use a mouse (add tabindex="0" property to elements that can be focussed).
- Add Aria Labels to UI elements for users who are visually impaired and use screen readers.
- Ensure the colours used make the text and elements clear and readable, especially for those who have visual impairments such as colour blindness.

### 2. Input Validation

- Real-time validation of the user input as the user types. i.e. if the user types an invalid character then the input element border turns red or a pop-up appears detailing the error.
- Tooltips added to the input fields to provide guidance on input requirements i.e. "Must include @".

### 3. Password Management

- show a strength meter indicating how strong a password is.
- indicate when caps lock is on.

### 4. Responsive Design

- make it mobile friendly i.e. ensure inputs resize on smaller devices using width: 100% with a max-width.
