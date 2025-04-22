console.log("search");
const search = function () {
  const input = document.querySelector(".search-block > input");
  const searchBtn = document.querySelector(".search-block > button");

  try {
    searchBtn.addEventListener("click", () => {
      console.dir(input.value);
    });
  } catch (e) {
    console.error(e.message);
  }
};
search();
