// prepare canvas
const stageWidth = 600;
const stageHeight = 800;

const stage = document.getElementById('stage');
const cnvs = document.getElementById('myCanvas');
const ctx = cnvs.getContext('2d');
const i = document.getElementById('mainImg');


stage.style.width = stageWidth;
stage.style.height = stageHeight;
cnvs.width = stageWidth;
cnvs.height = stageHeight;
cnvs.style.zIndex = 10;

let cursorWidth = 100;

//prepare overlay image
const img = new Image();
img.src = 'sprinkles.jpeg';
let pattern;

img.onload = function() {
    pattern =  ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, cnvs.width, cnvs.height);
};

// draw cursor on mouse move event
cnvs.addEventListener('mousemove', (e) => {

    ctx.globalCompositeOperation = globalCompVal;

    var rect = cnvs.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    ctx.beginPath();

    // determines which cursor shape to draw
    if (cursorShape === 'circle') {
        let radius = cursorWidth;
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.fill();
        return;
    } 

    // use cursorWidth (from form input, but default is set to 100) to determine random line size
    ctx.lineWidth = cursorWidth*1.25; // multiple by 1.25 to create rectangular shape
    ctx.moveTo(x + Math.random() * cursorWidth - cursorWidth/2, y + Math.random() * cursorWidth - cursorWidth/2);
    ctx.lineTo(x + Math.random() * cursorWidth - cursorWidth/2, y + Math.random() * cursorWidth - cursorWidth/2);
    ctx.stroke();
})



// set up buttons
const resetSprinklesBtn = document.getElementById('resetSprinklesBtn');
const resetColorBtn = document.getElementById('resetColorBtn');

resetSprinklesBtn.addEventListener("click", () => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, cnvs.width, cnvs.height);
})

resetColorBtn.addEventListener("click", () => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, cnvs.width, cnvs.height);

})

// binding form selections 
const colorPicker = document.getElementById('colorPicker');
const globalComp = document.getElementById('globalComp');
const cursorShapes = [document.getElementById('circleCursor'), document.getElementById('rectCursor')];
const cursorSize = document.getElementById('cursorSize');

let fillColor = colorPicker.value;
let globalCompVal = globalComp.value;
let cursorShape;

colorPicker.addEventListener('input', () => fillColor = colorPicker.value);
globalComp.addEventListener('input', () => globalCompVal = globalComp.value);
cursorSize.addEventListener('input', () => cursorWidth = cursorSize.value)
cursorShapes.forEach(el => {
    el.addEventListener('input', () => {
        if (el.checked) cursorShape = el.value;
    })
})