import GetApi from "./api-product.js";
import favoriteManaget from "./managerFavorite.js";
import addToCartManaget from "./manager-add-to-cart.js";
new class managerProduct{
    #idProduct;
    #objectProduct;
    #sizeSelect;
    #allBrnSize =[];
    #colorSelect;
    #allBtnColor=[];
    #quantity=1;
    constructor(){
        console.log("iren");
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
        console.log(reespon);
        this.manager();
    }
    getIdBySearch(){
        let paarms = new URLSearchParams(window.location.search);
        this.#idProduct = paarms.get("idProduct") || "v-001";
    }
    setImage(){
        const wrapGalery = document.querySelector(".galery-img");
        const wrapGaleryItems = document.querySelectorAll(`.galery-img [class^="galery-item"]`);
        console.log(wrapGalery ,wrapGaleryItems );
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
        console.log(has , favoriteList , btnFavorit);
        if(has){
            console.log("kuson");
            
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
            console.log(event.currentTarget);
            
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
                    new managerCart;
                    return;
                }
                new addToCartManaget().addCartmain(e.currentTarget , this.#objectProduct, this.#sizeSelect ,this.#colorSelect , this.#quantity);
                alarmBtnAdd.hidden = true;
                alarmAdd.hidden = true;
                new managerCart;
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

class managerCart{
    #keyLocalStoreg ="cart";
    #listCart;
    #listCartTital =[];
    #numberTotal;
    #wraperItem;
    #valueOff =0;
    #valueTax=0;
    #tax = 0.1;
    #valueSum=0;
    constructor(){
        console.log("MANAGER CART CREATED");
        this.#wraperItem = document.getElementById("wrap-item-cart");
        this.manager();
    }
    async manager(){
        if(this.#wraperItem === undefined){
        this.#wraperItem = document.getElementById("wrap-item-cart");
        }
        this.getListCart();
        addToCartManaget.managerIconCartHeader((JSON.parse(localStorage.cart)).length);
        if(this.#listCart.length === 0 ){
            this.removeAllCart();
            this.totalFunc();
        }else{
            this.#wraperItem.innerHTML ="";
            // this.totalFunc();
            this.renderItem();
            this.totalFunc();
        }
        
    }
    async removeAllCart(){
        this.#wraperItem.innerHTML =await "<h2 class='warn'>cart is empity</h2>";
    }
    getListCart(){
        console.log(localStorage.cart);
        if(localStorage[this.#keyLocalStoreg] === undefined){         
            localStorage.setItem(this.#keyLocalStoreg , JSON.stringify([]));
        }
        this.#listCart = JSON.parse(localStorage.getItem(this.#keyLocalStoreg));
        if(this.#listCart === null){
            return "cart is empity"
        }
    }
    async renderItem(){
        this.#wraperItem.innerHTML =await ""; 
        let render = async(item)=>{
            let objectItem = await new GetApi().getApiById(item.id);
            let divWraper = document.createElement("div");
            divWraper.className = "card-by-product";
            divWraper.dataset.idMain = item.id;
            {
                let divImg = document.createElement("div");
                divImg.className = "img-card-by-product";
                {
                    let imgTag = document.createElement("img");
                    imgTag.className ="img-res";
                    imgTag.setAttribute("src" , objectItem.cover);
                    divImg.appendChild(imgTag);
                }
                let divTitle = document.createElement("div");
                divTitle.className = "title-card-by-product";
                {
                    let tagName = document.createElement("h5");
                    tagName.textContent = objectItem.name;
                    let tagSize = document.createElement("p");
                    tagSize.textContent= `Size:${item.size}`;
                    let tagColor = document.createElement("p");
                    tagColor.textContent = `Color:${item.color}`;
                    let tagPrice = document.createElement("h5");
                    tagPrice.textContent = `$${objectItem.price}`;
                    divTitle.appendChild(tagName);
                    divTitle.appendChild(tagSize);
                    divTitle.appendChild(tagColor);
                    divTitle.appendChild(tagPrice);
                }
                let divBtn = document.createElement("div");
                divBtn.className = "add-remove-card-by-product-main";
                {
                    let divInput = document.createElement("div");
                    divInput.className ="add-remove-card-by-product";
                    {
                        let maynesBtn = document.createElement("button");
                        maynesBtn.className = "maynes removeQuantitty";
                        maynesBtn.textContent = "-";
                        maynesBtn.addEventListener("click" , ()=>{
                            this.deleteQuantityItem(item);
                        })
                        let inputShow = document.createElement("input");
                        inputShow.setAttribute("readonly","");
                        inputShow.setAttribute("type" , "number");
                        inputShow.setAttribute("max" , "100");
                        inputShow.value = item.quantity;
                        let plusBtn = document.createElement("button");
                        plusBtn.className ="plus addQuantitty";
                        plusBtn.textContent = "+";
                        plusBtn.addEventListener("click" ,()=>{
                            this.addQuantityItem(item);
                        })
                        divInput.appendChild(maynesBtn);
                        divInput.appendChild(inputShow);
                        divInput.appendChild(plusBtn);
                    }
                    let canselBtn = document.createElement("button");
                    canselBtn.className ="exit removeItemCart";
                    canselBtn.dataset.idRemove = item.id;
                    canselBtn.addEventListener("click" ,(e)=>{
                        this.removeItemCart(item);
                    }) 
                    {
                        let icon = document.createElement("i");
                        icon.className = "fa fa-times";
                        canselBtn.appendChild(icon);
                    }
                    divBtn.appendChild(divInput);
                    divBtn.appendChild(canselBtn);
                }
                divWraper.appendChild(divImg);
                divWraper.appendChild(divTitle);
                divWraper.appendChild(divBtn);    
            }
            return divWraper;
            
        }
        for(let elem of this.#listCart){
            let element = await render(elem);
            this.#wraperItem.appendChild(element);
        }
        this.setTextCart();

    }
    async removeItemCart(item){
        let itemX = this.#listCart.find((elem)=>{
            return JSON.stringify(elem) === JSON.stringify(item);
        })
        let indexChar = this.#listCart.indexOf(itemX);
        this.#listCart.splice(indexChar ,1);
        await localStorage.setItem(this.#keyLocalStoreg ,JSON.stringify(this.#listCart));
        this.manager();
    }
    async addQuantityItem(item){
        let itemX = this.#listCart.find((elem)=>{
            return JSON.stringify(elem) === JSON.stringify(item);
        })
        itemX.quantity++;
        await localStorage.setItem(this.#keyLocalStoreg ,JSON.stringify(this.#listCart));
        this.manager();
    }
    async deleteQuantityItem(item){
        let itemX = this.#listCart.find((elem)=>{
            return JSON.stringify(elem) === JSON.stringify(item);
        })
        let quan = itemX.quantity; 
        if(quan >1){
            itemX.quantity = quan -1;

        }
        await localStorage.setItem(this.#keyLocalStoreg ,JSON.stringify(this.#listCart));
        this.manager();
    }

    async setTextCart(){
        const indexCart = document.querySelector(".title-nav h4 span");
        indexCart.textContent = `(${this.#listCart.length})`;
        const btnClearCart = document.querySelector(".title-nav p");
        btnClearCart.addEventListener("click",(e)=>{
            localStorage.setItem(this.#keyLocalStoreg , JSON.stringify([]));
            this.manager();
        })
        const divOffCode = document.querySelector(".off-code");
        const inputOff = document.querySelector(".off-code input");
        const btnOff = document.querySelector(".off-code button");
        btnOff.addEventListener("click" , ()=>{
            let offCode = inputOff.value;
            let massageCode = document.createElement("h2");
            massageCode.className = "warn";
            massageCode.style.height = `20px`;
            massageCode.style.margin = `5px`;
            massageCode.style.display = `block`;          
            let kirKardan =false;
            if(divOffCode.nextElementSibling.tagName === "H2"){
                divOffCode.nextElementSibling.remove();
                kirKardan = true;
            }
            switch(offCode){
                case "123456789":
                    this.#valueOff = 40;
                    massageCode.textContent = `winer %${this.#valueOff} off`;
                    divOffCode.after(massageCode);
                    break;
                case "kingHesam":
                    this.#valueOff = 100;
                    massageCode.textContent = `hey!! winer %${this.#valueOff} off`;
                    divOffCode.after(massageCode);
                    break;
                case "iran":
                    this.#valueOff = 10;
                    massageCode.textContent = `winer %${this.#valueOff} off`;
                    divOffCode.after(massageCode);
                    break;
                case "kirrr":
                    this.#valueOff = 80;
                    massageCode.textContent = `winer %${this.#valueOff} off`;
                    divOffCode.after(massageCode);
                    break;
                default:
                    this.#valueOff =0;
                    if(kirKardan){
                        massageCode.className = "error";
                        massageCode.textContent = `🤬🤬😡💩`;

                    }else{
                        
                        massageCode.textContent = `😂😂😁😁`;
                    }
                    divOffCode.after(massageCode);
                    break;
            }
            this.setTextCart();
        })
        const showPrice = document.querySelector(".subtotal-sum-product .main");
        showPrice.textContent =await `$${this.#numberTotal.toFixed(2)}`;
        const showTax = document.querySelector(".tax-sum-product .main");
        let valTax = await this.taxFunc();
        showTax.textContent = `$${valTax}`;
        const showTotalMain = document.querySelector(".total-sum-product .main");
        let sumMain = this.totalMainFunc();
        showTotalMain.textContent =`$${sumMain}`
    } 
    async totalFunc(){
        this.#listCartTital = [];
        let numberTotal;
        let promis = new Promise(async(resole , eject)=>{
            this.#listCart.forEach(async(item)=>{
                // let listElem = await new GetApi().getApiById(item.id);
                this.#listCartTital.push([await new GetApi().getApiById(item.id) , item.quantity]);
                console.log(this.#listCartTital);
                if(this.#listCart[this.#listCart.length-1] === item){
                    resole(this.#listCartTital);
                }
            })
        }).then((result)=>{
            let total = [...result];
            this.#numberTotal=total.reduce((sum , item)=>{
                return sum + (item[0].price * item[1]);
                if(this.#listCart[this.#listCart.length-1] === item){
                    return (this.#numberTotal);
                }
            },0);
            
        });
            
        
        // console.log(this.totalFunc() , "tottal");
    }
    async taxFunc(){
        
        this.#valueTax  = this.#numberTotal * this.#tax;
        this.#valueTax = this.#valueTax.toFixed(2)
        return this.#valueTax;
    }
    totalMainFunc(){
        let sumer =((this.#numberTotal - this.#valueTax) * ((100-(this.#valueOff)) / 100));
        sumer =sumer.toFixed(2); 
        return sumer;
        
    }
} 
new managerCart;
export default managerCart;