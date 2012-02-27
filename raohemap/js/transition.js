// JavaScript Document

(function () {
var animation, slide, container;
// animation parameters
animation = {
timer : undefined,
duration : 250,
interval : 5
};
// END: animation
// slide our columns one way or t'other
slide = function () {
var dir, doSlide, amount, startLeft, endLeft, startTime;
doSlide = function () {
var nowLeft, nowTime, elapsed;
nowTime = (new Date()).getTime();
elapsed = nowTime - startTime;
nowLeft = elapsed < animation.duration ? elapsed / animation.duration * amount + startLeft : endLeft;
container.style.left = nowLeft + '%';
if (nowLeft !== endLeft) {
setTimeout(doSlide, animation.interval);
}
};
// END: doSlide
startLeft = parseInt(document.defaultView.getComputedStyle(container, null).getPropertyValue('left'), 10);
dir = 0 === startLeft ? -1 : 1;
amount = 100 * dir;
endLeft = startLeft + amount;
startTime = (new Date()).getTime();
// start sliding
doSlide();
};
// END: slide
// only do this once
container = document.getElementById('container');
// assign event handlers
if (navigator.userAgent.indexOf('iPhone') > -1) {
container.addEventListener('touchend', function () {
slide();
}, false);
}
else {
container.addEventListener('mouseup', function () {
slide();
}, false);
}
})();
