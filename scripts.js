/*
Smoke.js
src: https://github.com/bijection/smoke.js
*/

var canvas = document.getElementById('kahvi-hoyry');
var ctx = canvas.getContext('2d');
var coffee = smokemachine(ctx, [115, 115, 115]);

canvas.width = 500;
canvas.height = 600;

coffee.start();
coffee.addsmoke(250,550,1);

var render = setInterval(function() {
  coffee.addsmoke(250,500,1);
}, 500);

var painike = document.querySelector(".button");
var audio = new Audio('nice.mp3');

function name(klikkaus) {
	audio.play(); 

  setTimeout(function() {
    // haetaan eka klikkaus muuttujasta se elementti jota klikattiin (klikkaus.target) ja sitte luetaan sen elementin href arvo
    var painikkeenLinkkaamaOsoite = klikkaus.target.href;
    // window.location.href avulla voidaan vaihtaa selaimen sivua, esim. window.location.href = "www.google.fi" toimis myös
    window.location.href = painikkeenLinkkaamaOsoite;
  }, 3000);

  klikkaus.preventDefault();
}

// lisätään tapahtuma kuuntelija vain jos painike muuttujassa on joku tosi vastaava arvo sisällä, 
// esim. html elementit vastaa tosi, numero 1 vastaa tosi, "asdadsad" vastaa tosi, numero 0 vastaa epätosi,  null vastaa epätosi
// tilanteessa jossa painiketta ei löydy sivulta jossa scripti ajetaan läpi,
// niin rivi 15 ei löydä sitä elementtiä ja document.querySelector palauttaa muuttujan "painike" arvoksi null, eli epätosi arvon.
// 
// näin säästytään turhilta virheilmotuksilta muilla sivuilla.
if(painike) {
  painike.addEventListener('click', name, false);
}

// no moar plz
// name()



// Tallennetaan muuttujia käyttäjän koneelle jotka ei katoa sivua vaihtaessa tai selainta sulkiessa.
function initLocalStorageItem(property, defaultValue, callback) {
  var returnedValue = localStorage.getItem(property);

  if (!returnedValue) {
    localStorage.setItem(property, defaultValue);
    callback(defaultValue);
  } else {
    callback(returnedValue);
  }
}

/* 
 Soundcloud musiikki vempele
*/

(function() {

  var widgetIframe = document.getElementById('sc-widget');
  var widget       = SC.Widget(widgetIframe);

  widget.bind(SC.Widget.Events.READY, function() {
    // tallennetaan timkafePlayAudio muuttuja true arvolla jos sitä ei vielä ole olemassa käyttäjän koneella (localStorage)
    // ja soitetaan musiikkia vain jos soitinta ei aikaisemmalla sivunlatauskerralla pysäytetty
    initLocalStorageItem('timkafePlayAudio', true, function(play) {
      if (JSON.parse(play)) {
        widget.play();
      }
    });

    widget.setVolume(10);

    // Loopataan takas alkuun biisin päättyessä
    widget.bind(SC.Widget.Events.FINISH, function() {
      widget.seekTo(1000);
      widget.play();
    });

    widget.bind(SC.Widget.Events.PLAY, function() {
      localStorage.setItem('timkafePlayAudio', true);
    });

    widget.bind(SC.Widget.Events.PAUSE, function() {
      localStorage.setItem('timkafePlayAudio', false);
    });
  });

}());


