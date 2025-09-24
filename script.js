const url = "https://rickandmortyapi.com/api/character";
const container = document.querySelector(".container-main");
const btnSearch = document.getElementById("search");
const input = document.getElementById("input");

function render(datas) {
  container.innerHTML = "";
  datas.forEach((data) => {
    const wrap = document.createElement("div");
    wrap.classList.add("gambar");

    const img = document.createElement("img");
    img.setAttribute("src", data.image);
    img.setAttribute("alt", data.name);

    const text = document.createElement("p");
    text.textContent = data.name;

    wrap.append(img, text);
    container.append(wrap);
  });
}

async function movie() {
  const req = await fetch(url);
  const res = await req.json();
  render(res.results);
}

async function searchMovie(name) {
  const req = await fetch(`${url}?name=${name}`);
  const res = await req.json();

  if (res.error) {
    container.innerHTML = `<p>Character not found</p>`;
    return;
  }

  render(res.results);
}

const showMenu = () => {
  btnSearch.addEventListener("click", () => {
    const keyword = input.value.trim();
    if (keyword) {
      searchMovie(keyword);
    }
  });
};

movie();
showMenu();
