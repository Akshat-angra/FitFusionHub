document.addEventListener("DOMContentLoaded", function () {
    gsap.fromTo(".loader-logo img", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1.5, ease: "bounce.out" });
    gsap.fromTo(".loader-text", { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power1.inOut", delay: 0.5 });

    setTimeout(() => {
        gsap.to(".loader", {
            opacity: 0, duration: 1, onComplete: () => {
                document.querySelector(".loader").classList.add("hidden");
                document.body.style.overflow = "auto";
            }
        });
    }, 3000);
});

function toggleMenu() {
    const navItems = document.getElementById("nav-items");
    navItems.classList.toggle("active");
}


document.addEventListener('DOMContentLoaded', function () {
    const fieldset = document.querySelector('.about fieldset');

    fieldset.addEventListener('mousemove', function (e) {
        const rect = fieldset.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        const rotateX = deltaY / centerY * 10;
        const rotateY = -deltaX / centerX * 10;

        fieldset.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const topLeft = fieldset.querySelector('.top-left');
        const topRight = fieldset.querySelector('.top-right');
        const bottomLeft = fieldset.querySelector('.bottom-left');
        const bottomRight = fieldset.querySelector('.bottom-right');

        topLeft.style.borderColor = deltaX < 0 && deltaY < 0 ? '#cd237f' : 'transparent';
        topRight.style.borderColor = deltaX > 0 && deltaY < 0 ? '#cd237f' : 'transparent';
        bottomLeft.style.borderColor = deltaX < 0 && deltaY > 0 ? '#cd237f' : 'transparent';
        bottomRight.style.borderColor = deltaX > 0 && deltaY > 0 ? '#cd237f' : 'transparent';

        topLeft.style.opacity = deltaX < 0 && deltaY < 0 ? 0.3 : 0;
        topRight.style.opacity = deltaX > 0 && deltaY < 0 ? 0.3 : 0;
        bottomLeft.style.opacity = deltaX < 0 && deltaY > 0 ? 0.3 : 0;
        bottomRight.style.opacity = deltaX > 0 && deltaY > 0 ? 0.3 : 0;
    });

    fieldset.addEventListener('mouseleave', function () {
        fieldset.style.transform = 'rotateX(0) rotateY(0)';

        const corners = fieldset.querySelectorAll('.corner');
        corners.forEach(corner => {
            corner.style.borderColor = 'transparent';
            corner.style.opacity = 0;
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const fieldset = document.querySelector('.about fieldset');

    fieldset.addEventListener('mousemove', function (e) {
        const rect = fieldset.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gradientX = Math.max(0, Math.min((x / rect.width) * 100, 100));
        const gradientY = Math.max(0, Math.min((y / rect.height) * 100, 100));

        fieldset.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(205, 35, 127, 0.5), transparent 20%)`;
    });

    fieldset.addEventListener('mouseleave', function () {
        fieldset.style.background = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const contactSection = document.querySelector('.contact-section');

    contactSection.addEventListener('mousemove', function (e) {
        const rect = contactSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        const rotateX = deltaY / centerY * 10;
        const rotateY = -deltaX / centerX * 10;

        contactSection.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const topLeft = contactSection.querySelector('.top-left');
        const topRight = contactSection.querySelector('.top-right');
        const bottomLeft = contactSection.querySelector('.bottom-left');
        const bottomRight = contactSection.querySelector('.bottom-right');

        topLeft.style.borderColor = deltaX < 0 && deltaY < 0 ? '#06b6d4' : 'transparent';
        topRight.style.borderColor = deltaX > 0 && deltaY < 0 ? '#06b6d4' : 'transparent';
        bottomLeft.style.borderColor = deltaX < 0 && deltaY > 0 ? '#06b6d4' : 'transparent';
        bottomRight.style.borderColor = deltaX > 0 && deltaY > 0 ? '#06b6d4' : 'transparent';

        topLeft.style.opacity = deltaX < 0 && deltaY < 0 ? 0.3 : 0;
        topRight.style.opacity = deltaX > 0 && deltaY < 0 ? 0.3 : 0;
        bottomLeft.style.opacity = deltaX < 0 && deltaY > 0 ? 0.3 : 0;
        bottomRight.style.opacity = deltaX > 0 && deltaY > 0 ? 0.3 : 0;
    });

    contactSection.addEventListener('mouseleave', function () {
        contactSection.style.transform = 'rotateX(0) rotateY(0)';

        const corners = contactSection.querySelectorAll('.corner');
        corners.forEach(corner => {
            corner.style.borderColor = 'transparent';
            corner.style.opacity = 0;
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const fieldset = document.querySelector('.contact-section');

    fieldset.addEventListener('mousemove', function (e) {
        const rect = fieldset.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gradientX = Math.max(0, Math.min((x / rect.width) * 100, 100));
        const gradientY = Math.max(0, Math.min((y / rect.height) * 100, 100));

        fieldset.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(59, 130, 246, .5), transparent 20%)`;
    });

    fieldset.addEventListener('mouseleave', function () {
        fieldset.style.background = 'none';
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const servicesSection = document.querySelector('.services-section');

    servicesSection.addEventListener('mousemove', function (e) {
        const rect = servicesSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        const rotateX = deltaY / centerY * 10;
        const rotateY = -deltaX / centerX * 10;

        servicesSection.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const topLeft = servicesSection.querySelector('.top-left');
        const topRight = servicesSection.querySelector('.top-right');
        const bottomLeft = servicesSection.querySelector('.bottom-left');
        const bottomRight = servicesSection.querySelector('.bottom-right');

        topLeft.style.borderColor = deltaX < 0 && deltaY < 0 ? '#0ae448' : 'transparent';
        topRight.style.borderColor = deltaX > 0 && deltaY < 0 ? '#0ae448' : 'transparent';
        bottomLeft.style.borderColor = deltaX < 0 && deltaY > 0 ? '#0ae448' : 'transparent';
        bottomRight.style.borderColor = deltaX > 0 && deltaY > 0 ? '#0ae448' : 'transparent';

        topLeft.style.opacity = deltaX < 0 && deltaY < 0 ? 0.3 : 0;
        topRight.style.opacity = deltaX > 0 && deltaY < 0 ? 0.3 : 0;
        bottomLeft.style.opacity = deltaX < 0 && deltaY > 0 ? 0.3 : 0;
        bottomRight.style.opacity = deltaX > 0 && deltaY > 0 ? 0.3 : 0;
    });

    servicesSection.addEventListener('mouseleave', function () {
        servicesSection.style.transform = 'rotateX(0) rotateY(0)';

        const corners = servicesSection.querySelectorAll('.corner');
        corners.forEach(corner => {
            corner.style.borderColor = 'transparent';
            corner.style.opacity = 0;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const fieldset = document.querySelector('.services-section');

    fieldset.addEventListener('mousemove', function (e) {
        const rect = fieldset.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gradientX = Math.max(0, Math.min((x / rect.width) * 100, 100));
        const gradientY = Math.max(0, Math.min((y / rect.height) * 100, 100));

        fieldset.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgb(0,208,130), transparent 20%)`;
    });

    fieldset.addEventListener('mouseleave', function () {
        fieldset.style.background = 'none';
    });
});


const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dots button');
let currentIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showTestimonial(currentIndex);
    });
});

setInterval(() => {
    currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
    showTestimonial(currentIndex);
}, 3000);

document.addEventListener('DOMContentLoaded', function () {
    const knowYourselfSection = document.querySelector('.know-yourself-section');

    knowYourselfSection.addEventListener('mousemove', function (e) {
        const rect = knowYourselfSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        const rotateX = deltaY / centerY * 10;
        const rotateY = -deltaX / centerX * 10;

        knowYourselfSection.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const topLeft = knowYourselfSection.querySelector('.top-left');
        const topRight = knowYourselfSection.querySelector('.top-right');
        const bottomLeft = knowYourselfSection.querySelector('.bottom-left');
        const bottomRight = knowYourselfSection.querySelector('.bottom-right');

        topLeft.style.borderColor = deltaX < 0 && deltaY < 0 ? 'rgb(123,143,217)' : 'transparent';
        topRight.style.borderColor = deltaX > 0 && deltaY < 0 ? 'rgb(123,143,217)' : 'transparent';
        bottomLeft.style.borderColor = deltaX < 0 && deltaY > 0 ? 'rgb(123,143,217)' : 'transparent';
        bottomRight.style.borderColor = deltaX > 0 && deltaY > 0 ? 'rgb(123,143,217)' : 'transparent';

        topLeft.style.opacity = deltaX < 0 && deltaY < 0 ? 0.3 : 0;
        topRight.style.opacity = deltaX > 0 && deltaY < 0 ? 0.3 : 0;
        bottomLeft.style.opacity = deltaX < 0 && deltaY > 0 ? 0.3 : 0;
        bottomRight.style.opacity = deltaX > 0 && deltaY > 0 ? 0.3 : 0;
    });

    knowYourselfSection.addEventListener('mouseleave', function () {
        knowYourselfSection.style.transform = 'rotateX(0) rotateY(0)';

        const corners = knowYourselfSection.querySelectorAll('.corner');
        corners.forEach(corner => {
            corner.style.borderColor = 'transparent';
            corner.style.opacity = 0;
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const fieldset = document.querySelector('.container3');

    fieldset.addEventListener('mousemove', function (e) {
        const rect = fieldset.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gradientX = (x / rect.width) * 100;
        const gradientY = (y / rect.height) * 100;

        fieldset.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgb(123, 143, 217),transparent 20%`;
    });

    fieldset.addEventListener('mouseleave', function () {
        fieldset.style.background = 'none';
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const glassSection = document.querySelector('.glass-section');

    glassSection.addEventListener('mousemove', function (e) {
        const rect = glassSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        const rotateX = deltaY / centerY * 10;
        const rotateY = -deltaX / centerX * 10;

        glassSection.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const topLeft = glassSection.querySelector('.top-left');
        const topRight = glassSection.querySelector('.top-right');
        const bottomLeft = glassSection.querySelector('.bottom-left');
        const bottomRight = glassSection.querySelector('.bottom-right');

        topLeft.style.borderColor = deltaX < 0 && deltaY < 0 ? 'rgb(231,231,241)' : 'transparent';
        topRight.style.borderColor = deltaX > 0 && deltaY < 0 ? 'rgb(231,231,241)' : 'transparent';
        bottomLeft.style.borderColor = deltaX < 0 && deltaY > 0 ? 'rgb(231,231,241)' : 'transparent';
        bottomRight.style.borderColor = deltaX > 0 && deltaY > 0 ? 'rgb(231,231,241)' : 'transparent';

        topLeft.style.opacity = deltaX < 0 && deltaY < 0 ? 0.3 : 0;
        topRight.style.opacity = deltaX > 0 && deltaY < 0 ? 0.3 : 0;
        bottomLeft.style.opacity = deltaX < 0 && deltaY > 0 ? 0.3 : 0;
        bottomRight.style.opacity = deltaX > 0 && deltaY > 0 ? 0.3 : 0;
    });

    glassSection.addEventListener('mouseleave', function () {
        glassSection.style.transform = 'rotateX(0) rotateY(0)';

        const corners = glassSection.querySelectorAll('.corner');
        corners.forEach(corner => {
            corner.style.borderColor = 'transparent';
            corner.style.opacity = 0;
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const fieldset = document.querySelector('.glass-container');

    fieldset.addEventListener('mousemove', function (e) {
        const rect = fieldset.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gradientX = (x / rect.width) * 100;
        const gradientY = (y / rect.height) * 100;

        fieldset.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgb(231,210,241),transparent 20%`;
    });

    fieldset.addEventListener('mouseleave', function () {
        fieldset.style.background = 'none';
    });
});

function showHiddenContainer() {
    var hiddenContainer = document.getElementById('hiddenContainer');
    if (hiddenContainer) {
        hiddenContainer.style.display = 'block';
    }
}
function closeHiddenContainer() {
    var hiddenContainer = document.getElementById('hiddenContainer');
    if (hiddenContainer) {
        hiddenContainer.style.display = 'none';
    }
}
setInterval(showHiddenContainer, 25000);