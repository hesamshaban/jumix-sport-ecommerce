class addToCartManaget {
    static #listCart;
    #ElemCart;
    constructor(elemCart){
        this.#ElemCart = elemCart;
       addToCartManaget.#listCart = localStorage.getItem("favorite");
    }
    clickaddTocart(e , item){
        let listCart = localStorage.getItem("cart");
        listCart =JSON.parse(listCart) || [];
        console.log("click cart");
        let elemBtn = e;
        if(elemBtn.dataset.cart === "false"){
            console.log("add cart");
            elemBtn.dataset.cart = "true";
            // let indexCHAR = listCart.indexOf(item.id);
            listCart.push(item.id);
            localStorage.setItem("cart",JSON.stringify(listCart));
        }else{
            console.warn("egane");
            console.log(listCart);
            // فعلابرای تست تا موقعی که کارت خودش درست بشه
            elemBtn.dataset.cart = "false";
            let indexCHAR = listCart.indexOf(item.id);
            listCart.splice(indexCHAR ,1);
            localStorage.setItem("cart",JSON.stringify(listCart));
        }
        this.managerIconCartHeader(listCart.length)

    }
    async managerIconCartHeader(cont){
        let cart = document.querySelector("#cart-icon div");
        let mainCont = cont || (JSON.parse(localStorage.getItem("cart"))).length || 0;
        console.log(cart);
        cart.textContent = mainCont;
    }
}
export default addToCartManaget;