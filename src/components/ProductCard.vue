<template>
  <div class="product-card">
    <div class="product-image-container">
      <img :src="currentImage" :alt="product.name" class="product-image">

      <div class="image-controls" v-if="product.image_url.length > 1">
        <button class="image-nav left" @click.stop="prevImage">‹</button>
        <button class="image-nav right" @click.stop="nextImage">›</button>
      </div>
    </div>
    
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-size">尺寸：{{ product.size }}</p>
      <p class="product-category">{{ product.category }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard', 
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 追蹤目前顯示的圖片索引
      currentImageIndex: 0
    };
  },
  computed: {
    // 根據索引返回目前的圖片 URL
    currentImage() {
      // 如果 image_url 不是陣列或不存在，則返回一個空字串或預設圖片
      if (!Array.isArray(this.product.image_url) || this.product.image_url.length === 0) {
        return '';
      }
      return this.product.image_url[this.currentImageIndex];
    }
  },
  methods: {
    // 顯示下一張圖片
    nextImage() {
      // 確保索引不超過圖片陣列的長度
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.image_url.length;
    },
    // 顯示上一張圖片
    prevImage() {
      // 確保索引不會小於 0
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.image_url.length) % this.product.image_url.length;
    }
  }
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  font-family: "Segoe UI", Arial, sans-serif;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #f9f9f9, #ececec);
  overflow: hidden;
  position: relative; /* 讓按鈕可以相對於這個容器定位 */
}

.image-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  z-index: 10;
}

.image-nav {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: background-color 0.2s;
  opacity: 0; /* 預設隱藏 */
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

.product-card:hover .image-nav {
  opacity: 1;
}

.image-nav:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.product-info {
  padding: 10px 12px 10px;
  text-align: center;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 6px;
  color: #222;
  line-height: 1.0;
}

.product-size {
  font-size: 0.9rem;
  color: #e63946;
  font-weight: 500;
  margin-bottom: 6px;
}

.product-category {
  font-size: 0.9rem;
  color: #777;
  letter-spacing: 0.3px;
}

/* 手機版調整 */
@media (max-width: 600px) {
  .product-info {
    padding: 8px 10px 10px;
    text-align: center;
  }

  .product-size,
  .product-category {
    font-size: 0.85rem;
  }

  .product-card {
    width: 100%;
    margin: 10px 0;
  }

  .product-image-container {
    width: 100%;
    height: 220px;
  }

  .product-name {
    font-size: 1.2rem;
    margin-bottom: 4px;
    line-height: 1.0;
  }
}
</style>
