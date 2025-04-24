console.log("скрипт cart");

const cart = function () {
  const cartBtn = document.querySelector(".button-cart"); //кнопка отрытия корзины
  const cart = document.querySelector("#modal-cart"); //модальное окно с корзиной
  const closeBtn = cart.querySelector(".modal-close"); // кнопка закрытия модального окна
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods"); //Содержательная часть таблицы в корзине товаров
  console.log(cartTable);

  const addToCart = (id) => {
    // Парсим (переводим) строку из localStorage в обект goods и Находим по полученному iD элемент в массиве(обьекте) goods. Выводим этот элемент со всеми атрибутами
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((good) => good.id === id); //в массиве goods находим кликнутый товар по id нажатой кнопки

    const cart = localStorage.getItem("cart") // через тернарное выражение проветяем - епроверяем, есть ли в localStorage значение под ключом "cart", и если оно есть, то парсим это значение из JSON-строки в  массив, а если его нет — присваиваем переменной cart пустой массив.
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    // Ниже - проверка а есть ли в корзине (cart) уже такой товар. Если есть - добавляем существующему товар в корзине количество. Если нет, добавляем в корзину выбранный товар
    if (cart.some((good) => good.id === clickedGood.id)) {
      console.log("Увеличить количество clickedGood в корзине");
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      console.log("добавить товар clickedGood в корзину");
      clickedGood.count = 1; // добавляем выбранному товару свойство количества
      cart.push(clickedGood);
    }
    // окончание проверки и далее - обновление значения под ключем 'cart' в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  cartBtn.addEventListener("click", function () {
    //нажатие кнопки Card
    console.log("рендер товара");

    cart.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    cart.style.display = "";
  });
  if (goodsContainer) {
    //если на странице есть блок Container, то при нажатии на кнопку цены (с классом .add-to-cart), получаем ID кликнутого товара и передаем его в функцию addToCart
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
