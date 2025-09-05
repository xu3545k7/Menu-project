<template>
  <div id="app">
    <header class="header">
      <h1 class="logo">順旺行產品目錄</h1>
      <div class="contact-info">
        <div class="contact-item">📱 Line ID: 0935567325</div>
        <div class="contact-item">☎️ 電話: (03) 382-2204</div>
      </div>
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
            ⬅ 上一頁
          </button>
          <span class="page-info">第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁</span>
          <button
            class="page-button"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            下一頁 ➡
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProductCard from './components/ProductCard.vue';
import { products } from './data/products';

export default {
  name: 'App',
  components: {
    ProductCard
  },
  data() {
    return {
      // 硬寫入的商品資料
      products,
      currentPage: 1,
      itemsPerPage: window.innerWidth <= 768 ? 5 : 9,
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 讓捲動有平滑效果
      });
    }
  },
  methods: {
    // 新增一個方法來處理分頁和捲動
    goToPage(page) {
      this.currentPage = page;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;600;700&display=swap');

body {
  margin: 0;
  font-family: 'Noto Sans TC', sans-serif;
  background-color: #fafafa;
  color: #333;
}

#app {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(90deg, #e60023f3, #ff33449c);
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 0.95rem;
}

.contact-item {
  margin: 2px 0;
}

/* Layout */
.main-content {
  display: flex;
  padding: 20px;
  gap: 20px;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  height: fit-content;
}

.sidebar h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: #e60023;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 15px 0 0 0;
}

.category-list li {
  padding: 10px 14px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s;
  background: #f8f8f8;
}

.category-list li:hover {
  background: #e60023;
  color: #fff;
  transform: translateX(4px);
}

.category-list li.active {
  background: #e60023;
  color: #fff;
  font-weight: bold;
}
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar {
    position: sticky;
    top: 120px; /* 跟 header 保持一點距離 */
    width: 100%;
    margin: 0 0 20px 0;
    padding: 10px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    overflow-x: auto;
  }

  .category-list {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    overflow-x: auto;
    margin: 0;
    padding: 0;
  }

  .category-list li {
    flex: 0 0 auto; /* 防止被壓縮 */
    white-space: nowrap;
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background-color: #fafafa;
    font-size: 0.9rem;
    transition: all 0.3s;
  }

  .category-list li.active {
    background-color: #e60023;
    color: #fff;
    font-weight: bold;
    border: none;
  }

  .category-list li:hover {
    background-color: #e60023;
    color: #fff;
  }
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 電腦：3 欄 */
  gap: 20px;
  padding: 20px;
}

/* 手機排版 */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr; /* 手機：直排 */
    gap: 15px;
  }
}

/* Pagination */
.pagination {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.page-button {
  padding: 10px 22px;
  border: none;
  border-radius: 25px;
  background: #e60023;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

.page-button:hover:not(:disabled) {
  background: #cc001f;
}

.page-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-weight: 600;
  color: #333;
}

/* Responsive */
@media (max-width: 900px) {
  .main-content {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
  .contact-info {
    text-align: center;
    align-items: center;
  }
  .header {
    flex-direction: column;
    text-align: center;
  }
}
</style>