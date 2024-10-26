"use strict";

window.addEventListener('DOMContentLoaded', () => {
   if (!isMobile.any()) {
      const cards = [...document.querySelectorAll(".card")];
      
      cards.forEach(el => {
         el.addEventListener("mousemove", fCardRotate);
         el.addEventListener("mouseout", fCardDefault);
      });
      
      function fCardRotate(ev) {
         let wi = this.offsetWidth / 2;
         let x = ev.offsetX < wi ? 20 : -20;
         let b = ev.offsetX < wi ? -ev.offsetX : ev.offsetX;
         this.style.transform = `perspective(2000px) rotatey(${((ev.offsetX - this.offsetWidth / 2) / 20) * -1}deg) rotatex(${((ev.offsetY - this.offsetHeight / 2) / 20)}deg)`;
      }
      function fCardDefault() {
         this.style.transform = ``;
      }
   }
});

let interiorSlide = document.querySelector('.interior__slider');
if (interiorSlide) {
   const swiper = new Swiper('.interior__slider', {
      loop: true,
      // If we need pagination
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
      },
   
      // Navigation arrows
      navigation: {
         nextEl: '.interior__arrow--next',
         prevEl: '.interior__arrow--prev',
      },

   });
}

let popupMenuFoodSlide = document.querySelector('.menu__slider--food');
if (popupMenuFoodSlide) {
   const swiper = new Swiper('.menu__slider--food', {
      slidesPerView: 1,
      loop: true,
      // centeredSlides: true,
      effect: 'fade',

      // If we need pagination
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
      },

      // Navigation arrows
      navigation: {
         nextEl: '.menu-food__arrow--next',
         prevEl: '.menu-food__arrow--prev',
      },
   });
}

let popupMenuDrinkSlide = document.querySelector('.menu__slider--drink');
if (popupMenuDrinkSlide) {
   const swiper = new Swiper('.menu__slider--drink', {
      slidesPerView: 1,
      loop: true,
      // centeredSlides: true,
      effect: 'fade',

      // If we need pagination
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
      },

      // Navigation arrows
      navigation: {
         nextEl: '.menu-drink__arrow--next',
         prevEl: '.menu-drink__arrow--prev',
      },
   });
}

let popupMenuHookahSlide = document.querySelector('.menu__slider--hookah');
if (popupMenuHookahSlide) {
   const swiper = new Swiper('.menu__slider--hookah', {
      slidesPerView: 1,
      loop: true,
      // centeredSlides: true,
      effect: 'fade',

      // If we need pagination
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
      },

      // Navigation arrows
      navigation: {
         nextEl: '.menu-hookah__arrow--next',
         prevEl: '.menu-hookah__arrow--prev',
      },
   });
}

// inputMask
let inputs = document.querySelectorAll('input[type="tel"]');
if (inputs) {
   let im = new Inputmask({
      mask: "+7 (999) 999-99-99",
      jitMasking: false,
      // clearMaskOnLostFocus: false,
      // placeholder: '9',
      showMaskOnHover: false,
      showMaskOnFocus: true,
   });
   im.mask(inputs);
}
// МЕНЮ БУРГЕР
let menu = document.querySelector('.icon-menu');
let menuBody = document.querySelector('.menu__body');
menu.addEventListener('click', function () {
   document.body.classList.toggle('_lock');
   menu.classList.toggle('_active');
   menuBody.classList.toggle('_active');
});

// ЛИПКИЙ HEADER
let header = document.querySelector('.header');

document.onscroll = function () {
   let scroll = window.scrollY;
   if (scroll > 0){
      header.classList.add('_fixed');
   } else {
      header.classList.remove('_fixed');
   }
}
// ТАБЫ
let tabs = document.querySelectorAll('[data-tabs]');
if (tabs.length > 0) {
   initTabs(tabs);
}
function initTabs(tabs) {
   for (let i = 0; i < tabs.length; i++) {
      initTab(tabs[i]);
   }

   function initTab(tab){
      let tabTitles = tab.querySelectorAll('[data-tabs-title]');
      let tabBodys = tab.querySelectorAll('[data-tabs-body]');

      for (let i = 0; i < tabTitles.length; i++){
         tabTitles[i].addEventListener('click', function () {
            let tabActive = tab.querySelector('[data-tabs-navigation] ._tab-active');
            tabActive.classList.remove('_tab-active');
      
            let tabBodyActive = tab.querySelector('[data-tabs-content] ._tab-active');
            tabBodyActive.classList.remove('_tab-active');
      
            tabBodys[i].classList.add('_tab-active');
            this.classList.add('_tab-active');
         });
      }
   }
}
// ПРОВЕРКА НА ТАЧСКРИН
const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows()
      );
   }
};

if (isMobile.any()) {
   document.body.classList.add('_touch');
}
// ЯКОРЬ (ПЛАВНАЯ ПРОКРУТКА ДО НУЖНОГО БЛОКА)
let menuLinks = document.querySelectorAll('[data-goto]');
if (menuLinks.length > 0) {
   for (let menuLink of menuLinks) {
      menuLink.addEventListener('click', onMenuLinkClick);
   }

   function onMenuLinkClick(e) {
      let menuLink = e.target;

      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         let gotoBlock = document.querySelector(menuLink.dataset.goto);
         let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

         if (menu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            menu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         });
         e.preventDefault();
      }
   }
}


