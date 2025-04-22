const getGods = () => {
  const links = document.querySelectorAll(".navigation-link");

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");
    console.log(goodsContainer);
  };

  const getData = (value, category) => {
    fetch("https://willberiese-default-rtdb.firebaseio.com/db.json") //подгрузка данных из удаленной БД
      .then((res) => res.json())
      .then((data) => {
        // подгрузка данных
        // Фильтруем товары по категории или гендеру и если поля неопределены (например, в кнопке ALL, сохраняем всю базу в LocalStorage)
        const array = category
          ? data.filter((item) => item[category] === value)
          : data;

        localStorage.setItem("goods", JSON.stringify(array)); // загрузка массива из базы в localStorage

        if (window.location.pathname !== "/goods.html") {
          // проверка - если мы не на странице с товарами, то по клику надо переходить на нее
          window.location.href = "/goods.html";
        } else {
          // то есть если мы уже на странице с товарами, то тогда запускаем рендеринг и фильтрацию по категории или gender
        }
        renderGoods(array);

        // window.location.href = "/goods.html"; //перевод на страницу с товарами

        // console.log(window.location);
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); //отменяем реакцию на кнопку по умолчанию - переход по ссылке
      const linkValue = link.textContent;
      const category = link.dataset.field;

      getData(linkValue, category); // передаем полученные значения для фильтрации по категории и значению наверх в функцию getData
    });
  });

  if (
    localStorage.getItem("goods") &&
    window.location.pathname === "/goods.html"
  ) {
    // забираем из localstorage блок с ключем goods, если он там есть и если мы на странице с товаром и Рендерим его
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  }
};
getGods();
