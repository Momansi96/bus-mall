'use strict' 

let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let items = [];

function itemImg(itemName) {
    //'cruisin-goat.jpg'.split('.') >>['cruisin-goat','jpg']
    this.itemName = itemName.split('.')[0];
    this.source = 'img/' + itemName;
    this.clicks = 0;
    this.views = 0;
    items.push(this);
}

let itemImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'braekfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']

for (let i = 0; i < itemImages.length; i++) {
    new itemImg (itemImages[i]);
}

function generateImage() {
    
    return Math.floor(Math.random() * items.length);
}

let lImgEl = document.getElementById('leftImg');
let rImgEl = document.getElementById('rightImg');
let cImgEl = document.getElementById('centerImg'); 

let leftImgIndex;
let rightImgIndex;
let centerImgIndex; 

function renderImg() {
    leftImgIndex = generateImage();
    rightImgIndex = generateImage();
    centerImgIndex = generateImage(); 

    while (leftImgIndex === rightImgIndex) {
        leftImgIndex = generateImage();
    }
    while (centerImgIndex === leftImgIndex) {
        centerImgIndex = generateImage(); 
    }

    lImgEl.setAttribute('src', items[leftImgIndex].source);
    lImgEl.setAttribute('title', items[leftImgIndex].source);
    items[leftImgIndex].views++;

    rImgEl.setAttribute('src', items[rightImgIndex].source);
    rImgEl.setAttribute('title', items[rightImgIndex].source);
    items[rightImgIndex].views++;
    
    cImgEl.setAttribute('src', items[centerImgIndex].source);
    cImgEl.setAttribute('title', items[centerImgIndex].source);
    items[centerImgIndex].views++;

    attemptsEl.textContent = attempts;
}
renderImg();

lImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);
cImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        console.log(event.target.id)
        if (event.target.id === 'leftImg') {
            items[leftImgIndex].clicks++;
        } else if (event.target.id === 'rightImg') {
            items[rightImgIndex].clicks++;
        } else if (event.target.id === 'centerImg') {
            items[centerImgIndex].clicks++;
        }
        renderImg();
    } else {
        let ulEl = document.getElementById('ulResults');
        let liEl;
        for (let i = 0; i < items.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${items[i].itemName} has ${items[i].views} views and has ${items[i].clicks} clicks.`
        }
        lImgEl.removeEventListener('click', handelClicks);
        rImgEl.removeEventListener('click', handelClicks);
        cImgEl.removeEventListener('click', handelClicks);
    }
}
console.log(items)