
/* =========================================================
   PREMIUM WEDDING PHOTOGRAPHY WEBSITE
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPageLoader();

    initMobileMenu();

    initStickyHeader();

    initPortfolioFilter();

    initVideoModal();

    initImageLightbox();

    initFAQ();

    initScrollReveal();

    initBackToTop();

    initContactForm();

    initCurrentYear();

    initSmoothNavigation();

});


/* =========================================================
   02. PAGE LOADER
========================================================= */

function initPageLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;


    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 600);

    });


    /*
       Safety fallback:
       If any external image/video takes too long,
       don't keep the visitor stuck on loader.
    */

    setTimeout(() => {

        loader.classList.add("hide");

    }, 4000);

}


/* =========================================================
   03. MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (!menuToggle || !mainNav) return;


    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");

        mainNav.classList.toggle("active");

        document.body.classList.toggle("no-scroll");

    });


    /*
       Close menu when navigation link is clicked.
    */

    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");

            mainNav.classList.remove("active");

            document.body.classList.remove("no-scroll");

        });

    });


    /*
       Close menu if user presses Escape.
    */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            menuToggle.classList.remove("active");

            mainNav.classList.remove("active");

            document.body.classList.remove("no-scroll");

        }

    });

}


/* =========================================================
   04. STICKY HEADER
========================================================= */

function initStickyHeader() {

    const header =
        document.getElementById("siteHeader");

    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================================================
   05. PORTFOLIO FILTER
========================================================= */

function initPortfolioFilter() {

    const buttons =
        document.querySelectorAll(".filter-btn");

    const items =
        document.querySelectorAll(".portfolio-item");


    if (!buttons.length || !items.length) return;


    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            /*
               Active button
            */

            buttons.forEach((btn) => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            /*
               Filter portfolio items
            */

            items.forEach((item) => {

                const category =
                    item.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.classList.remove("hidden");

                    /*
                       Small delay gives animation
                       time to restart.
                    */

                    requestAnimationFrame(() => {

                        item.classList.add("show");

                    });

                } else {

                    item.classList.remove("show");

                    item.classList.add("hidden");

                }

            });

        });

    });


    /*
       Initial state
    */

    items.forEach((item) => {

        item.classList.add("show");

    });

}


/* =========================================================
   06. VIDEO MODAL
========================================================= */

function initVideoModal() {

    const modal =
        document.getElementById("videoModal");

    const frame =
        document.getElementById("videoFrame");

    const closeButton =
        document.getElementById("videoClose");

    const overlay =
        document.getElementById("videoOverlay");

    const playButtons =
        document.querySelectorAll(".play-button");


    if (
        !modal ||
        !frame ||
        !closeButton ||
        !overlay
    ) return;


    /*
       Open video
    */

    function openVideo(videoURL) {

        if (!videoURL) return;


        /*
           Add autoplay when YouTube opens.
        */

        const separator =
            videoURL.includes("?")
                ? "&"
                : "?";


        frame.src =
            videoURL +
            separator +
            "autoplay=1&rel=0";


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add("no-scroll");

    }


    /*
       Close video
    */

    function closeVideo() {

        frame.src = "";

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove("no-scroll");

    }


    /*
       Play buttons
    */

    playButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const video =
                    button.dataset.video;

                openVideo(video);

            }
        );

    });


    /*
       Close button
    */

    closeButton.addEventListener(
        "click",
        closeVideo
    );


    /*
       Click outside video
    */

    overlay.addEventListener(
        "click",
        closeVideo
    );


    /*
       Escape key
    */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeVideo();

            }

        }
    );

}


/* =========================================================
   07. IMAGE LIGHTBOX
========================================================= */

