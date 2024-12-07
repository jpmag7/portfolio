function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function showCodeElements() {
    const lines = Array.from(document.getElementById("window-code").children);
    const all_elems = [];

    // Collect all the elements into the all_elems array and make them visible
    for (const line of lines) {
        const elems = Array.from(line.children);
        for (const elem of elems) {
            elem.style.visibility = "visible"; // Make each element visible
            if (elem.hasAttribute("elem")) {
                const randomAspect = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
                elem.style.aspectRatio = `${randomAspect}/1`;
            }
            if (!elem.hasAttribute("space") && !elem.hasAttribute("tab")) {
                all_elems.push(elem);
                const low = 10;
                const high = 80;
                const randomDelay = Math.floor(Math.random() * (high - low + 1)) + low;
                await sleep(randomDelay); // Random delay between elements
            }
        }
    }

    let currentPos = all_elems.length - 1; // Start from the last visible element
    const min_pos = 12

    while (true) {
        const randomPos = Math.floor(Math.random() * (all_elems.length - min_pos)) + min_pos; // Pick a random position
        let low = 50;
        let high = 150;

        // If random position is forward (greater than currentPos)
        if (randomPos > currentPos) {
            for (let i = currentPos; i <= randomPos; i++) {
                all_elems[i].style.visibility = "visible"; // Make elements visible
                if (all_elems[i].hasAttribute("elem")) {
                    const randomAspect = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
                    all_elems[i].style.aspectRatio = `${randomAspect}/1`;
                }
                const randomDelay = Math.floor(Math.random() * (high - low + 1)) + low;
                await sleep(randomDelay);
            }
        }
        // If random position is backward (less than currentPos)
        else if (randomPos < currentPos) {
            for (let i = currentPos; i >= randomPos; i--) {
                all_elems[i].style.visibility = "hidden"; // Make elements hidden
                const randomDelay = Math.floor(Math.random() * (high - low + 1)) + low;
                await sleep(randomDelay);
            }
        }

        // Update current position
        currentPos = randomPos;

        low = 1000;
        high = 1500;
        const randomDelay = Math.floor(Math.random() * (high - low + 1)) + low;
        await sleep(randomDelay);
    }
}

async function writeName(name) {
    const elem = document.getElementById("myname")

    for (let i = 0; i < name.length; i++) {
        const low = 50
        const high = 150
        const randomDelay = Math.floor(Math.random() * (high - low + 1)) + low;
        elem.innerText = "{" + name.substring(0, i+1) + "|}"
        await sleep(randomDelay)
    }

    for (let i = 0; i < 4; i++) {
        elem.innerText = "{" + name + " }"
        await sleep(400)
        elem.innerText = "{" + name + "|}"
        await sleep(500)
    }
    elem.innerText = "{" + name + "}"
}

function scrollToProjects() {
    const targetDiv = document.getElementById('section2-projects');
    targetDiv.scrollIntoView({ behavior: 'smooth' });
}

const scrollUpElements = document.querySelectorAll('.scroll-up');
const scrollDownElements = document.querySelectorAll('.scroll-down');
const scrollSizeElements = document.querySelectorAll('.scroll-size');
const scrollTransparentElements = document.querySelectorAll('.scroll-transparent');
const scrollBlurElements = document.querySelectorAll('.scroll-blur');
function scrollEffects() {
    scrollBlurElements.forEach(scrollElement => {
        const diff = Math.max(15 * ((window.innerHeight / 2) - scrollElement.getBoundingClientRect().bottom) / (window.innerHeight / 2), 0)
        scrollElement.style.filter = `blur(${diff}px)`;
    });
    scrollUpElements.forEach(scrollElement => {
        scrollElement.style.transition = "transform 0s linear"
        scrollElement.style.transform = `translateY(0%)`;
        const diff = (window.innerHeight / 2) - scrollElement.getBoundingClientRect().bottom
        const moveAmount = diff * scrollElement.scrollHeight * 0.0002
        scrollElement.style.transform = `translateY(-${moveAmount}%)`;
    });
    scrollDownElements.forEach(scrollElement => {
        scrollElement.style.transform = `translateY(0%)`;
        const diff = scrollElement.getBoundingClientRect().top - (window.innerHeight / 2)
        const moveAmount = diff * scrollElement.scrollHeight * 0.0002
        scrollElement.style.transform = `translateY(${moveAmount}%)`;
    });
    scrollTransparentElements.forEach(scrollElement => {
        const diff = scrollElement.getBoundingClientRect().top - (window.innerHeight / 2)
        let transparencyAmount = Math.max(1 - diff / (window.innerHeight / 2) + 0.2, 0);
        if (diff < 0) transparencyAmount = 1
        scrollElement.style.opacity = transparencyAmount;
    });
    scrollSizeElements.forEach(scrollElement => {
        scrollElement.style.transform = `scale(1)`;
        // Set transform-origin for the origin of the scale
        // scrollElement.style.transformOrigin = 'top left';
        const rect = scrollElement.getBoundingClientRect();
        const diff = rect.top - (window.innerHeight / 2);
        let scaleAmount = Math.max(Math.min(0 + (1 - diff / (window.innerHeight / 2)), 1), 0);
        if (diff < 0) scaleAmount = 1;
        const translateX = (rect.width * (1 - scaleAmount)) / 2;
        const translateY = (rect.height * (1 - scaleAmount)) / 2;
        scrollElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
        scrollElement.style.transform = `scale(${scaleAmount})`;
    });
}


const projectsButton = document.querySelector('#section1-projects-button');
projectsButton.addEventListener('click', function() {scrollToProjects()});

const projectsNavButton = document.querySelector('#navbar-projects-btn');
projectsNavButton.addEventListener('click', function() {scrollToProjects()});

const skillsNavButton = document.querySelector("#navbar-skills-btn");
skillsNavButton.addEventListener('click', function() {
    document.getElementById('section3-skills').scrollIntoView({ behavior: 'smooth' })
});

const contactsNavButton = document.querySelector("#navbar-contacts-btn");
contactsNavButton.addEventListener('click', function() {
    document.getElementById('section5-contacts').scrollIntoView({ behavior: 'smooth' })
});

const redirectLinkedin = document.querySelectorAll('.linkedin-redirect');
redirectLinkedin.forEach(element => {
    element.addEventListener('click', () => {
        window.location.href = "https://www.linkedin.com/in/jose-pedro-magalhaes-88837a256/";
    });
});

const redirectGithub = document.querySelectorAll('.github-redirect');
redirectGithub.forEach(element => {
    element.addEventListener('click', () => {
        window.location.href = "https://github.com/jpmag7/";
    });
});

setTimeout(() => {
    window.addEventListener('scroll', scrollEffects);
    scrollEffects(); // Run it once after the delay
}, 1000);

showCodeElements();
writeName("Pedro Magalhães")
setTimeout(() => {
    document.querySelector('#section1-image-window').classList.add('active');
}, 50);