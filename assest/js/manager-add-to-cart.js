class addToCartManaget {
    static #listCart;
    #ElemCart;
    #cartIndex;
    constructor(elemCart){
        this.#ElemCart = elemCart;
       addToCartManaget.#listCart = localStorage.getItem("cart");
        this.#ElemCart=document.querySelector("#cart-icon div.cont-cart-add");
    }
    clickaddTocart(e , item){
        window.location.href = `product.html?idProduct=${item.id}`

    }
    static async managerIconCartHeader(cont){
        let cartIndex = await document.querySelector("#cart-icon div.cont-cart-add");
        let mainCont = cont || (JSON.parse(localStorage.getItem("cart")))?.length || 0;
        console.log(cartIndex);
        if(cartIndex === null){
            return
        }
        cartIndex.textContent = mainCont;
    }
    addCartmain( e , item ,size ,color ,quantity){
        let listCart = localStorage.getItem("cart");
        listCart =JSON.parse(listCart);
        if(listCart === null){
            listCart =[];
        }
        console.log("click cart");
        let elemBtn = e;
        console.log("add cart");
        elemBtn.dataset.cart = "true";
            // let indexCHAR = listCart.indexOf(item.id);
            let listCartItem = {
                id:item.id,
                size:size,
                color:color,
                quantity:quantity
            };
            listCart.push(listCartItem);
            console.log(listCart);
            
            localStorage.setItem("cart",JSON.stringify(listCart));
        // }else{
        //     console.warn("egane");
        //     console.log(listCart);
        //     // فعلابرای تست تا موقعی که کارت خودش درست بشه
        //     // elemBtn.dataset.cart = "false";
        //     // let indexCHAR = listCart.indexOf(item.id);
        //     // listCart.splice(indexCHAR ,1);
        //     // localStorage.setItem("cart",JSON.stringify(listCart));
        // }
        addToCartManaget.managerIconCartHeader(listCart.length);
    }
}
export default addToCartManaget;