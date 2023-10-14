// get quotes from API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    if (!quote.author) {
        quoteAuthor.textContent = "uknown";
    } else {
        quoteAuthor.textContent = quote.author;
    }; 

    if (quote.text.length>50) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

async function getQuotes() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors.bridged.cc/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl+apiUrl);
        apiQuotes = await response.json();
        return newQuote();
    }
    catch(error) {
        console.log(error);
        throw(error);
        }
};

//Tweet Quote
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.text} - ${quoteAuthor.textContent}`;
    window.open(twitterURL, '_blank');
};

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
