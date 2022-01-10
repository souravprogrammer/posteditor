
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// 1,2,3,4
let selectedTab = 3 ;

const hideButton = document.querySelector(".left-panel-drawer-button");
const drawer = document.querySelector(".left-panel-drawer");
const navButtons = document.querySelectorAll(".left-panel-nav-box");
const RPEP = document.querySelector(".right-panel-editor-panel");
const editorpanal = document.querySelector("#editor") ;
const searchbar = document.querySelector("#search");
const leftpanel = document.querySelector(".left-panel");

const addButton = document.querySelector(".add-button");

const uploadSection  =document.querySelector(".upload-button");
const textMore = {

   more :  document.querySelector(".more") ,
   left : document.querySelector(".left") ,
   register(){
     this.more.addEventListener("click",this.moreClick) ;
    //  this.more.addEventListener("click",) ;
   } ,
   unRegister(){
    this.more.removeEventListener("click",this.moreClick);
   } ,
    moreClick : ()=>{
    //  console.log("clicked more");
    //  console.log(textMore.left);
     textMore.left.classList.toggle("hide-show");
     textMore.more.classList.toggle("selected-more");

   }
}
textMore.register(); 


let pageNo = 1 ;

const menu = {
  menu : document.querySelector('#menu'),
  replaceBackground : document.querySelector("#replace-background"),
  delete : document.querySelector("#delete-item-menu"),
  perfome(obj){

   const children =   obj.getElementsByTagName("*") ;
   const deleteListner  =  ()=>{
    //  console.log("deleteing.....", obj);
     obj.remove();
     this.menu.style.opacity = "0" ;
     this.menu.style.pointerEvents = "none" ;
   } ;
   const replaceListner  = ()=>{
    //  console.log("replaceing.....", obj);

    //  console.log(obj);
    //  console.log(  obj.getElementsByTagName("img")[0]);


     editorpanal.addBackgroundImage(obj.getElementsByTagName("img")[0].src);
     this.menu.style.opacity = "0" ;
     this.menu.style.pointerEvents = "none" ;

   };

   for(let i = 0 ; i< children.length;i++){

      if(children[i].classList.contains("resizer")){  continue ;} 
      else if(children[i].nodeName ==="IMG"){
        this.delete.style.color ="#000";
        this.replaceBackground.style.color ="#000";
        this.delete.addEventListener("click",deleteListner);
        this.replaceBackground.addEventListener("click",replaceListner);
     }else if(children[i].nodeName ==="H1" || children[i].nodeName ==="H2"|| children[i].nodeName ==="P"){
        this.delete.style.color ="#000";
        this.delete.addEventListener("click",deleteListner);
      }

    }
    // console.log("perofme called");
      this.menu.style.opacity = "1";
      this.menu.style.pointerEvents = "all";

   this.menu.addEventListener("mouseleave",()=>{
         this.delete.removeEventListener("click",deleteListner);
         this.replaceBackground.removeEventListener("click",replaceListner);
        //  console.log("mouse leaved");
         this.delete.style.color ="#939394";
         this.replaceBackground.style.color ="#939394";

         this.menu.style.opacity = "0" ;
         this.menu.style.pointerEvents = "none" ;
    
    });


  

   }

}
editorpanal.attachContextMenu(menu);

// console.log(menu);




function debounce(func, wait, immediate) {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;
  
    // Calling debounce returns a new anonymous function
    return function() {
      // reference the context and args for the setTimeout function
      var context = this,
        args = arguments;
  
      // Should the function be called now? If immediate is true
      //   and not already in a timeout then the answer is: Yes
      var callNow = immediate && !timeout;
  
      // This is the basic debounce behaviour where you can call this 
      //   function several times, but it will only execute once 
      //   [before or after imposing a delay]. 
      //   Each time the returned function is called, the timer starts over.
      clearTimeout(timeout);
  
      // Set the new timeout
      timeout = setTimeout(function() {
  
        // Inside the timeout function, clear the timeout variable
        // which will let the next execution run when in 'immediate' mode
        timeout = null;
  
        // Check if the function already ran with the immediate flag
        if (!immediate) {
          // Call the original function with apply
          // apply lets you define the 'this' object as well as the arguments 
          //    (both captured before setTimeout)
          func.apply(context, args);
        }
      }, wait);
      // Immediate mode and no wait timer? Execute the function...
      if (callNow) func.apply(context, args);
    }
  }

