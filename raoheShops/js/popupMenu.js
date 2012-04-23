// JavaScript Documents
var show= false;


function initMenu(){

    var menu = document.getElementById('share_menu');

    drawMenuBackground(menu.offsetWidth, menu.offsetHeight);

    menu.addEventListener('webkitTransitionEnd', function(e){
        if(menu.getAttribute('class') == 'hide'){
            menu.style.setProperty('display','none');
        }
    });

    menu.setAttribute('class', 'hide');

}

function drawMenuBackground(rectWidth, rectHeight){

    var context = document.getCSSCanvasContext('2d', 'menu_background', rectWidth, rectHeight);    

    var arrowHeight = 20;
    var radius = 6;
    var lineWidth = 1;
    var pad = lineWidth/2;
    var xs = pad;
    var ys = pad + arrowHeight;
    var xe = rectWidth - pad;
    var ye = rectHeight - pad;

    var gradient = context.createLinearGradient(rectWidth/2, 0, rectWidth/2, arrowHeight * 2);
    gradient.addColorStop(0, '#eee'); 
    gradient.addColorStop(1, '#151d31'); 

    context.beginPath();

    context.lineJoin = 'miter';

    context.moveTo(xs + radius, ys);

    console.log(rectWidth);

    context.lineTo(rectWidth/2 - (arrowHeight + pad), ys);
    context.lineTo(rectWidth/2, pad);
    context.lineTo(rectWidth/2 + (arrowHeight + pad), ys);

    context.lineTo(xe - radius, ys);

    context.arcTo(xe, ys, xe, ys + radius, radius);

    context.lineTo(xe, ye - radius);
    context.arcTo(xe, ye, xe - radius, ye, radius);

    context.lineTo(xs + radius, ye);initMenu
    context.arcTo(xs, ye, xs, ye - radius, radius);

    context.lineTo(xs, ys + radius);
    context.arcTo(xs, ys, xs + radius, ys, radius);

    context.fillStyle = gradient;

    //context.fillStyle = '#000';
    context.globalAlpha = .95;
    context.fill();

    context.globalAlpha=1;

    context.strokeStyle = '#48484a';
    context.lineWidth = lineWidth;
    context.stroke();

}

function showMenu(el){
	
    var menu = document.getElementById('share_menu');

    menu.style.setProperty('display','block');    

    var targetLeft = el.offsetLeft;
    var targetBottom = el.offsetHeight;
    var targetWidth = el.offsetWidth;    
    var menuWidth = menu.offsetWidth;

    var menuLeft = targetLeft + (targetWidth/2) - (menuWidth/2);

    menu.style.setProperty('top', (targetBottom + 20) + 'px');
    menu.style.setProperty('left', menuLeft + 'px');
	
	if(show==false){
    menu.setAttribute('class', 'show');
	show=true;
	}else{
	menu.setAttribute('class', 'hide');	
	show=false;
	}
    menu.onclick = function(e){
        if(e.target.tagName.toLowerCase() == 'a'){
            var type = e.target.innerHTML;
            var link = el.getAttribute('href');
            alert(type + 'ing ' + link);
            menu.setAttribute('class','hide');
        }
    }
	
}