<template>
  <div>
    <input type="text" v-model="input" placeholder="Search fruits..." />
    <div class="btn-container">
      <button class="btn btn-success" @click="openDialog">Create</button>
    </div>

    <div v-if="showDialog" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ editMode ? 'Edit Menu' : 'Add New Menu' }}</h2>
          </div>

          <div class="modal-body">
            <form @submit.prevent="saveProduct">
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="formData.name" class="form-control" required>
              </div>

              <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" id="price" v-model="formData.price" class="form-control" required>
              </div>

              <div class="form-group">
                <label for="image">Image:</label>
                <input type="file" id="image" @change="handleImageChange" class="form-control-file" accept="image/*"
                  :required="!editMode">
                <img v-if="formData.imagePreview" :src="formData.imagePreview" class="uploaded-image"
                  alt="Uploaded Image">
              </div>

              <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="formData.description" class="form-control" rows="4"
                  required></textarea>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeDialog">Close</button>
                <button type="submit" class="btn btn-primary">{{ editMode ? 'Update' : 'Submit' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredProducts.length > 0" class="products">
      <div class="columns is-multiline is-desktop is-widescreen is-fullhd">
        <div v-for="product in filteredProducts" :key="product.id"
          class="column is-4-fullhd is-4-widescreen is-6-desktop">
          <div class="product">
            <div class="card">
              <div class="card-image">
                <figure class="image is-square">
                  <img :src="product.image" alt="Product Image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="is-size-4 has-text-weight-bold mb-2 product-title">
                      {{ product.name }}
                    </p>
                    <p class="subtitle is-6 has-text-semi-bold">Category: {{ "Fast Food" }}</p>
                  </div>
                </div>
                <p class="has-text-weight-bold mb-2">Price: ${{ product.price }}</p>
                <div class="content">
                  <p>{{ product.description.substring(0, 100) }}</p>
                </div>
                <div class="actions buttons">
                  <div>
                    <button type="button" class="btn btn-primary">+ Add</button>
                  </div>
                  <div class="action-buttons-right">
                    <button type="button" class="btn btn-primary" @click="openEditDialog(product)">Edit</button>
                    <button type="button" class="btn btn-primary"
                      @click="openDeleteConfirmation(product.id)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="empty-logo">
        <img :src="emptyProductImage" class="" alt="Empty Product">
      </div>
    </div>

    <div v-if="confirmDelete" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Confirm Delete</h2>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this product?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelDelete">No</button>
            <button type="button" class="btn btn-primary" @click="confirmDeleteAction">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emptyProductImage from '@/assets/empty-cart.png';
export default {
  name: "Products",
  data() {
    return {
      input: '',
      products: [],
      lastProductId: 0,
      showDialog: false,
      editMode: false,
      confirmDelete: false,
      productIdToDelete: null,
      formData: {
        id: null,
        name: '',
        price: '',
        image: null,
        imagePreview: null,
        description: ''
      },
      emptyProductImage
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.input.toLowerCase())
      );
    }
  },
  methods: {

    openDialog() {
      this.editMode = false;
      this.showDialog = true;
    },

    closeDialog() {
      this.showDialog = false;
      this.resetFormData();
    },

    openEditDialog(product) {
      this.editMode = true;
      this.formData = { ...product, imagePreview: product.image };
      this.showDialog = true;
    },

    handleImageChange(event) {
      const file = event.target.files[0];
      this.formData.image = file;
      this.formData.imagePreview = URL.createObjectURL(file);
    },

    saveProduct() {
      if (this.editMode) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    },

    addProduct() {
      const reader = new FileReader();
      reader.onload = () => {
        const product = {
          id: ++this.lastProductId,
          name: this.formData.name,
          price: this.formData.price,
          image: reader.result,
          description: this.formData.description
        };
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        existingProducts.push(product);
        localStorage.setItem('products', JSON.stringify(existingProducts));
        this.closeDialog();
        this.resetFormData();
        this.fetchProductsFromLocalStorage();
      };
      reader.readAsDataURL(this.formData.image);
    },

    updateProduct() {
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = existingProducts.map(product =>
        product.id === this.formData.id ? { ...this.formData, image: this.formData.imagePreview } : product
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      this.closeDialog();
      this.resetFormData();
      this.fetchProductsFromLocalStorage();
    },

    deleteProduct(productId) {
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = existingProducts.filter(product => product.id !== productId);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      this.fetchProductsFromLocalStorage();
    },

    openDeleteConfirmation(productId) {
      this.confirmDelete = true;
      this.productIdToDelete = productId;
    },

    cancelDelete() {
      this.confirmDelete = false;
      this.productIdToDelete = null;
    },

    confirmDeleteAction() {
      if (this.productIdToDelete) {
        this.deleteProduct(this.productIdToDelete);
        this.confirmDelete = false;
        this.productIdToDelete = null;
      }
    },

    fetchProductsFromLocalStorage() {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        this.products = JSON.parse(savedProducts).reverse();
        this.lastProductId = this.products.length ? Math.max(...this.products.map(product => product.id)) : 0;
      }
    },

    resetFormData() {
      this.formData = {
        id: null,
        name: '',
        price: '',
        image: null,
        imagePreview: null,
        description: ''
      };
    }
  },

  created() {
    this.fetchProductsFromLocalStorage();
  }
};
</script>



<style scoped>
.btn-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 12px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 30px;
  text-decoration: bold;
  color: green;
}

.modal-dialog {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 15px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 15px;
}

.modal-footer {
  padding: 15px;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.close {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.close span {
  font-size: 1.5rem;
}

.uploaded-image {
  display: block;
  margin-top: 0.5rem;
  max-width: 30%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.actions.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-buttons-right {
  display: flex;
}

.btn {
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

.empty-logo {
  display: flex;
  justify-content: center;
  img {
    max-width: 30%;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>