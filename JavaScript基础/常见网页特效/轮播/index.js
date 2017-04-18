var container = document.querySelector('.slider-container');


var wrapper = document.querySelector('.slider-wrapper');
var slider = document.querySelectorAll('.slider-container .slider');


var prev = document.querySelector('.slider-prev');
var next = document.querySelector('.slider-next');

var poins = document.querySelectorAll('.poin');


var index = 1;

var done = false;

init();

prev.onclick = function() {
    index = index === 1 ? 5 : index - 1;
    if (!done) animate(790);
    showPoin();
}


next.onclick = function() {
    index = index === 5 ? 1 : index + 1;
    if (!done) animate(-790);
    showPoin();
}

function getStyle(obj, attr) {
    return window.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function animate(offset) {
    var newLeft = parseInt(getStyle(wrapper, 'left')) + offset;



    var time = 5400; //动画执行总的时间
    var interval = 10; //每次位移的间隔时间
    var speed = offset / (time / interval); //每次位移量

    function start() {
        done = true;
        var cur = parseInt(getStyle(wrapper, 'left'))
        console.log(speed, cur, newLeft);
        if ((speed < 0 && cur > newLeft) || (speed > 0 && cur < newLeft)) {

            wrapper.style.left = parseInt(getStyle(wrapper, 'left')) + speed + 'px';
            setTimeout(start, interval);
        } else {
            done = false;
            wrapper.style.left = newLeft + 'px';
            if (cur < -3950) {
                wrapper.style.left = -790 + 'px';
            }
            if (cur > -790) {
                wrapper.style.left = -3950 + 'px';
            }
        }
    }
    start();
}

for (var i = 0; i < poins.length; i++) {
    poins[i].onclick = function() {
        // 当前按下的poins-当前索引index
        var offset = (this.index - index) * -790;
        if (!done) animate(offset);
        index = this.index;
        showPoin();
    }
}

function init() {
    for (var i = 0; i < poins.length; i++) {
        poins[i].index = i + 1;
    }
    poins[index - 1].className = 'poin active';
}

function showPoin() {
    for (var i = 0; i < poins.length; i++) {
        if (/active/g.test(poins[i].className)) {
            poins[i].className = poins[i].className.replace(/active/g, '');
            break;
        }
    }
    poins[index - 1].className = 'poin active';
}