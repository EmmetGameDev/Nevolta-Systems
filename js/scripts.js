// Navbar animate on scroll

document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 15) { // adjust threshold as needed
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

// Bar chart

var options = {
  chart: {
    animations: {
      speed: 2000
    },
    toolbar:{
      show: false,
    },
    type: 'bar',
    height: "250px",
    fontFamily: "Kode Mono, monospace"
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '14px',
      }
    }
  },
  colors: ['black'],
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "30%",
      borderRadius: 3
    }
  },
  xaxis: {
    labels: {
      show: false
    }
  },
  grid: {
    show: true,
    borderColor: 'transparent',   // hides top/bottom chart border
    xaxis: {
      lines: { show: false }       // optional: remove x-axis grid lines if needed
    },
    yaxis: {
      lines: { show: false }       // optional: remove y-axis grid lines if needed
    }
  },
  states: {
    hover: {
      filter: {
        type: 'none'
      }
    },
    active: {
      filter: {
        type: 'none'
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  series: [{
    name: "Consoles",
    data: [{
      x: 'Game Boy',
      y: 100
    }, {
      x: 'SNES',
      y: 400
    }, {
      x: 'GBA',
      y: 1000
    }, {
      x: 'PS1',
      y: 3000
    }, {
      x: 'Nevolta V',
      y: 10000
    }]
  }]
}

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
chart.hideSeries("Consoles");


const chartObsCallback = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting){
      chart.showSeries("Consoles");
    }else{
      chart.hideSeries("Consoles");
    }
  }
}

const chartObs = new IntersectionObserver(chartObsCallback, { threshold: 0.25 });
document.querySelectorAll('.chart').forEach(item => chartObs.observe(item));

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