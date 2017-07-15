const tagsList = document.querySelectorAll('#tags li');
let storedTags = JSON.parse(localStorage.getItem('storedTags'))||{
        'Sport':false,
        'Politics':false,
        'Food':false,
        'Business':false,
        'Tech':false,
        'Culture':false,
        'Showbiz':false,
    };

const handleClick = e => {
    if (!storedTags[e.target.textContent]) {
        storedTags[e.target.textContent] = true;
        localStorage.setItem('storedTags', JSON.stringify(storedTags));
        e.target.classList.add('red');
    }
};

for (let i=0;i<tagsList.length;i++) {
    tagsList[i].addEventListener('click',handleClick );
    if (storedTags[tagsList[i].textContent]) {
        tagsList[i].classList.add('red');
    }
};

