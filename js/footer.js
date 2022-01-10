const indicator = document.querySelector("#zoomid");
const editor = document.querySelector(".right-panel-editor-panel-editor") ; 
const zoom  = document.querySelector("#zoom");
console.log(editor);
const backgroundShader = {
    indicator : document.querySelector("#background-shade-indicator") ,
    zoom : document.querySelector("#background-shade"),
    this : document.querySelector(".background-gradiant-box"),
    button : document.querySelector(".background-gradiant-svg")

}


zoom.addEventListener("input",()=>{
  //  console.log(indicator);
  console.log("scalling......");
   indicator.innerText = parseInt((zoom.value/500) *100) ; 
   editor.style.transform =  `scale(${(zoom.value/500)})`;
   // console.log("clicked...");

});

// console.log(backgroundShader)
let isshowingshader = false ;
backgroundShader.zoom.addEventListener("input",()=>{
    backgroundShader.indicator.innerText = backgroundShader.zoom.value ;
    editorpanal.setBackgroundShade((parseFloat(backgroundShader.zoom.value)/100));
});

backgroundShader.button.addEventListener("click",()=>{
    console.log("click");
    backgroundShader.this.style.opacity = "1";
    backgroundShader.this.style.pointerEvents = "all";
    isshowingshader = false ;
});

window.addEventListener('click', function(e){   
    const bo  = this.document.querySelector("body");
    // const bo  = this.document.querySelector(".background-gradiant");
     if (bo.contains(backgroundShader.this)){
       // Clicked in box
       console.log("contained");
    //    e.preventDefault();
      if(!isshowingshader){ isshowingshader =true  ;
      return ;
   }

  backgroundShader.this.style.opacity = "0";
  backgroundShader.this.style.pointerEvents = "none";

   isshowingshader = false ;
   // console.log(true);
   } 
   });


//    const emojiCodes = [
//     10084, // Heart emoji
//     128077, // Thumb emoji
//     128525, // Loving face emoji
//     128514, // Laughing with water drop from eyes
//     128558, // OH! face emoji
// ];


// emojiCodes.forEach((code)=>{

//     console.log(String.fromCodePoint(code));
// });
// for(let i =128077 ;i<128077+60;i++){
//     console.log(String.fromCodePoint(i));

// }