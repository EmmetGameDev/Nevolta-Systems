// Navbar animate on scroll

document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 15) { // adjust threshold as needed
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Blog square photo Animations

function showSquarePhoto(el){
  el.classList.add("photoSquareAnim");
}

const photoSquareObsCallback = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting){
        setTimeout(() => showSquarePhoto(entry.target), 300);
    }
  }
}

const photoSquareObs = new IntersectionObserver(photoSquareObsCallback, { threshold: 0.25 });
document.querySelectorAll('.blogSquarePhotoAnim').forEach(item => photoSquareObs.observe(item));

// Photo Animations

function showPhoto(el){
  el.classList.add("photoAnim");
}

const photoObsCallback = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting){
      setTimeout(() => showPhoto(entry.target), 300);
    }
  }
}

const photoObs = new IntersectionObserver(photoObsCallback, { threshold: 0.25 });
document.querySelectorAll('.photoColumnImg').forEach(item => photoObs.observe(item));

// Kits only one button active

var priceAssembled = 49.99;
var priceDIYParts = 44.99;
var priceEngraving = 4.99;
var saleDiscount = 14.99;

var priceBonus = priceAssembled;
var engBonus = 0.00;
var costAdded = false;

function rdVar(num){
  return (Math.round((num) * 100) / 100).toFixed(2);
}

function refreshPrice(){
  var totalPrice = priceBonus + engBonus;
  totalPrice = rdVar(totalPrice);
  var oldPrice = priceBonus + engBonus + saleDiscount;
  oldPrice = rdVar(oldPrice);
  $('.kitPrice').contents().first()[0].textContent = "$" + totalPrice + " ";
  $('.oldPrice').contents().first()[0].textContent = "$" + oldPrice + " ";
}

function setDarkMode(yn){
  if(yn == true){
    $('body').css("backgroundImage", "url('img/wavesBg_Dark.svg')");
    $('body').css("color", "white");
    $(".starIcon").each( function () {
      $(this).attr("src", "img/icons/star 2.svg");
    });
    $(".button-opt3, .button-opt2, .button-opt").each( function () {
      $(this).css("border-color", "#fff");
      $(this).css("color", "white");
      $(this).css("background-color", "black");
    });
    $(".siteFooter").css("background-color", "rgba(255, 255, 255, 0.1)");
    $("html").attr("style","--secondary-theme-color:white");
    $(".nevoltaLogo").attr("src", "img/NevoltaTextLogo_White.svg")
  }else{
    $('body').css("backgroundImage", "url('img/wavesBg.svg')");
    $('body').css("color", "black");
    $(".starIcon").each( function () {
      $(this).attr("src", "img/icons/star.svg");
    });
    $(".button-opt3, .button-opt2, .button-opt").each( function () {
      $(this).css("border-color", "#000");
      $(this).css("color", "black");
      $(this).css("background-color", "white");
    });
  }
}

function setPageForItem(el){
  switch (el.id) {
    case "assembled":
      priceBonus = priceAssembled;
      break;
    case "DIYParts":
      priceBonus = priceDIYParts;
      break;
    case "White":
      $("#pictureCarousel1").attr("src", "img/photos/P1050484.JPG");
      $("#pictureCarousel2").attr("src", "img/photos/P1050594.JPG");
      $("#pictureCarousel3").attr("src", "img/photos/P1050586.JPG");
      setDarkMode(false);
      break;
    case "Black":
      $("#pictureCarousel1").attr("src", "img/photos/P1050581.JPG");
      $("#pictureCarousel2").attr("src", "img/photos/P1050592.JPG");
      $("#pictureCarousel3").attr("src", "img/photos/P1050581.JPG");
      setDarkMode(true);
      break;
    case "YesEng":
      engBonus = priceEngraving;
      break;
    case "NoEng":
      engBonus = 0.00;
      break;

    default:
      break;
  }
}

jQuery(function($) {
  $('.button-opt').click(function() {
    $('.button-opt').not(this).removeClass('optActive');
    $(this).addClass('optActive');
    setPageForItem(this);
    refreshPrice();
  });
});

jQuery(function($) {
  $('.button-opt2').click(function() {
    $('.button-opt2').not(this).removeClass('optActive2');
    $(this).addClass('optActive2');
    setPageForItem(this);
    refreshPrice();
  });
});

jQuery(function($) {
  $('.button-opt3').click(function() {
    $('.button-opt3').not(this).removeClass('optActive3');
    $(this).addClass('optActive3');
    setPageForItem(this);
    refreshPrice();
  });
});