import RenderArticleEngin from "./article-render.js";
class articelsEngin{
    #renderApi
    #pageClick =0;
    #wraperPage;
    #allList;
    constructor(){
        this.#renderApi = new RenderArticleEngin();
        this.callRender();
    }
    async callRender(typeSort , prop){
        let respon = await this.#renderApi.renderallList(typeSort , prop); 
        let mainList = this.listedItem(respon , 9);
         (mainList);
        let allBtn = this.creatBTN(mainList);
         (allBtn);
        // let x = this.creatBTN([1,2,3,4]);
        this.#wraperPage = document.getElementById("id-product-art");
        this.#allList = mainList;
        this.managerPage(); 
        const wraperBtn= document.getElementById("id-fotter-main"); 
        this.managetBtn(wraperBtn , allBtn);
            
    }
    managerPage(type="frist"){
        if(type === "frist"){
            let pageShow = this.#allList[this.#pageClick];
            pageShow.forEach(item =>{
                this.#wraperPage.appendChild(item);
            })
        }else if(type === "secend"){
            this.#wraperPage.innerHTML = '';
            let pageShow = this.#allList[this.#pageClick];
            pageShow.forEach(item =>{
                this.#wraperPage.appendChild(item);
            })
        }
    }
    managetBtn(wrapBtn , allbtn){
        allbtn.forEach(btn =>{
            wrapBtn.appendChild(btn);
        })
        wrapBtn.addEventListener("click" , (e)=>{
            if(e.target !== e.currentTarget){
                this.clickChangeArt(e);
                for(let btn of wrapBtn.children){
                    if(btn.classList.contains("select-page")){
                        btn.classList.remove("select-page");
                    }
                }
                e.target.classList.add("select-page");
            }
        });
    }
    clickChangeArt(e){
            this.#pageClick = Number(e.target.textContent)-1;
            this.managerPage("secend")
    }
    listedItem(respon , number = 8){
        let numberPage = Math.ceil(respon.length / number) ;
        let numbs = 0;
        let allList = [];
        let listSingel = [];
        respon.forEach(el => {
            listSingel.push(el);
            if(listSingel.length >=number){
                allList.push(listSingel);
                listSingel= [];
                numberPage  = numberPage-1;
            }
            if(numberPage === 1 && respon[respon.length -1] === el){
                allList.push(listSingel)
            }
        });
       return allList;
        
    }
    creatBTN(numb){
        let listBtn= [];
        for(let i =1 ; i<=numb.length;i++){ 
            let btnL = document.createElement("button");
            btnL.textContent=i;
            listBtn.push(btnL);
        };
        return listBtn;
    }
}
new articelsEngin();


