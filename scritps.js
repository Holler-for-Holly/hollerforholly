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

const serviceDropdown = document.getElementById("serviceDropdown");
const serviceSelect = document.getElementById("service");
const serviceTrigger = serviceDropdown.querySelector(".custom-select-trigger");
const serviceTriggerText = serviceTrigger.querySelector("span");
const serviceOptions = [...serviceDropdown.querySelectorAll('[role="option"]')];

function closeServiceDropdown() {
    serviceDropdown.classList.remove("open");
    serviceTrigger.setAttribute("aria-expanded", "false");
}

serviceTrigger.addEventListener("click", () => {
    const isOpen = serviceDropdown.classList.toggle("open");
    serviceTrigger.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        serviceOptions.find((option) => option.getAttribute("aria-selected") === "true").focus();
    }
});

serviceOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
        serviceSelect.value = option.textContent.trim();
        serviceTriggerText.textContent = option.textContent.trim();
        serviceOptions.forEach((item) => item.setAttribute("aria-selected", "false"));
        option.setAttribute("aria-selected", "true");
        closeServiceDropdown();
        serviceTrigger.focus();
    });

    option.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction = event.key === "ArrowDown" ? 1 : -1;
            serviceOptions[(index + direction + serviceOptions.length) % serviceOptions.length].focus();
        }
    });
});

document.addEventListener("click", (event) => {
    if (!serviceDropdown.contains(event.target)) closeServiceDropdown();
});

serviceDropdown.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeServiceDropdown();
        serviceTrigger.focus();
    }
});


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
