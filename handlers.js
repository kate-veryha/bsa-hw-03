const keyupSearchHandler = () => {
    let input = document.getElementById('search-box');
    let headings = document.querySelectorAll('h2');
    console.log(headings);
    let filter = input.value.toLowerCase();
    for (let i = 0; i < headings.length; i++) {
        if (headings[i].textContent.toLowerCase().indexOf(filter) > -1) {
            headings[i].parentNode.parentNode.style.display = "";
        } else {
            headings[i].parentNode.parentNode.style.display = "none";
        }
    }
};

document.getElementById('search-box').addEventListener('keyup', keyupSearchHandler);
