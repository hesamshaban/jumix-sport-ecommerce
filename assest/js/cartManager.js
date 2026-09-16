import GetApi from "./api-product.js";
import favoriteManaget from "./managerFavorite.js";
import addToCartManaget from "./manager-add-to-cart.js";
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
         ("MANAGER CART CREATED");
        this.#wraperItem = document.getElementById("wrap-item-cart");
        this.manager();
    }
    static managerCall(){
        new managerCart();
    }
    async manager(item){
        if(this.#wraperItem === undefined){
        this.#wraperItem = document.getElementById("wrap-item-cart");
        }
        this.getListCart();
        addToCartManaget.managerIconCartHeader((JSON.parse(localStorage.cart)).length);
        if(this.#listCart.length === 0 ){
            if(item === "cartDone"){
                this.removeAllCart(item);
            }else{
                this.removeAllCart();
            }
            this.totalFunc();
            this.setTextCart();
        }else{
            this.#wraperItem.innerHTML ="";
            // this.totalFunc();
            this.renderItem();
            this.totalFunc();
        }
        
    }
    async removeAllCart(item){
        if(item === "cartDone"){
            this.#wraperItem.innerHTML =await "<h2 class='sucses'>By Cart Is Done 🤑🤑</h2>";
            return
        }
        this.#wraperItem.innerHTML =await "<h2 class='warn'>cart is empity</h2>";
    }
    getListCart(){
         (localStorage.cart);
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
        showTotalMain.textContent =`$${sumMain}`;
        let btnByCart = document.querySelector(".btn-sum");
        btnByCart.addEventListener("click" , (e)=>{
             (this.#listCart , "kirir");
            
            if(this.#listCart.length === 0 ){
                alert("cart is empity!!!!");
                return;
            }else{
                localStorage.setItem("allPrice" , JSON.stringify(this.#valueSum));
                localStorage.setItem(this.#keyLocalStoreg , JSON.stringify([]));
                this.manager("cartDone");
            // alert("cart done");
            }
        })
    } 
    async totalFunc(){
        if(this.#listCart.length === 0 ){
            this.#numberTotal = 0;
            return;
        }
        this.#listCartTital = [];
        let numberTotal;
        let promis = new Promise(async(resole , eject)=>{
            this.#listCart.forEach(async(item)=>{
                // let listElem = await new GetApi().getApiById(item.id);
                this.#listCartTital.push([await new GetApi().getApiById(item.id) , item.quantity]);
                 (this.#listCartTital);
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
            
        
        //  (this.totalFunc() , "tottal");
    }
    async taxFunc(){
        
        this.#valueTax  = this.#numberTotal * this.#tax;
        this.#valueTax = this.#valueTax.toFixed(2)
        return this.#valueTax;
    }
    totalMainFunc(){
        let sumer =((this.#numberTotal - this.#valueTax) * ((100-(this.#valueOff)) / 100));
        sumer =sumer.toFixed(2);
        this.#valueSum = sumer; 
        return sumer;
        
    }
} 
new managerCart;
export default  managerCart;