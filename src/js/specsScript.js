// Navbar animate on scroll

document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) { // adjust threshold as needed
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

function setPageForItem(el){
  switch (el.id) {
    case "assembled":
      priceBonus = priceAssembled;
      break;
    case "DIYParts":
      priceBonus = priceDIYParts;
      break;
    case "White":
      break;
    case "Black":
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