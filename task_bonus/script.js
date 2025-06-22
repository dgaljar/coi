const bigMenu = document.querySelector(".big__menu")
const menuItems = document.querySelectorAll(".menu__item");
const submenuItems = document.querySelectorAll(".submenu__item")
const hoverBg = document.querySelector(".hover-bg");
const container = document.querySelector(".menu__container");
const submenuContainer = document.querySelector(".submenu__container");
const submenuCarousel = document.querySelector(".submenu__carousel");
const submenuWrapper = document.querySelector(".submenu__wrapper");
const submenus = document.querySelectorAll(".submenu");

const isMobile = () => window.innerWidth <= 768;

//dynamically change the step size to avoid the need to refresh the page
let step;

const updateStep = () => {
  if (bigMenu) {
    step = bigMenu.offsetWidth;
    console.log("Step:", step);
  }
};

updateStep();

window.addEventListener("resize", updateStep);


//assinging indexes to each class/menu
const menuMap = {
  "menu__shop": 0,
  "menu__resource": 1,
  "menu__menu": 2,
};

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const left = item.offsetLeft;

    //move the "hover" and change its size 
    hoverBg.style.width = `${item.offsetWidth}px`;
    hoverBg.style.transform = `translateX(${left}px)`;

    //open submenu and update aria-expanded
    submenuContainer.classList.add("is-open");
    submenuContainer.setAttribute("aria-expanded", "true");

    //set aria expanded on buttons
    menuItems.forEach(button => button.setAttribute("aria-expanded", "false"));
    item.setAttribute("aria-expanded", "true");

    //find the menu index based on class
    const menuKey = Object.keys(menuMap).find(className => item.classList.contains(className));

    if (menuKey !== undefined) {
      const index = menuMap[menuKey];

      //move the carousel to the correct submenu 
      submenuCarousel.style.transform = `translateX(-${index * step}px)`;

      //adjust the wrapper height 
      const activeSubmenu = submenus[index];
      submenuWrapper.style.maxHeight = `${activeSubmenu.scrollHeight}px`;
    }
  });
});

//add the acitve class to submenu items on smaller devices 
submenuItems.forEach(item => {
  item.addEventListener("click", () => {
    if (!isMobile()) return; 

    submenuItems.forEach(i => i.classList.remove("submenu__item-active"));

    item.classList.add("submenu__item-active");
  });
});

//close the menu, reset the hover and reset the aria-expanded
document.addEventListener("click", (e) => {
  if (!bigMenu.contains(e.target)) {
    submenuContainer.classList.remove("is-open");
    submenuWrapper.style.maxHeight = "0";
    hoverBg.style.width = `0`;
    hoverBg.style.transform = `translateX(0)`;

    submenuContainer.setAttribute("aria-expanded", "false");
    menuItems.forEach(button => button.setAttribute("aria-expanded", "false"));
  }
});