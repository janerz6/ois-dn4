var dataITM;
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

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

function kreirajEHRzaBolnika() {
	sessionId = getSessionId();

	var ime = $("#kreirajIme").val();
	var priimek = $("#kreirajPriimek").val();
	var datumRojstva = $("#kreirajDatumRojstva").val();
	var spol = ($('#male').hasClass('active')) ? "MALE":"FEMALE";
	console.log(spol);
	if (!ime || !priimek || !datumRojstva || ime.trim().length == 0 || priimek.trim().length == 0 || datumRojstva.trim().length == 0) {
		$("#kreirajMsg").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevane podatke!</span>");
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
		            "gender": spol,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                    $("#kreirajMsg").html("<span class='obvestilo label label-success fade-in'>Uspešno kreiran EHR '" + ehrId + "'.</span>");
		                    console.log("Uspešno kreiran EHR '" + ehrId + "'.");
		                   	$('#patients').append('<option value="'+ehrId+'">'+ime+" "+priimek +'</option>');
		                }
		            },
		            error: function(err) {
		            	$("#kreirajMsg").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
		            	console.log(JSON.parse(err.responseText).userMessage);
		            }
		        });
		    }
		});
	}
}


function dodajMeritveVitalnihZnakovData(ehrId,measures,report) {
	sessionId = getSessionId();
	console.log("dodajam vitalne znake...");
	if ((!ehrId || ehrId.trim().length == 0) && report) {
		console.log('Prosim vnesite zahtevane podatke!');
		if(report)
			$("#kreirajMsgVitalni").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevane podatke!</span>");
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
			        $("#kreirajMsgVitalni").html("<span class='obvestilo label label-success fade-in'>" + "Uspešno dodano" + ".</span>");
			        //return true;
			    },
			    error: function(err) {
			    	if(report)
			    		$("#kreirajMsgVitalni").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
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
							 //	$('.BMIs').append("<li>"+ (weight[i].time).substr(0,10)+" "+ITM+"</li>");
								var tm = weight[i].time
								var date = new Date(tm.substr(0,4),tm.substr(5,7),tm.substr(8,10));
								var d = {date:date,value: ITM };
								dataITM[i]= d; 
							}
							
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

function checkIntervals(sign,val){
	console.log("nastavljam "+sign+" "+val);
	var status="normal";
	var link='../places/places.html';
	for(var i=0;i < jsonData[sign].length; i++ ){
		var sgn=jsonData[sign][i];
		if(sgn.max > val && sgn.min < val){
			$("#"+sign+"_status").text(sgn.status);
			$("#"+sign+"_status").parent().attr('class', sgn.class);
			if(sign === "BMI"){
				var href=$('#mapLink').attr('href');
				$('#mapLink').attr('href',href+"?"+$.param({"keyword":sgn.status.toLowerCase()}));
			}
			else if(sgn.class === 'danger' && sign != "BMI"){
				var href=$('#mapLink').attr('href');
				$('#mapLink').attr('href',href+	"&"+$.param({"status":"emergency"}));
			}
			
			//console.log("Nastavil "+sign);
			break;
		}
	}
}
function checkVitals(){

	//Najdemo zadnjo meritev
	
	   
	var itm=$('#BMI_last').text();
	var sis= $('#sistolic_last').text();
	var dia= $('#diastolic_last').text();
	var ox = $('#oximetry_last').text();
	var temp = $('#temperature_last').text();
	
	checkIntervals("BMI",itm);
	checkIntervals("Systolic",sis);
	checkIntervals("Diastolic",dia);
	checkIntervals("Temperature",temp);
	checkIntervals("Oximetry",ox);
	$('#mapLink').show();
	var url = $('#mapLink').attr('href');
	if(url.match('status=emergency') != null ){
		$('#results').text(messages['emergency']);
	}
	else if(url.match('keyword=normal') != null){
		$('#results').text(messages['normal']);
		$('#mapLink').hide();
	}
	else if(url.match('keyword=underweight') != null){
		$('#results').text(messages['underweight']);
	}
	else if(url.match('keyword=overweight') != null){
		$('#results').text(messages['overweight']);
	}
	else if(url.match('keyword=obese') != null){
		$('#results').text(messages['obese']);
	}
}
/*
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
	 
							
}*/

function query(ehrID){
	$.ajaxSetup({
    headers: {
        "Ehr-Session": sessionId
    }
	});

	var aql = "select"+
	"  c/context/start_time/value as time,"+
	"  c/name/value as name,"+
	"  t/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as temp,"+
	"  bp/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude as Systolic_magnitude,"+
	"  bp/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude as Diastolic_magnitude,"+
	"  ox/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value/numerator as oximetry,"+
	"  bmi/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude as itm"+
	" from EHR e[ehr_id/value='"+ehrID+"']"+
	" contains COMPOSITION c"+
	" contains ("+
	"  OBSERVATION t[openEHR-EHR-OBSERVATION.body_temperature.v1] and"+
	"  OBSERVATION bp[openEHR-EHR-OBSERVATION.blood_pressure.v1] and"+
	"  OBSERVATION bmi[openEHR-EHR-OBSERVATION.body_mass_index.v1] and"+
	"  OBSERVATION ox[openEHR-EHR-OBSERVATION.indirect_oximetry.v1])"+
	" order by time desc"+
	" limit 1";
	//console.log(aql);
	$.ajax({
	    url: baseUrl + "/query?" + $.param({"aql": aql}),
	    type: 'GET',
	    success: function (res) {
	        var result = res.resultSet[0];
	        $('.last_date').html(result.time.substr(0,10));
	        $('#BMI_last').text(result.itm.toFixed(2));
	        $('#sistolic_last').text(result.Systolic_magnitude);
	        $('#diastolic_last').text(result.Diastolic_magnitude);
	        $('#oximetry_last').text(result.oximetry);
	        $('#temperature_last').text(result.temp);
	        checkVitals();
	        //console.log(resulArray[0].time+" " + resulArray[0].temp +" "+resulArray[0].Systolic_magnitude+" "+resulArray[0].itm );
	    },
	    error: function (err){
	    	console.log(JSON.parse(err.responseText).userMessage + JSON.parse(err.responseText).exceptionMessage)
	    }
	});
}
function dodajVitalne(){
	var measurer = ($('#merilecIsti').is(":checked")) ? $( "#selectToAdd option:selected" ).text():$("#kreirajMerilec").val();
	var date = new Date();
	var dateString = ((date.getYear()+1900)+"-"+ (date.getMonth()+1)+ "-"+date.getDate());
  	if(!$('#kreirajTeza').val() || !$('#kreirajVisina').val() || !$('#kreirajTemperatura').val() || !$('#kreirajSystolicni').val() || !$('#kreirajDiastolicni').val() || !$('#kreirajKisik').val() || !measurer){
  			$("#kreirajMsgVitalni").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevane podatke!</span>");
  	}
  	else{
		var measures = [{date:dateString,weight: $('#kreirajTeza').val(),height: $('#kreirajVisina').val(),temp: $('#kreirajTemperatura').val(),sistolic: $('#kreirajSystolicni').val()
		,diastolic:$('#kreirajDiastolicni').val(),oxigen:$('#kreirajKisik').val(),measurer: measurer}];
		
		dodajMeritveVitalnihZnakovData($( "#selectToAdd option:selected" ).val(),measures,true);
  	}
}

$(document).ready(function() {
	$(window).on('resize',function(){
		w = $('#chartWrapper').width();
		h = $('#status_vitals').height();
		$('#chartWrapper').height(h);
		console.log("Sizes:"+w+" "+h);
		draw(dataITM);
	});
	$('#patients').change(function() {
		$('#mapLink').attr('href','../places/places.html');
		
		if($(this).val() == "")
			$('.personalInfo').slideUp(1500);
		else{
			preberiEHRodBolnikaData($(this).val());
			query($(this).val());
			$('.personalInfo').slideDown(1500);
			w = $('#chartWrapper').width();
			h = $('#status_vitals').height();
			$('#chartWrapper').height(h);
			draw(dataITM);
		}
	});
	
  $('#loadButton').on('click', function () {
	 	var $btn = $(this).button('loading')
		$("#kreirajSporocilo").html('<br>');
		for (var i=0;i < persons.length; i++){
			kreirajEHRzaBolnikaData(persons[i].name, persons[i].surname, persons[i].birth,persons[i].measures);
		}
		 $btn.button('reset')
  })
  
  $('#clear').click(function(){
  	$('#kreirajIme').val('');
  	$('#kreirajPriimek').val('');
  	$('#kreirajDatumRojstva').val('');
  	$('#kreirajMsg').html('');
  });
  
  $('#collapse').click(function(){
  	$('#pacientCreator').toggle(700);
  	$('#collapse').toggleClass('glyphicon-minus');
  	$('#collapse').toggleClass('glyphicon-plus');
  });
   $('#collapseMeasurement').click(function(){
  	$('#recordCreator').toggle(700);
  	$('#collapseMeasurement').toggleClass('glyphicon-minus');
  	$('#collapseMeasurement').toggleClass('glyphicon-plus');
  });
  $('#clearMeasurement').click(function(){
  	$('#kreirajVisina').val('');
  	$('#kreirajTeza').val('');
  	$('#kreirajTemperatura').val('');
  	$('#kreirajSystolicni').val('');
  	$('#kreirajDiastolicni').val('');
  	$('#kreirajKisik').val('');
  	$('#kreirajMerilec').val('');
  	$('#kreirajMsgVitalni').html('');
  });
  $('#selectToAdd').focus(function(){
  	$('#selectToAdd').html($('#patients').html());
  });
  $('#merilecIsti').change(function(){
  	if(this.checked)
  		$('#kreirajMerilec').prop('disabled', true);
  	else
  		$('#kreirajMerilec').prop('disabled', false);
  });
  $('#dodajMeritev').click(function dodajMeritev(){
  	dodajVitalne();
	});
	$('#selectToAdd').change(function(){
		if($('#selectToAdd').find(':selected').val() === ''){
			$('#recordCreator').hide(700);
		}
		else{
			$('#recordCreator').show(700);
		}
	});
	
});

/*

https://developers.google.com/maps/documentation/javascript/places?csw=1#TextSearchRequests
https://developers.google.com/maps/documentation/javascript/examples/place-search-pagination
http://morrisjs.github.io/morris.js/
http://bl.ocks.org/mccannf/1629644#jquery.tipsy.js

Vir podatkov:
http://www.heart.org/HEARTORG/Conditions/HighBloodPressure/AboutHighBloodPressure/Understanding-Blood-Pressure-Readings_UCM_301764_Article.jsp#
http://en.wikipedia.org/wiki/Human_body_temperature
*/