// JavaScript Document
var map;
var infowindow;
var gmarkers = [];
var currentFilters;
var ratingBtns;
var currentRating = 0;
var infowindow;
var viewMode;

function showAll() 
{
	
	resetFilterList();
	setFilter(currentFilters);
	
	resetFilterBtn($('#btn-vegetarian').children());
	resetFilterBtn($('#btn-dinner').children());
	resetFilterBtn($('#btn-fingerFoods').children());
	resetFilterBtn($('#btn-icyFoods').children());
	resetFilterBtn($('#btn-drinks').children());
	resetFilterBtn($('#btn-favorites').children());
	resetFilterBtn($('#btn-priceL').children());
	resetFilterBtn($('#btn-priceM').children());
	resetFilterBtn($('#btn-priceH').children());
	resetFilterBtn($('#btn-rating1').children());
	resetFilterBtn($('#btn-rating2').children());
	resetFilterBtn($('#btn-rating3').children());
	resetFilterBtn($('#btn-rating4').children());
	resetFilterBtn($('#btn-rating5').children());
}

function hideAll() {
	for (var i=0; i<gmarkers.length; i++) {
        	gmarkers[i].setVisible(false);	
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
		newPath = imagePath.replace(".", "_up.");
		$(btn).attr("data-clicked", "true");
	}
	else
	{
		newPath = imagePath.replace("_up", "");
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
	$(btn).attr("src", imagePath.replace("_up", ""));
}
				
function btnClick(btn, category) {
	
	
	var state = $(btn).attr("data-clicked");
	
	if (state == "false")
	{	
		//showCategory(category);
		setFilterList("category", category, "add");
		
	}  
	else
	{
		//hideCategory(category);
		setFilterList("category", category, "remove");
	}
	
	$(btn).attr("src", toggleFilter(btn));
	setFilter(currentFilters);
	
	
	btnFinalCheck();
}

function priceClick(btn, price)
{
	var state = $(btn).attr("data-clicked");
		
	if (state == "false")
	{	
		setFilterList("price", price, "add");
	}  
	else
	{
		setFilterList("price", price, "remove");
	}
	
	$(btn).attr("src", toggleFilter(btn));
	setFilter(currentFilters);
	
	//$('#btn-all').children().attr("src", "images/btn_all.jpg");
	btnFinalCheck();
}

function rateClick(btn, rate)
{
	
	for(var i=1; i < 6; i++)
	{
		setFilterList("rating", String(i), "remove");
	}
	
	if(String(currentRating) == String(rate))
	{	//cancel rating
		currentRating = 0;
	}
	else
	{
		setFilterList("rating", String(rate), "add");
		
		currentRating = rate;
	}
	
	setFilter(currentFilters);
	setRatingBtn(currentRating);
	//$('#btn-all').children().attr("src", "images/btn_all.jpg");
	btnFinalCheck();
	
}

function favoriteClick(btn, favorite)
{
	var state = $(btn).attr("data-clicked");
		
	if (state == "false")
	{	
		setFilterList("favorite", favorite, "add");
	}  
	else
	{
		setFilterList("favorite", favorite, "remove");
	}
	
	$(btn).attr("src", toggleFilter(btn));
	setFilter(currentFilters);
	
	btnFinalCheck();
}

function allBtnClick(allBtn) 
{
	
	showAll();
	$('#btn-all').children().attr("src", "images/btn_all_up.jpg");
	
	/*var state2 = $(allBtn).attr("data-clicked");
	if (state2 == "false")
	{
    	$(allBtn).attr("data-clicked", "true");
		resetFilterList();
		setFilter(currentFilters);
	}  
	else
	{
		$(allBtn).attr("data-clicked", "false");
		hideAll();
	}
	
	$(allBtn).attr("src", toggleFilter(allBtn));
	*/
}




function runFilter(markers, filter)
{
	var results = [];
	
	if(filter[1].length == 0)
	{
		results = markers;
	}
	else
	{
		for(var i=0; i < markers.length; i++)
		{
			var filterName = "my" + filter[0];
			for(var j=0; j<filter[1].length; j++)
			{
				//console.log(filterName + " " + filter[1][j]);
				if(markers[i][filterName] == filter[1][j])
				{	
					results.push(markers[i]);
				}
			}
		}
	}
	
	//console.log("result length: " + results.length);
	return results;
}

function setFilter(filters)
{
	hideAll();
	
	var result = runFilter(gmarkers, filters[0]);	
	
	//console.log("result length: " + result);
	for(var i=1; i < filters.length; i++)
	{
		//console.log("result length: " + result);
		result = runFilter(result, filters[i]);
	}
	
	/*while(filters.length > 0)
	{
		//console.log(result);
		result = runFilter(result, filters.pop());
		//console.log(result);
	}*/
	
	
	if(viewMode == "map")
	{
		for(var i=0; i<result.length; i++)
		{
			result[i].setVisible(true);	
		}
	}
	
	if(viewMode == "list")
	{
		for(var j=0; j<result.length; j++)
		{
			var html = '<img src="' + result[j].mylistLink + '" />';
			$('#listContent').append(html);
			
		}
	}
}

function setFilterList(category, value, action)
{
		for(var i=0; i< currentFilters.length; i++) //go through the filter list
		{
			if(currentFilters[i][0] == category) // if the category matched, check the values
			{
				
				if(action == "add")
				{
					currentFilters[i][1].unshift(value);
					//console.log(currentFilters[i][0] + " " + currentFilters[i][1]);
					return;
				}
				else if(action == "remove")
				{
				
					for(var j=0; j<currentFilters[i][1].length; j++)//go through the value in the selected category
					{
						if(currentFilters[i][1][j] == value)//if the value is found, remove the value
						{
							currentFilters[i][1].splice(j,1);
							
							return;	
						}
					}
				}	
				
			}
		}
}

function resetFilterList()
{
	currentFilters = [	["category",	[]],
						["price",		[]],
						["rating",		[]],
						["favorite",	[]]
					];
}

function btnFinalCheck()
{
	for(var i=0; i< currentFilters.length; i++) //go through the filter list
	{
		for(var j=0; j<currentFilters[i][1].length; j++)//go through the value in the selected category
		{
			if(currentFilters[i][1][j].length >0)
			{
				$('#btn-all').children().attr("src", "images/btn_all.jpg");
				return;	
			}
		}
	}
	
	$('#btn-all').children().attr("src", "images/btn_all_up.jpg");
	
}

function setRatingBtn(num)
{
	for(var i=0; i < ratingBtns.length; i++)
	{
		//console.log(num);
		if(i < Number(num))
		{
			ratingBtns[i].children().attr("src", "images/btn_rating_up.jpg");
		}
		else
		{
			ratingBtns[i].children().attr("src", "images/btn_rating.jpg");
		}
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
			stylers: [ { hue: "#004a80" }, { saturation: 84 }, { lightness: -30 }
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
		//center: new google.maps.LatLng(25.059265, 121.543550),
		mapTypeControlOptions: {
      	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'market_parks']
    	}
		//mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		setMarkers(map);
		
		//Associate the styled map with the MapTypeId and set it to display.
		map.mapTypes.set('market_parks', marketMapType);
		map.setMapTypeId('market_parks');
		
		infowindow = new google.maps.InfoWindow();
		
		resetFilterList();
		
		viewMode = "map";
		
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
	
function initList()
{
	resetFilterList();
	
	viewMode = "list";
	setFilter(currentFilters);
}


function setMarkers(map) {
		var image = new google.maps.MarkerImage(
		'images/red.png',
		new google.maps.Size(22,22),
		new google.maps.Point(0,0),
		new google.maps.Point(12,12)
	);
		
		
			for (var i = 0; i < raoheShops.length; i++) 
			{
				
				var place = raoheShops[i];
				//var category = place.category;
				var marker = new google.maps.Marker(
				{
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
				marker.myfavorite = place.favorite;
				marker.mylistLink = place.listLink;
				gmarkers.push(marker);
				
			
				// set custom image = IMAGE_SERVER_PATH + site["shopImg"];
				// http://www.mysite.com/images/shopImg.png
				//<a onclick="parent.location='http://url.com/page.html'">
				var contentString = 
				//place.title+
				//'<div id="distance">'+place.distance+'</div>'+
				'<div><a onclick=parent.location="'+IMAGE_LINK_PATH+place.imglink+'"><img src="'+IMAGE_SERVER_PATH+place.shopImg+'"/></a></div>'+
				'<div id="btn_getDirection"><a onclick=parent.location="'+IMAGE_LINK_PATH+place.imglink+'"><img src="'+IMAGE_SERVER_PATH+place.getDirectionImg+'"/></a></div>'
				//'<div id="popupImg"><img src="'+IMAGE_SERVER_PATH+place.shopImg+'"/></div>'
				
				;
				createInfoWindow(marker, contentString);
				//console.log(contentString);
				
			
			}
		
				
				function createInfoWindow(marker, contentString) 
				{
					google.maps.event.addListener(marker, 'click', function() {
						if (infowindow) infowindow.close();

						infowindow.setContent(contentString);
						infowindow.open(map, this);
					});
				}
				
				
		$('#btn-all').children().attr("src", "images/btn_all_up.jpg");
		ratingBtns = [$('#btn-rating1'),$('#btn-rating2'),$('#btn-rating3'),$('#btn-rating4'),$('#btn-rating5')];
}
	
function gotoMarket()
{
	var place = marketData[0];
	var myOptions = 
	{
		zoom: 19,
		//center: new google.maps.LatLng(25.05070, 121.573600),
		center: new google.maps.LatLng(place.lat, place.lng),
		mapTypeControlOptions: {
      	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'market_parks']}
    }
	
	if (infowindow) infowindow.close();
	
	map.setOptions(myOptions);
	setPlaceMarkers(map);
	
	
}
	
				