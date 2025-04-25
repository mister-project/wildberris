console.log("скрипт cart");

const cart = function () {
  const cartBtn = document.querySelector(".button-cart"); //кнопка отрытия корзины
  const cart = document.querySelector("#modal-cart"); //модальное окно с корзиной
  const closeBtn = cart.querySelector(".modal-close"); // кнопка закрытия модального окна
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods"); //Содержательная часть таблицы в корзине товаров
  const modalForm = document.querySelector(".modal-form");
  const cardTableTotal = document.querySelector(".card-table__total");

  console.log(cardTableTotal);

  //Ниже - функция удаления товара из корзины
  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((good) => {
      return good.id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart"))); // после каждого изменения в карточке ее надо заново рендерить, поэтому и вызываем данную функцию
  };

  //Ниже - функция удвеличения количества товара в корзине
  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const NewCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(NewCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart"))); // после каждого изменения в карточке ее надо заново рендерить, поэтому и вызываем данную функцию
  };

  //Ниже - функция уменьшения количества товара в корзине
  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const NewCart = cart.map((good) => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--;
        }
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(NewCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart"))); // после каждого изменения в карточке ее надо заново рендерить, поэтому и вызываем данную функцию
  };

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

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = "";
    let total = 0; // Переменная для подсчета общей суммы заказа
    //Перебираем массив товаров в корзине для изменения верстки корзины
    //Начало. Функция рендера товара в корзину
    goods.forEach((good) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${good.name}</td>
						<td>${good.price}$</td>
						<td><button class="cart-btn-minus"">-</button></td>
						<td>${good.count}</td>
						<td><button class=" cart-btn-plus"">+</button></td>
						<td>${+good.price * +good.count}$</td>
						<td><button class="cart-btn-delete"">x</button></td>
      `;
      //Подсчет общей суммы заказа в корзине
      let sum = +good.price * +good.count;
      total = total + sum;

      cartTable.append(tr); //добавление строки в таблицу корзины
      //Ниже - добавление, удаление количества товара в заказе через кнопки в корзине
      tr.addEventListener("click", (e) => {
        if (e.target.classList.contains("cart-btn-minus")) {
          minusCartItem(good.id);
        } else if (e.target.classList.contains("cart-btn-plus")) {
          plusCartItem(good.id);
        } else if (e.target.classList.contains("cart-btn-delete")) {
          deleteCartItem(good.id);
        }
      });
    });
    //Перерисовка в корзиене метки ячейки  с итоговой суммой
    cardTableTotal.innerHTML = `<th class="card-table__total" colspan="2">${total}$</th>`;
  };

  // Функция отправки данных из корзины на тестовый сервер
  const sendForm = (totalSum, name, phone) => {
    const cartArray = localStorage.getItem("cart") // через тернарное выражение проветяем - епроверяем, есть ли в localStorage значение под ключом "cart", и если оно есть, то парсим это значение из JSON-строки в  массив, а если его нет — присваиваем переменной cart пустой массив.
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cartArray,
        totalSum: totalSum,
        name: name,
        phone: phone,
      }),
    })
      .then((response) => {
        // Проверяем, успешен ли ответ
        if (response.ok) {
          // Если ответ успешен, можем удалить данные из localStorage
          localStorage.removeItem("cart");
          alert("отправка содержимого Корзины прошла успешно. Она очищена");
          // return response.json(); // Можете вернуть JSON, если необходимо
        } else {
          throw new Error("Ошибка сети");
        }
      })
      .then(() => {
        cart.style.display = "";
      });
  };

  // Отлавливаем подтверждение заказа в корзине
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault(); // блокирование стандартного поведения на клик

    const lastCartTotal =
      document.querySelector(".card-table__total").textContent;
    const nameCustomer = document.querySelector('[name="nameCustomer"]').value;
    const phoneCustomer = document.querySelector(
      '[name="phoneCustomer"]'
    ).value;
    sendForm(lastCartTotal, nameCustomer, phoneCustomer);
  });

  cartBtn.addEventListener("click", function () {
    //нажатие кнопки Card
    const cartArray = localStorage.getItem("cart") // через тернарное выражение проветяем -  есть ли в localStorage значение под ключом "cart", и если оно есть, то парсим это значение из JSON-строки в  массив, а если его нет — присваиваем переменной cart пустой массив.
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    renderCartGoods(cartArray); // запуск функции рендеринга с массивом CartArray

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
