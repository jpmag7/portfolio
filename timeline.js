const timeline = document.querySelector('.timeline');
const balls = document.querySelectorAll('.timeline-ball')
const timelineContainer = document.querySelector('.timeline-container')
let scrollTimeout;
function handleScroll() {
    // Clear any existing timer before setting a new one
    clearTimeout(scrollTimeout);

    // Set a small timeout before executing the function
    const divTop = timelineContainer.getBoundingClientRect().top; // Distance from the top of the viewport
    const divHeight = timelineContainer.offsetHeight; // Height of the div
    const windowHeight = window.innerHeight; // Height of the viewport

    timeline.style.height = `${Math.min(windowHeight - divTop - (windowHeight * 0.2), divHeight*0.95)}px`;
    
    balls.forEach(async ball => {
        const diff = ball.getBoundingClientRect().top - (2*window.innerHeight / 3)
        if (diff < 0){
            // await sleep(100)
            ball.style.visibility = "visible"
            // ball.style.width = '25px';
        }
        else {
            // ball.style.width = `${diff * 0.001}`;
            // await sleep(100)
            ball.style.visibility = "hidden"
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);

handleScroll();