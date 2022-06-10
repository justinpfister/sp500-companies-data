import axios from 'axios';
import jsdom from 'jsdom';

let sayhi = async () => {
    const t = await getsp500();
    console.log(t);
}




let getsp500 = async () => {

    // https://en.wikipedia.org/wiki/List_of_S%26P_500_companies
    const response = await axios.get("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies",{ responseType: 'blob',});
    const file = response.data;

console.log(file);

    
}


sayhi();