// Navbar animate on scroll

document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) { // adjust threshold as needed
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Typing and erasing text header

let TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  let that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  let elements = document.getElementsByClassName("txt-rotate");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-rotate");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};

// Sliding pointers with delay

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showPointer(el, yn){
  el.classList.toggle('pointer-animation', !!yn);
}

function showList(yn){
  const textPointers = document.querySelectorAll('.textPointer');
  for (let i = 0; i < textPointers.length; i++){
    setTimeout(() => showPointer(textPointers[i], yn), i * 300);
  }
}

const intersectionCallback = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) showList(true);
    else showList(false);
  }
}

const observer = new IntersectionObserver(intersectionCallback, { threshold: 0.25 });
document.querySelectorAll('.textPointerFirst').forEach(item => observer.observe(item));