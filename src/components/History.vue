<template>
  <div class="history">
    <h1 class="title">Order History</h1>
    <div v-if="historyItems.length">
      <div v-for="(item, index) in historyItems" :key="index" class="history-item">
        <div class="history-item-header">
          <h2 class="subtitle">{{ item.names }}</h2>
          <span class="date">{{ item.date }}</span>
        </div>
        <div class="history-item-body">
          <img :src="item.image" alt="Product Image" class="history-item-image" />
          <p class="total">Total: ${{ item.total }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="empty-logo">
        <img :src="emptyProductImage" class="" alt="Empty Product">
      </div>
    </div>
  </div>
</template>

<script>
import emptyProductImage from '@/assets/empty-cart.png';
export default {
  name: "History",
  data() {
    return {
      historyItems: [],
      emptyProductImage
    };
  },
  created() {
    this.loadHistoryFromLocalStorage();
  },
  methods: {
    loadHistoryFromLocalStorage() {
      const storedHistoryItems = localStorage.getItem('history');
      if (storedHistoryItems) {
        this.historyItems = JSON.parse(storedHistoryItems).reverse();
      }
    }
  }
};
</script>

<style scoped>
.history {
  margin-top: 100px;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
  font-weight: bold;
}

.history-item {
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  transition: transform 0.2s ease-in-out;
}

.history-item:hover {
  transform: scale(1.02);
}

.history-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 600;
}

.date {
  font-size: 0.9rem;
  color: #888;
}

.history-item-body {
  display: flex;
  align-items: center;
}

.history-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
}

.total {
  font-size: 1.2rem;
  font-weight: 500;
}

.empty-logo {
  display: flex;
  justify-content: center;

  img {
    max-width: 30%;
  }
}
</style>
