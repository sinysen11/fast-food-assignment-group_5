<template>
    <div class="cart">
      <div class="contact-us">
        <div class="contact-us-content">
          <h1>Contact Us</h1>
          <p>If you have any questions or feedback, feel free to get in touch with us!</p>
          <div class="contact-form">
            <label for="name">Your Name:</label>
            <input type="text" id="name" placeholder="Enter your name">
            <label for="email">Your Email:</label>
            <input type="email" id="email" placeholder="Enter your email">
            <label for="message">Message:</label>
            <textarea id="message" placeholder="Enter your message"></textarea>
            <button>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
      }
    },
  }
  </script>
  
  <style scoped>
  .cart {
    margin-top: 120px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .cart h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .contact-us {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .contact-us-content {
    text-align: center;
  }
  
  .location {
    margin-top: 30px;
  }
  
  .location h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .location p {
    font-size: 16px;
  }
  
  .contact-form {
    margin-top: 30px;
  }
  
  .contact-form label {
    display: block;
    margin-bottom: 5px;
  }
  
  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .contact-form textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .contact-form button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .contact-form button:hover {
    background-color: #0056b3;
  }
  </style>
  