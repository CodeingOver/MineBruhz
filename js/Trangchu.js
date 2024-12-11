let list = document.querySelector('.Mid-slidershow .slidershow-list');
let item = document.querySelectorAll('.Mid-slidershow .slidershow-list .slidershow-list-item');
let dots = document.querySelectorAll('.Mid-slidershow .slidershow-dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItem = item.length -1 ;
next.onclick = function()
{
    if(active + 1 > lengthItem)
    {
        active = 0;
    }
    else
    {
        active++;
    }
    reloadSlider();
    document.getElementById('next').disabled = true;

    setTimeout(function()
    {
        document.getElementById('next').disabled = false;
    },1000);
}
prev.onclick = function()
{
    if(active - 1 < 0)
    {
        active = lengthItem;
    }
    else
    {
        active--;
    }
    reloadSlider();
    document.getElementById('prev').disabled = true;

    setTimeout(function()
    {
        document.getElementById('prev').disabled = false;
    },1000);
}
let refreshSlider = setInterval(()=>{next.click()},7000);
function reloadSlider()
{
    let checkLeft = item[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    let lastActiveDots = document.querySelector('.Mid-slidershow .slidershow-dots li.active');
    lastActiveDots.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(refreshSlider);
    refreshSlider = setInterval(()=>{next.click()},7000);
}
dots.forEach((li, key) => {
    li.addEventListener('click', function(){
        active = key;
        reloadSlider();
    })
})