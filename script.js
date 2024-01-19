document.addEventListener('DOMContentLoaded', function () {
    // Portfolio functionality
    var portfolioItems = document.querySelectorAll('#portfolioItems .portfolio-item');
    var activeIndex = Math.floor(portfolioItems.length / 2); // Starting with the middle item

    function updateActiveItem() {
        const itemWidth = portfolioItems[0].clientWidth;
        portfolioItems.forEach((item, index) => {
            item.classList.remove('active');
            let offset = (index - activeIndex) * itemWidth;
            item.style.transform = `translateX(${offset}px) translateZ(-${Math.abs(offset)}px)`;
            item.style.opacity = (index === activeIndex) ? '1' : '0.5';

            if (index === activeIndex) {
                item.classList.add('active');
            }
        });
    }


    updateActiveItem();

    // Event listeners for portfolio navigation
    document.querySelector('.left-arrow').addEventListener('click', () => changeActiveItem(-1));
    document.querySelector('.right-arrow').addEventListener('click', () => changeActiveItem(1));

    // Keyboard navigation for portfolio items
    document.addEventListener('keydown', (event) => {
        if (event.key === "ArrowRight") changeActiveItem(1);
        if (event.key === "ArrowLeft") changeActiveItem(-1);
    });

    function changeActiveItem(direction) {
        activeIndex = (activeIndex + direction + portfolioItems.length) % portfolioItems.length;
        updateActiveItem();
    }

    // Modal functionality
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById("modal-image");
    var modalVideo = document.getElementById("modal-video");
    var captionText = document.getElementById("caption");
    // Add click event listeners to 'Click to View' overlays
    portfolioItems.forEach(item => {
        const clickToViewOverlay = item.querySelector('.click-to-view');
        clickToViewOverlay.addEventListener('click', function () {
            expandMedia(item);
        });
    });

    function expandMedia(element) {
        var media = element.querySelector('.media-wrapper video, .media-wrapper img');

        if (media.tagName.toLowerCase() === 'video') {
            modalImg.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = media.querySelector('source').src;
            modalVideo.play(); // Autoplay the video
        } else {
            modalVideo.style.display = 'none';
            modalImg.style.display = 'block';
            modalImg.src = media.src;
        }
        captionText.innerHTML = element.querySelector('h3').innerHTML;
        modal.style.display = "block";
    }

    document.querySelector('.close').onclick = function () {
        modal.style.display = "none";
        modalVideo.pause();
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modalVideo.pause();
        }
    };

    // Infinite Scroll for Testimonials
    const scrollers = document.querySelectorAll(".scroller");

    // Check for reduced motion preference
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimationToScrollers();
    }

    function addAnimationToScrollers() {
        scrollers.forEach((scroller) => {
            // Add data-animated="true" to the scroller
            scroller.setAttribute("data-animated", true);

            // Clone the content of scroller__inner for infinite scroll effect
            const scrollerInner = scroller.querySelector(".scroller__inner");
            const content = scrollerInner.innerHTML;
            scrollerInner.innerHTML += content; // Duplicate the content
        });
    }
});

window.addEventListener('scroll', function () {
    var scrollPosition = window.pageYOffset;
    var heroSection = document.querySelector('.hero');

    // This will adjust the background position on scroll
    heroSection.style.backgroundPositionY = (50 - scrollPosition * 0.1) + '%';
});

document.addEventListener('DOMContentLoaded', function () {
    var contactPopup = document.getElementById('contactPopup');
    var closeBtn = document.querySelector('.contact-popup .close-btn');

    // Get all 'Contact Us' buttons
    var contactUsButtons = document.querySelectorAll('.cta-button');

    // Attach click event listener to each 'Contact Us' button
    contactUsButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            contactPopup.style.display = 'block';
        });
    });

    // Close the popup on clicking the close button
    closeBtn.onclick = function () {
        contactPopup.style.display = 'none';
    };

    // Close the popup if user clicks outside of it
    window.onclick = function (event) {
        if (event.target == contactPopup) {
            contactPopup.style.display = 'none';
        }
    };
});
document.querySelector('.hamburger-icon').addEventListener('click', function() {
    document.querySelector('.navbar .nav-links').classList.toggle('active');
});

// Existing JavaScript code for form submission
document.addEventListener("DOMContentLoaded", function () {
    var contactForm = document.querySelector("#contactForm");
    var contactPopup = document.querySelector("#contactPopup");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(contactForm);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://formspree.io/f/xoqgvoge", true);
        xhr.setRequestHeader("Accept", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                contactPopup.style.display = "none"; // Close the popup
                displayCenteredMessage("Thank you! Your message has been sent.");
            } else {
                displayCenteredMessage("Oops! Something went wrong.", true);
            }
        };

        xhr.send(formData);
    });

    function displayCenteredMessage(message, isError) {
        var messageDiv = document.createElement("div");
        messageDiv.innerText = message;
        messageDiv.id = "centeredMessage";
        messageDiv.className = isError ? "error" : "success";
        document.body.appendChild(messageDiv);

        setTimeout(function () {
            messageDiv.style.opacity = "0";
            setTimeout(function () {
                messageDiv.remove();
            }, 2000); // Remove message after fade-out
        }, 3000); // Message stays for 3 seconds
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var servicesSection = document.querySelector("#services");

    function checkVisibility() {
        var windowHeight = window.innerHeight;
        var sectionTop = servicesSection.getBoundingClientRect().top;
        var sectionVisible = sectionTop < windowHeight - 30; // Adjust as needed

        if (sectionVisible) {
            servicesSection.classList.add("visible");
        }
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Initial check on page load
});






