let newsData;
const mainDiv = document.getElementById('main-container');

const createNewsItem = (title, description, imgSrc, createdAt, tags, deleteButtonHandler) => {
    let div = document.createElement("div");
    div.innerHTML = `<div class="img-container">
                        <img src="${imgSrc}">
                     </div>
                     <div class="text-container">
                        <h2>${title}</h2>
                        <p>${description}</p>
                        <p class="tags">${tags.toString()}</p>
                        <p class="date">${longToShortStringDate(createdAt)}</p>
                        <a class="delete-button" onclick="${deleteButtonHandler}">Delete post</a>
                     </div>`;
    div.classList.add("news-item-container");
    mainDiv.appendChild(div);
};

const loadMoreNews = (news, iter) => {
    for (let i = 0; i < 10; i++) {
        createNewsItem(
            news[i+iter].title,
            news[i+iter].description,
            news[i+iter].image,
            news[i+iter].createdAt,
            news[i+iter].tags,
            clickDeleteHandler)
    }
};

const clickDeleteHandler = e => {
    alert('aaa');
    console.log(e.target);
    document.getElementById('main-container').removeChild(e.parentNode.parentNode);
};

function longToShortStringDate (longDate) {
    const inputDate = new Date(longDate);
    return `${inputDate.getDay()}.${inputDate.getMonth()}.${inputDate.getFullYear()}`
};

function checkTags (objTags) {
    //get stored tags
    let storedTags = JSON.parse(localStorage.getItem('storedTags'));
    if (storedTags == null)
        return false;
    let tags = [];
    for (let key in storedTags) {
        if (storedTags[key]) {
            tags.push(key);
        }
    }
    return tags.every( item => objTags.indexOf(item) >= 0 );
};

function sortAndDivide(newsArr) {
    newsArr.sort(sortNewsItemByDate);
    let newsArrWithTags = [];
    let newsArrWithoutTags = [];
    for (let i = 0; i < newsArr.length; i++) {
        if (checkTags(newsArr[i].tags)) {
            newsArrWithTags.push(newsArr[i]);
        } else {
            newsArrWithoutTags.push(newsArr[i]);
        }
    }
    return newsArrWithTags.concat(newsArrWithoutTags);
};

function sortNewsItemByDate(objA, objB) {
    let dateA = new Date(objA['createdAt']);
    let dateB = new Date(objB['createdAt']);
    return dateA - dateB;
};


const request = new XMLHttpRequest();
request.open('GET', 'http://api.myjson.com/bins/152f9j');
request.setRequestHeader('Content-Type', 'application/json');
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
        newsData = sortAndDivide(
            JSON.parse(this.responseText).data
        );
        loadMoreNews(newsData, 0);
    }
};
request.send();


let iteration = 1;
mainDiv.addEventListener('scroll', function () {
    if (mainDiv.scrollTop + mainDiv.clientHeight >= mainDiv.scrollHeight) {
        loadMoreNews(newsData, iteration);
    }
    iteration++;
});
