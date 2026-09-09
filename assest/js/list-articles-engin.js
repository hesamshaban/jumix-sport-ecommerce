import renderOrApi from "./renderOrApi.js";
const listArticleParent = document.getElementById("list-article-import");
new renderOrApi(  "./article-list-teplate.html", "html" ,listArticleParent).managerEngin().then((result)=>{
    console.log(listArticleParent);
} , (error)=>{
    
    listArticleParent.innerHTML="<h1 class ='error '>List Article no Loading...</h1>"
})
// coming sooon