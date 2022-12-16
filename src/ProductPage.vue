</script>
<script setup>
import SearchInput from "./components/SearchInput.vue";
import FilterProduct from "./components/FilterProduct.vue";
import SortProduct from "./components/SortProduct.vue";
import ProductList from "./components/ProductList.vue";
import ProductForm from "./components/ProductForm.vue";
import { reactive, onMounted } from "vue";
import Api from "./Api";

const state = reactive({
  showForm: false,
  productList: [],
  filterQuery: undefined,
  sortData: { field: "name", value: -1 },
  selectedProduct: undefined,
  searchQuery: { type: "or", searchKey: "" },
  hasMore: true,
});

function handleFilter(filterQuery) {
  state.filterQuery = filterQuery;
  loadProductList(0);
}

function handleSort(sortData) {
  state.sortData = sortData;
  loadProductList(0);
}

function handleSearch(searchQuery) {
  state.searchQuery = searchQuery;
  loadProductList(0);
}

function loadProductList(skip) {
  const limit = 5;
  const query = {
    filterQuery: state.filterQuery,
    sortData: state.sortData,
    searchQuery: state.searchQuery,
    limit,
    skip: skip !== undefined ? skip : state.productList.length,
  };
  const products = Api.getProductList(query);
  console.log(products);
  state.productList =
    skip === 0 ? products : [...state.productList, ...products];
  console.log(state);
  state.hasMore = products.length === limit;
}

function deleteProduct(refNumber) {
  Api.deleteProduct(refNumber);
  state.productList = state.productList.filter(
    (product) => product.refNumber !== refNumber
  );
}
function editProduct(refNumber) {
  const product = state.productList.find(
    (product) => product.refNumber === refNumber
  );
  state.selectedProduct = product;
  state.showForm = true;
}

function createUpdateProduct(product) {
  console.log(product);
  state.showForm = false;
  // console.log(product);
  if (!!state.selectedProduct) {
    //TODO: update product
    Api.updateProduct(product);

    state.selectedProduct = undefined;
  } else {
    //TODO:  create product
    Api.createProduct(product);
    state.productList.push(product);
    console.log(state.productList);
  }
}

function closeForm() {
  state.showForm = false;
  state.selectedProduct = undefined;
}

onMounted(() => {
  loadProductList();
});
</script>

<template>
  <div class="pageHeader">
    <header>
      <img src="./assets/as logo.png" alt="" />
      <a-button type="primary" @click="state.showForm = true"
        >create new product</a-button
      >
    </header>
  </div>
  <div style="display: grid; place-items: center">
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      "
    >
      <a-row>
        <a-col span="8">
          <SearchInput @change="handleSearch" />
        </a-col>
        <a-col span="12">
          <FilterProduct @filter="handleFilter" />
        </a-col>
        <a-col span="4">
          <SortProduct @sort="handleSort" />
        </a-col>
      </a-row>
    </div>
    <ProductList
      :products="state.productList"
      @deleteProduct="deleteProduct"
      @updateProduct="editProduct"
    />
    <ProductForm
      :show="state.showForm"
      :product="state.selectedProduct"
      @close="closeForm"
      @submit="createUpdateProduct"
    />

    <a-button
      v-if="state.hasMore"
      type="primary"
      style="margin-bottom: 30px"
      @click="loadProductList(state.productList.length)"
      >Load more...</a-button
    >
  </div>
</template>

<style lang="scss" scoped>
.pageHeader {
  border: 1px solid #eaedf2;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-bottom: 50px;
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    img {
      height: 50px;
    }
  }
}
</style>
