import GetApi from "./api-product.js";
import favoriteManaget from "./managerFavorite.js";
import addToCartManaget from "./manager-add-to-cart.js";
import managerCart from "./cartManager.js";


new class managerProduct{
    #idProduct;
    #objectProduct;
    #sizeSelect;
    #allBrnSize =[];
    #colorSelect;
    #allBtnColor=[];
    #quantity=1;
    constructor(){
         ("iren");
        this.getIdBySearch();
        this.getIdApi()
    }
   async manager(){
    this.setImage();
    this.managerQuantity();   
    this.managerBtnLike();
    this.managerBtnAddToCart();
    this.setText();
    }
    async getIdApi(){
        let reespon = await new GetApi().getApiById(this.#idProduct);
        this.#objectProduct =await reespon;
         (reespon);
        this.manager();
    }
    getIdBySearch(){
        let paarms = new URLSearchParams(window.location.search);
        this.#idProduct = paarms.get("idProduct") || "v-001";
    }
    setImage(){
        const wrapGalery = document.querySelector(".galery-img");
        const wrapGaleryItems = document.querySelectorAll(`.galery-img [class^="galery-item"]`);
         (wrapGalery ,wrapGaleryItems );
        this.#objectProduct.image.push(this.#objectProduct.cover)
        wrapGalery.firstElementChild.firstElementChild.setAttribute("src" ,this.#objectProduct.cover)
        for(let i =0 ; i<wrapGaleryItems.length ; i++){
            
            if(i <=4){
            wrapGaleryItems[i].firstElementChild.setAttribute("src" , this.#objectProduct.image[i]);
            }
            
            wrapGaleryItems[i].addEventListener("click" , (e)=>{
                setImageMain(e);
            })
        }
        function setImageMain(e ){

            let value =  e.target;
            if(value.tagName === "DIV"){
                value = e.target.firstElementChild;
            }
            let src =(value.getAttribute("src"));
            
            wrapGalery.firstElementChild.firstElementChild.setAttribute("src" , src)
        }
    }
    setText(){
        let textLinkCategory = document.getElementById("textLinkCategory");
        textLinkCategory.textContent = this.#objectProduct.category;
        textLinkCategory.setAttribute("href" , `products.html?file=${this.#objectProduct.category}`);
        textLinkCategory.nextElementSibling.textContent = this.#objectProduct.name;
        let nameP = document.getElementById("nameP");
        nameP.textContent = this.#objectProduct.name;
        let titleP = document.getElementById("titleP");
        titleP.textContent = `${this.#objectProduct.type} ${this.#objectProduct.category} ${this.#objectProduct.kind}`;
        let priceP = document.getElementById("priceP");
        priceP.textContent ="$"+ this.#objectProduct.price;
        let captionP = document.getElementById("captionP");
        captionP.textContent = this.#objectProduct.caption;
        let wrapBtnSize = document.querySelector(".size-input");
        this.#objectProduct.sizes.forEach(elem => {
            let btn = document.createElement("button");
            btn.textContent = elem;
            this.#allBrnSize.push(btn)
            wrapBtnSize.appendChild(btn)
            btn.addEventListener("click" , e=>{
                this.#allBrnSize.forEach((btn)=>{
                    btn.classList.remove("select");
                })
                this.#sizeSelect = e.target.textContent;
                e.target.classList.add("select")
            })
        });
        let wrapBtnColer = document.querySelector(".color-btn");
        this.#objectProduct.coler.forEach(elem => {
            let btn = document.createElement("button");
            let img = document.createElement("img");
            img.className = "img-res"
            img.setAttribute("src", this.#objectProduct.cover );
            btn.appendChild(img);
            btn.style.color = elem;
            btn.style.background = elem;
            btn.dataset.color = elem;
            this.#allBtnColor.push(btn)
            wrapBtnColer.appendChild(btn)
            btn.addEventListener("click" , e=>{
                this.#allBtnColor.forEach((btn)=>{
                    btn.classList.remove("select"); 
                })
                this.#colorSelect = e.currentTarget.dataset.color;
                e.currentTarget.classList.add("select")
            })
        });
    }
    managerQuantity(action){
        const wrapquntity  =document.querySelector(".input-quan");
        const inputMain = document.querySelector(".input-quan input");
        
        const wrapBtnQuantity  =document.querySelectorAll(".input-quan button");
        if(action === "action"){
            inputMain.value = this.#quantity;
        }
        else{
            wrapBtnQuantity.forEach(item=>{
                item.addEventListener("click",(e)=>{
                    if(e.target.dataset.action === "plus"){
                        this.#quantity++;
                    }else{
                        if(this.#quantity > 1){
                        this.#quantity = this.#quantity -1;
                        }
                    }
                    this.managerQuantity("action");
                })
            })
        
        }
            
    }
    async managerBtnLike(){                
        let item = this.#objectProduct
        let listFavorite = localStorage.getItem("favorite");
        let favoriteList =await JSON.parse(listFavorite);
        const btnFavorit = document.querySelector(".btn-s-f [data-action='favorite']");
        let has =favoriteList.some((itemFav)=>{
            return itemFav == item.id;
        });
         (has , favoriteList , btnFavorit);
        if(has){
             ("kuson");
            
            btnFavorit.dataset.favorite = "true";
        }
        else{
            btnFavorit.dataset.favorite = "false";
        }
        if(btnFavorit.dataset.favorite ==="true"){
            btnFavorit.children[0].className = "fa fa-heart";
        }
        else{
            btnFavorit.children[0].className = "fa fa-heart-o";

        }
        btnFavorit.addEventListener("click" ,(event)=>{
             (event.currentTarget);
            
            new favoriteManaget().clickFavorite(event.currentTarget , item);
        })        
    }
    async managerBtnAddToCart(){
        const alarmAdd= document.querySelector(".alarm-add-cart");
        const alarmBtnAdd = document.querySelector(".alarm-add-cart #ok-add-to-cart");
        const alarmBtnCansel = document.querySelector(".alarm-add-cart .cansel");
        const btnAdd = document.querySelector(".btn-s-f [data-action='add-cart']");
        let timeShowBtn;
        btnAdd.addEventListener("click" , (e)=>{
            alarmAdd.hidden = false;
            timeShowBtn = setTimeout(() => {
                alarmBtnAdd.hidden = false;
            }, 1000);
        });
        alarmBtnAdd.addEventListener("click" , (e)=>{
            if(this.#colorSelect !== undefined && this.#sizeSelect !== undefined){
                let listLocal = JSON.parse(localStorage.getItem("cart"));
                let isItem =false;
                let isItemList = [];
                listLocal.forEach((item)=>{
                    if(item.color === this.#colorSelect && item.size === this.#sizeSelect && item.id === this.#objectProduct.id){
                        item.quantity =item.quantity + this.#quantity;
                        isItem = true;        
                    }
                    isItemList.push(item);
                })
                if(isItem){
                    localStorage.setItem("cart" , JSON.stringify(isItemList));
                    alarmBtnAdd.hidden = true;
                    alarmAdd.hidden = true;
                    managerCart.managerCall();
                    return;
                }
                new addToCartManaget().addCartmain(e.currentTarget , this.#objectProduct, this.#sizeSelect ,this.#colorSelect , this.#quantity);
                alarmBtnAdd.hidden = true;
                alarmAdd.hidden = true;
                managerCart.managerCall();;
            }
            else{
                let elemEr = document.createElement("h2");
                elemEr.className= "error";
                elemEr.textContent = `plise select Size Or Color🤬 `;
                elemEr.style.color= "red"
                alarmAdd.firstElementChild.after(elemEr);
                setTimeout(() => {
                    elemEr.remove();
                    alarmBtnAdd.hidden = true;
                    alarmAdd.hidden = true;
                }, 3000);
            }
            
        });
        alarmBtnCansel.addEventListener("click" , (e)=>{
            if(alarmBtnAdd.hidden){
            clearTimeout(timeShowBtn);

            }
            alarmBtnAdd.hidden = true;
            alarmAdd.hidden = true;
        })
    }
    getItemPublic(){
        let item = this.#objectProduct;
        return item
    }
}

