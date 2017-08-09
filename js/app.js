var map;	

	function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.4488897, lng: -70.6692655},
          zoom: 12
        });
}

$(document).ready(function() {

	var resumen = $('#resumen');
	var img = $('.img-responsive');

	var url = 'https://crossorigin.me/https://api.darksky.net/forecast/';
	var key = '2a200ba94230031e99bbea585fee64ee';
	var coord = {
		ari: '-18.4782534,-70.1356692',
		iqq: '-20.2307033,-70.18051809999997',	
		cjc: '-22.4543923,-68.92938190000001',
		anf: '-23.6509279,-70.39750219999996',
		cpo: '-27.3665763,-70.33215869999998',
		lsc: '-29.9026691,-71.25193739999997',	
		vap: '-33.047238,-71.61268849999999',
		scl: '-33.4488897,-70.6692655',
		qrc: '-34.17013240000001,-70.7406259',
		tlx: '-35.4232444,-71.64848039999998',
		ccp: '-36.8201352,-73.0443904',
		pzs: '-38.7359018,-72.59037390000003',
		zal: '-38.7359018,-72.59037390000003',
		pmc: '-41.468917,-72.9411364',
		bba: '-45.5712254,-72.068265',
		puq: '-53.1638329,-70.91706829999998'
	};

	var queryParams = ['exclude=minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto'];

	var image = {
		'clear-night': 'img/clear-night.svg',
		'clear-day' : 'img/sunny.svg',
		'rain': 'img/raining.svg',
		'snow': 'img/snowflake.svg',
		'cloudy': 'img/clouds.svg',
		'partly-cloudy-day': 'img/clouds-and-sun.svg',
		'partly-cloudy-night': 'img/mostly-covered.svg'

	};

	
	$('#select').on('change',function() {

		var valorCoord = coord[$(this).val()];

		$.ajax({
			url: url + key + '/' + coord[$(this).val()] + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
			method: 'GET'	
		}).then(function(data) {
			console.log(data);
			resumen.text(parseInt(data.currently.temperature) + ' º ' + data.currently.summary);
			img.attr('src', image[data.currently.icon]);


			var mapCoord = valorCoord.split(',');
			map.setCenter(new google.maps.LatLng(mapCoord[0], mapCoord[1]));
			
		});
	});
});