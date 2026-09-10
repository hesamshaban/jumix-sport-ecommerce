export { articleApiEngine};

class articleApiEngine{
    #urlApi = "./assest/date/articles.json"
    #typeList
    #singelType;
    constructor(){
        
    }
    async getApi(){
        let respon = await fetch(this.#urlApi);
        let date =await respon.json();
        return date
        
    }
    async allArticle(){
        let allArt = await this.getApi();
        return allArt;
    }
    async creatList(typeList){
         this.#typeList =typeList
        let itemFainaly;

        let respon = await this.getApi();
        switch (this.#typeList){
            case "random":
                randomList(respon);
                break;
            case "timer":
                timeAsList(respon);
                break;
            case "singel":
                singelList(respon)
                break;
            default :
                randomList(respon);
                break;
        }
        function randomList(res){
            let listRandomItem = [];
            let listRandomNumber=[] ;
            if(res.length >=4){
                while(listRandomNumber.length < 4 ){
                    let num = Math.floor(Math.random()* res.length);
                    let condition= listRandomNumber.every((i)=>{
                        return i !== num;
                    })
                    if(condition){
                        listRandomNumber.push(num);
                    }
                }
                listRandomNumber.forEach((i)=>{
                    listRandomItem.push(res[i])
                })
            }
            else{
                for(let i=0 ;i<4;i++ ){
                    listRandomItem.push(res[Math.floor(Math.random()* res.length)]);
                    
                }
            }
            itemFainaly = listRandomItem;
            
        }
        function timeAsList(res){
            //coming soon
        }
        function singelList(res){
            // singel time with time Coming soooooon
            let listSingelItem =(res[Math.floor(Math.random()* res.length)]);
            itemFainaly = listSingelItem;

            
        }
        return itemFainaly;
    }
    async setByIdArticle(id){
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

export default articleApiEngine;