/**
 * @typedef {Object} dNode
 * @property {HTMLElement} parent
 * @property {HTMLElement} element
 * @property {HTMLElement} to
 * @property {string} breakpoint
 * @property {string} order
 * @property {number} index
 */
/**
 * @typedef {Object} dMediaQuery
 * @property {string} query
 * @property {number} breakpoint
 */
/**
 * @param {'min' | 'max'} type
 */
function useDynamicAdapt(type = 'max') {
   const className = '_dynamic_adapt_'
   const attrName = 'data-da'

   /** @type {dNode[]} */
   const dNodes = getDNodes()

   /** @type {dMediaQuery[]} */
   const dMediaQueries = getDMediaQueries(dNodes)

   dMediaQueries.forEach((dMediaQuery) => {
      const matchMedia = window.matchMedia(dMediaQuery.query)
      // массив объектов с подходящим брейкпоинтом
      const filteredDNodes = dNodes.filter(({ breakpoint }) => breakpoint === dMediaQuery.breakpoint)
      const mediaHandler = getMediaHandler(matchMedia, filteredDNodes)
      matchMedia.addEventListener('change', mediaHandler)

      mediaHandler()
   })

   function getDNodes() {
      const result = []
      const elements = [...document.querySelectorAll(`[${attrName}]`)]

      elements.forEach((element) => {
         const attr = element.getAttribute(attrName)
         const [toSelector, breakpoint, order] = attr.split(',').map((val) => val.trim())

         const to = document.querySelector(toSelector)

         if (to) {
            result.push({
               parent: element.parentElement,
               element,
               to,
               breakpoint: breakpoint ?? '767',
               order: order !== undefined ? (isNumber(order) ? Number(order) : order) : 'last',
               index: -1,
            })
         }
      })

      return sortDNodes(result)
   }

   /**
    * @param {dNode} items
    * @returns {dMediaQuery[]}
    */
   function getDMediaQueries(items) {
      const uniqItems = [...new Set(items.map(({ breakpoint }) => `(${type}-width: ${breakpoint}px),${breakpoint}`))]

      return uniqItems.map((item) => {
         const [query, breakpoint] = item.split(',')

         return { query, breakpoint }
      })
   }

   /**
    * @param {MediaQueryList} matchMedia
    * @param {dNodes} items
    */
   function getMediaHandler(matchMedia, items) {
      return function mediaHandler() {
         if (matchMedia.matches) {
         items.forEach((item) => {
            moveTo(item)
         })

         items.reverse()
         } else {
         items.forEach((item) => {
            if (item.element.classList.contains(className)) {
               moveBack(item)
            }
         })

         items.reverse()
         }
      }
   }

   /**
    * @param {dNode} dNode
    */
   function moveTo(dNode) {
      const { to, element, order } = dNode
      dNode.index = getIndexInParent(dNode.element, dNode.element.parentElement)
      element.classList.add(className)

      if (order === 'last' || order >= to.children.length) {
         to.append(element)

         return
      }

      if (order === 'first') {
         to.prepend(element)

         return
      }

      to.children[order].before(element)
   }

   /**
    * @param {dNode} dNode
    */
   function moveBack(dNode) {
      const { parent, element, index } = dNode
      element.classList.remove(className)

      if (index >= 0 && parent.children[index]) {
         parent.children[index].before(element)
      } else {
         parent.append(element)
      }
   }

   /**
    * @param {HTMLElement} element
    * @param {HTMLElement} parent
    */
   function getIndexInParent(element, parent) {
      return [...parent.children].indexOf(element)
   }

   /**
    * Функция сортировки массива по breakpoint и order
    * по возрастанию для type = min
    * по убыванию для type = max
    *
    * @param {dNode[]} items
    */
   function sortDNodes(items) {
      const isMin = type === 'min' ? 1 : 0

      return [...items].sort((a, b) => {
         if (a.breakpoint === b.breakpoint) {
         if (a.order === b.order) {
            return 0
         }

         if (a.order === 'first' || b.order === 'last') {
           return -1 * isMin
         }

         if (a.order === 'last' || b.order === 'first') {
           return 1 * isMin
         }

         return 0
      }

       return (a.breakpoint - b.breakpoint) * isMin
      })
   }

   function isNumber(value) {
      return !isNaN(value)
   }
}
useDynamicAdapt();
// POPUP
const popupLinks = document.querySelectorAll('[data-popup]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll("[data-lp]");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++){
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.dataset.popup;
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
const popupCloseIcon = document.querySelectorAll('[data-close]');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++){
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup._open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('_open');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('_open');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {

      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];

         el.style.paddingRight = lockPaddingValue;
      }
   }   
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('_lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }   
      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup._open');
      popupClose(popupActive);
   }
});

(function () {
   // проверяем поддержку
   if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      }
   }
})();
(function () {
   // проверяем поддержку
   if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let index = 0; index < animItems.length; index++){
         const animItem = animItems[index];
         const animItemHeight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top + 300;
         const animStart = 4;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < ((animItemOffset - 300) + animItemHeight)) {
            animItem.classList.add('_active');
         } else {
            if (!animItem.classList.contains('_anim-no-hide')) {
               animItem.classList.remove('_active');
            }
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }

   setTimeout(() => {
      animOnScroll();
   }, 300);
}