let images=[
"https://picsum.photos/900?random=1",
"https://picsum.photos/900?random=2",
"https://picsum.photos/900?random=3",
"https://picsum.photos/900?random=4",
"https://picsum.photos/900?random=5",
"https://picsum.photos/900?random=6",
"https://picsum.photos/900?random=7",
"https://picsum.photos/900?random=8",
"https://picsum.photos/900?random=9"
];

let currentIndex=0;

function openLightbox(index){
currentIndex=index;
document.getElementById("lightbox").style.display="flex";
showImage();
}

function closeLightbox(){
document.getElementById("lightbox").style.display="none";
}

function changeSlide(step){

currentIndex+=step;

if(currentIndex>=images.length){
currentIndex=0;
}

if(currentIndex<0){
currentIndex=images.length-1;
}

showImage();
}

function showImage(){
document.getElementById("lightbox-img").src=images[currentIndex];
document.getElementById("caption").innerText="Photo "+(currentIndex+1)+" of 9";
}
const cursorLight = document.querySelector(".cursor-light");

document.addEventListener("mousemove", function(e){

cursorLight.style.left = e.clientX + "px";
cursorLight.style.top = e.clientY + "px";

});