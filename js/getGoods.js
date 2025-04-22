const getGods = () => {
  const links = document.querySelectorAll(".navigation-link");
  console.log(links);

  const getData = () => {
    fetch("https://willberiese-default-rtdb.firebaseio.com/db.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("data", JSON.stringify(data));
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      getData();
    });
  });
  const goods = JSON.parse(localStorage.getItem("goods"));

  console.log(goods);
  localStorage.removeItem("goods");
  console.log(localStorage);
};
getGods();
