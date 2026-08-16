const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const header = document.querySelector(".site-header");
const mobileLinks = document.querySelectorAll(".mobile-nav a");


// ==============================
// MOBILE MENU
// ==============================

menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute("aria-expanded", isOpen);
});


mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// Close menu if user clicks outside it

document.addEventListener("click", (event) => {
    if (
        !mobileNav.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        mobileNav.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
    }
});


// ==============================
// NAVBAR SCROLL EFFECT
// ==============================

function updateHeader() {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}


window.addEventListener("scroll", updateHeader);

updateHeader();


// ==============================
// SCROLL REVEAL
// ==============================

const revealElements = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
    }
);


revealElements.forEach((element) => {
    observer.observe(element);
});


// ==============================
// CONTACT FORM
// ==============================

// CHANGE THIS IF HOLLY USES ANOTHER EMAIL
const hollyEmail = "holly@hollerforholly.ca";


const contactForm = document.getElementById("contactForm");


contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();


    const subject = encodeURIComponent(
        `Freelance Inquiry — ${service} — ${name}`
    );


    const body = encodeURIComponent(
`Hi Holly,

My name is ${name}.

I'm interested in:
${service}

Project details:
${message}

You can reach me at:
${email}

Thanks!`
    );


    window.location.href =
        `mailto:${hollyEmail}?subject=${subject}&body=${body}`;
});


// ==============================
// FOOTER YEAR
// ==============================

document.getElementById("year").textContent =
    new Date().getFullYear();