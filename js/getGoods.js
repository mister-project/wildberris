const getGods = () => {
  const links = document.querySelectorAll(".navigation-link");
  console.log(links);

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");

    goodsContainer.innerHTML = "";

    goods.forEach((good) => {
      const goodBlock = document.createElement("div");
      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");

      goodBlock.innerHTML = `
          <div class="goods-card">
              <span class="label ${good.label ? null : "d-none"}">${
        good.label
      }</span>
              <img src="db/${good.img}" alt="${good.name}"
                class="goods-image">
              <h3 class="goods-title">${good.name}</h3>
              
              <p class="goods-description">${good.description}</p>
             
              <button class="button goods-card-btn add-to-cart" data-id="${
                good.id
              }">
                <span class="button-price">$${good.price}</span>
              </button>
             
					</div>
      `;
      goodsContainer.append(goodBlock);
    });
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
