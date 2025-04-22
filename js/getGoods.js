const getGods = () => {
  const links = document.querySelectorAll(".navigation-link");
  console.log(links);

  const getData = (value, category) => {
    fetch("https://willberiese-default-rtdb.firebaseio.com/db.json") //подгрузка данных из удаленной БД
      .then((res) => res.json())
      .then((data) => {
        const array = category
          ? data.filter((item) => item[category] === value)
          : data;

        localStorage.setItem("goods", JSON.stringify(array)); // загрузка массива из базы в localStorage
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); //отменяем реакцию на кнопку по умолчанию - переход по ссылке
      const linkValue = link.textContent;
      const category = link.dataset.field;

      console.log(category);

      getData(linkValue, category);
    });
  });
};
getGods();
