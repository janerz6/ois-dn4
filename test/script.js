
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';
var jsonData;

var username = "ois.seminar";
var password = "ois4fri";

var measures1 = [{date:'2001-10-20T12:30',weight:85,height:188,temp:38,sistolic:118,diastolic:74,oxigen:98,measurer:'Dr. Öetker'},
				{date:'2003-10-20T12:30',weight:85,height:188,temp:38,sistolic:118,diastolic:74,oxigen:98,measurer:'Dr. Öetker'},
				{date:'2005-10-20T12:30',weight:85,height:188,temp:38,sistolic:118,diastolic:74,oxigen:98,measurer:'Dr. Öetker'},
				{date:'2009-10-20T12:30',weight:85,height:188,temp:38,sistolic:118,diastolic:74,oxigen:98,measurer:'Dr. Öetker'}];
				
var measures2 = [{date:'2010-10-20T18:30',weight:40,height:150,temp:36,sistolic:125,diastolic:85,oxigen:92,measurer:'Dr. Clauss Nicolsen'},
				{date:'2011-10-20T18:30',weight:42,height:155,temp:36,sistolic:125,diastolic:85,oxigen:92,measurer:'Dr. Clauss Nicolsen'},	
				{date:'2012-10-20T18:30',weight:44,height:158,temp:36.5,sistolic:125,diastolic:85,oxigen:92,measurer:'Dr. Clauss Nicolsen'},
				{date:'2013-10-20T18:30',weight:58,height:162,temp:37.2,sistolic:125,diastolic:85,oxigen:92,measurer:'Dr. Clauss Nicolsen'}];
				
var measures3 = [{date:'2010-03-01T07:15',weight:45,height:173,temp:38,sistolic:115,diastolic:79,oxigen:88,measurer:'Dr. Dakl'},
				{date:'2011-03-01T07:15',weight:45,height:173,temp:38,sistolic:115,diastolic:79,oxigen:88,measurer:'Dr. Dakl'},
				{date:'2012-03-01T07:15',weight:45,height:173,temp:38,sistolic:115,diastolic:79,oxigen:88,measurer:'Dr. Dakl'},
				{date:'2013-03-01T07:15',weight:45,height:173,temp:38,sistolic:115,diastolic:79,oxigen:88,measurer:'Dr. Dakl'}];
				
var persons = [	{name:'David',surname:'Mesarić',birth:'1938-10-30T14:58', measures: measures1},
				{name:'Brigita',surname:'Šuler',birth:'1999-11-06T18:28', measures: measures2},
				{name:'Tina',surname:'Novak',birth:'1990-5-21T07:58', measures: measures3}];
				
function getSessionId() {
	
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


function kreirajEHRzaBolnikaData(ime,priimek,datumRojstva,meritve) {
	sessionId = getSessionId();
	
	if (!ime || !priimek || !datumRojstva || ime.trim().length == 0 || priimek.trim().length == 0 || datumRojstva.trim().length == 0) {
		$("#kreirajSporocilo").append("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevane podatke!</span><br>");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            dateOfBirth: datumRojstva,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                	$("#kreirajSporocilo").append("<span class='obvestilo label label-success fade-in'> Uspešno kreirana oseba za ehrID'" + ehrId + "'!</span><br>");
		                	$('#patients').append('<option value="'+ehrId+'">'+ime+" "+priimek +'</option>');
		                	console.log("Uspešno kreirana oseba ehrID '" + ehrId +"'");
		                	dodajMeritveVitalnihZnakovData(ehrId,meritve);
		                }
		            },
		            error: function(err) {
		            	$("#kreirajSporocilo").append("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!</span><br>");
		            	console.log(JSON.parse(err.responseText).userMessage);
		            }
		        });
		    }
		});
	}
}



