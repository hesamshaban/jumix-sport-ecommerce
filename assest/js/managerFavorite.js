class favoriteManaget {
    static #listFavorite;
    constructor(){
        favoriteManaget.#listFavorite = localStorage.getItem("favorite");
    }
    clickFavorite(e , item){
        let listfavorite = localStorage.getItem("favorite");
        listfavorite =JSON.parse(listfavorite);
        let elemBtn = e;
        console.log(listfavorite , "start");
        
        if(elemBtn.dataset.favorite === "true"){

            elemBtn.dataset.favorite = "false";
            elemBtn.children[0].classList.remove("fa-heart");
            elemBtn.children[0].classList.add("fa-heart-o");
            let indexCHAR = listfavorite.indexOf(item.id);
            listfavorite.splice(indexCHAR , 1);            
            localStorage.setItem("favorite",JSON.stringify(listfavorite));
        console.log(listfavorite , "shart1");
        
        }else{
            elemBtn.children[0].classList.remove("fa-heart-o")
            elemBtn.children[0].classList.add("fa-heart")
            elemBtn.dataset.favorite = "true";
            listfavorite.push(item.id)
            localStorage.setItem("favorite",JSON.stringify(listfavorite));
        console.log(listfavorite , "shart2");
        
        }
    }
}
export default favoriteManaget;