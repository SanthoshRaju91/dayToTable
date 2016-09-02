$('#collapseMap').on('shown.bs.collapse', function(e){
	(function(A) {

	if (!Array.prototype.forEach)
		A.forEach = A.forEach || function(action, that) {
			for (var i = 0, l = this.length; i < l; i++)
				if (i in this)
					action.call(that, this[i], i, this);
			};

		})(Array.prototype);

		var
		mapObject,
		markers = [],
		markersData = {
			'Hotels': [
			{
				name: 'Park Hyatt Paris',
				location_latitude: 48.873792, 
				location_longitude: 2.295028,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Park Hyatt Paris',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard.',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Mariott',
				location_latitude: 48.846222, 
				location_longitude: 2.346414,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Hotel Mariott',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Lumiere',
				location_latitude: 48.865633, 
				location_longitude: 2.321236,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Hotel Lumiere',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Place Concorde',
				location_latitude: 48.854183,
				location_longitude: 2.354808,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Hotel Place Concorde',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Place Concorde',
				location_latitude: 48.863893, 
				location_longitude: 2.342348,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Hotel Place Concorde',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Name',
				location_latitude: 48.860642,
				location_longitude: 2.352245,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Hotel Name',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Name',
				location_latitude: 48.858370, 
				location_longitude: 2.294481,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Hotel Name',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Name',
				location_latitude: 48.837273,
				location_longitude: 2.335387,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Hotel Name',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Name',
				location_latitude: 48.860819, 
				location_longitude: 2.354507,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Beaubourg',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Name',
				location_latitude: 48.852729, 
				location_longitude: 2.350564,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Notre Dame',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			},
			{
				name: 'Hotel Name',
				location_latitude: 48.870587, 
				location_longitude: 2.318943,
				map_image_url: 'img/thumb_map_1.jpg',
				name_point: 'Madeleine',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: 'single_tour.html'
			}
			]
		};

			var mapOptions = {
				zoom: 14,
				center: new google.maps.LatLng(48.865633, 2.321236),
				mapTypeId: google.maps.MapTypeId.ROADMAP,

				mapTypeControl: false,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				scrollwheel: false,
				scaleControl: false,
				scaleControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				streetViewControl: true,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP
				},
				styles: [
											 {
					"featureType": "landscape",
					"stylers": [
						{
							"hue": "#FFBB00"
						},
						{
							"saturation": 43.400000000000006
						},
						{
							"lightness": 37.599999999999994
						},
						{
							"gamma": 1
						}
					]
				},
				{
					"featureType": "road.highway",
					"stylers": [
						{
							"hue": "#FFC200"
						},
						{
							"saturation": -61.8
						},
						{
							"lightness": 45.599999999999994
						},
						{
							"gamma": 1
						}
					]
				},
				{
					"featureType": "road.arterial",
					"stylers": [
						{
							"hue": "#FF0300"
						},
						{
							"saturation": -100
						},
						{
							"lightness": 51.19999999999999
						},
						{
							"gamma": 1
						}
					]
				},
				{
					"featureType": "road.local",
					"stylers": [
						{
							"hue": "#FF0300"
						},
						{
							"saturation": -100
						},
						{
							"lightness": 52
						},
						{
							"gamma": 1
						}
					]
				},
				{
					"featureType": "water",
					"stylers": [
						{
							"hue": "#0078FF"
						},
						{
							"saturation": -13.200000000000003
						},
						{
							"lightness": 2.4000000000000057
						},
						{
							"gamma": 1
						}
					]
				},
				{
					"featureType": "poi",
					"stylers": [
						{
							"hue": "#00FF6A"
						},
						{
							"saturation": -1.0989010989011234
						},
						{
							"lightness": 11.200000000000017
						},
						{
							"gamma": 1
						}
					]
				}
				]
			};
			var
			marker;
			mapObject = new google.maps.Map(document.getElementById('map'), mapOptions);
			for (var key in markersData)
				markersData[key].forEach(function (item) {
					marker = new google.maps.Marker({
						position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
						map: mapObject,
						icon: 'img/pins/' + key + '.png',
					});

					if ('undefined' === typeof markers[key])
						markers[key] = [];
					markers[key].push(marker);
					google.maps.event.addListener(marker, 'click', (function () {
      closeInfoBox();
      getInfoBox(item).open(mapObject, this);
      mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
     }));

					
				});
	

		function hideAllMarkers () {
			for (var key in markers)
				markers[key].forEach(function (marker) {
					marker.setMap(null);
				});
		};

		function closeInfoBox() {
			$('div.infoBox').remove();
		};

		function getInfoBox(item) {
			return new InfoBox({
				content:
				'<div class="marker_info" id="marker_info">' +
				'<img src="' + item.map_image_url + '" alt="Image"/>' +
				'<h3>'+ item.name_point +'</h3>' +
				'<span>'+ item.description_point +'</span>' +
				'<a href="'+ item.url_point + '" class="btn_1">Details</a>' +
				'</div>',
				disableAutoPan: true,
				maxWidth: 0,
				pixelOffset: new google.maps.Size(40, -190),
				closeBoxMargin: '5px -20px 2px 2px',
				closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
				isHidden: false,
				pane: 'floatPane',
				enableEventPropagation: true
			});


		};

    });