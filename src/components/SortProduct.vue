<script>
/**
 * Sort product component
 * @vue-event { void} sort - Emit sort products
 *
 *
 */
export default { name: "SortProduct" };
</script>

<script setup>
import { ref } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

// declared default sortField with ref
const sortField = ref("name");

// declared default sortValue with ref
const sortValue = ref(1);

const emit = defineEmits(["sort"]);
function handleSortFieldChange(value) {
  sortField.value = value;
  emit("sort", { sortField: sortField.value, sortValue: sortValue.value });
}
function toggleSortValue() {
  sortValue.value = sortValue.value === 1 ? -1 : 1;
  emit("sort", { sortField: sortField.value, sortValue: sortValue.value });
}
</script>
<template>
  <div style="padding: 20px; display: flex; flex-direction: row">
    <span>
      <a-select
        style="width: 120px"
        @change="handleSortFieldChange"
        :value="sortField"
      >
        <a-select-option value="name">name</a-select-option>
        <a-select-option value="city">city</a-select-option>
        <a-select-option value="price">price</a-select-option>
        <a-select-option value="ref">ref</a-select-option>
      </a-select>
    </span>
    <span>
      <a-button @click="toggleSortValue">
        <DownOutlined v-if="sortValue === 1" />
        <UpOutlined v-else />
      </a-button>
    </span>
  </div>
</template>
