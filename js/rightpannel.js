//  const input = document.querySelector(".indicator input");
// window.getComputedStyle(editor.selectedchild)

let colorProperty  = {

  solidColorPiekr : document.querySelector("#shape-color-piker"),
  backgroundColorPiker :  document.querySelector("#background-color-piker")


}
let textProperty = {
  fontResizer : {
    input : document.querySelector(".indicator input"),
    add : document.querySelector(".add"),
    subtract : document.querySelector(".subtract"),
    color : "",
    colorPicker : document.querySelector("#textcolor"),
    fontValue : 0,
    setDepender(editor){
      
      
        //  this.fontValue = parseInt(window.getComputedStyle(editor.selectedchild).fontSize);
        //  this.color = rgba2hex(`${window.getComputedStyle(editor.selectedchild).getPropertyValue("color")}`);
        //  this.colorPicker.value = "#"+this.color.slice(0,6);
        

        this.colorPicker.addEventListener("input",()=>{
         //  console.log("change");
           editor.selectedchild.child.style.color = this.colorPicker.value;

        });
        this.input.addEventListener("input",()=>{
          try{

            editor.selectedchild.child.style.fontSize = `${this.input.value}px`;
          }catch(e){

          }

        });



          this.input.value = this.fontValue ;
          
          editor.selectedItemChangeListner(()=>{
           // console.log("called listnner");
            transpranceyBoxinput.value =  window.getComputedStyle(editor.selectedchild.child).getPropertyValue("opacity")*100 ;

            this.input.value = parseInt(window.getComputedStyle(editor.selectedchild.child).fontSize);
            // console.log("---->",editor.selectedchild.child)
            this.fontValue = this.input.value;
            this.colorPicker.value ="#"+rgba2hex(`${window.getComputedStyle(editor.selectedchild).getPropertyValue("color")}`).slice(0,6);


          //  console.log("#" + rgba2hex( editorpanal.selectedchild.child.style.backgroundColor).slice(0,6));
            colorProperty.solidColorPiekr.value ="#" + rgba2hex( editorpanal.selectedchild.child.style.backgroundColor).slice(0,6) ; 


          });

           this.add.addEventListener("click",()=>{      
              this.fontValue++;
              editor.selectedchild.child.style.fontSize = `${this.fontValue}px`;
              this.input.value = this.fontValue ;

        });
        this.subtract.addEventListener("click",()=>{

           this.fontValue-- ;
           editor.selectedchild.child.style.fontSize = `${this.fontValue}px`;
           this.input.value = this.fontValue ;

        });
    }
} ,
 deleteItem : document.querySelector("#delete-item"),
 transprancey : document.querySelector(".transprancey")
};

let transpranceyBox = document.querySelector(".transpranceyBox");
let transpranceyBoxinput = document.querySelector(".transpranceyBox input");




let isshowing = false ;
textProperty.transprancey.addEventListener("click",()=>{
  // textProperty.transprancey.appendChild(transpranceyBox);
  transpranceyBox.style.opacity="1";
  transpranceyBox.style.pointerEvents="all";
  // transpranceyBoxinput.value = 
  isshowing= false ;
});
window.addEventListener('click', function(e){   
 const bo  = this.document.querySelector("body");
  if (bo.contains(transpranceyBox)){
    // Clicked in box
   if(!isshowing){ isshowing =true  ;
   return ;
}
transpranceyBox.style.opacity="0";
transpranceyBox.style.pointerEvents="none";
isshowing = false ;
// console.log(true);
   } 

});




 rgba2hex = (orig)=> {
   var a, isPercent,
     rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
     alpha = (rgb && rgb[4] || "").trim(),
     hex = rgb ?
     (rgb[1] | 1 << 8).toString(16).slice(1) +
     (rgb[2] | 1 << 8).toString(16).slice(1) +
     (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
 
   if (alpha !== "") {
     a = alpha;
   } else {
     a = 01;
   }
   // multiply before convert to HEX
   a = ((a * 255) | 1 << 8).toString(16).slice(1)
   hex = hex + a;
 
   return hex;
 }





textProperty.fontResizer.setDepender(editorpanal);

 textProperty.deleteItem.addEventListener("click",()=>{
  editorpanal.removeSelectedElement();
});

// console.log(transpranceyBoxinput);
transpranceyBoxinput.addEventListener("input",()=>{
  console.log(transpranceyBoxinput.value/100);
  editorpanal.selectedchild.child.style.opacity = transpranceyBoxinput.value/100;
});


colorProperty.backgroundColorPiker.addEventListener("input",()=>{
  // console.log(colorProperty.backgroundColorPiker.value);
  // console.log( editorpanal.backgroundshade.style.backgroundColor);
   editorpanal.backgroundshade.style.backgroundColor = colorProperty.backgroundColorPiker.value ;


});
colorProperty.solidColorPiekr.addEventListener("input",()=>{
  // console.log(colorProperty.backgroundColorPiker.value);
  // console.log( editorpanal.backgroundshade.style.backgroundColor);
   editorpanal.selectedchild.child.style.backgroundColor = colorProperty.solidColorPiekr.value ;


});

//-------------------------adding ovobserver------------------- 
let editorResizer = new ResizeObserver((e)=>{
  // console.log(e[0].target.offsetWidth);
  let edit = {
    editorWrapper : document.querySelector(".right-panel-editor-panel-editor"),
    editorpanel : document.querySelector("#editor"),
    footerZoom : document.querySelector("#zoom-sheet"),
    setDimensions(dimension){
      this.editorWrapper.style.width = `${dimension}px`;
      this.editorWrapper.style.height = `${dimension}px`;
      this.editorpanel.style.width = `${dimension}px`;
      this.editorpanel.style.height = `${dimension}px`;


    },
    autoResenter(){
      this.editorWrapper.style.margin ="auto";
    },
    disableZoomer(flag){
      if(flag){
        this.footerZoom.style.opacity = 0 ;
        this.footerZoom.style.pointerEvents = "none";
      }else{
        this.footerZoom.style.opacity = 1 ;
        this.footerZoom.style.pointerEvents = "all";
      }
    },
    scalling(){
      this.editorWrapper.style.transform = "scale(1)";
    }
  };
edit.autoResenter();

if(e[0].target.offsetWidth>=900){
 edit.setDimensions(500)
 edit.disableZoomer(false);
//  edit.scalling();



}else if(e[0].target.offsetWidth<=900 && e[0].target.offsetWidth>=821){

  edit.setDimensions(400)
 edit.disableZoomer(false);
  //edit.scalling();


}else if(e[0].target.offsetWidth<=820 && e[0].target.offsetWidth>=736){

 edit.setDimensions(300);
 edit.disableZoomer(false);
  //edit.scalling();


}else if(e[0].target.offsetWidth<=735  && e[0].target.offsetWidth>=421){
  //  console.log(edit);

// (500/735)*100 = 68
    // let percent = (68/100)*735 ; 
    // let toatal =  735 ;
    edit.setDimensions((76/100)*e[0].target.offsetWidth);
   edit.disableZoomer(true);
    edit.scalling();


} else  if(e[0].target.offsetWidth<=420){

  edit.setDimensions((93.5/100)*e[0].target.offsetWidth);
 edit.disableZoomer(true);
  edit.scalling();


}



});
editorResizer.observe(document.querySelector("body"));