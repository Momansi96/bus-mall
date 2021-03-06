'use strict' 

let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
itemImg.items = [];
let itemsImagesNames = [];
let itemsClicks = [];
let itemsViews = [];


function itemImg(itemName) {
    
    this.itemName = itemName.split('.')[0];
    this.source = 'img/' + itemName;
    this.clicks = 0;
    this.views = 0;
    itemImg.items.push(this); 
    
    itemsImagesNames.push(this.itemName)
}

function settingItems() {
    let data = JSON.stringify(itemImg.items);
    console.log(data)
    localStorage.setItem('sales', data);
}
function gettingItems() {
    let stringObj = localStorage.getItem('sales');
    // console.log(stringObj);
    let normalObj = JSON.parse(stringObj);
    // console.log(normalObj);
    if (normalObj !== null) {
        itemImg.items = normalObj;
    }
    renderImg(); 
}

let itemImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']

for (let i = 0; i < itemImages.length; i++) {
    new itemImg (itemImages[i]);
}

function generateImage() {
    
    return Math.floor(Math.random() * itemImg.items.length);
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
    while (rightImgIndex === centerImgIndex) {
        rightImgIndex = generateImage(); 
    }

    lImgEl.setAttribute('src', itemImg.items[leftImgIndex].source);
    lImgEl.setAttribute('title', itemImg.items[leftImgIndex].source);
    itemImg.items[leftImgIndex].views++;

    rImgEl.setAttribute('src', itemImg.items[rightImgIndex].source);
    rImgEl.setAttribute('title', itemImg.items[rightImgIndex].source);
    itemImg.items[rightImgIndex].views++;
    
    cImgEl.setAttribute('src', itemImg.items[centerImgIndex].source);
    cImgEl.setAttribute('title', itemImg.items[centerImgIndex].source);
    itemImg.items[centerImgIndex].views++;

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
            itemImg.items[leftImgIndex].clicks++;
        } else if (event.target.id === 'rightImg') {
            itemImg.items[rightImgIndex].clicks++;
        } else if (event.target.id === 'centerImg') {
            itemImg.items[centerImgIndex].clicks++;
        }
        renderImg();
    } else {
        let ulEl = document.getElementById('ulResults');
        let liEl;
        for (let i = 0; i < itemImg.items.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${itemImg.items[i].itemName} has ${itemImg.items[i].views} views and has ${itemImg.items[i].clicks} clicks.`
            itemsClicks.push(itemImg.items[i].clicks);
            itemsViews.push(itemImg.items[i].views);
        }
        lImgEl.removeEventListener('click', handelClicks);
        rImgEl.removeEventListener('click', handelClicks);
        cImgEl.removeEventListener('click', handelClicks);
        chartRender();
    }
}
settingItems();
gettingItems(); 
function chartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: itemsImagesNames,
            datasets: [{
                label: 'Num of Clicks',
                data: itemsClicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 3
            }, {
                label: 'Num of Views',
                data: itemsViews,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

console.log(itemImg.items)

