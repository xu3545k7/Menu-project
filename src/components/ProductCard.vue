<template>
  <div class="product-card">
    <div class="product-image-container">
      <img :src="product.image_url" :alt="product.name" class="product-image">
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
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #f9f9f9, #ececec);
  overflow: hidden;
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

.product-info {
  padding: 14px 16px 18px;
  text-align: center;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #222;
  line-height: 1.4;
}

.product-size {
  font-size: 1rem;
  color: #e63946;
  font-weight: 500;
  margin-bottom: 6px;
}

.product-category {
  font-size: 0.95rem;
  color: #777;
  letter-spacing: 0.3px;
}

/* 手機版調整 */
@media (max-width: 600px) {
  .product-card {
    width: 100%;
    margin: 10px 0;
  }

  .product-image-container {
    height: 280px;
  }

  .product-name {
    font-size: 1.1rem;
  }
}
</style>