const onApiHit = ()=>{
    // console.log(searchbar.value);

    switch(selectedTab){

      case 1 : 
      console.log("element")
       break;
      case 2 : 
      console.log("text")
        break ; 
      case 3 : 
      console.log("upload")
         break;
      case 4 : 
      getBackground(searchbar.value,pageNo);
         break ;

    }


}
const deOnHit = debounce(onApiHit,800);

// console.log(searchbar);
searchbar.addEventListener("input",deOnHit);

let text = [] ;
let background = [] ;
let element = [] ;
let upload = [] ;
let nav = { 
    element : document.querySelector("#element"), 
    text : document.querySelector("#text"),
    background :document.querySelector('#background'),
    result : document.querySelector("#result"),
    upload : document.querySelector("#upload")
};




for(let i = 0 ;i<3;i++){
   const e =  document.createElement("h1");
    e.innerText = `hello world`;
    e.classList.add("white");
    e.classList.add("text-padding");
    text.push(e);
}
text[0].classList.add("text-bold");
text[0].classList.add(".text-large");
text[1].classList.add("text-medium");
text[2].classList.add("text-small");

text.forEach((e)=>{
    e.addEventListener("click",()=>{
     const temp = e.cloneNode(true) ;
     temp.classList.remove("text-padding");
     temp.classList.remove("white");
     temp.classList.remove("text-medium");
     temp.classList.remove("text-small");

     editorpanal.addChild(temp,{fontSize : parseInt(window.getComputedStyle(e).fontSize)});
    });
}) ;

nav.text.addEventListener("click",()=>{
    selectedTab = 2 ;
    uploadSection.style.display="none";

    nav.text.classList.add("selected");
    nav.background.classList.remove("selected");
    nav.upload.classList.remove("selected");
    nav.element.classList.remove("selected");
    

    nav.result.innerHTML='';
    nav.result.classList.remove("result-row");
    nav.result.classList.add("result-column");
    text.forEach((e)=>{

        nav.result.appendChild(e);
    }) ;

});
nav.background.addEventListener("click",()=>{
  selectedTab = 4 ;
  uploadSection.style.display="none";

  nav.background.classList.add("selected");
  nav.text.classList.remove("selected");
  nav.upload.classList.remove("selected");
  nav.element.classList.remove("selected");

    nav.result.innerHTML='';
    nav.result.classList.remove("result-column");
    nav.result.classList.add("result-row");

  //  let img = document.createElement('img');
  //   img.src = "./images/img_1.jpg";

  //   nav.result.appendChild(img);
  //   nav.result.appendChild(img.cloneNode(true));
  //   nav.result.appendChild(img.cloneNode(true));
    background.forEach(element=>{
      nav.result.appendChild(element);
    });

});




// console.log(hideButton);
hideButton.addEventListener("click",()=>{


  if(document.querySelector("body").offsetWidth>=735){
    drawer.classList.remove("show");
    drawer.classList.add("hide");
  }else{

    leftpanel.classList.remove("show-vertically");
    leftpanel.classList.add("hide-vertically");

  }
    // console.log("click");
});
navButtons.forEach((e)=>{
    e.addEventListener("click",()=>{
      if(document.querySelector("body").offsetWidth>=735){
        drawer.classList.remove("hide");
        drawer.classList.add("show");
      }
        
    });
});


  const circle = document.createElement("div");
  const square = document.createElement("div");

  circle.classList.add("circle");
  square.classList.add("box");
  element.push(circle);
  element.push(square);



