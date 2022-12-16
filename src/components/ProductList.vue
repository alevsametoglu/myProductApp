<script setup>
import ProductItem from "./ProductItem.vue";

defineProps({ products: Array });
const emit = defineEmits(["deleteProduct", "updateProduct"]);
</script>

<template>
  <div class="searchBar">
    <span> </span>
  </div>
  <div>
    <ul class="productList">
      <li v-for="product in products" :key="product.refNumber">
        <ProductItem
          :name="product.name"
          :price="product.price"
          :city="product.city"
          :refNumber="product.refNumber"
          @delete="() => emit('deleteProduct', product.refNumber)"
          @update="() => emit('updateProduct', product.refNumber)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.productList {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 40px;
  padding: 10px;
  li {
    list-style-type: none;
  }
}
</style>
