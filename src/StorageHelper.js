const storageHelper = {
  getProductList() {
    const data = localStorage.getItem("product-list");
    if (!data) return undefined;
    const list = JSON.parse(data);
    return list;
  },
  saveProductList(productList) {
    const data = JSON.stringify(productList);
    localStorage.setItem("product-list", data);
  },
};

export default storageHelper;
