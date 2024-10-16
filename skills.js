const svg = document.getElementById('skill-canvas');

const left_skills = [
    [.40, .12, "images/azure.png", "Azure"],
    [.43, .28, "images/python.png", "Python"],
    [.36, .41, "images/docker.png", "Docker"],
    [.41, .56, "images/flask.png", "Flask"],
    [.47, .73, "images/react.png", "React"],
    [.37, .81, "images/tensorflow.png", "Tensorflow"]
]

const right_skills = [
    [.53, .11, "images/pytorch.png", "Pytorch"],
    [.57, .23, "images/sql.png", "SQL"],
    [.60, .37, "images/unity.png", "Unity"],
    [.55, .48, "images/c.png", "C"],
    [.64, .61, "images/langchain.png", "Langchain"],
    [.59, .82, "images/html5.png", "HTML 5"]
]

const left_curves = [];
const right_curves = [];
const left_icons = [];
const right_icons = [];

function createSCurveLeft(startX, startY, endX, endY) {
    const mid = (endX - startX) / 2
    return `M${startX},${startY} C${mid},${startY} ${mid},${endY} ${endX},${endY}`;
}

function createSCurveRight(startX, startY, endX, endY) {
    const mid = endX + (startX - endX) / 2
    return `M${startX},${startY} C${mid},${startY} ${mid},${endY} ${endX},${endY}`;
}


function scaleIcon(icon, scaleFactor) {
    const originalWidth = parseFloat(icon.getAttribute('owidth'));
    const originalHeight = parseFloat(icon.getAttribute('oheight'));
    
    // Calculate new dimensions based on scaleFactor
    const newWidth = originalWidth * scaleFactor;
    const newHeight = originalHeight * scaleFactor;
    
    // Set new width and height
    icon.setAttribute('width', `${newWidth}px`);
    icon.setAttribute('height', `${newHeight}px`);

    const currentX = parseFloat(icon.getAttribute('ox'));
    const currentY = parseFloat(icon.getAttribute('oy'));
    
    icon.setAttribute('x', `${currentX - (newWidth - originalWidth) / 2}px`);
    icon.setAttribute('y', `${currentY - (newHeight - originalHeight) / 2}px`);

    icon.setAttribute("cscale", scaleFactor)
}


function remakeLines(){
    while (svg.children.length > 1) {
        svg.removeChild(svg.lastChild);
    }
    
    left_curves.length = 0
    left_icons.length = 0
    for (let i = 0; i < left_skills.length; i++) {
        const skill = left_skills[i]
        const startX = 0
        const startY = window.innerHeight / 2;
        const endX = skill[0] * window.innerWidth//window.innerWidth / 4 + (Math.random() * window.innerWidth / 4)
        const endY = skill[1] * window.innerHeight//(window.innerHeight * 0.1) + Math.random() * window.innerHeight * 0.8;
        
        const curve = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        curve.setAttribute('d', createSCurveLeft(startX, startY, endX, endY));
        curve.classList.add('curve');
        svg.appendChild(curve);
        left_curves.push(curve);

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        icon.setAttribute("href", skill[2])
        icon.setAttribute('x', endX - 21);
        icon.setAttribute('y', endY - 21);
        icon.setAttribute('ox', endX - 21);
        icon.setAttribute('oy', endY - 21);
        icon.setAttribute("width", "42px")
        icon.setAttribute("height", "42px")
        icon.setAttribute("owidth", "42px")
        icon.setAttribute("oheight", "42px")

        const iconLabel = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        iconLabel.textContent = skill[3];
        icon.appendChild(iconLabel);

        scaleIcon(icon, 0)
        
        icon.classList.add('icon');
        svg.appendChild(icon);
        left_icons.push(icon);

        curve.style.strokeDasharray = curve.getTotalLength();
        curve.style.strokeDashoffset = curve.getTotalLength();
    }

    right_curves.length = 0
    right_icons.length = 0
    for (let i = 0; i < right_skills.length; i++) {
        const skill = right_skills[i]
        const startX = window.innerWidth
        const startY = window.innerHeight / 2;
        const endX = skill[0] * window.innerWidth //window.innerWidth / 2 + (Math.random() * window.innerWidth / 4)
        const endY = skill[1] * window.innerHeight //(window.innerHeight * 0.1) + Math.random() * window.innerHeight * 0.8;
        
        const curve = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        curve.setAttribute('d', createSCurveRight(startX, startY, endX, endY));
        curve.classList.add('curve');
        svg.appendChild(curve);
        right_curves.push(curve);

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        icon.setAttribute("href", skill[2])
        icon.setAttribute('x', endX - 21);
        icon.setAttribute('y', endY - 21);
        icon.setAttribute('ox', endX - 21);
        icon.setAttribute('oy', endY - 21);
        icon.setAttribute("width", "42px")
        icon.setAttribute("height", "42px")
        icon.setAttribute("owidth", "42px")
        icon.setAttribute("oheight", "42px")

        const iconLabel = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        iconLabel.textContent = skill[3];
        icon.appendChild(iconLabel);

        scaleIcon(icon, 0)
        
        icon.classList.add('icon');
        svg.appendChild(icon);
        right_icons.push(icon);

        curve.style.strokeDasharray = curve.getTotalLength();
        curve.style.strokeDashoffset = curve.getTotalLength();
    }
}


function updateCurves(scrollPercentage) {
    left_curves.forEach((curve, index) => {
        const icon = left_icons[index];
        const length = curve.getTotalLength();
        const progress = Math.min(scrollPercentage, 1);

        curve.style.strokeDashoffset = length * (1 - progress);

        if (progress > 0) {
            const point = curve.getPointAtLength(length * progress);
            icon.setAttribute('cx', point.x);
            icon.setAttribute('cy', point.y);
            
            if (progress >= 0.99) {
                growIcon(icon);
            }
            else {
                scaleIcon(icon, 0)
            }
        }
    });
    right_curves.forEach((curve, index) => {
        const icon = right_icons[index];
        const length = curve.getTotalLength();
        const progress = Math.min(scrollPercentage, 1);

        curve.style.strokeDashoffset = length * (1 - progress);

        if (progress > 0) {
            const point = curve.getPointAtLength(length * progress);
            icon.setAttribute('cx', point.x);
            icon.setAttribute('cy', point.y);
            
            if (progress >= 0.99) {
                growIcon(icon);
            }
            else {
                scaleIcon(icon, 0)
            }
        }
    });
}

function growIcon(icon) {
    const currentScale = parseFloat(icon.getAttribute('cscale') || 0);
    if (currentScale < 1) {
        scaleIcon(icon, currentScale + 0.2);
        requestAnimationFrame(() => growIcon(icon));
    }
}

function scrollUpdate() {
    const rect = svg.getBoundingClientRect();
    const diff = (3 * window.innerHeight / 4) - rect.top;
    const scrollPercentage = Math.max(0, diff / (window.innerHeight / 2))
    updateCurves(scrollPercentage);
}

window.addEventListener('scroll', () => {
    scrollUpdate()
});

window.addEventListener("resize", () => {
    remakeLines()
})

// Initial update
remakeLines()
scrollUpdate()