import loadHtml from "./renderOrApi.js";
class animeHeader{
   #wraperHeadAnime;
   #wrapimport; 
   constructor(){
     this.loadScripte();
        // this.#wraperHeadAnime = document.querySelector(".import-header-anime");
        this.managerClass();
   }
   async managerClass(){
        // new loadHtml()
        this.loadScripte()
   }
   async loadScripte(){
     console.log("iram");
     
        this.#wraperHeadAnime= document.querySelector(".wraper-header-anime");
          const x =document.querySelector(".movment");
          const next = document.querySelector(".next");
          const prenios = document.querySelector(".prenios");
          let moveValue =0 ;
          let moveRight = true;
          let nextPage = setTimeout(()=>{
             moveFunc()  },2000);  
          function moveFunc(){
               if(moveRight){
                    if(moveValue <300){
                    moveValue = moveValue+100;
                    x.style.transform =  `translateX(-${moveValue}%)`;

                    // .transform = `tanslateX(${moveValue}%)`;
                    }else{
                         moveRight =false;
                    }
               }else{
                    if(moveValue > 0){
                    moveValue = moveValue-100;
                    x.style.transform =  `translateX(-${moveValue}%)`;

                    // .transform = `tanslateX(${moveValue}%)`;
                }else{
                    moveRight = true
                }
              }
               setTimeout(moveFunc , 4000)
          }
          next.addEventListener("click" , (e)=>{
                if(moveValue <300){
                    moveValue = moveValue+100;
                    x.style.transform =  `translateX(-${moveValue}%)`;

                    // .transform = `tanslateX(${moveValue}%)`;
                }
            })
            prenios.addEventListener("click" , (e)=>{
                if(moveValue > 0){
                    moveValue = moveValue-100;
                    x.style.transform =  `translateX(-${moveValue}%)`;

                    // .transform = `tanslateX(${moveValue}%)`;
                }
            });
            

   }

}
new animeHeader