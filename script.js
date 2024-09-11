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

async function searchMovie() {
  loader.style.display = "block";

  let searchText = document.getElementById("dd").value;
  console.log(searchText);

  let response = await sendRequest("http://www.omdbapi.com/", "GET", {
    apikey: "54b23d27",
    t: searchText,
  });
  console.log(response);
}

async function sendRequest(url, method, data) {
  if (method == "POST") {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response = await response.json();
    return response;
  } else if (method == "GET") {
    url = url + "?" + new URLSearchParams(data);
    let response = await fetch(url, {
      method: "GET",
    });

    response = await response.json();
    return response;
  }
}

// асинхронная функция возвращает промис, когда запрос отправился, но ты не знаешь, когда придёт ответ

// let changeColorBtn = document.querySelector(".save");

// changeColorBtn.addEventListener("click", favourite);

// function favourite() {
//   changeColorBtn.classList.toggle("saved");
// }
