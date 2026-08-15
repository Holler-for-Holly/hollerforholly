const menuButton =
  document.getElementById("menuButton");

const navLinks =
  document.getElementById("navLinks");

const header =
  document.querySelector(".header");


// MOBILE MENU

menuButton.addEventListener("click", () => {

  const isOpen =
    navLinks.classList.toggle("active");

  menuButton.classList.toggle(
    "active",
    isOpen
  );

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );

  menuButton.setAttribute(
    "aria-expanded",
    isOpen.toString()
  );

});


// CLOSE MOBILE MENU

document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove(
        "active"
      );

      menuButton.classList.remove(
        "active"
      );

      document.body.classList.remove(
        "menu-open"
      );

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


// HEADER SCROLL EFFECT

window.addEventListener("scroll", () => {

  header.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );

});


// SCROLL REVEAL

const reveals =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          !entry.isIntersecting
        ) return;

        entry.target.classList.add(
          "visible"
        );

        revealObserver.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.15
    }
  );


reveals.forEach(element => {

  revealObserver.observe(element);

});


// HERO CARD TILT

const heroCard =
  document.querySelector(".hero-card");


if (
  heroCard &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  heroCard.addEventListener(
    "mousemove",
    event => {

      const rect =
        heroCard.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left;

      const y =
        event.clientY -
        rect.top;

      const rotateY =
        ((x / rect.width) - 0.5)
        * 10;

      const rotateX =
        ((y / rect.height) - 0.5)
        * -10;

      heroCard.style.transform =
        `
          perspective(900px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;

    }
  );


  heroCard.addEventListener(
    "mouseleave",
    () => {

      heroCard.style.transform =
        "";

    }
  );

}


// CURRENT YEAR

document.getElementById("year")
  .textContent =
  new Date().getFullYear();