var jsonData={
"BMI":[
	{	"min":0,
		"max":18.50,
		"status":"Underweight",
		"class":"danger"
	}	
	,{
		"min":18.50,
		"max":24.99,
		"status":"Normal",
		"class":"success"
	}
	,{
		"min":25.00,
		"max":29.99,
		"status":"Overweight",
		"class":"warning"
	}
	,{
		"min":30.00,
		"max":1000,
		"status":"Obese",
		"class":"danger"
	}
]
,
"Systolic":[
	{
		"min":0,
		"max":120,
		"status":"Normal",
		"class":"success"
	},
	{
		"min":120,
		"max":139,
		"status":"Prehipertension",
		"class":"warning"
	},
	{
		"min":140,
		"max":159,
		"status":"Hipertension Stage 1",
		"class":"warning"
	},	
	{
		"min":160,
		"max":179,
		"status":"Hipertension Stage 2",
		"class":"danger"
		},
	{
		"min":180,
		"max":500,
		"status":"Hypertension",
		"class":"danger"
	}
	],
"Diastolic":[
	{
		"min":0,
		"max":80,
		"status":"Normal",
		"class":"success"
	},
	{
		"min":80,
		"max":89,
		"status":"Prehipertension",
		"class":"warning"
	},
	{
		"min":90,
		"max":99,
		"status":"Hipertension Stage 1",
		"class":"warning"
	},	
	{
		"min":100,
		"max":109,
		"status":"Hipertension Stage 2",
		"class":"danger"
		},
	{
		"min":110,
		"max":500,
		"status":"Hipertension",
		"class":"danger"
	}
	],	
"Temperature":[
		{	"max":35.0,
			"min":0,
			"status":"Hypothermia",
			"class":"warning"
			},
		{	
			"min":36.5,
			"max":37.5,
			"status":"Normal",
			"class":"success"
		},
		{	
			"min":37.5,
			"max":38.3,
			"status":"Fever",
			"class":"warning"
		},
		{
			"min":38.4,
			"max": 39.9,
			"status":"Hyperthermia",
			"class":"warning"
		},
		{ 
			"min":40.0,
			"max":45,
			"status":"Hyperthermia",
			"class":"danger"
		}			
	],
"Oximetry":[
	{
		"max":100,
		"min":95,
		"status":"Normal",
		"class":"success"
	},
	{
		"max":95,
		"min":90,
		"status":"Low",
		"class":"warning"	
	},
	{
		"max":90,
		"min":0,
		"status":"Hypoxemia",
		"class":"danger"
	}
]	
};

var messages={
"emergency":"Your vital signs are showing us, that your health condition is urgent. We suggest you, that you, as quickly as you can, visit the nearest hospital. You can find them here:",
"underweight":"Your body mass index is showing us, that you are underweight. We suggest you, that you talk to nearest doctor about your nutrition plan, and that you start eating and exercising regulatly, becouse this will that will transform nutrients mostly into your muscle.The following link will help you find nearest doctors and food resources.",
"normal":"You body mass index shows that your health condition is stable, and that you are healty. Keep on maintaining it.",
"overweight":"You body mass index shows, that you are a bit overweight. You should take a look at the following link, to find nearest gym or park to excercise and your body will be gratefull for it.",
"obese":"The measured body mass index shows us the status of obesity. You should visit nearest doctor and analise your eating habits and phisical activity. Nearest doctors can be found on following link:"

	
};