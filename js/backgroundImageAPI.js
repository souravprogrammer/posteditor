
// import {input} from './rightpannel' ;



// console.log("background=>>",background);
// console.log("background=>>",nav);
// let search = "anime"
function getBackground(search,pageNumber){
// https://api.unsplash.com//photos/?client_id=j9voolUjsfqfMRlFn9JJ7w6PA5K6LHAGaFxhi8cJzLc
// console.log(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${search}&&client_id=j9voolUjsfqfMRlFn9JJ7w6PA5K6LHAGaFxhi8cJzLc`);


    fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${search}&&client_id=j9voolUjsfqfMRlFn9JJ7w6PA5K6LHAGaFxhi8cJzLc`).then((res)=>{

    //  `https://api.unsplash.com/search/photos?page=${'1'}&query=${office}&&client_id=j9voolUjsfqfMRlFn9JJ7w6PA5K6LHAGaFxhi8cJzLc`
        return res.json();

    }).then((data)=>{
     background = [];
     console.log(   data.results);       
     
     
        data.results.forEach(element => {
          //  console.log(element.urls.regular);
            let temp = document.createElement("img");
            temp.src = element.urls.regular;

            background.push(temp);
        });

        background.forEach(e=>{
            e.addEventListener("click",()=>{
                // let buffer = e.cloneNode(true);
                // editorpanal.addChild(buffer);
                editorpanal.addBackgroundImage(e.src);
            });
        });
        nav.result.innerHTML='';     
        background.forEach(e=>{
            nav.result.appendChild(e);
        });


    })
    .catch((e)=>{
        console.log(e);
    })
}


// 563492ad6f91700001000001c0c0a4d8c4344aef8353ecba3ebb5ab6 // pixels