<script setup>
import { ref } from "vue";
//declared search query param with ref
const searchQuery = ref({
  type: "or",
  searchKey: "",
});
const emit = defineEmits(["change"]);

function handleSearchKey(value) {
  searchQuery.value.searchKey = value;
  emit("change", searchQuery.value);
}
function handleSearchType(value) {
  searchQuery.value.type = value;
  emit("change", searchQuery.value);
}
</script>

<template>
  <a-input-group
    compact
    style="padding: 20px; display: flex; align-items: center"
  >
    <a-select
      :value="searchQuery.type"
      @change="handleSearchType"
      style="min-width: 70px"
    >
      <a-select-option value="or">Or</a-select-option>
      <a-select-option value="and">And</a-select-option>
    </a-select>
    <a-input-search
      placeholder="Search product by name or ref"
      enter-button
      @search="handleSearchKey"
    />
  </a-input-group>
</template>
