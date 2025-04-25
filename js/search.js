console.log("скрипт search");
const search = function () {
  const input = document.querySelector(".search-block > input");
  const searchBtn = document.querySelector(".search-block > button");

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

      // console.log(good);
    });
  };

  const getData = (value) => {
    fetch("https://willberiese-default-rtdb.firebaseio.com/db.json") //подгрузка данных из удаленной БД
      .then((res) => res.json())
      .then((data) => {
        // подгрузка данных
        // Фильтруем товары по категории или гендеру и если поля неопределены (например, в кнопке ALL, сохраняем всю базу в LocalStorage)
        const array = data.filter((good) =>
          good.name.toLowerCase().includes(value.toLowerCase())
        );
        console.log(value);

        localStorage.setItem("goods", JSON.stringify(array)); // загрузка массива из базы в localStorage

        if (window.location.pathname !== "/wildberris/goods.html") {
          // проверка - если мы не на странице с товарами, то по клику надо переходить на нее
          window.location.href = "/wildberris/goods.html";
        } else {
          // то есть если мы уже на странице с товарами, то тогда запускаем рендеринг и фильтрацию по категории или gender
        }
        renderGoods(array);
      });
  };

  try {
    searchBtn.addEventListener("click", () => {
      getData(input.value);
    });
  } catch (e) {
    console.error(e.message);
  }
};
search();
