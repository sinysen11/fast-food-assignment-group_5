<template>
  <div class="container">
    <div v-if="users && users.length > 0">
      <h2 class="user-info">User Information</h2>
      <div class="user-cards">
        <div v-for="(user, index) in users" :key="index" class="user-card">
          <h3><strong>Username: </strong>{{ user.username }}</h3>
          <p><strong>Role:</strong> {{ user.role }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No user information available.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      const users = JSON.parse(localStorage.getItem('users'));
      if (users && users.length > 0) {
        this.users = users;
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 100px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 15px;
}

.user-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.user-card {
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
  font-size: 16px;
}

.user-info {
  font-size: 30px;
  color: #007bff;
  font-weight: bold;
}
</style>
