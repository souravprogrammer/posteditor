// only left is touch event 
// gotta work on them ASAP 
class Editor extends HTMLElement {
    ismadeChanges =false ;
    selectioncolour = "rgb(65, 169, 201)";
    selectedchild ;
    allboxes = [] ;
    fontSize ;
    prevtouches = {pageX : 0
        ,pageY : 0
    };
    containerTouchRef ;
    listner ;
    backgroundshade ;
    contextMenu ;
    ZindexCounter = 0 ;
    constructor(arg){
       super();

       this.backgroundshade = document.createElement("div");
       this.backgroundshade.setAttribute("style",`
       position: absolute ;
       top: 0;
       left: 0;
       width:100%;
       height:100%;
       background-color: black;
       opacity: 0;

       `);
      this.appendChild(this.backgroundshade);
        // console.log(prevtouches);

        this.fontSize = ` ${arg?.fontSize||"16"}`;
        this.setAttribute("style",`
        position: relative;
        display: block;
        width: ${arg?.width||"500px"};
        height: ${arg?.height||"500px"};
        border: ${arg?.border?"2px solid"+arg?.border:""};
        overflow: hidden;
        background-color: ${arg?.backgroundColor||"#fff"};
        box-sizing: border-box;
        `);
 } 


  attachContextMenu(menu){
      this.contextMenu = menu ;
  }
  setBackgroundShade(shade){

    // console.log(shade);
    this.backgroundshade.style.opacity = shade ;

 }


  addChild(obj,property) {
      this.ismadeChanges = true ;
      let str  = obj.nodeName+"";
      
      const container  = new box({
        fontSize : property?.fontSize? property.fontSize : this.fontSize
    }) ;

    container.style.zIndex = `${this.ZindexCounter++}`;
    container.addRightClickListner((ev)=>{
    this.contextMenu.menu.style.top = `${ev.clientY -15}px` ;
    this.contextMenu.menu.style.left = `${ev.clientX -15}px` ;
    this.contextMenu.perfome(container);
    });

      if(str === "IMG" || str === "DIV"){
        obj.style.width = "100%";
        obj.style.height = "100%";
        if(property?.shapeColor){
            obj.style.backgroundColor = `${property?.shapeColor}`;
        }
        if(property?.shape){
            container.style.contentEditable = "false";
            obj.style.pointerEvents = "none";
            obj.style.borderRadius = `${   property.shape ==="circle"? "50%"  :""} ` ;
        }
    }
   // if(property!=undefined)
  // console.log(property?.fontSize? property.fontSize : this.fontSize);



    // this.allboxes.forEach((e,index)=>{
        
    //     if(container ===  e){

    //     e.selected(true);
    //    }else {
    //        e.selected(false);
    //    }

    // });
   // console.log(obj);
    container.addElement(obj) ;
    this.allboxes.push(container);
    obj.style.pointerEvents = "none";


    obj.contentEditable =property?.shape? "false":"true"; 
    // if(property?.shape){
    // obj.contentEditable = "false";
    // }else{
    // obj.contentEditable = "true";

    // }
    this.appendChild(container);
    container.style.position= "absolute" ;
    container.style.left = "0px" ;
    container.style.top = "0px" ;



    this.allboxes.forEach(e=>{
        // for index

        if(container ===e){
            // container.style.zIndex = "1"
        }else{
            // e.style.zIndex = "0";
        }
            });

    this.allboxes.forEach((e,index)=>{
        
        if(container ===  e){
        e.selected(true);
        // TODO added by me just
        this.selectedchild = e ;
    
        if(this.listner)
        this.listner();


       }else {
           e.style.border = "" ;
           e.selected(false);
       }

    });
    container.addEventListener("touchstart",(ev)=>{

        if(container.isReSzing){
            
         //   console.log("is resizing box :", container.isReSzing);
            
            
            return ;}
            // ev.preventDefault();


       this. prevtouches.pageX  = parseInt(ev.touches[0].pageX );
       this. prevtouches.pageY = parseInt(ev. touches[0].pageY );
      //  console.log("touch start " ,this. prevtouches.pageX,this. prevtouches.pageY);   
      this.containerTouchRef = container ;
      document.querySelector("html").style.overflow = "hidden" ;
    //   document.querySelector("html").style.overflowY = "hidden" ;
        container.addEventListener("touchmove",this.onTouchMove);


    });

    container.addEventListener("touchend",()=>{
      document.querySelector("html").style.overflow = "visible" ;
      container.removeEventListener("touchmove",this.onTouchMove);


    });

    container.addEventListener("click",()=>{
        this.selectedchild = container;
        // this.selectedItemChangeListner();
       this.allboxes.forEach((e,index)=>{
        
        if(container ===  e){

        e.selected(true);
        // this.selectedItemChangeListner();
       if(this.listner)
        this.listner();

       }else {
           e.selected(false);
       }

    });


    });
    container.addEventListener("mousedown",()=>{
            if(container.isReSzing) return ;


            this.allboxes.forEach((e)=>{

                if(container ===e){
                    // container.style.zIndex = "1"
                    container.style.pointerEvents = "all";
                    
                }else{
                    // e.style.zIndex = "0";
                    e.style.pointerEvents = "none";
                  //  console.log("pointer events are none ",e)
                }
            });

            if(this.selectedchild!=null){
                // this.selectedchild.style.zIndex = "0" ;
        }
            this.selectedchild = container ;
            // container.style.zIndex = "1" ;
            container.addEventListener("mousemove",this.onDrag);
          } 
    );
    document.addEventListener("mouseup",()=>{
        
        container.removeEventListener("mousemove",this.onDrag);
        this.allboxes.forEach((e)=>{
            e.style.pointerEvents = "all";
        });
    });
    
 }



