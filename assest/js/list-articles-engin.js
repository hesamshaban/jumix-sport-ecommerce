import renderOrApi from "./renderOrApi.js";
import RenderArticleEngine from "./article-render.js";
const listArticleParent = document.getElementById("list-article-import");

new renderOrApi(  "./article-list-teplate.html", "html" ,listArticleParent).managerEngin().then((result)=>{
    const listTag = document.getElementById("listTagMain");
    new managerList().setList(listTag);
} , (error)=>{
    
    listArticleParent.innerHTML="<h1 class ='error '>List Article no Loading...</h1>"
})
class managerList{
    #renderArticleEngine;
    constructor(){
        this.#renderArticleEngine = new RenderArticleEngine();
    }
    async setList(listTag){
        let typeList = listArticleParent.dataset.type;
        let itemTarget =await this.#renderArticleEngine.renderListArticleGrup(typeList);
        listTag.appendChild(itemTarget);
    }
}
