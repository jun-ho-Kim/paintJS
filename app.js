const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const eraser = document.getElementById("jsEraser");
const saveBtn = document.getElementById("jsSave");
const allClear = document.getElementById("jsAllClear");


canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0,0, canvas.width, canvas.height);
const INITIAL_COLOR = "#2c2c2c";

ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}
function startPaining() {
    painting = true;
}

function onMouseMove(event) {
    x = event.offsetX;
    y = event.offsetY;
    if(!painting) {
        // beginpath : 가상의 경로(path(을 생성
        ctx.beginPath();
        // moveTo : 마우스가 이동하면 ctx도 이동한다.
        ctx.moveTo(x, y);
        // 마우스를 클릭하면(mousedown) lineTo()로 넘어간다.
        // painting이 false -> true로 변경되어서~
    } else if(painting && !filling) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function hadleColorClick(event) {
    const color = event.target.style.backgroundColor;
    // const color = getComputedStyle(event.target).backgroundColor;
    // ㄴ getComputedStlye 을 이용해서 사용하는 방법.
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}   

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
    // console.log("event : ", event);
    // console.log("event.target", event.target.value);
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerHTML = "Fill";
        // ctx.globalCompositeOperation='source-over';
    } else {
        filling = true;
        mode.innerHTML = "Paint";
            // ctx.globalCompositeOperation='destination-over';
        
        // ctx.globalCompositeOperation='destination-out';
        // ctx.fillStyle = ctx.strokeStyle;
        // ctx.fillRect(0,0, canvas.width, canvas.height);
    }
}

function handleCanvasClick() {
    if(filling){
        
        ctx.fillRect(0,0, canvas.width, canvas.height);
        
        // ctx.globalCompositeOperation='destination-over';
    }
    // ctx.globalCompositeOperation='source-over';
}

function handleClearClick() {
    ctx.globalCompositeOperation='destination-out';
    ctx.strokeStyle = "white";
    ctx.stroke();
    
}

function handleCM(event) {
    event.preventDefault();
}
function handleSaveClick() {
    const image = canvas.toDataURL('image/jepg');
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[🎨]";
    link.click();
    console.log(image);
}

function handleAllClearClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

console.log(canvas.style);
console.log(colors);
console.log(Array.from(colors));
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPaining);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    // canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", hadleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(eraser) {
    eraser.addEventListener("click", handleClearClick)
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
if(allClear) {
    allClear.addEventListener("click", handleAllClearClick)
}