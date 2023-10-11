// get quotes from API
let apiQuotes = [];

function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log("new quote is", quote);
    console.log("quote text is", quote.text);
    console.log("quote authro is", quote.author);
    return quote;
}

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        return newQuote();
    }
    catch(error) {
        console.log(error);
        throw(error);
        }
};



async function insertNewQuote() {
    let currentQuote = document.getElementById("quote");
    let currentAuthor = document.getElementById("author");
    try {
        let newQuote = await getQuotes();
        currentQuote.innerText = newQuote.text;
        currentAuthor.innerText = newQuote.author;
    }
    catch (error) {
        console.log(error);
    }
}

let nextButton = document.getElementById("new-quote");
nextButton.addEventListener("click", insertNewQuote);
