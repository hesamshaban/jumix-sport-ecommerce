import RenderArticleEngine from "./article-render.js";
class managerarticle{
    #divImport;
    #renderApi;
    #id;
    constructor(){
        this.getIdByHref()
        this.#renderApi = new RenderArticleEngine;
        this.loadArticle(this.#id)
        this.#divImport = document.getElementById("import-article");
        
    }
    async loadArticle(id){
        this.#renderApi.renderArticle(id).catch((e)=>{
            this.#divImport.innerHTML=`<h1 class ='error '>article not Loading...<br>${e}</h1>`
        })
        let render =await this.#renderApi.renderArticle(this.#id);
        this.#divImport.appendChild(render);
        
    }
    getIdByHref(){
        let params =  new URLSearchParams(window.location.search);
        this.#id = params.get("idArticle");
        
        if(this.#id === null){
            this.#id = "001";
        }
        
    }
}
new managerarticle
