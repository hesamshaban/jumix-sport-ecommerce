import articleApiEngine from "./article-api.js";
class RenderArticleEngine{
    #resApi
    constructor(){
        this.#resApi  =new articleApiEngine;
        
    }
    async renderArticle(id){
        let res = await this.#resApi.setByIdArticle(id);
        let bodyArticle = document.createElement("div");
        let headerMain = craetHeader();
        let bodyMain = creatContent(res.content)
        bodyArticle.appendChild(headerMain);
        bodyArticle.appendChild(bodyMain);
        return bodyArticle;
        function craetHeader(){
            let headerArticle = document.createElement("header");
            headerArticle.classList.add("header-main-article");
            {
                let divWraperImage = document.createElement("div");
                divWraperImage.classList.add("img-header-artricle");
                let imgHeader = document.createElement("img");
                imgHeader.setAttribute("src" , res.cover);
                divWraperImage.appendChild(imgHeader);
                headerArticle.appendChild(divWraperImage);
            }
            {
                let divWraperTitleHeader = document.createElement("div");
                divWraperTitleHeader.classList.add("title-header-article");
                let divCategoryHeader = document.createElement("h2");
                divCategoryHeader.classList.add("category-article");
                divCategoryHeader.textContent = res.category;
                let divTitleHeader = document.createElement("h1");
                divTitleHeader.classList.add("title-article");
                divTitleHeader.textContent = res.title;
                let divCaptionHeader = document.createElement("p");
                divCaptionHeader.classList.add("caption-article");
                divCaptionHeader.textContent = res.caption;
                let divDitailsHeader = document.createElement("div");
                divDitailsHeader.classList.add("ditails-article");
                {
                    let timeCreatHader = document.createElement("h5");
                    timeCreatHader.classList.add("time-create");
                    timeCreatHader.textContent = res.timeC;
                    let timeReadingHeader = document.createElement("h5");
                    timeReadingHeader.classList.add("time-reading");
                    timeReadingHeader.textContent = `${timeReadingfunc(res.content)}min read`;
                    let wiewHeader = document.createElement("h5");
                    wiewHeader.classList.add("views-article");
                    wiewHeader.textContent =`${Math.floor(Math.random()*10)}k views`;
                    divDitailsHeader.appendChild(timeCreatHader);
                    divDitailsHeader.appendChild(timeReadingHeader);
                    divDitailsHeader.appendChild(wiewHeader);

                } 
                divWraperTitleHeader.appendChild(divCategoryHeader);
                divWraperTitleHeader.appendChild(divTitleHeader);
                divWraperTitleHeader.appendChild(divCaptionHeader);
                divWraperTitleHeader.appendChild(divDitailsHeader);
                headerArticle.appendChild(divWraperTitleHeader);

            }
            return headerArticle;
        }
        function creatContent(cont){
            let importTag = document.createElement("div");
            importTag.classList.add("impoert-article");
            let mainBlock = document.createElement("div");
            mainBlock.classList.add("block-text-art");
            cont.forEach(item => {
                let plusItem;
                switch( item.type){
                    case "heading":
                        plusItem = craetHeading(item);
                        mainBlock.appendChild(plusItem);
                        break;
                    case "paragraph":
                        plusItem = craetParagraph(item);
                        mainBlock.appendChild(plusItem )
                        break;
                    case "img":
                        plusItem = craetImage(item);
                        mainBlock.appendChild(plusItem);
                        break;
                    case "quote":
                        plusItem = craetQuote(item);
                        mainBlock.appendChild(plusItem);
                        break;
                    default:
                        throw new Error("type content not found😎");
                }
            });
            importTag.appendChild(mainBlock);
            return importTag;
            function craetHeading(item){
                let headTag = document.createElement("h3");
                headTag.classList.add("title-text-art");
                headTag.textContent = item.value;
                return headTag;
            }
            function craetParagraph(item){
                let paraTag = document.createElement("p");
                paraTag.classList.add("body-text-art");
                paraTag.textContent = item.value;
                return paraTag;
            }
            function craetImage(item){
                let figurTag = document.createElement("figure");
                figurTag.classList.add("img-text-art");
                {
                    let imgTag = document.createElement("img");
                    imgTag.setAttribute("src" , item.value);
                    imgTag.setAttribute("alt" , item.alt);
                    let figCaption = document.createElement("figcaption");
                    figCaption.classList.add("caption-img-text-art");
                    figCaption.textContent = item.caption;
                    figurTag.appendChild(imgTag);
                    figurTag.appendChild(figCaption);
                }
                return figurTag;
            }
            function craetQuote(item){
                let quoteTag = document.createElement("div");
                quoteTag.classList.add("Quote-text-art");
                {
                    let iTag = document.createElement("i");
                    iTag.textContent = ",,";
                    let textTag = document.createElement("p");
                    textTag.classList.add("Quote-cap-text-art");
                    textTag.textContent = item.value;
                    let authorTag  =document.createElement("p")
                    authorTag.classList.add("author-Quote-text-art");
                    authorTag.textContent = item.author;
                    quoteTag.appendChild(iTag);
                    quoteTag.appendChild(textTag);
                    quoteTag.appendChild(authorTag);
                }
                return quoteTag;
            }
        }
        function timeReadingfunc(content){
        let  numbs= content.filter((item)=>{
            return item.type === "paragraph";
        }) 
        return numbs.length
        }
    }
    
}
export default RenderArticleEngine;
