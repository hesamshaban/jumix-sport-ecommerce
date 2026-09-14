import apiFilterProduct from "./api-product.js";
import favoriteManaget from "./managerFavorite.js";
import addToCartManaget from "./manager-add-to-cart.js";
class renderProducts{
    #listMain;
    constructor(){

    }
    async renderListProducts(list , type = "index"){
        let listMain = await list;
        let listAllCard =[];
        let favoriteList = localStorage.getItem("favorite");
        favoriteList =await JSON.parse(favoriteList) || [];
        let cartAddList = localStorage.getItem("cart");
        cartAddList =await JSON.parse(cartAddList) || [];
        switch(type){
            case "index":
                listAllCard = renderCardIndex(listMain);
                break;
            case "products":
                listAllCard =renderCardproducts(listMain);
                break;
            default:
                listAllCard= {error:true, status:"404 typeRender😎" , statusText:"render list type not found😋" }
                break;
            }
        return listAllCard;
        function renderCardIndex(list){
            
            let listAllCard = [];
            listMain.forEach(item => {
                listAllCard.push(renderer(item));
                
            });
            return listAllCard;
            function renderer(item){
                let wrapMain= document.createElement("div");
                wrapMain.className = "card-porodukt";
                {
                    let divFilter= document.createElement("div");
                    divFilter.className = "filter-card-poroduct";
                    let divCover= document.createElement("div");
                    divCover.className = "card-porodukt-img";
                    let linkImage = document.createElement("a");
                    linkImage.setAttribute("href" , `product.html?idProduct=${item.id}`)
                    {
                        let imgTag = document.createElement("img");
                        imgTag.setAttribute("src",item.cover);
                        imgTag.setAttribute("alt",item.cover +"image");
                        imgTag.className = "img-res";
                        divCover.appendChild(imgTag);
                    }
                    linkImage.appendChild(divCover);
                    let btnFavorite = document.createElement("button");
                    btnFavorite.className = "love-porodukt";
                    let has =favoriteList.some((e)=>{
                        return e == item.id;
                    });
                    if(has){
                        btnFavorite.dataset.favorite = "true";
                    }
                    else{
                        btnFavorite.dataset.favorite = "false";
                    }
                    btnFavorite.addEventListener("click" , (e)=>{
                        new favoriteManaget().clickFavorite(e.currentTarget , item);
                        
                    })
                    {
                        let iconBtn = document.createElement("i");
                        if(btnFavorite.dataset.favorite ==="true"){
                            iconBtn.className = "fa fa-heart";
                        }
                        else{
                            iconBtn.className = "fa fa-heart-o";

                        }
                        iconBtn.setAttribute("aria-hidden","true");
                        btnFavorite.appendChild(iconBtn);
                    }
                    let linkName = document.createElement('a');
                    linkName.setAttribute("href",`product.html?idProduct=${item.id}`);
                    let nameTag = document.createElement("h2");
                    nameTag.className = "name-porodukt";
                    nameTag.textContent = item.name;
                    linkName.appendChild(nameTag);
                    let positionTag = document.createElement("h4");
                    positionTag.className = "type-porodukt";
                    positionTag.textContent = item.position;
                    let priceTag = document.createElement("h3");
                    priceTag.className = "price-porodukt";
                    priceTag.textContent = "$"+item.price;
                    
                    let btnAddToCart = document.createElement("button");
                    btnAddToCart.className= "add-shop";
                    let hasCart =cartAddList.some((e)=>{
                        return e == item.id;
                    });
                    if(hasCart){
                        btnAddToCart.dataset.cart = "true";
                    }
                    else{
                        btnAddToCart.dataset.cart = "false";
                    }
                    btnAddToCart.addEventListener("click" , (e)=>{
                        new addToCartManaget().clickaddTocart(e.currentTarget , item);
                        
                    })
                    {
                        let iconBtn = document.createElement("i");
                        iconBtn.className = "fa fa-plus";
                        iconBtn.setAttribute("aria-hidden","true");
                        btnAddToCart.appendChild(iconBtn);
                    }
                    wrapMain.appendChild(divFilter);
                    wrapMain.appendChild(linkImage);
                    wrapMain.appendChild(btnFavorite);
                    wrapMain.appendChild(linkName);
                    wrapMain.appendChild(positionTag);
                    wrapMain.appendChild(priceTag);
                    wrapMain.appendChild(btnAddToCart);
                }
                return wrapMain;
            }
        
        
        }
        function renderCardproducts(list){
            let listAllCard = [];
            listMain.forEach(item => {
                listAllCard.push(renderer(item));
                
            });
            return listAllCard;
            function renderer(item){
                let wrapMain= document.createElement("div");
                wrapMain.className = "card-product";
                {
                    let linkImage = document.createElement("a");
                    linkImage.setAttribute("href",`product.html?idProduct=${item.id}`)
                    let divCover= document.createElement("div");
                    divCover.className = "img-product";
                    {
                        let imgTag = document.createElement("img");
                        imgTag.setAttribute("src",item.cover);
                        imgTag.setAttribute("alt",item.cover +"image");
                        divCover.appendChild(imgTag);
                    }
                    let divTitle = document.createElement("div");
                    divTitle.className="title-card-product";
                    {
                        let linkName = document.createElement("a");
                        linkName.setAttribute("href",`product.html?idProduct=${item.id}`)
                        let nameTag = document.createElement("h3");
                        nameTag.textContent = item.name;
                        linkName.appendChild(nameTag);
                        let typeTag = document.createElement("p");
                        typeTag.textContent = item.kind +"es "+item.type;
                        let divWrapbtnPrice= document.createElement("div");
                        divWrapbtnPrice.className = "flex-btn-price";
                        {   
                            let priceTag = document.createElement("h4");
                            priceTag.textContent = "$"+item.price;
                            let btnAddToCart = document.createElement("button");
                            let hasCart =cartAddList.some((e)=>{
                            return e == item.id;
                            });
                            if(hasCart){
                                btnAddToCart.dataset.cart = "true";
                            }
                            else{
                                btnAddToCart.dataset.cart = "false";
                            }
                            btnAddToCart.addEventListener("click" , (e)=>{
                                new addToCartManaget().clickaddTocart(e.currentTarget , item);
                                
                            })
                            {
                                let iconBtn = document.createElement("i");
                                iconBtn.className = "fa fa-plus";
                                iconBtn.setAttribute("aria-hidden","true");
                                btnAddToCart.appendChild(iconBtn);
                            }
                            divWrapbtnPrice.appendChild(priceTag);
                            divWrapbtnPrice.appendChild(btnAddToCart);
                        }
                        divTitle.appendChild(linkName);
                        divTitle.appendChild(typeTag);
                        divTitle.appendChild(divWrapbtnPrice);

                    }
                    let divwrapFavorite = document.createElement("div");
                    divwrapFavorite.className = "btns-card-pro";
                    {
                        let btnFavorite = document.createElement("button");
                        btnFavorite.className = "love";
                        let has =favoriteList.some((e)=>{
                        return e == item.id;
                        });
                        if(has){
                            btnFavorite.dataset.favorite = "true";
                        }
                        else{
                            btnFavorite.dataset.favorite = "false";
                        }
                        btnFavorite.addEventListener("click" , (e)=>{
                            new favoriteManaget().clickFavorite(e.currentTarget , item);
                            
                        })
                        {
                            let iconBtn = document.createElement("i");
                            if(btnFavorite.dataset.favorite ==="true"){
                            iconBtn.className = "fa fa-heart";
                            }
                            else{
                                iconBtn.className = "fa fa-heart-o";

                            }
                            iconBtn.setAttribute("aria-hidden","true");
                            btnFavorite.appendChild(iconBtn);
                        }
                        divwrapFavorite.appendChild(btnFavorite);
                    }
                    linkImage.appendChild(divCover);
                    wrapMain.appendChild(linkImage);
                    wrapMain.appendChild(divTitle);
                    wrapMain.appendChild(divwrapFavorite);
                }
                return wrapMain;
            }
        }
        
    }
}
export default renderProducts;