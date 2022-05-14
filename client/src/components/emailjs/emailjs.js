import { init, sendForm } from "emailjs-com";

init(process.env.REACT_APP_USER_ID);

export async function sendEmail(e) {
  e.preventDefault();
  try {
    const res = await sendForm(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      e.currentTarget
    );
    return res.text;
  } catch (error) {
    throw error;
  }
}