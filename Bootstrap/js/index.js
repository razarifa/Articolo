const main_input = document.getElementById('main__input');
const input_container = document.getElementById('input__container');
const hero = document.getElementById('hero');
const h1_input = document.getElementById('input__h1');
const submit = document.getElementById('button-div');
const second = document.getElementById('second');
const article__container = document.getElementById('article-container');
const dateFrom = document.getElementById('example-date-input1');
const dateTo = document.getElementById('example-date-input');
const lang = document.getElementById('inlineFormCustomSelectPref');
var say = 0;
var articleCount = 0;
var ArticleCountArray = [];
var a = '';
var __url = null;
var state = [];

main_input.addEventListener('focus', () => {
    hero.style.display = 'none';
    main_input.style.border = '1px solid yellow';
    main_input.style.boxShadow = '10px 10px 5px 0px rgba(0, 0, 0, 0.75)';
    main_input.classList.remove('btn', 'btn-success');
});


RemoveAll = () => {
    if (say > 1) {
        for (var i = 0; i < ArticleCountArray[ArticleCountArray.length - 2]; i++) {
            article__container.removeChild(article__container.firstChild);
        }
    }
    console.log(articleCount);

}




submit.addEventListener('click', () => {

    hero.style.display = 'flex';
    main_input.classList.add('btn');

    a = main_input.value;
    const from = dateFrom.value;
    const to = dateTo.value;
    const la = lang.value;

    __url = "https://newsapi.org/v2/everything?qInTitle=" + a + "&from=" + from + "&to=" + to + "&language=" + la + "&sortBy=popularity&apiKey=ab7ca628e8d444948d10e47cea4f1755 ";
    console.log(a);
    main_input.value = '';
    Funk();
    // console.log(state);


});

const Funk = async() => {
    say++;
    const resolved = await fetch(__url);
    const afterJson = await resolved.json();

    articleCount = afterJson.articles.length;
    ArticleCountArray.push(articleCount);

    console.log(ArticleCountArray);
    afterJson.articles.forEach(element => {
        state.push(element);
    });

    state.splice(0, 20).forEach(element => {
        const yeni = CreateNewArticle(element);
        article__container.appendChild(yeni);
    });
    RemoveAll();
}

CreateNewArticle = article => {
    const { author, title, description, url, urlToImage, publishedAt, content } = article;
    const new_article = document.createElement('div');

    new_article.classList.add('article__div', 'd-flex', 'justify-content-between', 'mb-3', 'border', 'border-light', 'rounded', 'p-5', 'flex-column', 'flex-md-row');
    new_article.innerHTML = `

    <div class="article__div-content-img col-12 col-md-5 mt-3 mb-3">
    <a href="${urlToImage}" target="_blank">
    <img src="${urlToImage}" class="rounded"/>
    </a>
    </div>
    <div class="article__div-content d-flex flex-column col-md-6 flex-wrap h-100">
    <h2 class="article__title h-25"><a href="${url}">${title}</a>
    </h2>
    <p class="date">${publishedAt.slice(0, 10)}</p>
    <div class="article__content d-flex flex-wrap h-50">${description.slice(0,200)}..
    </div>
   <div class="d-flex"><a href="${url}" target="_blank" class="read-more btn btn-warning d-flex justify-content-center w-50 w-sm-25 h-25 mt-2">More</a> </div>
 
    
</div>
`


    return new_article;
}

// deyishiklik etdim