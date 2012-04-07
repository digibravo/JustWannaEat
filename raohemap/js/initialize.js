// JavaScript Document
var map;
var infowindow;
var gmarkers = [];
var filterMode = "false";
var currentFilters = [	["category",[]],
						["price",[]],
						["rating",[]]
					];

function showAll() {
	for (var i=0; i<gmarkers.length; i++) {
        	gmarkers[i].setVisible(true);	
    }
	
	filterMode = "false";
	
	//console.log($('#btn-dinner').children()[0]);
	
	resetFilterBtn($('#btn-vegetarian').children());
	resetFilterBtn($('#btn-dinner').children());
	resetFilterBtn($('#btn-fingerFoods').children());
	resetFilterBtn($('#btn-icyFoods').children());
	resetFilterBtn($('#btn-drinks').children());
	resetFilterBtn($('#btn-favorites').children());
	
}

function hideAll() {
	for (var i=0; i<gmarkers.length; i++) {
        	gmarkers[i].setVisible(false);	
    }
}


function showCategory(category) {
	for (var i=0; i<gmarkers.length; i++) {
    	if (gmarkers[i].mycategory == category ) {
        	gmarkers[i].setVisible(true);	
       	}
		
    }
    
}


function hideCategory(category) {
	for (var i=0; i<gmarkers.length; i++) {
    	if (gmarkers[i].mycategory == category) {
        	gmarkers[i].setVisible(false);
		}
    }
	//infowindow.close();
}

function showPrice(price)
{
	for (var i=0; i<gmarkers.length; i++) {
		
    	if (gmarkers[i].myprice == price ) {
			
        	gmarkers[i].setVisible(true);	
       	}
		
    }
}

function hidePrice(price)
{
	for (var i=0; i<gmarkers.length; i++) {
    	if (gmarkers[i].myprice == price ) {
        	gmarkers[i].setVisible(false);	
       	}
		
    }
}


function toggleFilter(btn)
{
	var imagePath = $(btn).attr("src");
	var subPath;
	var newPath;
	var state = $(btn).attr("data-clicked");
	
	
	if(state == "false")//if not focused
	{
		//subPath = imagePath.split(".");
		newPath = imagePath.replace(".", "_down.");
		$(btn).attr("data-clicked", "true");
	}
	else
	{
		newPath = imagePath.replace("_down", "");
		$(btn).attr("data-clicked", "false");
	}
	//console.log(state);
	//console.log(newPath);
	return newPath;
	
}

function resetFilterBtn(btn)
{
	var imagePath = $(btn).attr("src");
	
	$(btn).attr("data-clicked", "false");
	$(btn).attr("src", imagePath.replace("_down", ""));
}
				
function btnClick(btn, category) {
	
	setFilter([["category",[category]]]);
	
	/*if(filterMode == "true") // in filter mode
	{	
		var state = $(btn).attr("data-clicked");
		
		if (state == "false")
		{	
			showCategory(category);
			
			
		}  else{
			hideCategory(category);
		}
		
		$(btn).attr("src", toggleFilter(btn));
		
	}
	else // from regular mode to filter mode
	{
		hideAll();
		showCategory(category);
		filterMode = "true";
		$(btn).attr("src", toggleFilter(btn));
		
	}
	
	$('#btn-vegetatian').children().attr("data-clicked", "false");
	*/
	
	/*var state = $(btn).attr("data-clicked");
	if (state == "false"){
    	show(category);
    	$(btn).attr("data-clicked", "true");
    	console.log(state);
	}  else{
		hide(category);
		$(btn).attr("data-clicked", "false");
		console.log(state);
	}*/
}

function priceClick(btn, price)
{
	hideAll();
	showPrice(price);
}

function allBtnClick(allBtn) {
	var state2 = $(allBtn).attr("data-clicked");
	if (state2 == "false"){
    	showAll();
    	$(allBtn).attr("data-clicked", "true");
    	//console.log(state2);
	}  else{
		hideAll();
		$(allBtn).attr("data-clicked", "false");
		//console.log(state2);
	}
}




function runFilter(markers, filter)
{
	var results = [];
	
	for(var i=0; i < markers.length; i++)
	{
		var filterName = "my" + filter[0];
		for(var j=0; j<filter[1].length; j++)
		{
			if(markers[i][filterName] == filter[1][j])
			{	//console.log(filter[0]);
				results.push(markers[i]);
			}
		}
	}
	return results;
}

