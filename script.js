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

  let response = await sendRequest("https://www.omdbapi.com/", "GET", {
    apikey: "54b23d27",
    t: searchText,
  });

  if (response.Response == "False") {
    // В ответе пришла ошибка
    loader.style.display = "none";
    alert(response.Error);
  } else {
    // Получили корректный код
    let main = document.querySelector(".main");
    main.style.display = "block";

    let movieTitle = document.querySelector(".movie_title h2");
    movieTitle.innerHTML = response.Title;

    let movieImg = document.querySelector(".movie_img");
    movieImg.style.backgroundImage = `url(${response.Poster})`;

    let detailsList = [
      "Actors",
      "Country",
      "Language",
      "Genre",
      "Plot",
      "Realised",
      "Runtime",
      "imdbRating",
    ];
    let movieInfo = document.querySelector(".movie_info");
    movieInfo.innerHTML = "";

    for (let i = 0; i < detailsList.length; i++) {
      let param = detailsList[i];
      let desc = `
      <div class="desc darkBg">
        <div class="title">${param}</div>
        <div class="value">${response[param] || "N/A"}</div>
      </div>`;
      movieInfo.innerHTML = movieInfo.innerHTML + desc;
    }

    loader.style.display = "none";
    searchSimilarMovies(searchText);
  }
  console.log(response);
}

async function searchSimilarMovies(title) {
  let similarMovies = await sendRequest("https://www.omdbapi.com/", "GET", {
    apikey: "54b23d27",
    s: "title",
  });
  let similarMoviesTitle = document.querySelector(".similar_movie_title h2");
  similarMoviesTitle.innerHTML = `Похожие фильмы: ${similarMovies.totalResults}`;
  similarMoviesTitle.style.display = "block";
  console.log(similarMovies.totalResults);
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
