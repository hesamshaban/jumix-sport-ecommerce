import renderOrApi from "./renderOrApi.js";
const footerParent = document.getElementById("footer-import");
new renderOrApi(  "./footer-template.html", "html" ,footerParent).getHtmlType().then((result)=>{
    console.log(footerParent)
} , (error)=>{
    headerParent.innerHTML="<h1 class ='error '>footer no Loading...</h1>"
})