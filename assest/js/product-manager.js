import GetApi from "./api-product.js";
new class{
    #idProduct;
    #objectProduct;
    #sizeSelect;
    #allBrnSize =[];
    #colorSelect;
    #allBtnColor=[];
    constructor(){
        console.log("iren");
        this.getIdBySearch();
        this.getIdApi()
    }
   async manager(){
    this.setImage();
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
        this.#idProduct = paarms.get("idProduct") 
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
            this.#allBtnColor.push(btn)
            wrapBtnColer.appendChild(btn)
            btn.addEventListener("click" , e=>{
                this.#allBtnColor.forEach((btn)=>{
                    btn.classList.remove("select");
                })
                this.#colorSelect = e.target.textContent;
                e.target.classList.add("select")
            })
        });
    }
}