 onDrag({movementX ,movementY}){
    let getstyle = window.getComputedStyle(this);
    let left = parseInt( getstyle.left) ;
    let top =  parseInt( getstyle.top) ;

    this.style.left = `${left + movementX}px` ;
    this.style.top = `${top + movementY}px` ;
    }

onTouchMove  = (ev)=>{
  //  console.log(touches);

    if(ev.touches.length !=1) return ;
    //    console.log(targetTouches[0]);
     //   console.log(targetTouches[0].clientX,targetTouches[0].clientY);

        ev.preventDefault();
        let getstyle = window.getComputedStyle(this.containerTouchRef);
        let left = parseInt( getstyle.left) ;
        let top =  parseInt( getstyle.top) ;

        const movementX = parseInt(ev.touches[0].pageX) - parseInt( this.prevtouches.pageX) ;
        const movementY = parseInt(ev. touches[0].pageY) - parseInt( this.prevtouches.pageY) ;
       this.containerTouchRef.style.left = `${left + movementX}px`
       this.containerTouchRef.style.top = `${top + movementY}px`
 

    this.prevtouches.pageX = parseInt(ev. touches[0].pageX);
    this.prevtouches.pageY = parseInt(ev. touches[0].pageY);
    // console.log(this.prevtouches);
    }

getpost(){

    return this ;
 }

 changeFontSize(){
     return this.selectedchild;
 }

 removeSelectedElement(){
    //  if(this.selectedchild===undefined) return ;

     this.allboxes.forEach((e,index)=>{
         
         if(this.selectedchild ===e){
            //  console.log("found remove",this.selectedchild);
             this.removeChild(e) ;
        }

    });
 }

 addBackgroundImage(img){
     this.ismadeChanges = true ;

     this.style.background = `url('${img}')`;
     this.style.backgroundPosition = `center`;
     this.style.backgroundSize = `cover`;
 }
 addBackgroundColour(colour){
  this.ismadeChanges = true ;

     this.style.background = `${colour}` ;
 }

 selectedItemChangeListner(listner){
    //  if(typeof listner === 'function')
    // console.log(typeof listner);
    //   console.log("changed....");
    this.listner = listner ;
 }

}
// -----------------------------------------------------------------------------------------------------------------------------------




