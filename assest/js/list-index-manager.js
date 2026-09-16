import getApi from "./api-product.js";
import renderProduct from "./render-product.js";
import renderOrApi from "./renderOrApi.js";
new class manegerList{
    #mainApi;
    #wraperMain;
    #typeList;
    #contProduct;
    #listMain;
    #sortList;
    #titleHeader;
    #wraperProduct;
    constructor(){
        this.#wraperMain= document.getElementById("import-list-product");
        this.setDateList(this.#wraperMain);
        this.#mainApi = new getApi();
        this.managerAsync();
    }
    async managerAsync(){
        await    this.getList();
        await    this.importListHtml()    

    }
    setDateList(wraper){
        this.#titleHeader = wraper.textContent;
        this.#contProduct = Number(wraper.dataset.cont);
        this.#typeList = wraper.dataset.typeRender;
        this.#sortList = wraper.dataset.sort;
        
    }
    async importListHtml(){
       new renderOrApi(  "./list-product-index.html", "html" ,this.#wraperMain).managerEngin().then((result)=>{
        this.managerlist();
         ("list product load");
        } , (error)=>{
            headerParent.innerHTML="<h1 class ='error '>header no Loading...</h1>"
        })        
    }
    async getList(){
        this.#listMain =await this.#mainApi.getAllApi();
        switch(this.#sortList){
            case "new":
                this.#listMain = await this.#mainApi.sortingProducts(this.#listMain,"timeLtoH");
                break;
            case "priceLow":
                this.#listMain = await this.#mainApi.sortingProducts(this.#listMain,"priceLtoH");
                break;
            case "priceHigh":
                this.#listMain = await this.#mainApi.sortingProducts(this.#listMain,"priceHtoL");
                break;
            case "favorite":
                this.#listMain =await this.favoriteListCreate();
                break;
            default:
                break
        }
        let itemsList =[];
        if(this.#listMain.length <  this.#contProduct){
            itemsList = [...this.#listMain];
        }
        else{
            for(let i=0 ; i<this.#contProduct;i++){
            itemsList.push(this.#listMain[i]);
            }
        }
        
        this.#listMain = itemsList;
    }
    async managerlist(){
        this.#wraperProduct = document.getElementById("wraper-item-product");
        let titleList = document.querySelector(".header-nav-produkts h2");
        titleList.textContent = this.#titleHeader;
        this.renderList();
    }
    async renderList(){
        try{
            let renderer =await  new renderProduct();
            let listElem =await  renderer.renderListProducts(this.#listMain,this.#typeList);
            this.#wraperProduct.append(...listElem);
        }catch(e){
             (e);
            
            this.#wraperMain.innerHTML =`<h1 class="error">render object eroror</h1>`     
        }
        
    }
    async favoriteListCreate(){
        let allProducts = await this.#mainApi.getAllApi();
        if(localStorage.favorite === undefined){
            localStorage.setItem("favorite" , JSON.stringify([]));
        }
        let favoriteId = JSON.parse(localStorage.getItem("favorite"));
        let listProduvFav = [];
        if(favoriteId.length  === 0){
            this.#wraperProduct =await document.getElementById("wraper-item-product");
            this.#wraperMain.innerHTML = `<h1 class='error'>product favorite undefinde😍😍</h1>`
            return
        }
        else{
            favoriteId.forEach(element => {
                allProducts.forEach((item)=>{
                    if(item.id === element){
                        listProduvFav.push(item);
                    }
                })
            });
        }
        this.#contProduct = listProduvFav.length;
        return listProduvFav;
        
    }
}
