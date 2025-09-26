define(["jquery", "axios"], function ($, axios) {
  //
  //
  const url = "https://rickandmortyapi.com/api/character";
  const $btnSearch = $("#search");
  const $input = $("#input");
  const $main = $("#main");

  function render(datas) {
    $main.html("");
    datas.forEach((data, index) => {
      const $wrap = $("<div>").addClass("flex flex-col items-center mt-20");

      const $img = $("<img>")
        .attr("src", data.image)
        .attr("alt", data.name)
        .addClass(
          `flex w-100 h-60 rounded-xl cursor-pointer bg-cyan-500 shadow-2xl shadow-orange-900 hover:scale-125 hover:duration-75 hover:ease-in-out`
        );

      if (index === datas.length - 1) {
        $wrap.addClass("md:col-span-2");
        $img.addClass("md:w-3/4");
      }

      const $text = $("<p>").addClass("p-4 text-2xl").text(data.name);

      $wrap.append($img, $text);
      $main.append($wrap);
    });
  }

  async function main() {
    try {
      const res = await axios.get(url);
      render(res.data.results);
    } catch (err) {
      console.error("Error:", err);
      $main.html("<p class='text-red-500'>Failed to load characters</p>");
    }
  }

  async function searchMovie(keyword) {
    try {
      const res = await axios.get(`${url}/?name=${keyword}`);
      render(res.data.results);
    } catch (err) {
      console.error("Error:", err);
      $main.html(
        "<p class='flex items-center justify-center text-red-500 mt-5 p-20 '>Character not found</p>"
      );
    }
  }

  const showMenu = () => {
    $btnSearch.on("click", () => {
      const keyword = $input.val().trim();
      if (keyword) {
        searchMovie(keyword);
      }
    });
    main();
  };

  return { showMenu };
});
