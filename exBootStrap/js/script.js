/* -- CAROUSEL IMAGES JAVASCRIPT -- */

// Seleciona todos os elementos com a classe "image-track"
const tracks = document.querySelectorAll(".image-track");

const handleOnDown = (e) => {
  for (const track of tracks) {
    track.dataset.mouseDownAt = e.clientX;
  }
};

const handleOnUp = () => {
  for (const track of tracks) {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
  }
};

const handleOnMove = (e) => {
  for (const track of tracks) {
    if (track.dataset.mouseDownAt === "0") continue;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

    track.dataset.percentage = nextPercentage;

    track.animate({
      transform: `translate(${nextPercentage}%, 0%)`,
    }, {
      duration: 1200,
      fill: "forwards",
    });

    for (const image of track.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`,
      }, {
        duration: 1200,
        fill: "forwards",
      });
    }
  }
};

/* -- LINHAS EXTRAS PARA EVENTOS TOUCH -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);


/* -- CAROUSEL GAMES -- */
var titles = ["Starfield", "Cyberpunk 2077"];
var images = [
  ["img/starfield (1).webp", "img/starfield (2).webp", "img/starfield (3).webp", "img/starfield (4).webp"],
  ["img/cyberpunk (1).webp", "img/cyberpunk (1).jpeg", "img/cyberpunk (1).jpg", "img/cyberpunk (2).jpeg"]
];
var banners = ["img/starfield.webp", "img/cyberpunk_banner.jpg"];
var descriptions = [
  "A vast world where open fields with a variety of situations and huge dungeons with complex...",
  "A vast world where open fields with a variety of situations and huge dungeons with complex..."
];
var badge = ["Lançamento", "Popular"];
var oldprices = ["", "R$399,99"];
var newprices = ["R$229,00", "R$359,90"];
var tag = ["NOVO", "10%"];

var carousel = document.querySelector('#carouselExampleControlsNoTouching');
carousel.addEventListener('slid.bs.carousel', function (event) {
  var index = event.to;
  document.querySelector('#title').textContent = titles[index];
  document.querySelector('#banner1').src = banners[index];
  document.querySelector('#banner2').src = banners[index];
  document.querySelector('#image1').src = images[index][0];
  document.querySelector('#image2').src = images[index][1];
  document.querySelector('#image3').src = images[index][2];
  document.querySelector('#image4').src = images[index][3];
  document.querySelector('#description').textContent = descriptions[index];
  document.querySelector('#tag').textContent = tag[index];
  document.querySelector('#old-price').textContent = oldprices[index];
  document.querySelector('#new-price').textContent = newprices[index];
  document.querySelector('#badge').textContent = badge[index];
});

var tabElList = [].slice.call(document.querySelectorAll('[data-bs-toggle="pill"]'))
var tabList = tabElList.map(function (tabEl) {
return new bootstrap.Tab(tabEl)
})