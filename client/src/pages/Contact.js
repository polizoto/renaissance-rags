import { sendEmail } from '../components/Email'
import React, { useState } from 'react';
import './Contact.css';
import { validateEmail } from '../utils/helpers';

const Label = ({ selector, text, required }) => (
  <label htmlFor={selector}>
    {text}
    {required && <span className='required'>*</span>}
  </label>
);

const TextArea = ({ selector, text, className, required, onChange  }) => (
  <>
    <Label selector={selector} text={text} required={required} />
    <textarea id={selector} name={selector} className={className} cols={50} rows={5} required={required} onChange={onChange}/>
  </>
);

const Input = ({ selector, text, className, required, onChange }) => (
  <>
    <Label selector={selector} text={text} required={required} />
    <input type='text' className={className} id={selector} name={selector} required={required} onChange={onChange} />
  </>
);

const Checkbox = ({ selector, text, className, required, onChange }) => (
  <>
    <Label selector={selector} text={text} required={required} />
    <input type='checkbox' className={className} id={selector} name={selector} required={required} onChange={onChange} />
  </>
);

export default function Contact () {
  const [formState, setFormState ] = useState({ name: '', email: '', message: '', vendor: false });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
  if (e.target.name === 'name') {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log('Handle Form', formState);
    }
  else if (e.target.name === 'email') {
      setFormState({ ...formState, [e.target.name]: e.target.value });
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMessage('Your email is invalid.');
      } else {
        setErrorMessage('');
      }
      console.log('Handle Form', formState);
      }
  else if (e.target.name === 'message') {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        console.log('Handle Form', formState);
        }
  else if (e.target.name === 'vendor') {
    setFormState({ ...formState, [e.target.name]: !e.target.checked });
    console.log('Handle Form', formState);
    }
  };

  return (
    <div>
              <h2>Contact</h2>
        <div className="container">
    <form
      onSubmit={async (e) => {
        setLoading(true);
        e.persist();
        try {
          await sendEmail(e);
          setLoading(false);
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (e) {
          setLoading(false);
          setErrorMessage(e.text);
          setTimeout(() => setErrorMessage(null), 3000);
        }
        setFormState({ ...formState, name: '', email: '', message: '', vendor: false })
        e.target.reset();
      }}
    >
      {loading && <div>Submitting form...</div>}
      {showSuccessMessage && <div>Submit successful</div>}
      {errorMessage && <div className='error'>{errorMessage}</div>}
      <div className="form-name">
      <Input selector='name' text='Name ' required onChange={handleChange}/>
      </div>
      <div className="form-email">
      <Input selector='email' text='Email Address ' required onChange={handleChange}/>
      </div>
      <div className="form-message">
      <TextArea selector='message' text='Message' onChange={handleChange}/>
      </div>
      <div className="form-checkbox"> 
      <Checkbox className='checkbox' selector='vendor' text='Are you interested in becoming a vendor?' onChange={handleChange}/>
      </div>
      <div className="form-button">
      <input disabled={errorMessage} className="form-button" type='submit' value='Submit' />
      </div>
    </form>
    </div>
    </div>
  );
};