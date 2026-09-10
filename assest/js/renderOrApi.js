class renderOrApi{
    #ElemParent
    #htmlChild
    #url
    #typeFile;
    constructor( url ,  typeFile="json" , elemParent){
        this.#url = url
        this.#ElemParent = elemParent;
        // this.managerEngin(typeFile);
        this.#typeFile = typeFile;

    }
    async managerEngin(){
        switch(this.#typeFile){
            case "html":
                await this.getHtmlType()
                break;
            case "json":
                // get json type
                break;
            default:
                throw new Error("type file not found😥");
                break
        }
        
        
    }
    async getHtmlType(){
        try{
        let respon = await fetch(this.#url);
       
            if(respon.status == 200){
            let date = await respon.text();
            this.#htmlChild = date;
            
            }else{
            
            this.#htmlChild = `<h1 class='error'>erorr Code: ${respon.status} , text: ${respon.statusText} </h1>`
                
            }
        }catch(e){
            this.#htmlChild = "<h1 class='error'>erorr Loading ...</h1>"
        
        }
        this.setDatahtml()

    }
    setDatahtml(){
        this.#ElemParent.innerHTML = this.#htmlChild;
        
    }
    
}
export default renderOrApi;