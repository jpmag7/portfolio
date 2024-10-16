

function interpolateColor(color1, color2, factor) {
    const result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

const startColor = hexToRgb("#0d2451");
const endColor = hexToRgb("#250d51");
const fixedColor = "#050e1f";
const duration = 10000; // 10 seconds for a full cycle

function updateGradient() {
    const time = (Date.now() % duration) / duration;
    const factor = Math.sin(time * Math.PI);
    const interpolatedColor = interpolateColor(startColor, endColor, factor);
    const gradientEnd = rgbToHex(interpolatedColor);
    
    document.getElementById('body').style.background = 
        `linear-gradient(95deg, ${fixedColor} 30%, ${gradientEnd} 120%)`;
    
    requestAnimationFrame(updateGradient);
}

updateGradient();