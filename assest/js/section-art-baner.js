import renderOrApi from "./renderOrApi.js";
import articleApiEngine from "./article-api.js";

class renderBanner{
    #calssRender;
    constructor(){
        const wraperBanner = document.getElementById("banner-article-import")
        this.renderArticle(wraperBanner);
    }
    async renderArticle(wraper ){
        await new renderOrApi( "./template-aticle-banner.html","html", wraper ).managerEngin();
        let item =await new articleApiEngine().creatList("singel")
    console.log(item);
    this.setText(item)
    
    }
    setText(item){
        const cover = document.querySelector(".main-banner-art img");
        const category = document.querySelector(".main-banner-art .title-mba h3");
        const title = document.querySelector(".main-banner-art .title-mba h2");
        const caption = document.querySelector(".main-banner-art .title-mba p");
        const btn = document.querySelector(".main-banner-art .title-mba button");
        cover.setAttribute("src" , item.cover);
        cover.setAttribute("alt" , item.category);
        category.textContent = item.category;
        title.textContent = item.title;
        caption.textContent = item.caption;
        btn.addEventListener("click",(e)=>{
            window.location.href =`./article.html?idArticle=${item.id}`;
        })
        
    }
}
new renderBanner;