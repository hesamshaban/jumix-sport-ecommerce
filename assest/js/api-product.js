class apiFilterProduct{
    static #urlDate = "./assest/date/products.json";
    static #listAllCatch;
    static async allApi(){
        if(apiFilterProduct.#listAllCatch === undefined){
            let respon = await fetch(this.#urlDate);
            if(respon.ok && respon.status === 200){
                let date = await respon.json();
                apiFilterProduct.#listAllCatch = date;
                return (date);
            }
            else{
                // throw new Error("error");
                return {error:true, status:respon.status , statusText:respon.statusText }
            }
        }else{
            return apiFilterProduct.#listAllCatch;
        }
    }
    async filterProduct(filters){
        let allProducts = await apiFilterProduct.allApi();
        //  (filters , Object.keys(filters[0]).join() , Object.values(filters[0]));
        let listFiltered = [allProducts];
        for (let item of filters){
            let filterKey = Object.keys(item).join();
            let filterValues = Object.values(item).join();
            let sucses = listFiltered[filters.indexOf(item)].filter((item)=>{
                return item[filterKey] === filterValues
            });
            listFiltered.push(sucses);
            
        }
        return listFiltered[listFiltered.length -1];
        

        
    }
    async sortingProducts(list , typeSort){
        let listMain = [];
        switch(typeSort){
            case "priceLtoH":
                listMain =sortLtHP();
                break;
            case "priceHtoL":
                listMain =sortHtLP();
                break;
            case "timeLtoH":
                listMain =sortLtoHT();
                break;
            case "timeHtoL":
                listMain =sortHtoLT();
                break;
            default:
                return {error:true, status:"404 typeSort😎" , statusText:"sort type not found😋" }
                break
        }
        return listMain;
        function sortLtHP(){
            let listSecend = [];
            listSecend = list.sort((a,b)=>{
                return a.price - b.price;
            })
            return listSecend;
        }
        function sortHtLP(){
            let listSecend = [];
            listSecend = list.sort((a,b)=>{
                return b.price - a.price;
            })
            return listSecend;
        }
        function sortLtoHT(){
            let listSecend = [];
            listSecend = list.sort((a,b)=>{
                
                let aTime =timeToNumber(a.timeC);
                let bTime=timeToNumber(b.timeC)
                //  (aTime , bTime);
                return aTime - bTime;
            })
            return listSecend;

        }
        function sortHtoLT(){
            let listSecend = [];
            listSecend = list.sort((a,b)=>{
                
                let aTime =timeToNumber(a.timeC);
                let bTime=timeToNumber(b.timeC)
                //  (aTime , bTime);
                return bTime - aTime;
            })
            return listSecend;

        }
        function timeToNumber(A){
            let TimeA =(A).split("/");
            TimeA[0]= Number(TimeA[0]);
            TimeA[1]= Number(TimeA[1]);
            TimeA[2]= Number(TimeA[2]);
            TimeA[0] = TimeA[0]*12*30;
            TimeA[1]=TimeA[1]*30;
            return TimeA = (TimeA[0]+TimeA[1]+TimeA[2]);
        }
    }
    async getApiById(id){
        let allProducts =await apiFilterProduct.allApi();
        let productById =allProducts.find((item)=>{
            return item.id === id;
        })
        return productById;
    }
    async getAllApi(){
        let allProducts = await apiFilterProduct.allApi();
        return allProducts;
    }
}
export default apiFilterProduct;
// example:==>
// async function call() {
//     let y=await apiFilterProduct.allApi();
//     let x=await new apiFilterProduct().filterProduct({category:"volleyball"} , {type:"performance"});
//     let t = await new apiFilterProduct().sortingProducts(y , "timeHtoL");
//      (t);
   
// }