element.forEach(e=>{

  e.addEventListener("click",()=>{
    let shape ;
    let temp = e.cloneNode(true);
    if(temp.classList.contains("circle")){
      temp.classList.remove("circle");
      shape = "circle"
    }else if(temp.classList.contains("box")){
      temp.classList.remove("box");
       shape= "box";
    }

    editorpanal.addChild(temp,{shapeColor:"#000" ,shape : `${shape}`});
  });
});


nav.element.addEventListener("click",()=>{
  selectedTab  = 1 ;
  uploadSection.style.display="none";


  nav.text.classList.remove("selected");
  nav.background.classList.remove("selected");
  nav.upload.classList.remove("selected");
  nav.element.classList.add("selected");
  nav.result.innerHTML='';
  nav.result.classList.remove("result-column");
  nav.result.classList.add("result-row");
  

  element.forEach((e)=>{
    nav.result.appendChild(e);
  })

});

uploadButton = document.querySelector("#upload-file");



uploadButton.addEventListener("input",()=>{
  const reader = new FileReader() ;
  reader.addEventListener("load",()=>{
    const img = document.createElement("img");
    img.src = reader.result;
    nav.result.appendChild(img);
    img.addEventListener("click",()=>{
      editorpanal.addChild(img.cloneNode(true));
      // console.log("upload img");
    });
    upload.push(img);
  });
  reader.readAsDataURL(uploadButton.files[0]);
});

nav.upload.addEventListener("click",()=>{
  selectedTab = 3 ;
  uploadSection.style.display="block";

  nav.background.classList.remove("selected");
  nav.text.classList.remove("selected");
  nav.upload.classList.add("selected");
  nav.element.classList.remove("selected");

  
  //  console.log("uploaded");
   nav.result.innerHTML = ' ';

   nav.result.classList.remove("result-column");
   nav.result.classList.add("result-row");
   upload.forEach((file)=>{
      nav.result.appendChild(file);
   });




});


//-------------------Resize Observer ----------------------------------------//

let reSizeObserver = new ResizeObserver((e)=>{

  // for width less than 735 px of a body 
  if(e[0].target.offsetWidth<=735){
    // console.log("resizing.........",e[0].target.offsetWidth);

    drawer.classList.remove("show");
    drawer.classList.remove("hide");
    

  }else {
    leftpanel.classList.remove("show-vertically");
    leftpanel.classList.remove("hide-vertically");
  }
  if(e[0].target.offsetWidth<=400){
    textMore.left.classList.add("hide-show");
    textMore.register(); 
  }else{
    textMore.left.classList.remove("hide-show");
    textMore.more.classList.remove("selected-more");
    textMore.unRegister(); 
  }
});

reSizeObserver.observe(document.querySelector("body"));


addButton.addEventListener("click",()=>{
  // console.log("clicked add");
  leftpanel.classList.remove('hide-vertically');
  leftpanel.classList.add('show-vertically');
});


// cosnt 
leftpanel.addEventListener("click",(ev)=>{

// console.log(ev.clientY);

  if(ev.clientY<=drawer.offsetTop){
    leftpanel.classList.remove("show-vertically");
    leftpanel.classList.add("hide-vertically");


  }
  // console.log(drawer.offsetTop);
  
});


fetch("./images/png.json").then(data=>{ return data.json()}).then(data=>{

  // console.log(data.sticker);
  data.sticker.forEach((e)=>{
  let t =   document.createElement("img");
  t.src = e.src ;
  // console.log(t.src);
    element.push(t);
 //   element.push(t.cloneNode(true));
   // element.push(t.cloneNode(true));
  });

  element.forEach((e,index)=>{

    if(index>1){
      e.addEventListener("click",()=>{
        editorpanal.addChild(e.cloneNode(true));
      });
    }
  });
});




