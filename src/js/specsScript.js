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

function setPageForItem(el){
  switch (el.id) {
    case "assembled":
      $('.kitPrice').contents().first()[0].textContent = "$54.99 ";
      $('.kitPrice .oldPrice').text("$64.99");
      break;
    case "DIYParts":
      $('.kitPrice').contents().first()[0].textContent = "$49.99 ";
      $('.kitPrice .oldPrice').text("$59.99");
      break;
    case "DIYFiles":
      $('.kitPrice').contents().first()[0].textContent = "$44.99 ";
      $('.kitPrice .oldPrice').text("$54.99");
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
  });
});