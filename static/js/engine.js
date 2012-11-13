console.log('Loading engine.js')

var ChartType = {
	PAD: { name: 'PAD',
		   width: 400,
		   height: 400,
		   logic: PADChartLogic },
	P: { name: 'P',
		 width: 400,
		 height: 400,
   	     logic: PChartLogic	},
	A: { name: 'A',
		 width: 400,
		 height: 400 },
	D: { name: 'D',
		 width: 400,
		 height: 400
	   }
}

var generateUniqueId = (function() {
	var id = 0;
	return function() {
		if (arguments[0] == 0) { 
			id = 0;
		}
		return id++;
	}
})();

var charts = [];

function PADChartLogic(processing) {

	processing.setup = function() {
		processing.size(400, 200);
	}

	// Override draw function, by default it will be called 60 times per second
 	processing.draw = function() {
		// determine center and max clock arm length
 	    var centerX = processing.width / 2, centerY = processing.height / 2;
  	    var maxArmLength = Math.min(centerX, centerY);

	    function drawArm(position, lengthScale, weight) {      
    		processing.strokeWeight(weight);
      		processing.line(centerX, centerY, 
            	            centerX + Math.sin(position * 2 * Math.PI) * lengthScale * maxArmLength,
                	        centerY - Math.cos(position * 2 * Math.PI) * lengthScale * maxArmLength);
	    }

    	// erase background
	    processing.background(124);

    	var now = new Date();

	    // Moving hours arm by small increments
    	var hoursPosition = (now.getHours() % 12 + now.getMinutes() / 60) / 12;
	    drawArm(hoursPosition, 0.5, 5);

	    // Moving minutes arm by small increments
    	var minutesPosition = (now.getMinutes() + now.getSeconds() / 60) / 60;
	    drawArm(minutesPosition, 0.80, 3);

	    // Moving hour arm by second increments
    	var secondsPosition = now.getSeconds() / 60;
	    drawArm(secondsPosition, 0.90, 1);
    };
}

function PChartLogic(processing) {

	processing.setup = function() {
		processing.size(200, 400);
	}

	// Override draw function, by default it will be called 60 times per second
 	processing.draw = function() {
		// determine center and max clock arm length
 	    var centerX = processing.width / 2, centerY = processing.height / 2;
  	    var maxArmLength = Math.min(centerX, centerY);

	    function drawArm(position, lengthScale, weight) {      
    		processing.strokeWeight(weight);
      		processing.line(centerX, centerY, 
            	            centerX + Math.sin(position * 2 * Math.PI) * lengthScale * maxArmLength,
                	        centerY - Math.cos(position * 2 * Math.PI) * lengthScale * maxArmLength);
	    }

    	// erase background
	    processing.background(224);

    	var now = new Date();

	    // Moving hours arm by small increments
    	var hoursPosition = (now.getHours() % 12 + now.getMinutes() / 60) / 12;
	    drawArm(hoursPosition, 0.5, 5);

	    // Moving minutes arm by small increments
    	var minutesPosition = (now.getMinutes() + now.getSeconds() / 60) / 60;
	    drawArm(minutesPosition, 0.80, 3);

	    // Moving hour arm by second increments
    	var secondsPosition = now.getSeconds() / 60;
	    drawArm(secondsPosition, 0.90, 1);
    };
}

function Chart(type) {
	console.log('Creating new ' + type.name + ' chart.');

	this.id = parseInt(generateUniqueId());
	this.type = type;

	console.log('  id: ' + this.id);
	console.log('  type: ' + this.type.name);

	this.logic = type.logic;
	this.width = type.width;
	this.height = type.height;

	console.log('  logic: ' + this.logic);
	console.log('  w: ' + this.width);
	console.log('  h: ' + this.height);
	
	console.log('  charts: ' + charts);

	charts[this.id] = this;

	console.log('  charts: ' + charts);

	console.log('  END Chart()');
}

var addChart = function(type) {
	var chart = new Chart(type);
	
	console.log(charts);

	var canvas = $('<canvas />', {id: chart.id, width: chart.width, height: chart.height});
	var div = $('<div />', {width: chart.width, height: chart.height, html: canvas})

	$('div#chartContainer').append(div);

	var canvas = document.getElementById(chart.id);
	console.log(canvas);

	// attaching the sketchProc function to the canvas
	var p = new Processing(canvas, chart.logic); // p.exit(); to detach it
	console.log(p);
	
	return true;
}

var addPADChart = function() {
	return addChart(ChartType.PAD);
}

var addPChart = function() {
	return addChart(ChartType.P);
}

$().ready(function() {
	$('a.newPADChart').click(addPADChart);
	$('a.newPChart').click(addPChart);
});