function setFilter(filters)
{
	hideAll();
	
	var result = runFilter(gmarkers, filters.pop());	
	//console.log(result);
	while(filters.length > 0)
	{
		//console.log(result);
		result = runFilter(result, filters.pop());
		//console.log(result);
	}
	
	
	
	for(var i=0; i<result.length; i++)
	{
		result[i].setVisible(true);	
	}
}



function initialize() {
		
		// Create an array of styles.
		var marketStyles = [
		{ featureType: "poi.business", 
			stylers: [ { visibility: "off" } 
			] },
		{ featureType: "road", 
			stylers: [ { lightness: 58 }, { hue: "#ff6e00" }, { gamma: 0.63 }
			] },
		{ featureType: "poi.park", 
			stylers: [ { hue: "#ff5500" }, { saturation: 84 }, { gamma: 0.43 }
			] },
		{ featureType: "water", 
			stylers: [ { hue: "#00e5ff" }, { lightness: -90 } 
			] },
		{ featureType: "road", elementType: "labels", 
			stylers: [ { hue: "#000000" }, { lightness: 32 }
			] },
		{ featureType: "transit",
			stylers: [ { visibility: "off" } 
			] },
		{ featureType: "poi.school", 
			stylers: [ { visibility: "off" } 
			] },
		{ featureType: "landscape", 
			stylers: [ { hue: "#ff0000" } 
			] }
		];
		
		// Create a new StyledMapType object, passing it the array of styles,
		// as well as the name to be displayed on the map type control.
		var marketMapType = new google.maps.StyledMapType(marketStyles,
   		{name: "Market Mode"});
		
		var myOptions = {
		zoom: 19,
		center: new google.maps.LatLng(25.05070, 121.573600),
		mapTypeControlOptions: {
      	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'market_parks']
    	}
		//mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		setMarkers(map, raoheShops);
		
		//Associate the styled map with the MapTypeId and set it to display.
		map.mapTypes.set('market_parks', marketMapType);
		map.setMapTypeId('market_parks');
	}
	/*	
		var sites = [
	['Tea Shop', 25.050059,121.572797, 1, 'Soft Drinks','Cash Only'],
	['Liau Restaurant', 25.050365,121.573173, 2, 'Chinese Cuisine','Cash Only'],
	['Hau Da Fried Chicken', 25.050443,121.57387, 3, 'Fried Chicken','Cash Only'],
	['Bubble Mike Tea', 25.050341,121.574557, 4, 'Soft Drinks','Cash Only'],
	['Stinking Tofu', 25.050214,121.572691, 5, 'Fried Tofu','Cash Only'],
	['Tapioca', 25.050301,121.572866, 6, 'Soft Drinks','Cash Only'],
	['Wang Beef Noodles', 25.050272,121.573316, 7, 'Beef Noodles','Cash Only'],
	['Bill Juice', 25.050486,121.574035, 8, 'Juice','Cash Only'],
	['Pancake', 25.050469,121.574161, 9, 'Pancake','Cash Only'],
	['Tappasaki', 25.05035,121.574596, 10, 'Seafood','Cash and Credit']
];
*/		
	function setMarkers(map, markers) {
		var image = new google.maps.MarkerImage(
		'images/red.png',
		new google.maps.Size(22,22),
		new google.maps.Point(0,0),
		new google.maps.Point(12,12)
	);
		
		
			for (var i = 0; i < raoheShops.length; i++) {
				
				var place = raoheShops[i];
				//var category = place.category;
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(place.lat, place.lng),
					map: map,
					//icon: image,
					title: place.title,
					zIndex: i,
					//html: site[4]
				});
				
				marker.mycategory = place.category;
				marker.myprice = place.price;
				marker.myrating = place.rating;
				gmarkers.push(marker);
				
			
				// set custom image = IMAGE_SERVER_PATH + site["shopImg"];
				// http://www.mysite.com/images/shopImg.png
				
				var contentString = 
				place.title+
				'<div id="distance">'+place.distance+'</div>'+
				'<div id="shopImg"><img src="'+IMAGE_SERVER_PATH+place.shopImg+'"/></div>'+ 
				'<div id="ratingImg"><img src="'+IMAGE_SERVER_PATH+place.ratingImg+'"/></div>'
				
				;
				createInfoWindow(marker, contentString);
				console.log(contentString);
				
			
			}
		
				var infowindow = new google.maps.InfoWindow();
				
				function createInfoWindow(marker, contentString) {
					google.maps.event.addListener(marker, 'click', function() {
						if (infowindow) infowindow.close();

						infowindow.setContent(contentString);
						infowindow.open(map, this);
					});
				}
				
				
		//setFilter([["category",["drinks","dinner"]],["price","l"]]);

}
	
	
				