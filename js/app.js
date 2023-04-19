//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                  Table of contents:                  |
// 1.Global Variables                                   |
// 2.Functions                                          |
// 3.Main Code                                          |
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1.Global Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Elements
const header = document.querySelector('.page__header');
const body = document.querySelector('body');
const navBarList = document.querySelector('#navbar__list');
let menuLinks;
const hamburgerMenu = document.querySelector('.hamburger__menu');
const sections = document.querySelectorAll('section');
const collapsibles = document.querySelectorAll(".collapsible");
const scrollTopBtn = document.querySelector('.scroll__top__btn');

// Css classes
const smallScreenActive = 'small__screen__active';
const stopScrolling = 'stop__scrolling';
const activeClass = 'active';
const navActiveClass = 'menu__link__active';
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2.Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
* @description Building nav elements
*/
const buildNavElements = () => {
    sections.forEach(section => {
        navBarList.innerHTML += `<li>
        <a class="menu__link" data-section-id="${section.id}" href="#${section.id}">${section.getAttribute('data-nav')}</a>
        </li>`;
    })
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
* @description Add class 'active' to section when near top of the section
*/
const addClassActiveToSection = () => {
    sections.forEach(section => {
        isElementViewed(section) ?
            section.classList.add(activeClass) :
            section.classList.remove(activeClass);
    });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
* @description Return boollean if element is in the middle of the viewport (A distance of a half of the viewport above and below it)
* @param {element} element
*/
const isElementViewed = (element) => {
    return element.getBoundingClientRect().top <= (window.innerHeight / 2) &&
        (-1 * element.getBoundingClientRect().top) + (window.innerHeight / 2) <= element.getBoundingClientRect().height ?
        true : false;
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
* @description Hiding nav bar when scrolling down and scrolling up make it appear again
* @param {number} prevScrollpos
* @param {number} currentScrollPos
*/
const hideNavWhenScrollingDown = (prevScrollpos, currentScrollPos) => {
    prevScrollpos > currentScrollPos ?
        header.style.top = "0" :
        header.style.top = -(header.offsetHeight);


    let isScrolling;
    window.addEventListener('scroll', function ( event ) {
        window.clearTimeout( isScrolling );

        isScrolling = setTimeout(function() {
            if(window.pageYOffset >= 20) {
                header.style.top = -(header.offsetHeight);
            }
        }, 5000);
    }, false);

}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
* @description Add a scroll to the top button on the page that’s only visible when the user scrolls a little bit
* @param {number} prevScrollpos
*/
const scrollToTop = (prevScrollpos) => {
    prevScrollpos > 100 ?
        scrollTopBtn.style.display = "inline-block" :
        scrollTopBtn.style.display = "none";
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
* @description Add class 'menu__link__active' to nav elements based on the viewed section 
*/
const addClassActiveToNavSection = () => {
    menuLinks.forEach(menuLink => {
        const section = document.getElementById(menuLink.getAttribute('data-section-id'));
        isElementViewed(section) ?
            menuLink.classList.add(navActiveClass) :
            menuLink.classList.remove(navActiveClass);
    });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
* @description Make sections collapsible
*/
const makeSectionsCollapsible = () => {
    collapsibles.forEach(collapsible => {
        collapsible.addEventListener("click", () => {
            let content = collapsible.nextElementSibling;
            content.style.display === "block" ?
                content.style.display = "none" :
                content.style.display = "block";
        });
    });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
* @description Adjust navbar for the small screen
*/
const makeSmalleScreenNav = () => {
    hamburgerMenu.addEventListener('click', () => {
        header.classList.toggle(smallScreenActive);
        hamburgerMenu.classList.toggle(smallScreenActive);
        navBarList.classList.toggle(smallScreenActive);
        body.classList.toggle(stopScrolling);
    });

    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', () => {
            header.classList.remove(smallScreenActive);
            hamburgerMenu.classList.remove(smallScreenActive);
            navBarList.classList.remove(smallScreenActive);
            body.classList.remove(stopScrolling);
        });
});

    document.addEventListener('mouseup', (e) => {
        if (!header.contains(e.target)) {
            header.classList.remove(smallScreenActive);
            hamburgerMenu.classList.remove(smallScreenActive);
            navBarList.classList.remove(smallScreenActive);
            body.classList.remove(stopScrolling);
        }
    });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 3.Main Code ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
buildNavElements();

// Storing nav elements
menuLinks = document.querySelectorAll('.menu__link');

document.documentElement.style.scrollBehavior = 'smooth';

let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
    addClassActiveToSection();
    addClassActiveToNavSection();
    
    let currentScrollPos = window.pageYOffset;
    hideNavWhenScrollingDown(prevScrollpos, currentScrollPos);
    scrollToTop(prevScrollpos);
    prevScrollpos = currentScrollPos;
}

makeSmalleScreenNav();

makeSectionsCollapsible();