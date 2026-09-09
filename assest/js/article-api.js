class articleApiEngine{
    #urlApi = "./assest/date/articles.json"
    #typeList
    #singelType;
    constructor( method="article" , id="001"  , typeList , singelType){
        switch(method){
            case "article":
                this.setResponArticle(id);
                break;
            case "list":
                this.#singelType = singelType;
                this.#typeList = typeList;
                this.creatList();
                break;
            default:
                throw new Error("method get api Error😤");
        }
    }
    async getApi(){
        let respon = await fetch(this.#urlApi);
        let date =await respon.json();
        return date
        
    }
    async creatList(){
        let respon = await this.getApi();
        switch (this.#typeList){
            case "random":
                randomList(respon);
                break;
            case "timer":
                timeAsList(respon);
                break;
            case "sinel":
                singelList(respon)
                break;
            default :
                randomList(respon);
                break;
        }
        function randomList(res){
            let listRandomItem = [];
            let listRandomNumber=[] ;
            while(listRandomNumber.length < 4 ){
                let num = Math.floor(Math.random()* res.length);
                let condition= listRandomNumber.every((i)=>{
                    return i !== num;
                })
                if(condition){
                    listRandomNumber.push(num);
                }
            }
            // for(let i=0 ;i<4;i++ ){
            //     listRandomItem.push(res[Math.floor(Math.random()* res.length)]);
                
            // }
            console.log(listRandomNumber);
            
        }
        function timeAsList(res){

        }
        function singelList(res){

        }
    }
    async setResponArticle(id){
        let artMain;
        let respon = await this.getApi();
        artMain = respon.find(art => {
            return art.id === id;
        });
        if(artMain === undefined){
            throw new Error("id not found!!🤬");
            
        }
        return artMain;
    }
}


new articleApiEngine("list" , "001" , "random")
