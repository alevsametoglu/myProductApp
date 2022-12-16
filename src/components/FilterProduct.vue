<script setup>
import Api from "../Api";
import { onMounted, ref } from "vue";
// declared cities and filterData with ref()vue
const cities = ref([]);
const filterData = ref({ selectedCities: [], priceRangeData: [] });

//get cities from json by Api
onMounted(() => {
  cities.value = Api.getCities();
});
const emit = defineEmits(["filter"]);

function handleCityChange(value) {
  console.log(value);
  filterData.value.selectedCities = value;
  emit("filter", filterData.value);
}

function handlePriceRange(value) {
  filterData.value.priceRangeData = value;
  emit("filter", filterData.value);
}
</script>

<template>
  <div style="display: inline-flex; flex-direction: column">
    <a-row>
      <a-col style="padding-left: 10px" span="12">price filter </a-col>
      <a-col style="padding-left: 10px" span="12">city</a-col>
    </a-row>
    <a-row :gutter="10" style="width: 500px">
      <a-col span="12">
        <a-slider size="large" range @afterChange="handlePriceRange" />
      </a-col>
      <a-col span="12">
        <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="Please select"
          :options="cities.map((city) => ({ value: city }))"
          @change="handleCityChange"
      /></a-col>
    </a-row>
  </div>
</template>

<style lang="scss"></style>
