
import myData from './AnodeSubstrate.json';


const ReadAndodeJSON=(chemicalName)=>{
    for (let index = 0; index < myData.Sheet1.length; index++) {
        const element = myData.Sheet1[index];
        
        if (element["Anode substrate (s)"]===chemicalName){
            

            return (

                {value:element}
                

            )
        }
        
    }
    

    return false

}

export default ReadAndodeJSON