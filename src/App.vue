<template>
  <div id="app">
    <header class="header">
      <h1 class="logo">產品目錄</h1>
    </header>

    <div class="main-content">
      <aside class="sidebar">
        <h2>分類</h2>
        <ul class="category-list">
          <li
            :class="{ active: selectedCategory === null }"
            @click="selectedCategory = null"
          >
            所有商品
          </li>
          <li
            v-for="category in categories"
            :key="category"
            :class="{ active: selectedCategory === category }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </li>
        </ul>
      </aside>

      <section class="product-list-section">
        <div class="product-grid">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="pagination">
          <button
            class="page-button"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            上一頁
          </button>
          <span>第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁</span>
          <button
            class="page-button"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            下一頁
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProductCard from './components/ProductCard.vue';

export default {
  name: 'App',
  components: {
    ProductCard
  },
  data() {
    return {
      // 硬寫入的商品資料
      products: [
        { id: 1, name: '高山黑皮香菇 3~4cm', category: '香菇', size: '3~4cm', image_url: '/高山黑皮香菇 3~4cm.jpg' },
        { id: 2, name: '高山黑皮香菇 4~5cm', category: '香菇', size: '4~5cm', image_url: '/高山黑皮香菇 4~5cm.jpg' },
        { id: 3, name: '高山黑皮香菇 5~6cm', category: '香菇', size: '5~6cm', image_url: '/高山黑皮香菇 5~6cm.jpg' },
        { id: 4, name: '頂級段木香菇 5~6cm', category: '香菇', size: '5~6cm', image_url: '/頂級段木香菇 5~6cm.jpg' },
        { id: 5, name: '頂級高山花菇 2~3cm', category: '香菇', size: '2~3cm', image_url: '/頂級高山花菇 2~3cm.jpg' },
        { id: 6, name: '頂級高山花菇 4~5cm', category: '香菇', size: '4~5cm', image_url: '/頂級高山花菇 4~5cm.jpg' },
        { id: 7, name: '頂級高山花菇 5~6cm', category: '香菇', size: '5~6cm', image_url: '/頂級高山花菇 5~6cm.jpg' },
        { id: 8, name: '巴西蘑菇', category: '乾貨', size: '無固定', image_url: '/巴西蘑菇.jpg' },
        { id: 9, name: '白木耳', category: '乾貨', size: '無固定', image_url: '/白木耳.jpg' },
        { id: 10, name: '芒果乾', category: '果乾', size: '無固定', image_url: '/芒果乾.jpg' },
        { id: 11, name: '拉拉山水蜜桃乾', category: '果乾', size: '無固定', image_url: '/拉拉山水蜜桃乾.jpg' },
        { id: 12, name: '紅心芭樂乾', category: '果乾', size: '無固定', image_url: '/紅心芭樂乾.jpg' },
        { id: 13, name: '紅棗', category: '果乾', size: '無固定', image_url: '/紅棗.jpg' },
        { id: 14, name: '鹿茸菇', category: '乾貨', size: '無固定', image_url: '/鹿茸菇.jpg' },
        { id: 15, name: '鈕扣小香菇 2~3cm', category: '香菇', size: '2~3cm', image_url: '/鈕扣小香菇 2~3cm.jpg' },
        { id: 16, name: '順旺梅片', category: '果乾', size: '無固定', image_url: '/順旺梅片.jpg' },
        { id: 17, name: '黑木耳', category: '乾貨', size: '無固定', image_url: '/黑木耳.jpg' },
        { id: 18, name: '橘子乾', category: '果乾', size: '無固定', image_url: '/橘子乾.jpg' },
        { id: 19, name: '順旺梅片芒果', category: '果乾', size: '無固定', image_url: '/順旺梅片芒果.jpg' },
    ],
      currentPage: 1,
      itemsPerPage: 8,
      selectedCategory: null // 預設不篩選
    };
  },
  
  computed: {
    // 從商品資料中自動產生分類
    categories() {
      const allCategories = this.products.map(p => p.category);
      return [...new Set(allCategories)]; // 使用 Set 去除重複值
    },
    // 過濾後的商品列表
    filteredProducts() {
      if (!this.selectedCategory) {
        return this.products;
      }
      return this.products.filter(p => p.category === this.selectedCategory);
    },
    // 根據頁碼計算要顯示的商品
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
    // 計算總頁數
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    }
  },
  watch: {
    // 當分類變更時，自動回到第一頁
    selectedCategory() {
      this.currentPage = 1;
    }
  }
};
</script>

<style>
/* 全域樣式 */
body {
  margin: 0;
  background-color: #f7f7f7;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.header {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  margin: 0;
  font-size: 2rem;
  color: #e60023;
}

.main-content {
  display: flex;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-right: 20px;
}

.category-list {
  list-style-type: none;
  padding: 0;
  margin-top: 15px;
}

.category-list li {
  padding: 12px 15px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.category-list li:hover,
.category-list li.active {
  background-color: #eee;
  font-weight: bold;
}

.product-list-section {
  flex-grow: 1;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.pagination {
  text-align: center;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.page-button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #e60023;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.page-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>