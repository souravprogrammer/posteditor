const download = document.querySelector('#download');

window.onbeforeunload = function() {
  //if we return nothing here (just calling return;) then there will be no pop-up question at all
  if( editorpanal.ismadeChanges ){
   return "Do you really want to leave our brilliant application?";}else {
     return ;
   }
};


download.addEventListener("click",()=>{

console.log(editorpanal);
// this line giving us a null pointer exception to take care of it sourav
try{
    editorpanal.selectedchild.selected(false);
    console.log("exception nhi ayi");
}catch(e){
  //  console.log("exception aha gyi bc");
}

    const pannelSide = document.querySelector('.right-panel-editor-panel');
     pannelSide.style.display = "block";
    document.querySelector(".right-panel-editor-panel-editor").style.marginLeft="0px";
    document.querySelector(".right-panel-editor-panel-editor").style.transform = "scale(1)";
    
     domtoimage.toJpeg(document.querySelector(".right-panel-editor-panel-editor"), { quality: 9 }).then(function (dataUrl) {
    // console.log(editorpanal.backgroundshade);
     pannelSide.style.display = "flex";
    // document.querySelector(".right-panel-editor-panel-editor").style.marginLeft="72px";





      const d = new Date();
      var link = document.createElement('a');
      link.download = `${d.getTime()}.jpeg`;
      link.href = dataUrl;
      link.click();
      });
 //   console.log("its dwnloading");

});



