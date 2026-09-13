import articleApiEngine from "./article-api.js";
class RenderArticleEngine{
    #resApi
    constructor(){
        this.#resApi  =new articleApiEngine;
        
    }
    async renderArticle(id){
        let res = await this.#resApi.setByIdArticle(id);
        let bodyArticle = document.createElement("div");
        bodyArticle.setAttribute("dir" , res.dir);
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
    async renderListArticleGrup(typeList){
        let listArt = await this.#resApi.creatList(typeList);
        let responMain;
        switch(typeList){
            case "random":
                responMain = renderGruopList();
                break;
            case "timer":
                responMain = renderGruopList();
                break;
            default:
                responMain = renderGruopList();
                break;
        }
        return responMain;
        // responMain = renderRandomList();
        function renderGruopList(){
            let divWraperList = document.createElement("div");
            divWraperList.classList.add("wraper-item-list-article");
            listArt.forEach((item)=>{
                let divCardArt = document.createElement("div");
                divCardArt.classList.add("card-article");
                {// for image =>
                    let divwrapImg = document.createElement("div");
                    divwrapImg.classList.add("img-title");
                    let imgTag = document.createElement("img");
                    imgTag.setAttribute("src" , item.cover);
                    imgTag.setAttribute("alt" , item.category);
                    divwrapImg.appendChild(imgTag);
                    divCardArt.appendChild(divwrapImg);
                }
                {// title
                    let divTitleWrap = document.createElement("div");
                    divTitleWrap.classList.add("card-title-text");
                    let divCatgoriTag = document.createElement("h4");
                    divCatgoriTag.classList.add("item-category");
                    divCatgoriTag.textContent = item.category;
                    let titleTag = document.createElement("h2");
                    titleTag.classList.add("item-header");
                    let linkMainTitle = document.createElement("a");
                    linkMainTitle.textContent= item.title;
                    linkMainTitle.setAttribute("href",`./article.html?idArticle=${item.id}`);
                    titleTag.appendChild(linkMainTitle);
                    let divItemInformation = document.createElement("div");
                    divItemInformation.classList.add("wraper-item-information");
                    let timeCreateTag = document.createElement("h4");
                    timeCreateTag.classList.add("item-time-create");
                    timeCreateTag.textContent = item.timeC;
                    let timeReadingTag = document.createElement("h4");
                    timeReadingTag.classList.add("item-time-reading");
                    timeReadingTag.textContent = `${timeReadingfunc(item.content)}min read`;
                    divItemInformation.appendChild(timeCreateTag);
                    divItemInformation.appendChild(timeReadingTag);
                    divTitleWrap.appendChild(divCatgoriTag);
                    divTitleWrap.appendChild(titleTag);
                    divTitleWrap.appendChild(divItemInformation);
                    divCardArt.appendChild(divTitleWrap);
                }
                divWraperList.appendChild(divCardArt);
                

            })
            return divWraperList;
        }



        /////func 
        function timeReadingfunc(content){
        let  numbs= content.filter((item)=>{
            return item.type === "paragraph";
        }) 
        return numbs.length
        }
    }
    async renderallList(typeSort="none" , prop){
        let respon = await this.#resApi.allArticle();
        let listArt = [];
        switch(typeSort){
            case "none":
                noneHandeler(respon);
                break;
        }
        return listArt;
        function timerHandeler(){

        }
        function noneHandeler(respon){
            rendererList(respon); 
        }



        /////////////rendiring
        function rendererList(list){
            list.forEach((item)=>{
                listArt.push(renderitemArt(item));
                
                
                
            })
            function renderitemArt(item){
                let artWrapItem = document.createElement("div");
                artWrapItem.classList.add("card-art-wrap");
                artWrapItem.setAttribute("dir" , item.dir);
                let imgTag = document.createElement("img");
                imgTag.setAttribute("src",item.cover);
                imgTag.setAttribute("alt" , item.category);
                artWrapItem.appendChild(imgTag);
                {
                    let divWrapTitle = document.createElement("div");
                    divWrapTitle.classList.add("title-card-art");
                    let categotyTag = document.createElement("h4");
                    categotyTag.classList.add("categoory-card");
                    categotyTag.textContent = item.category;
                    let titleTag = document.createElement("h2");
                    titleTag.classList.add("title-main-card");
                    let linkArt = document.createElement("a");
                    linkArt.setAttribute("href" , `./article.html?idArticle=${item.id}`)
                    linkArt.textContent=item.title;
                    titleTag.appendChild(linkArt);
                    let captionTag = document.createElement("p");
                    captionTag.classList.add("caption-card");
                    captionTag.textContent = item.caption;
                    let footerCardTag = document.createElement("div");
                    footerCardTag.classList.add("footer-card");
                    {
                        let nasherTag = document.createElement("h5");
                        nasherTag.classList.add("nasher");
                        nasherTag.textContent= item?.nasher || "Jumix Team";
                        let timeReadingTag = document.createElement("h5");
                        timeReadingTag.classList.add("time-reading");
                        timeReadingTag.textContent = `${timeReadingfunc(item.content)}min read`;
                        footerCardTag.appendChild(nasherTag);
                        footerCardTag.appendChild(timeReadingTag);
                    }
                    divWrapTitle.appendChild(categotyTag);
                    divWrapTitle.appendChild(titleTag);
                    divWrapTitle.appendChild(captionTag);
                    divWrapTitle.appendChild(footerCardTag);
                    artWrapItem.appendChild(divWrapTitle);
                }
                return artWrapItem;
            }
            function timeReadingfunc(content){
                let  numbs= content.filter((item)=>{
                    return item.type === "paragraph";
                }) 
                return numbs.length
                }
        }

    }
    
}
export default RenderArticleEngine;