function initImageLightbox() {

    const lightbox =
        document.getElementById(
            "imageLightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const closeButton =
        document.getElementById(
            "lightboxClose"
        );

    const previousButton =
        document.getElementById(
            "lightboxPrev"
        );

    const nextButton =
        document.getElementById(
            "lightboxNext"
        );

    const galleryButtons =
        document.querySelectorAll(
            ".gallery-open"
        );


    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton ||
        !previousButton ||
        !nextButton
    ) return;


    /*
       Get portfolio images only
    */

    const portfolioImages =
        Array.from(
            document.querySelectorAll(
                ".portfolio-item img"
            )
        );


    let currentIndex = 0;


    /*
       Open image
    */

    function openImage(index) {

        if (
            index < 0 ||
            index >= portfolioImages.length
        ) return;


        currentIndex = index;


        const image =
            portfolioImages[currentIndex];


        lightboxImage.src =
            image.currentSrc ||
            image.src;


        lightboxImage.alt =
            image.alt || "Wedding Photography";


        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add("no-scroll");

    }


    /*
       Close image
    */

    function closeImage() {

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        lightboxImage.src = "";

        document.body.classList.remove("no-scroll");

    }


    /*
       Previous image
    */

    function previousImage() {

        if (!portfolioImages.length) return;


        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                portfolioImages.length - 1;

        }


        openImage(currentIndex);

    }


    /*
       Next image
    */

    function nextImage() {

        if (!portfolioImages.length) return;


        currentIndex++;

        if (
            currentIndex >=
            portfolioImages.length
        ) {

            currentIndex = 0;

        }


        openImage(currentIndex);

    }


    /*
       Add click events
    */

    galleryButtons.forEach(
        (button, index) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    openImage(index);

                }
            );

        }
    );


    /*
       Close
    */

    closeButton.addEventListener(
        "click",
        closeImage
    );


    /*
       Previous
    */

    previousButton.addEventListener(
        "click",
        previousImage
    );


    /*
       Next
    */

    nextButton.addEventListener(
        "click",
        nextImage
    );


    /*
       Click on dark background
    */

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target === lightbox
            ) {

                closeImage();

            }

        }
    );


    /*
       Keyboard controls
    */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) return;


            if (event.key === "Escape") {

                closeImage();

            }


            if (event.key === "ArrowLeft") {

                previousImage();

            }


            if (event.key === "ArrowRight") {

                nextImage();

            }

        }
    );


    /*
       Touch swipe support
    */

    let touchStartX = 0;

    let touchEndX = 0;


    lightbox.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    lightbox.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );


    function handleSwipe() {

        const difference =
            touchStartX - touchEndX;


        if (Math.abs(difference) < 50) {

            return;

        }


        if (difference > 0) {

            nextImage();

        } else {

            previousImage();

        }

    }

}


/* =========================================================
   08. FAQ ACCORDION
========================================================= */

function initFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    if (!faqItems.length) return;


    faqItems.forEach((item) => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) return;


        question.addEventListener(
            "click",
            () => {

                /*
                   Close other FAQ items.
                */

                faqItems.forEach(
                    (otherItem) => {

                        if (
                            otherItem !== item
                        ) {

                            otherItem.classList.remove(
                                "active"
                            );

                        }

                    }
                );


                /*
                   Toggle current item.
                */

                item.classList.toggle(
                    "active"
                );

            }
        );

    });

}


/* =========================================================
   09. SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".section-heading, " +
            ".intro-content, " +
            ".film-card, " +
            ".portfolio-item, " +
            ".story-card, " +
            ".service-card, " +
            ".about-image, " +
            ".about-content, " +
            ".team-member, " +
            ".testimonial-card, " +
            ".instagram-item, " +
            ".faq-item, " +
            ".contact-info, " +
            ".contact-form-wrapper"
        );


    if (!elements.length) return;


    /*
       Add reveal class.
    */

    elements.forEach((element) => {

        element.classList.add("reveal");

    });


    /*
       Intersection Observer
    */

    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                obs.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        elements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        /*
           Fallback for older browsers.
        */

        elements.forEach((element) => {

            element.classList.add(
                "visible"
            );

        });

    }

}


