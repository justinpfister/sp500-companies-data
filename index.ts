import axios from 'axios';
import cheerio from 'cheerio';
import ObjectsToCsv from 'objects-to-csv';

let getsp500 = async () => {

    // https://en.wikipedia.org/wiki/List_of_S%26P_500_companies
    const response = await axios.get("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies",{ responseType: 'blob',});
    const file = response;

    const $ = cheerio.load(file.data);

    const companies = $("#constituents > tbody > tr").map( (index,element) => {
        //console.log($(element).html());

        let ticker = $($(element).find("td")[0]).text().replace(/\n/g,'');
        let security = $($(element).find("td")[1]).text();
        let sector = $($(element).find("td")[3]).text();
        let industry = $($(element).find("td")[4]).text();
        let hq = $($(element).find("td")[5]).text();
        let date_first_added = $($(element).find("td")[6]).text();
        let cik = $($(element).find("td")[7]).text();
        let founded = $($(element).find("td")[8]).text().replace(/\n/g,'');


        let vars = {
            ticker:ticker,
            company:security,
            sector:sector,
            industry:industry,
            hq:hq,
            date_first_added:date_first_added,
            cik:cik,
            founded:founded
        };

        return vars;

    }).toArray();

    companies.shift(); // chop out the blank row.
    const csv = new ObjectsToCsv(companies);

    // Save to file:
    await csv.toDisk(__dirname + '/data/companies.csv');

    // Return the CSV file as string:
    console.log(await csv.toString());
    console.log("updated company list");
    
    return;

    
    
}


getsp500();