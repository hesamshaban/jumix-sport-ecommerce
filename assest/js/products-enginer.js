import getApi from "./api-product.js";
import renderProduct from "./render-product.js";
import renderOrApi from "./renderOrApi.js";
new class {
    #textShowSort;
    #getApi;
    #mainList;
    #fildDhowProduct;
    #wraperProducts;
    #alertMain;
    #alertMainClone;
    #wraperSort;
    #wrapFilterInput;
    #listFiltered;
    #itemCont;
    #wrapBtnList;
    #pageShowEnable;
    #listBtn;
    #checkInputPrice = false;
    #listSecend;
    constructor(){
        this.#wrapFilterInput = document.querySelectorAll(`.filter-products input[type="checkbox"]`);
        this.#textShowSort =document.querySelector(".sort-product p");
        this.#pageShowEnable=0;
        this.#wrapBtnList = document.getElementById("number-btn-id")
        this.#wraperProducts = document.getElementById("wrap-products-id");
        this.#alertMain=document.querySelector(".alert-page");
        this.#alertMainClone = this.#alertMain.cloneNode(true);
        this.managerFilter();
        this.managerSorting();
        this.managerPage();
        this.#itemCont = 12;
    }
    async managerPage(){
        this.#getApi =await new getApi().getAllApi();;
        this.#mainList = this.#getApi;
        this.#alertMain.hidden = true;
        this.searchChekcked();
        console.log(this.#getApi);
        this.btnMovePage();
        this.renderProducts();
    }
    async renderProducts(){
        console.log(this.#pageShowEnable);
        try{
        let allElem =await new renderProduct().renderListProducts(this.#mainList , "products");
        let allElement =await this.uiPageSystem(allElem);
        this.#listBtn = this.createBtn(allElement);
        this.#wrapBtnList.innerHTML ="";
        this.#wraperProducts.innerHTML ="";
        this.#listBtn.forEach((elem)=>{
            if(Number(elem.dataset.contPage) === this.#pageShowEnable){
                elem.classList.add("selected");

            }else{
                elem.classList.remove("selected");
            }
        })
        this.#wrapBtnList.append(...this.#listBtn);
        this.#wraperProducts.append(...allElement[this.#pageShowEnable])
        this.#textShowSort.textContent=`Showing ${this.#wraperProducts.children.length} of ${allElem.length} products`;
        }catch(e){
            console.error("kirrrr" , this.#alertMain)
            this.#alertMainClone.children[0].children[0].hidden = false;
            this.#alertMainClone.children[0].children[1].hidden = true;
            this.#wraperProducts.append(this.#alertMainClone);
            this.#alertMain.style.display = "flex";
        }
        // this.#wraperProducts.append(...allElem);
        
    }
    btnMovePage(){
        let btnMove = document.querySelector(".move-page-pro");
        btnMove.addEventListener("click",(e)=>{
            switch(e.target.dataset.action){
                case "next":
                    if(this.#pageShowEnable >= this.#listBtn.length-1){
                        this.#pageShowEnable = this.#listBtn.length-1;
                    }else{
                        this.#pageShowEnable++;
                    }
                    this.renderProducts();
                    break;
                case "privios":
                    if(this.#pageShowEnable === 0){
                        this.#pageShowEnable = 0;
                    }else{
                        this.#pageShowEnable=this.#pageShowEnable-1;
                    }
                    this.renderProducts();
                    break;
            }
        })
    }
    createBtn(list){
        let listBtn=[];
        list.forEach(elem => {
            let btn = document.createElement("button");
            btn.dataset.contPage=list.indexOf(elem);
            btn.textContent =list.indexOf(elem)+1;
            btn.addEventListener("click",(e)=>{
                this.#pageShowEnable = e.target.dataset.contPage;
                console.log(this.#pageShowEnable);
                this.renderProducts();
            })
            listBtn.push(btn);
        });
        
        return listBtn;
    }
    uiPageSystem(list){
        let listSystem=[];
        let listOne=[];
        for(let i=0;i<list.length;i++){
            listOne.push(list[i]);
            if(listOne.length >= this.#itemCont){
                listSystem.push(listOne);
                listOne=[];
            }
            if(listOne[listOne.length-1] === list[list.length-1]){
                listSystem.push(listOne);
                break;
            }
        }
        return listSystem;
    }
    searchChekcked(){
            let urlOption =new URLSearchParams(window.location.search);
            let value = (urlOption.get("file"));
            if(value !== null || value !== undefined){
             this.#wrapFilterInput.forEach(item =>{
                if(item.dataset.value === value){
                    item.checked =true;
                    this.sendFilter();
                }
             })   
            }
    }
    managerFilter(){
        let x =document.createElement("input");
        const wrperFilter = document.querySelector(".filter-products");
        let allFilters =[];
        function selectInput(key , target){
            let items = document.querySelectorAll(`.${key}-div input[type="checkbox"]`);
            items.forEach((item)=>{
                if(item !== target){
                    item.checked = false;
                }
            })
        }
        wrperFilter.addEventListener("change",(e)=>{
            // console.log(e.target.type);
            if(e.target.type === "checkbox"){
                let key = e.target.dataset.key;
                let value =e.target.dataset.value;
                if(e.target.checked){
                    selectInput(key , e.target);
                    this.sendFilter();
                }else{
                    this.sendFilter();
                    //console.log(allFilters);
                }
                // this.filterByFilters(allFilters);
            }else{
                let showPrice = document.getElementById("max-price-f");
                let priceTarget = (e.target.value);
                showPrice.textContent = `$${priceTarget}`;
                this.filterByPriceInput(priceTarget);
            }

            
        })
    }
    managerSorting(){
        const wraperSort = document.querySelector(".sort-product");
        wraperSort.addEventListener("change",(e)=>{            
            let value = e.target.value;
            this.sorting(value);
        });

    }
    async sorting(sortValue){
        this.#checkInputPrice =false;
        console.log(sortValue);
        this.#pageShowEnable =0;
        if(sortValue ==="Featured"){
            this.#mainList = this.#getApi;
            return this.#mainList
        }
        let listSorted =await new getApi().sortingProducts(this.#mainList , sortValue);
        this.#mainList = listSorted;
        this.renderProducts();
    }
    sendFilter(){
        let listFilter = [];
        this.#wrapFilterInput.forEach((item)=>{
            if(item.checked){
                let key = item.dataset.key;
                let value =item.dataset.value;
                listFilter.push({[key]:value});
            }
        })
        console.log(listFilter);
        this.filterByFilters(listFilter);
    }
    async filterByFilters(filters){
        this.#checkInputPrice =false;
        if(filters === null){
            return
        }
        if(filters.category === null){
            return
        }
        this.#pageShowEnable =0;
        console.log(filters);
        let listSorted =await new getApi().filterProduct(filters);
        this.#mainList = listSorted;
        console.log(this.#mainList);
        
        this.renderProducts();
    }
    async filterByPriceInput(priceNumber){
        console.log(Number(priceNumber));
       let listSecend= this.#mainList.filter((item)=>{
            return item.price <= Number(priceNumber);
       })
        if(this.#checkInputPrice === false){
            let listSecend= this.#mainList.filter((item)=>{
                return item.price <= Number(priceNumber);
             })
            this.#checkInputPrice =true;
            this.#listSecend =this.#mainList;
            this.#mainList = listSecend;       
        }else{
            let listSecend= this.#listSecend.filter((item)=>{
                return item.price <= Number(priceNumber);
             })
            this.#mainList = listSecend; 
        } 
        console.log(listSecend);
        this.renderProducts();
    }
}