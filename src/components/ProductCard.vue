<template>
  <div class="product-card">
    <div class="product-image-container">
      <img :src="product.image_url" :alt="product.name" class="product-image">
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-size">尺寸 :{{ product.size }}</p>
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
  computed: {
    processedImageUrl() {
      // 確保圖片路徑存在
      if (!this.product || !this.product.image_url) {
        return '';
      }
      // 修正路徑以移除開頭的 "./"，因為 require() 會自動加上它
      const imagePath = this.product.image_url.startsWith('./')
        ? this.product.image_url.substring(2) // 移除 "./"
        : this.product.image_url;

      try {
        // 使用 require 讓 Webpack 自動處理路徑
        return require('../' + imagePath);
      } catch (e) {
        // 如果圖片找不到，返回空字串或預設圖片
        console.error(`無法載入圖片: ${imagePath}`, e);
        return '';
      }
    }
  }
};
</script>
<style scoped>
/* styles are correct, no changes needed */
.product-card {
  width: 250px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  font-family: Arial, sans-serif;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  padding: 16px;
  text-align: center;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.product-size {
  font-size: 1rem;
  color: #e60023;
  font-weight: bold;
  margin-bottom: 4px;
}

.product-category {
  font-size: 0.9rem;
  color: #666;
}
</style>