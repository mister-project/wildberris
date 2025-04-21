console.log("search");
const search = function () {
  const input = document.querySelector(".search-block > input");
  const searchBtn = document.querySelector(".search-block > button");

  searchBtn.addEventListener("click", () => {
    console.dir(input.value);
  });
};
search();
