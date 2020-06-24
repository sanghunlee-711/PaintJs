const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
//canvas는 내부 pixel을 다룰수 있는 자주 사용되는 요소임

canvas.width = 700;
canvas.height = 700; // css로 만들 canvas가 아니라 pixelmodifier가 될 canvas에 실제로 height와 width 를 줘야한다.

ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;

let painting =false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
            console.log("creating path in",x , y);
        ctx.beginPath();
        ctx.moveTo(x, y); //마우스를 클릭안해도 path는 계속 생성되고 있지만 클릭과 동시에 else로 넘어가서 line to를 실행시킴(이전 path - > else path까지 실행)
    }
    else{
        console.log("creating line in",x , y);
        ctx.lineTo(x, y);
        ctx.stroke()
    }
}

function onmouseDown(event){
    stopPainting();
}



//Event 내에 보면 client x,y와 offset x,y가 존재하는데 client x,y는 화면전체의 크기 offset x,y는 내가 selecting한 크기(캔버스크기)가 되므로
//event내에서 offset x,y를 가져와야한다.
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); // Mousemoving을 통해 localstorage에 MouseEvent 명목으로 좌표값이 날아가게됨.
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}