//------------------------------------------------------------------------------------------------------------------------------------
class box extends HTMLElement{
    currentResizer ;
    isReSzing = false ;
    fontSize ;
    child ;
    scaleX= 1 ;
    scaleY= 1 ;
    rightClickListner ;
    prevtouches={
        pageX : 0 ,
        pageY : 0
    };
constructor(obj){
        super();
        this.color =`${obj?.color||"aqua"}` ;
        this.fontSize = `${obj?.fontSize||"20"}px` ;
       // console.log("obj=>",this.fontSize);
        this.innerHTML = `
        <div class="resizer br"></div>
        `;

        this.setAttribute('style',`
        display: flex;
        justify-content: center;
        align-items: center;
 
        box-sizing: border-box;

        `);
       let parent =  this ;
        for(let value of this.children){
           if( value.classList.contains("br")){
            value.setAttribute("style",`
            position: absolute;
            width: 15px;
            height: 15px;
            transform: translate(-40%,-40%);
            border-radius: 10px;
            top: 100%;
            left: 100%;
            background-color: ${obj?.color||"aqua"};
            z-index: 2;
            opacity : 0 ;
            `);
            this.resizer = value ;
          // let w ;
         //  let h ;
           value.addEventListener("touchstart",(ev)=>{
               ev.preventDefault();

            
            
            
            this.isReSzing = true ;
           // console.log("touch start");


            this. prevtouches.pageX  = parseInt(ev.touches[0].pageX );
            this. prevtouches.pageY = parseInt(ev. touches[0].pageY );
           // console.log(this.onTouchMove);

           

            value.addEventListener("touchmove",this.onTouchMove);
            value.addEventListener('touchend',()=>{
                this.isReSzing = false ;
                value.removeEventListener("touchmove",this.onTouchMove);
               // console.log("touchend");

            });

           });


            value.addEventListener("mousedown",(e)=>{
                this.isReSzing = true ;
                this.currentResizer = e.target ;
              //  w = this.offsetWidth;
              //  h = this.offsetHeight;
                // parent.style.transform = `scale(5)`;
                let mousemove = function (e){
                    const rect  = window.getComputedStyle(parent);
                    let width =  parseInt( rect.width) ;
                    let height = parseInt( rect.height) ;
                    parent.style.width =  (width + e.movementX) +"px";
                    parent.style.height =  (height + e.movementY) +"px";

                   

                //    console.log(PercentX);
                // parent.style.transform = `scale('${PercentX},${PercentY}')`;


                } ;

                window.addEventListener("mousemove",mousemove);
                window.addEventListener("mouseup",()=>{
                    // if(this.isReSzing){
                    // const PercentX =  (parent.offsetWidth-w)/w  ;
                    // const PercentY =  (parent.offsetHeight-h)/h  ;
                    // //  console.log(PercentX,PercentY);
                    // //  console.log(parent);
                    // this.child.style.transform = `scale(${this.scaleX+PercentX},${ this. scaleY+PercentY})`;
                    // this.scaleX = this. scaleX+PercentX;
                    // this.scaleY = this. scaleY+PercentY;
                    // }
                    // console.log(this.scaleX,this.scaleY);
                    this.isReSzing = false ;
                    window.removeEventListener("mousemove",mousemove);
                });
            });


           }
        }


        this.addEventListener("contextmenu",(ev)=>{
         //   console.log("risht clicked");
            ev.preventDefault();
        //   console.log(ev);
            if(this.rightClickListner!=undefined) {
                this.rightClickListner({clientX : ev.clientX , clientY : ev.clientY});

            }
        });
     }

     onTouchMove = (ev)=>{
         ev.preventDefault();

        if(ev.touches.length!=1) return ;


        const movementX = parseInt(ev.touches[0].pageX) - parseInt( this.prevtouches.pageX) ;
        const movementY = parseInt(ev.touches[0].pageY) - parseInt( this.prevtouches.pageY) ;

      //  console.log("is resizing :: ",this.isReSzing);

      //  console.log( parseInt( window.getComputedStyle(this).left),parseInt( window.getComputedStyle(this).top)  );
       // console.log("touched : ",movementX,movementY);

       this.style.width = `${this.offsetWidth + movementX}px`;
       this.style.height = `${this.offsetHeight + movementY}px`;




      this.prevtouches.pageX = ev.touches[0].pageX ;
      this.prevtouches.pageY = ev.touches[0].pageY ;

     }

addRightClickListner(listner){
    this.rightClickListner = listner ;
}

selected(selected){
         if(selected) {
             this.style.border = `2px solid ${this.color} `;
            this.resizer.style.opacity = "1" ;
            this.isselected = true ;
     }
     else {
         this.style.border = "";
         this.resizer.style.opacity = "0" ;
         this.isselected = false ;

           }
     }
 addElement(element){
    //    if(element.nodeName+"" )
    // this.style.outline = "solid blue 2px";
    element.style.fontSize = this.fontSize ;
    let div = document.createElement("div");
        this.child = element ;
        // element.style.fontSize = `5vw`;
        div.setAttribute("style",`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow : hidden ;
        font-size: ${this.fontSize};
        `);
        // element.style.fontSize = "20px";
        // element.style.color = "#fff";
         div.appendChild(element);
         this.appendChild(element);
         this.isselected = true ;

         if(  !(element.nodeName+"" === "IMG" ||element.nodeName+"" === "DIV")){
         for(let value of this.children){
             if( value.classList.contains("br")){
                 this.removeChild(value);
           //      console.log("found");
                

             }
          }
       }else{
           this.style.width = "50px";
           this.style.height = "50px";
       }
     }

     setFontSize(size){
         this.child.fontSize = `${size}px`;
         this.fontSize = size ;
     }

 }
window.customElements.define("editor-panel",Editor);
window.customElements.define("box-inner",box);
