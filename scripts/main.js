function addDownloadIcon() {
  let downloadIcon =
    '<svg height="20" viewBox="0 -30 420 420" width="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a"><stop offset=".322" stop-color="#a163f5"/><stop offset=".466" stop-color="#b074ee"/><stop offset=".752" stop-color="#d8a1dd"/><stop offset=".898" stop-color="#efbad3"/></linearGradient><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="210" x2="210" xlink:href="#a" y1="405" y2="13.954"/><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="207" x2="207" xlink:href="#a" y1="405" y2="13.954"/><path d="m410 174.101562c-5.515625.015626-9.984375 4.480469-10 10v126.199219c-.046875 16.546875-13.453125 29.949219-30 30h-320c-16.546875-.050781-29.953125-13.453125-30-30v-126.199219c0-5.523437-4.476562-10-10-10s-10 4.476563-10 10v126.199219c.0117188 27.609375 22.390625 49.988281 50 50h320c27.609375-.011719 49.988281-22.390625 50-50v-126.199219c-.015625-5.519531-4.484375-9.984374-10-10zm0 0" fill="url(#b)"/><path d="m136.800781 231.199219 63.597657 54.5c.058593 0 .101562.046875.101562.101562l.300781.300781c.097657.097657.300781.199219.398438.296876.097656.125.242187.199218.402343.203124.097657.097657.296876.199219.398438.296876.101562.101562.300781.101562.398438.203124.101562.097657.300781.097657.5.199219.101562.097657.300781.097657.402343.199219.199219.101562.300781.101562.5.199219.097657 0 .300781.101562.398438.101562.199219 0 .300781.097657.5.097657.101562 0 .300781.101562.402343.101562.199219 0 .398438.101562.597657.101562h2.601562c.199219 0 .398438-.101562.597657-.101562.101562 0 .300781-.101562.402343-.101562.199219 0 .300781-.097657.5-.097657.097657 0 .300781-.101562.398438-.101562.199219-.097657.300781-.097657.5-.199219.101562-.101562.300781-.101562.402343-.199219.199219-.101562.296876-.101562.5-.199219.097657-.101562.296876-.101562.398438-.203124.101562-.097657.300781-.199219.398438-.296876.101562-.101562.203124-.101562.402343-.203124.097657-.097657.300781-.199219.398438-.296876l.300781-.300781c.054688 0 .101562-.046875.101562-.101562l63.597657-54.5c4.199219-3.589844 4.691406-9.902344 1.101562-14.097657-3.589843-4.199218-9.902343-4.691406-14.101562-1.101562l-47.199219 40.398438v-246.398438c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v246.398438l-47.199219-40.398438c-4.199219-3.589844-10.511719-3.097656-14.101562 1.101562-3.589844 4.195313-3.097657 10.507813 1.101562 14.097657zm0 0" fill="url(#c)"/></svg>';

  $(".SoundTable_ControlsColumn").each(function(index) {
    $(this).append(
      "<div class='SoundTable_Action preview-download'>" +
        downloadIcon +
        "</div>"
    );
  });
}

function getSoundID(child) {
  return child.parents(".SoundTable_Row").data().tmeta;
}

function fetchSound(id) {
  let url = new URL("https://cdn-api-prd.sounds.com/api/search");
  let params = { sound_id: id };

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      return downloadSound(myJson);
    });
}

function downloadSound(data) {
  const previewMp3 = data.result.sounds[0].preview_mp3;
  window.open(previewMp3, "_blank");
}

function soundController() {
  setTimeout(function () {
    addDownloadIcon();

    $(".preview-download").on("click", function () {
      const id = getSoundID($(this));
      fetchSound(id);
    });
  }, 2000);
}

$(document).ready(function() {
  soundController();
  $(".pagination").on("click", function () {
    soundController();
  });
});
