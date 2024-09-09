let changeThemeBtn = document.querySelector(".themeChange");
let body = document.querySelector("body");

changeThemeBtn.addEventListener("click", changeTheme);

function changeTheme() {
  changeThemeBtn.classList.toggle("darkTheme");
  body.classList.toggle("dark");
}

if (localStorage.getItem("theme") == "dark") {
  changeThemeBtn.classList.add("darkTheme");
  body.classList.add("dark");
}

function changeTheme() {
  if (localStorage.getItem("theme") == "dark") {
    // сменить на белую
    changeThemeBtn.classList.remove("darkTheme");
    body.classList.remove("dark");
    localStorage.setItem("theme", "white");
  } else {
    // сменить на темную
    changeThemeBtn.classList.add("darkTheme");
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

let searchBtn = document.querySelector(".search button");
searchBtn.addEventListener("click", searchMovie);

let loader = document.querySelector(".loader");

function searchMovie() {
  let searchInput = document.querySelector(".search input").value;
}

// let changeColorBtn = document.querySelector(".save");

// changeColorBtn.addEventListener("click", favourite);

// function favourite() {
//   changeColorBtn.classList.toggle("saved");
// }
