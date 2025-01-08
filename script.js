
function revealToSpan() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {
            var parent = document.createElement("span");
            var child = document.createElement("span");

            parent.classList.add("parent");
            child.classList.add("child");

            // Wrap content in <span> elements
            child.innerHTML = elem.innerHTML;
            parent.appendChild(child);

            elem.innerHTML = "";
            elem.appendChild(parent);

            // Ensure the text is visible when wrapping
            gsap.set(child, { opacity: 1, visibility: "visible" });
        });
}

function valueSetters() {
    gsap.set("#nav a", {
        y: "-100%", opacity: 0
    });
    gsap.set("#home .parent .child", { y: "100%" });
    gsap.set("#home .row img", { opacity: 0 });

    document.querySelectorAll("#Visual>g>g>path, #Visual>g>g>polyline").forEach(function (e) {
        var character = e;
        character.style.strokeDasharray = character.getTotalLength() + 'px';
        character.style.strokeDashoffset = character.getTotalLength() + 'px';
    });
}

function loaderAnimation() {
    var tl = gsap.timeline();
    tl
        .from("#loader .child span", {
            x: 150,
            stagger: .2,
            duration: 1.5,
            opacity: .8,
            ease: Power3.easeInout
        })
        .to("#loader .parent .child", {
            y: "-100%",
            duration: 1,
            ease: Circ.easeInout
        })
        .to("#loader .loader-container", {
            opacity: 0,
            duration: 0.5,
            ease: Circ.easeInOut,
        }, "-=0.5")
        .to("#loader", {
            height: 0,
            duration: 1,
            ease: Circ.easeInout
        })
        .to("#green", {
            top: 0,
            height: "100%",
            duration: 1,
            delay: -.8,
            ease: Circ.easeInout
        })
        .to("#green", {
            height: "0%",
            delay: -.5,
            duration: 1,
            ease: Circ.easeInout,
            onComplete: function () {
                animateHomepage();
            }
        });
}

function animateSvg() {
    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
        strokeDashoffset: 0,
        duration: 2,
        ease: Expo.easeInOut
    });
}

function animateHomepage() {
    var tl = gsap.timeline();
    tl
        .to("#nav a", {
            y: 0,
            opacity: 1,
            stagger: .05,
            ease: Expo.easeInOut
        })
        .to("#home .parent .child", {
            y: 0,
            stagger: 0.1,
            duration: 1.5,
            ease: Expo.easeInOut
        })
        .to("#home .row img", {
            opacity: 1,
            delay: -.5,
            ease: Expo.easeInOut,
            onComplete: function () {
                animateSvg();
            }
        });
}

function updateLocalTime() {
    const localTimeElement = document.getElementById('local-time');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    localTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}





function locoInitialize() {
    // Initialize LocomotiveScroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#main"), // Main scroll container
        smooth: true
    });

    // Sync ScrollTrigger with LocomotiveScroll
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? scroll.scrollTo(value, 0, 0) // Scroll to the specified position
                : scroll.scroll.instance.scroll.y; // Get current scroll position
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // Update ScrollTrigger and LocomotiveScroll on scroll events
    scroll.on("scroll", () => {
        ScrollTrigger.update();
    });

    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    // Image rotation animations
    gsap.to("#imgrig .imgcntnr:nth-child(1)", {
        rotate: -40, // Rotate image
        scrollTrigger: {
            trigger: "#imgrig",
            start: "top 100%", // Trigger point
            end: "top 10%",   // End point
            scrub: true,      // Smooth scrolling effect
            scroller: "#main", // Pass LocomotiveScroll container here
            markers: false     // Debugging markers (remove in production)
        }
    });

    gsap.to("#imgrig .imgcntnr:nth-child(2)", {
        rotate: -15, // Rotate image
        scrollTrigger: {
            trigger: "#imgrig",
            start: "top 100%", // Trigger point
            end: "top 10%",   // End point
            scrub: true,      // Smooth scrolling effect
            scroller: "#main", // Pass LocomotiveScroll container here
            markers: false    // Debugging markers (remove in production)
        }
    });

    gsap.to("#imgrig .imgcntnr:nth-child(3)", {
        rotate: 5, // Rotate image
        scrollTrigger: {
            trigger: "#imgrig",
            start: "top 100%", // Trigger point
            end: "top 10%",   // End point
            scrub: true,      // Smooth scrolling effect
            scroller: "#main", // Pass LocomotiveScroll container here
            markers: false     // Debugging markers (remove in production)
        }
    });

    // Text animation example
    gsap.fromTo(
        ".animate-text span",
        {
            y: "100%",
            opacity: 0
        },
        {
            y: "0%",
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".h1-container",
                start: "top 60%",
                end: "bottom top",
                scroller: "#main"
            }
        }
    );

    // Refresh ScrollTrigger after initialization
    ScrollTrigger.refresh();
}

// Initialize everything


 









revealToSpan();
valueSetters();
loaderAnimation();
setInterval(updateLocalTime, 1000);
locoInitialize();




// Prevent default action for links with class 'prevent-default'
document.querySelectorAll('.prevent-default').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
    });
});



// Update the local time every second



// Show the overlay when the "Credits" link is clicked
document.getElementById('credits-link').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('credits-overlay').style.display = 'block';
});

// Hide the overlay when the close button is clicked
document.getElementById('close-overlay').addEventListener('click', function () {
  document.getElementById('credits-overlay').style.display = 'none';
});





