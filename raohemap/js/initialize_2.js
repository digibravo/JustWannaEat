// JavaScript Document
var map;
var infowindow;
var gmarkers = [];
var btn=false;

function show(category) {
	for (var i=0; i<gmarkers.length; i++) {
    	if (gmarkers[i].mycategory == category ) {
        	gmarkers[i].setVisible(true);
			
       	}else{
		gmarkers[i].setVisible(false);
		}
		
    }
    
}


				
function hide(category) {
	for (var i=0; i<gmarkers.length; i++) {
    	if (gmarkers[i].mycategory == category) {
        	gmarkers[i].setVisible(false);
			
       	}
		
    }
    btn = false;
	//infowindow.close();
}
				
function btnClick(btn,category) {
	if (btn == false){
    	show(category);
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
				var category = place.category;
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(place.lat, place.lng),
					map: map,
					//icon: image,
					title: place.title,
					zIndex: i,
					//html: site[4]
				});
				
				marker.mycategory = category;
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
				
				



				

}
	
	
				