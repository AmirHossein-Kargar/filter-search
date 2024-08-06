const searchInput = document.querySelector("#search");
const productsDom = document.querySelector(".products-center");
const btn = document.querySelectorAll(".btn");
let allProductsData = [];
const filters = {
  searchItems: "",
};
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      console.log(res.data);

      allProductsData = res.data;
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err.message));

  // axios
  //   .get("http://localhost:3000/items")
  //   .then((res) => {
  //     console.log(res);

  //     allProductsData = res.data;
  //     renderProducts(res.data, filters);
  //   }).catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });

  productsDom.innerHTML = "";
  // ? render to DOM
  filteredProducts.forEach((item, index) => {
    // ? create
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    // ? content
    productsDiv.innerHTML = `<div class="img-container">
            <img src=${item.image} alt="${index}" />
            <div class="product-desc">
              <p class="product-price">${item.price} $</p>
              <p class="product-title">${item.title}</p>
            </div>
          </div>`;
    // ? append to DOM
    productsDom.appendChild(productsDiv);
  });
}

// ? filter btn based on groups
btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    console.log(filter);
    filters.searchItems = filter;
    renderProducts(allProductsData, filters)
  });
});

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});
