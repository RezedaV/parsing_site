//node parsing.js

const  axios = require('axios');
const  cheerio = require('cheerio');
const fs = require('fs');


const  parse = async () =>{
    const getHTML = async (url) => {
        const {data} = await axios.get(url)
        return cheerio.load(data)
    }

    const $ = await getHTML('https://opoznai.bg/all/sort:popular_ever')
    const  pageNumber = $('#main_layout_content > section.browse_list > div.browse_paging > div.browse_paging_middle > a').eq(0).text();
    //сейчас по умолчанию выбрана только страница 1
    for (let i=1; i <= pageNumber; i++){
        const selector = await getHTML(`https://opoznai.bg/all/sort:popular_ever/page:${i}`);
        selector('#guides_container > article > div > div.article_padding').each((i, element) => {
            const title = selector(element).find('h3 > a').text();
            const link = `https://opoznai.bg/${selector(element).find('a').attr('href')}`;
            // console.log(title, link);
            fs.appendFileSync('./data2.csv', `${title}; ${link}\n`)
        })
    }
}
parse();



