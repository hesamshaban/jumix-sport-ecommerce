import renderOrApi from "./renderOrApi.js";
const footerParent = document.getElementById("footer-import");
new renderOrApi(  "./footer-template.html", "html" ,footerParent).managerEngin().then((result)=>{
    console.log(footerParent)
} , (error)=>{
    footerParent.innerHTML="<h1 class ='error '>footer no Loading...</h1>"
})