/* =========================================================
   10. BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) return;


    function checkScroll() {

        if (window.scrollY > 500) {

            button.classList.add(
                "visible"
            );

        } else {

            button.classList.remove(
                "visible"
            );

        }

    }


    window.addEventListener(
        "scroll",
        checkScroll,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    checkScroll();

}


/* =========================================================
   11. CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            /*
               Read form values
            */

            const name =
                getValue("name");

            const phone =
                getValue("phone");

            const date =
                getValue("date");

            const city =
                getValue("city");

            const service =
                getValue("service");

            const message =
                getValue("message");


            /*
               Basic validation
            */

            if (!name || !phone) {

                alert(
                    "Please enter your name and phone number."
                );

                return;

            }


            /*
               Create WhatsApp message
            */

            const whatsappMessage =

                "Hello, I would like to enquire " +
                "about wedding photography.%0A%0A" +

                "*Name:* " +
                encodeURIComponent(name) +
                "%0A" +

                "*Phone:* " +
                encodeURIComponent(phone) +
                "%0A" +

                "*Wedding Date:* " +
                encodeURIComponent(
                    date || "Not specified"
                ) +
                "%0A" +

                "*Location:* " +
                encodeURIComponent(
                    city || "Not specified"
                ) +
                "%0A" +

                "*Service:* " +
                encodeURIComponent(
                    service || "Not specified"
                ) +
                "%0A" +

                "*Message:* " +
                encodeURIComponent(
                    message || "No additional message"
                );


            /*
               WhatsApp number
               +91 89825 30022
            */

            const whatsappURL =
                "https://wa.me/918982530022?text=" +
                whatsappMessage;


            /*
               Open WhatsApp
            */

            window.open(
                whatsappURL,
                "_blank"
            );


            /*
               Optional reset
            */

            form.reset();

        }
    );

}


/* =========================================================
   12. GET FORM VALUE
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {

        return "";

    }


    return element.value.trim();

}


/* =========================================================
   13. CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const yearElement =
        document.getElementById(
            "currentYear"
        );


    if (!yearElement) return;


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   14. SMOOTH NAVIGATION
========================================================= */

function initSmoothNavigation() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) return;


                event.preventDefault();


                const header =
                    document.getElementById(
                        "siteHeader"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   15. HERO VIDEO ERROR HANDLING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const heroVideo =
            document.querySelector(
                ".hero-video"
            );


        if (!heroVideo) return;


        heroVideo.addEventListener(
            "error",
            () => {

                /*
                   If video doesn't exist,
                   hero background will use
                   the poster image.
                */

                heroVideo.style.display =
                    "none";

            }
        );


        /*
           Try to play video.
        */

        const playPromise =
            heroVideo.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(() => {

                /*
                   Browser blocked autoplay.
                   Muted + playsinline normally
                   solves this on modern browsers.
                */

            });

        }

    }
);


/* =========================================================
   16. IMAGE FALLBACK
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const images =
            document.querySelectorAll(
                "img"
            );


        images.forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    /*
                       Prevent broken-image icon
                       from looking messy.

                       The HTML filename can later
                       be replaced with your actual
                       image.
                    */

                    image.style.opacity = "0.25";

                }
            );

        });

    }
);


/* =========================================================
   17. PREVENT RIGHT CLICK
   Optional — disabled by default.

   If you want to enable it, remove
   the comments below.

========================================================= */

/*

document.addEventListener(
    "contextmenu",
    (event) => {

        event.preventDefault();

    }
);

*/


/* =========================================================
   18. CONSOLE MESSAGE
========================================================= */

console.log(
    "Premium Wedding Photography Website loaded successfully."
);


const heroVideo = document.getElementById("heroVideo");
const soundToggle = document.getElementById("soundToggle");

if (heroVideo && soundToggle) {
    soundToggle.addEventListener("click", () => {
        if (heroVideo.muted) {
            heroVideo.muted = false;
            soundToggle.textContent = "🔊 Sound On";
        } else {
            heroVideo.muted = true;
            soundToggle.textContent = "🔇 Sound Off";
        }
    });
}





/* =========================================
   HERO VIDEO SOUND CONTROL
========================================= */

const heroVideo = document.getElementById("heroVideo");
const heroSoundBtn = document.getElementById("heroSoundBtn");

if (heroVideo && heroSoundBtn) {

    heroSoundBtn.addEventListener("click", async () => {

        try {

            if (heroVideo.muted) {

                heroVideo.muted = false;
                heroVideo.volume = 1;

                await heroVideo.play();

                heroSoundBtn.textContent = "🔇 Mute";

            } else {

                heroVideo.muted = true;

                heroSoundBtn.textContent = "🔊 Enable Sound";
            }

        } catch (error) {

            console.error("Hero video sound error:", error);

        }

    });

}