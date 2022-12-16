import products from "./products.json";
import storageHelper from "./storageHelper";

// get data from localStorage
const localStorageData = storageHelper.getProductList();

let data = localStorageData ? localStorageData : [...products];
if (!localStorageData) storageHelper.saveProductList(data);
// create api for getting data from json

const Api = {
  getProductList: (query) => {
    console.log(query);
    const { filterQuery, sortData, searchQuery, skip = 0, limit = 5 } = query;
    let filteredProducts = [...data];

    if (sortData) {
      filteredProducts = filteredProducts.sort((a, b) =>
        a[sortData.sortField] > b[sortData.sortField]
          ? sortData.sortValue
          : -1 * sortData.sortValue
      );
    }

    if (filterQuery?.selectedCities?.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filterQuery.selectedCities.includes(product.city)
      );
    }

    if (filterQuery?.priceRangeData?.length === 2) {
      const [min, max] = filterQuery?.priceRangeData;
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && max >= product.price
      );
    }

    console.log(searchQuery);
    if (!!searchQuery.searchKey) {
      if (searchQuery.type == "or") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.includes(searchQuery.searchKey) ||
            product.refNumber.includes(searchQuery.searchKey)
        );
      } else {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.includes(searchQuery.searchKey) &&
            product.refNumber.includes(searchQuery.searchKey)
        );
      }
    }

    return filteredProducts.slice(skip, skip + limit);
  },
  deleteProduct: (refNumber) => {
    data = data.filter((datum) => datum.refNumber !== refNumber);
    storageHelper.saveProductList(data);
  },
  updateProduct: (refNumber, product) => {
    const index = data.findIndex((datum) => datum.refNumber === refNumber);
    data[index] = product;
    storageHelper.saveProductList(data);
  },
  createProduct: (product) => {
    data.push({ product });
    storageHelper.saveProductList(data);
  },

  getCities: () => Array.from(new Set(data.map((datum) => datum.city))),
};
export default Api;
