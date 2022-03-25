/**
* Template Name: Maxim - v4.7.0
* Template URL: https://bootstrapmade.com/maxim-free-onepage-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Change zoom in maps for desktop and mobile
   */
   window.addEventListener('DOMContentLoaded', () => {

    var maps=[
      {
        selector:"#map-24hs",
        id:"zonas-de-envios_735539",
        mobileZoom:"#9/-34.68/-58.4613",
        desktopZoom:"",
        datalayers:"2166580"
      },
      {
        selector:"#map-sameday",
        id:"zonas-de-retiro_735522",
        mobileZoom:"#10/-34.62/-58.53",
        desktopZoom:"#11/-34.5894/-58.5413",
        datalayers:"2166560"

      },
      {
        selector:"#map-postal",
        id:"envios-postales_735553",
        mobileZoom:"#3/-42/-64.34",
        desktopZoom:"#4/-39.5/-64.34",
        datalayers:"2166631"
      }
    ]

    var maxMobileWidth=778
    var isMobile=window.innerWidth<maxMobileWidth
    var commonMapSrc="//umap.openstreetmap.fr/es/map/XX__MAP__XX?scaleControl=false&miniMap=false&scrollWheelZoom=true&zoomControl=true&allowEdit=false&moreControl=false&searchControl=false&tilelayersControl=false&embedControl=false&datalayersControl=false&onLoadPanel=undefined&captionBar=false&datalayers=YY__MAP__YY&fullscreenControl=false&locateControl=false&measureControl=false&editinosmControl=false"

    maps.forEach(function(map){
      var element=document.querySelector(map.selector)
      var src=commonMapSrc.replace("XX__MAP__XX",map.id).replace("YY__MAP__YY",map.datalayers)
      if(isMobile){
        src=src+map.mobileZoom
        element.setAttribute("height","320px")

      }
      else{
        src=src+map.desktopZoom
      }
      element.setAttribute("src",src)
    })

  });


})()

  /**
   * Show anda hide sections
   */

function navshow(){ 
  document.getElementById("about").style.display = "block";
  document.getElementById("steps").style.display = "block";    
  document.getElementById("features").style.display = "block";    
  document.getElementById("services").style.display = "block";    
  document.getElementById("pricing").style.display = "block";    
  document.getElementById("contact").style.display = "block";    
  document.getElementById("faq").style.display = "block";      
  document.getElementById("service1").style.display = "none";
  document.getElementById("service2").style.display = "none";
  document.getElementById("service3").style.display = "none";
  document.getElementById("service4").style.display = "none";
  document.getElementById("service5").style.display = "none";
}

window.addEventListener('load', () => {
  navshow()
  });

  function navservicegeneral(){ 
    document.getElementById("about").style.display = "none";
    document.getElementById("steps").style.display = "none";
    document.getElementById("features").style.display = "none";
    document.getElementById("services").style.display = "none";
    document.getElementById("pricing").style.display = "none";
    document.getElementById("contact").style.display = "none";
    document.getElementById("faq").style.display = "none";
  }
    
function navservice1(){
  navservicegeneral();
  document.getElementById("service1").style.display = "block";
  document.getElementById("service2").style.display = "none";
  document.getElementById("service3").style.display = "none";
  document.getElementById("service4").style.display = "none";
  document.getElementById("service5").style.display = "none";
}

function navservice2(){
  navservicegeneral();
  document.getElementById("service1").style.display = "none";
  document.getElementById("service2").style.display = "block";
  document.getElementById("service3").style.display = "none";
  document.getElementById("service4").style.display = "none";
  document.getElementById("service5").style.display = "none";
}

function navservice3(){
  navservicegeneral();
  document.getElementById("service1").style.display = "none";
  document.getElementById("service2").style.display = "none";
  document.getElementById("service3").style.display = "block";
  document.getElementById("service4").style.display = "none";
  document.getElementById("service5").style.display = "none";
}

function navservice4(){
  navservicegeneral();
  document.getElementById("service1").style.display = "none";
  document.getElementById("service2").style.display = "none";
  document.getElementById("service3").style.display = "none";
  document.getElementById("service4").style.display = "block";
  document.getElementById("service5").style.display = "none";
}

function navservice5(){
  navservicegeneral();
  document.getElementById("service1").style.display = "none";
  document.getElementById("service2").style.display = "none";
  document.getElementById("service3").style.display = "none";
  document.getElementById("service4").style.display = "none";
  document.getElementById("service5").style.display = "block";
}

