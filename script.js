/* ===== HARGA SETIAP BAJU (LETak ATAS SEKALI) ===== */
const priceList = {
  "Baju T-Shirt": {
    S: 20,
    M: 22,
    L: 24,
    XL: 26
  },
  "Baju Hoodie": {
    S: 40,
    M: 42,
    L: 45,
    XL: 48
  },
  "Baju Jacket": {
    S: 60,
    M: 65,
    L: 70,
    XL: 75
  }
};

/* ===== BUKA PAGE PRODUCT ===== */
function openProduct(name) {
  localStorage.setItem("selectedProduct", name);
  window.location.href = "product.html";
}

/* ===== PAPAR NAMA PRODUCT ===== */
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("productName");
  const product = localStorage.getItem("selectedProduct");

  if (title && product) {
    title.innerText = product;
  }
});

/* ===== ADD TO CART ===== */
function addToCart() {
  const product = localStorage.getItem("selectedProduct");
  const size = document.getElementById("size").value;

  const price = priceList[product][size];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: product,
    size: size,
    price: price
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(product + " (Size " + size + ") ditambah ke cart!");
}

/* ===== CHECKOUT (INDEX.HTML) ===== */
function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart kosong!");
    return;
  }

  let message = "Saya ingin membeli:\n";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    message += `- ${item.name} (Size ${item.size}) - RM${item.price}\n`;
  });

  message += `\nTotal: RM${total}`;

  const sellerNumber = "60123456789"; // tukar nombor ni
  const url = `https://wa.me/${sellerNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

