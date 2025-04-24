console.log("скрипт cart");

const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.querySelector("#modal-cart");
  const closeBtn = cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((good) => good.id === id);

    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    console.log(clickedGood);
    console.log(goods);
  };

  cartBtn.addEventListener("click", function () {
    cart.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    cart.style.display = "";
  });
  if (goodsContainer) {
    goodsContainer.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-cart")) {
        const buttonToCart = event.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;
        addToCart(goodId);
      }
    });
  }
};

cart();