function dodajMeritveVitalnihZnakovData(ehrId,measures) {
	sessionId = getSessionId();

	if (!ehrId || ehrId.trim().length == 0) {
		console.log('Prosim vnesite zahtevane podatke!');
	} else {
		for (var i=0; i < measures.length; i++){
			var datumInUra = measures[i].date;
			var telesnaVisina = measures[i].height.toString();
			var telesnaTeza = measures[i].weight.toString();
			var telesnaTemperatura = measures[i].temp.toString();
			var sistolicniKrvniTlak = measures[i].sistolic.toString();
			var diastolicniKrvniTlak = measures[i].diastolic.toString();
			var nasicenostKrviSKisikom = measures[i].oxigen.toString();
			var h =telesnaVisina / 100; //V m
			var ITM = telesnaTeza / Math.pow(h,2);
			var merilec = measures[i].measurer;
			$.ajaxSetup({
			    headers: {"Ehr-Session": sessionId}
			});
			var podatki = {
				// Preview Structure: https://rest.ehrscape.com/rest/v1/template/Vital%20Signs/example
			    "ctx/language": "en",
			    "ctx/territory": "SI",
			    "ctx/time": datumInUra,
			    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
			    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
			    "vital_signs/body_mass_index/any_event/body_mass_index": ITM,
			   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
			    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
			    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
			    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
			    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
			};
			var parametriZahteve = {
			    "ehrId": ehrId,
			    templateId: 'Vital Signs',
			    format: 'FLAT',
			    committer: merilec
			};
			$.ajax({
			    url: baseUrl + "/composition?" + $.param(parametriZahteve),
			    type: 'POST',
			    contentType: 'application/json',
			    data: JSON.stringify(podatki),
			    success: function (res) {
			    	console.log(res.meta.href);
			    	console.log("Uspešno.");
			        //$("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-success fade-in'>" + res.meta.href + ".</span>");
			        //return true;
			    },
			    error: function(err) {
			    	$("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
					console.log(JSON.parse(err.responseText).userMessage);
					//return false;
			    }
			});
		}//End for
	}
}

function preberiEHRodBolnikaData(ehrId) {
	sessionId = getSessionId();

	if (!ehrId || ehrId.trim().length == 0) {
		$("#preberiSporocilo").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevan podatek!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				console.log("Uspesno prebrano.");
				$('.personsName').html(party.firstNames);
				$('.personsLastName').html(party.lastNames);
				$('.personsBirth').html((party.dateOfBirth).substr(0,10));
				getITM(ehrId);
			},
			error: function(err) {
				$("#preberiSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log("Napaka, branje ..."+JSON.parse(err.responseText).userMessage);
				
			}
		});
	}	
}
function getITM(ehrId){
	sessionId = getSessionId();
		if (!ehrId || ehrId.trim().length == 0) {
		$("#preberiSporocilo").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevan podatek!");
	} else {
		$.ajax({
			url: baseUrl + '/view/'+ehrId+'/height',
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
	    	success: function (height) {
				console.log("Uspesno prebrano Height.");
					$.ajax({
						url: baseUrl + '/view/'+ehrId+'/weight',
						type: 'GET',
						headers: {"Ehr-Session": sessionId},
						success: function (weight) {
							$('.BMIs').html("");
							var data = [];
							for(var i = 0; i < weight.length; i++){
								var h = parseFloat(height[i].height) / 100; //V m
								var ITM = (parseFloat(weight[i].weight) / Math.pow(h,2)).toFixed(2);
								$('.BMIs').append("<li>"+ (weight[i].time).substr(0,10)+" "+ITM+"</li>");
								var d = {year: (weight[i].time).substr(0,4),value: ITM }
								data[i]= d; 
							}
							drawITMChart(data);
							checkVitals();
						},
						error: function(err) {
							$("#preberiSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
							console.log("Napaka, branje ..."+JSON.parse(err.responseText).userMessage);
						}
					});
			},
			error: function(err) {
				$("#preberiSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log("Napaka, branje ..."+JSON.parse(err.responseText).userMessage);
				
			}
		});
	}
}
function checkVitals(){
	jsonData = JSON.parse('{"BMI":{	"underweight":{	"min":0,"max":18.50	}"normal":{	"min":18.50,"max":24.99	}"overweight":{	"min":25.00,"max":29.99	}"obese":{	"min":30.00,"max":1000}	}}');
	console.log(jsonData.toString());
}

function drawITMChart(data){
	 $('#ITMchart').html('');
	  new Morris.Line({
	  // ID of the element in which to draw the chart.
	  element: 'ITMchart',
	  // Chart data records -- each entry in this array corresponds to a point on
	  // the chart.
	  data: data,
	  // The name of the data record attribute that contains x-values.
	  xkey: 'year',
	  // A list of names of data record attributes that contain y-values.
	  ykeys: ['value'],
	  // Labels for the ykeys -- will be displayed when you hover over the
	  // chart.
	  labels: ['Value']
	  });
	 
							
}

$(document).ready(function() {
	
	$('#patients').change(function() {
		preberiEHRodBolnikaData($(this).val());
		$('.personalInfo').slideDown(1500);
		console.log("Podatki: " + jsonData.BMI);
	});
	
  $('#loadButton').on('click', function () {
	 	var $btn = $(this).button('loading')
		$("#kreirajSporocilo").html('<br>');
		for (var i=0;i < persons.length; i++){
			kreirajEHRzaBolnikaData(persons[i].name, persons[i].surname, persons[i].birth,persons[i].measures);
		}
		 $btn.button('reset')
  })
});
/*

https://developers.google.com/maps/documentation/javascript/places?csw=1#TextSearchRequests
http://api.bigoven.com/documentation/recipe-search-results
http://morrisjs.github.io/morris.js/

*/