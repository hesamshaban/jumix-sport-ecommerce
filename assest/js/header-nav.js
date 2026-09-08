class headerEngine{
    #formatLonkMove = [
        {id:"shose",
            address:"./products.html",
            file:"shose",
            query:{
                
            }
        },
        {id:"volly",
            address:"./products.html",
            file:"volleyball",
            query:{
                fillter:"volleyball"
            }
        },
        {id:"basket",
            address:"./products.html",
            file:"basketball",

            query:{
                fillter:"basketball"
            }
        },
        {id:"collect",
            address:"./products.html",
            file:"collectioans",

            query:{
                
            }
        },
        {id:"about",
            address:"./articles.html",
            file:"about",

            query:{
                art:"about"
            }
        },
        {id:"contact",
            file:"contact",
            address:"./products.html",
            query:{
                art:"contact"
            }
        },
        {id:"cart",
            address:"./products.html",
            query:{
                
            }
        },
        {id:"login",
            address:"./products.html",
            query:{
            
            }
        },
        {id:"love",
            address:"./products.html",
            query:{
                
            }
        },
        {id:"home",
            address:"./index.html",
            query:{
            
            }
        },
    ]
    constructor(){
        this.queryStr = new URLSearchParams(window.location.search)
        const mainNavHeader = document.querySelector(".main-nav-header");
        mainNavHeader.addEventListener('click' , (e)=>{
            e.preventDefault()
            this.clickManagerHeader(e);

        })
        this.menuItemSelect();
        
    }
    clickManagerHeader(e){
        let btnClicked = e.target;
        switch(e.target.dataset.state){
            case "menuResponsive":
                this.menuRespon(e);        
                break;
            case "link":
                this.moveToPage(btnClicked);
        }        
    }
    menuRespon(e){
        const munuResponsive= document.getElementById("nav-bar-menu");
        munuResponsive.classList.toggle("menu-respon-m-hidden"); 
        let allItemMenu=[] ;
        for( let i of munuResponsive.children){
            allItemMenu.push(i.children[0]);
        }
        if(!(this.queryStr.get("file"))  ){
            allItemMenu[0].classList.add("selected-n-m");
        }
        else{
        allItemMenu.forEach((item) =>{
            // console.log(item.dataset.file , this.queryStr.get("file")  )
            if(item.dataset.file === this.queryStr.get("file")){
                item.classList.add("selected-n-m");
            }
            
        })
        }   
    }
    menuItemSelect(){
        const navMenuMainS = document.querySelector(".nav-bar>ul");
        let allItemMenu=[] ;
        for( let i of navMenuMainS.children){
            allItemMenu.push(i.children[0]);
        }
        if(!(this.queryStr.get("file"))  ){
            allItemMenu[0].classList.add("selected-n-m");
        }
        else{
        allItemMenu.forEach((item) =>{
            // console.log(item.dataset.file , this.queryStr.get("file")  )
            if(item.dataset.file === this.queryStr.get("file")){
                item.classList.add("selected-n-m");
            }
            
        })
        }  
    }
    moveToPage(e){
        // console.log(e);
        let item =this.#formatLonkMove.find(function(item){
            return item.id === e.dataset.idMove
        })
        let quryParams = new URLSearchParams();
        if(Object.keys(item.query).length === 0){
            window.location.href = item.address +`?file=${item.file}`
        }
        else{
            for(let i of Object.keys(item.query)){
                quryParams.append(i , item.query[i]);
            }
            quryParams.append("file", item.file);

            // console.log(quryParams.toString())
            window.location.href = item.address+"?" + quryParams.toString()

        }
        
    }

}
new headerEngine