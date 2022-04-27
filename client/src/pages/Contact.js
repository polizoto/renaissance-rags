import { send } from 'emailjs-com';
import React, { useState } from 'react';
import './Contact.css';
import { validateEmail } from '../utils/helpers';

const REACT_APP_SERVICE_ID = process.env.REACT_APP_SERVICE_ID
const REACT_APP_TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID
const REACT_APP_USER_ID = process.env.REACT_APP_USER_ID

export default function Contact() {

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });



  const [errorMessage, setErrorMessage] = useState('');
  const { name, email, message } = formState;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMessage) {
      console.log('Submit Form', formState);
      send(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        formState,
        REACT_APP_USER_ID
      )
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);

        })
        .catch((err) => {
          console.log('FAILED...', err);
        });
    }
    setFormState({ ...formState, name: '', email: '', message: '' })
    e.target.reset();
  };

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMessage('Your email is invalid.');
      } else {
        setErrorMessage('');
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage('');
      }
    }
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
      console.log('Handle Form', formState);
    }
  };

    return (
      <div>
        <h2>Contact</h2>
        <div className="container">
        <form id="contact-form" onSubmit={handleSubmit}>
        <div className="form-name">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Name" defaultValue={name} name="name" onBlur={handleChange} />
        </div>
        <div className="form-email">
          <label htmlFor="email">Email address:</label>
          <input id="email" type="email" placeholder="Email" name="email" defaultValue={email} onBlur={handleChange} />
        </div>
        <div className="form-message">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" placeholder="Your Message" rows="5" defaultValue={message} onBlur={handleChange} />
        </div>
        <div className="form-checkbox"> 
        <label htmlFor="checkbox">Are you interested in becoming a vendor?</label>
        <input id="checkbox" name="checkbox" className="checkbox" type="checkbox" />
        </div>
        {errorMessage && (
          <div className="form-error">
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <div className="form-button">
        <button data-testid="button" type="submit">Submit</button>
        </div>
      </form>
      </div>
      </div>
    );
  }