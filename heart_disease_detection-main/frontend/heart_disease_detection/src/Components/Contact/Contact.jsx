import React from 'react';
import './Contact.css';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/email.png';
import location_icon from '../../assets/location.png';
import white_arrow from '../../assets/white-arrow.png';


const Contact = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");
        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                throw new Error(errorBody.message || "Unable to send your message right now.");
            }

            const data = await response.json();
            setResult(data.message || "Message sent!");
            event.target.reset();
        } catch (error) {
            console.error("Error sending contact form:", error);
            setResult(error.message || "Something went wrong. Please try again later.");
        }
    };

    
    return (
        <div className='contact'>
            <div className="contact-col">
                <h3>Send us a message <img src={msg_icon} alt="" /></h3>
                <p>Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service.</p>
                <ul>
                    <li><img src={mail_icon} alt="" />winniemichino51@gmail.com</li>
                    <li><img src={location_icon} alt="" /> Nairobi<br /> Kenya</li>
                </ul>
            </div>
            <div className="contact-col">
                <form onSubmit={onSubmit}>
                    <label>Your name</label>
                    <input type="text" name='name' placeholder='Enter your name' required />
                    <label>Phone Number</label>
                    <input type="tel" name='phone' placeholder='Enter your mobile number' required />
                    <label>Write your messages here</label>
                    <textarea name="message" rows="6" placeholder='enter your message' required></textarea>
                    <button type='submit' className='btn dark-btn'>Submit now <img src={white_arrow} alt="" /></button>
                </form>
                <span>{result}</span>
            </div>

        </div>
    )
}

export default Contact;