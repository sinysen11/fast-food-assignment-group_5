<template>
    <div class="container">
  
      <!-- Create user button -->
      <button @click="showCreateDialog">Create User</button>
  
      <!-- Create user dialog -->
      <div v-if="showDialog" class="dialog-overlay">
        <div class="dialog">
          <span class="close" @click="closeDialog">&times;</span>
          <h2>Create User</h2>
          <form @submit.prevent="createUser">
            <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" v-model="newUser.username" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" v-model="newUser.email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" v-model="newUser.password" required>
            </div>
            <div class="form-group">
              <label for="image">Profile Image:</label>
              <input type="file" @change="handleImageUpload" accept="image/*">
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showDialog: false,
        newUser: {
          username: '',
          email: '',
          password: '',
          image: ''
        }
      };
    },
    methods: {
      showCreateDialog() {
        this.showDialog = true;
      },
      closeDialog() {
        this.showDialog = false;
        // Reset new user data
        this.newUser = {
          username: '',
          email: '',
          password: '',
          image: ''
        };
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            this.newUser.image = reader.result;
          };
          reader.readAsDataURL(file);
        }
      },
      createUser() {
        // Save the new user to local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(this.newUser);
        localStorage.setItem('users', JSON.stringify(users));
        // Close the dialog
        this.closeDialog();
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 100px;
  }
  
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="file"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button[type="submit"] {
    width: 100%;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  