class favoriteManaget {
    static #listFavorite;
    constructor(){
        favoriteManaget.#listFavorite = localStorage.getItem("favorite");
    }
    clickFavorite(e , item){
        let listfavorite = localStorage.getItem("favorite");
        listfavorite =JSON.parse(listfavorite);
        console.log("click favorite");
        let elemBtn = e;
        if(elemBtn.dataset.favorite === "true"){
            elemBtn.dataset.favorite = "false";
            elemBtn.children[0].classList.remove("fa-heart");
            elemBtn.children[0].classList.add("fa-heart-o");
            let indexCHAR = listfavorite.indexOf(item.id);
            listfavorite.splice(indexCHAR , 1);
            localStorage.setItem("favorite",JSON.stringify(listfavorite));
        }else{
            elemBtn.children[0].classList.remove("fa-heart-o")
            elemBtn.children[0].classList.add("fa-heart")
            elemBtn.dataset.favorite = "true";
            console.log(elemBtn.dataset.favorite);
            listfavorite.push(item.id)
            localStorage.setItem("favorite",JSON.stringify(listfavorite));
        }
    }
}
export default favoriteManaget;