let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dotsContainer = document.querySelector('.slider .dots');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length;

// Generate only 5 dots
let numDots = 5;
dotsContainer.innerHTML = ''; // Clear existing dots
for (let i = 0; i < numDots; i++) {
    let li = document.createElement('li');
    if (i === 0) li.classList.add('active'); // Set the first dot as active
    dotsContainer.appendChild(li);
}

let dots = document.querySelectorAll('.slider .dots li');

next.onclick = function () {
    active = (active + 1) % lengthItems;
    reloadSlider();
};

prev.onclick = function () {
    active = (active - 1 + lengthItems) % lengthItems;
    reloadSlider();
};

let refreshSlider = setInterval(() => { next.click() }, 3000);

function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    // Reset dot active class
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Assign active dot based on the current active slide
    let activeDotIndex = active % numDots;
    dots[activeDotIndex].classList.add('active');

    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => { next.click() }, 3000);
}

// Dot click functionality
dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
        let group = Math.floor(active / numDots) * numDots; // Get the group
        active = group + index;
        if (active >= lengthItems) active = lengthItems - 1; // Ensure it does not exceed max
        reloadSlider();
    });
});

// Prevent shopping cart from closing when slider is clicked
const slider = document.querySelector('.slider');

slider.addEventListener('click', (e) => {
    e.stopPropagation();
});