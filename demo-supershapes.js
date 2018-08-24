/*
	x = r sin(Lon) cos(lat)
	y = r sin(Lon) sin(lat)
	z = r cos(Lon)
	
	translated from https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_026_SuperShape3D/CC_026_SuperShape3D.pde
	in p5.js
*/


var globals = {
	r : 200,
	total : 60,
	globe : [],
	offset : 0,
	rot : 0,
	auto : true,
	colorChosen : 'europa',
	shapeChosen : 'thorny',
	a:1,
	b:1,
	lastx:0.1,
	lasty:0.5,
	textBg :null
};

var shapes = {
	"spheroid":{
		"zoom":0.9,
		"r1":{
			m:0.1,
			n1:1,
			n2:1,
			n3:1
		},
		"r2":{
			m:0.1,
			n1:1,
			n2:1,
			n3:1
		}
	},
	"thorny":{
		"zoom":1,
		"r1":{
			m:7,
			n1:0.2,
			n2:1.7,
			n3:1.7
		},
		"r2":{
			m:7,
			n1:0.2,
			n2:1.7,
			n3:1.7
		}
	},
	"seed":{
		"zoom":0.6,
		"r1":{
			m:8,
			n1:60,
			n2:100,
			n3:30
		},
		"r2":{
			m:2,
			n1:10,
			n2:10,
			n3:10
		}
	},
	"sentient-shell":{
		"zoom":1,
		"r1":{
			m:6,
			n1:1,
			n2:1,
			n3:1
		},
		"r2":{
			m:3,
			n1:1,
			n2:1,
			n3:1
		}
	},
	"trilobit":{
		"zoom":0.8,
		"r1":{
			m:2,
			n1:0.7,
			n2:0.3,
			n3:0.2
		},
		"r2":{
			m:3,
			n1:100,
			n2:100,
			n3:100
		}
	},
	"wise-rock":{
		"zoom":0.8,
		"r1":{
			m:3,
			n1:0.5,
			n2:1.7,
			n3:1.7
		},
		"r2":{
			m:2,
			n1:10,
			n2:10,
			n3:10
		}
	},
	"ringed-pulsar":{
		"zoom":1,
		"r1":{
			m:0.2,
			n1:0.1,
			n2:1.7,
			n3:1.7
		},
		"r2":{
			m:2,
			n1:0.5,
			n2:0.2,
			n3:0.2
		}
	},
	"space-bunny":{
		"zoom":1,
		"r1":{
			m:2.6,
			n1:0.1,
			n2:1,
			n3:2.5
		},
		"r2":{
			m:3,
			n1:3,
			n2:0.2,
			n3:1
		}
	},
	"penta-mind":{
		"zoom":0.7,
		"r1":{
			m:5,
			n1:1,
			n2:1,
			n3:1
		},
		"r2":{
			m:3,
			n1:100,
			n2:100,
			n3:100
		}
	},
	"hyper-clover":{
		"zoom":0.9,
		"r1":{
			m:6,
			n1:0.709889,
			n2:46.8299,
			n3:-0.8027
		},
		"r2":{
			m:7,
			n1:-31.9083,
			n2:-0.196521,
			n3:97
		}
	},
	"cruising-heart":{
		"zoom":0.5,
		"r1":{
			m:2,
			n1:0.437933,
			n2:13.1909,
			n3:0.64893
		},
		"r2":{
			m:1,
			n1:-21.8776,
			n2:-0.937533,
			n3:68.803
		}
	},
	"space-fish":{
		"zoom":0.8,
		"r1":{
			m:5.2,
			n1:0.04,
			n2:1.7,
			n3:1.7
		},
		"r2":{
			m:0.000001,
			n1:1,
			n2:1,
			n3:1
		}
	},
	"spin-top":{
		"zoom":0.8,
		"r1":{
			m:4,
			n1:100,
			n2:1,
			n3:1
		},
		"r2":{
			m:4,
			n1:1,
			n2:1,
			n3:1
		}
	},
	"starfish":{
		"zoom":1,
		"r1":{
			m:5,
			n1:0.1,
			n2:1.7,
			n3:1.7
		},
		"r2":{
			m:1,
			n1:0.3,
			n2:0.5,
			n3:0.5
		}
	}
}


//http://paulbourke.net/geometry/supershape/
function supershape(theta,shape,latZoom,lonZoom){
	var m = shape.m;
	var n1 = shape.n1;
	var n2 = shape.n2;
	var n3 = shape.n3;
	var a = latZoom;
	var b = lonZoom;
	var r = 1;
	
	if(m!=0){

		var t1 = abs((1/a) * cos(m*theta/4));
		t1 = pow(t1,n2);
		
		var t2 =  abs((1/b) * sin(m*theta/4));
		t2 = pow(t2,n3);
		
		r = pow(t1 + t2,(-1/n1));	
	}

	return r;
}


 function setup(){
  var cnv2 = createCanvas(640,480,WEBGL);
  cnv2.parent('supershapesZone');
  cnv2.mouseReleased(function(e){
	 globals.auto = !globals.auto;
	 globals.lastx = map(mouseX,0,640,0,PI);
	 globals.lasty = map(mouseY,0,480,0,PI);
  });
  
  cnv2.mouseWheel(function(e){
	 if (e.deltaY > 0) {
	   globals.r += 5;
	  } else {
		globals.r -= 5;
	  }
	  if(globals.r <30) globals.r =30;
	  if(globals.r >300) globals.r =300;
  });

 frameRate(30);
  
  
  globals.globe = [];


 }
 
 function draw(){
	 
	 globals.rot += 0.05;
	 // we have 2 radius in supershapesZone
	 // because we want to change theses radius along 2 axis
	 // as a 3D sphere is a 2D sphere rotated along the 2rd axis
	 // 
	 // we don't want to change definition while drawing !!!

	//noFill();
	
  background(0);
 

  orbitControl();
  
  globals.globe = [];
  
  var latZoom =  parseFloat($("#latZoomChosen").val());
  var lonZoom =  parseFloat($("#lonZoomChosen").val());
  
  var definition = parseInt($("#definitionChosen").val());
  if(isNaN(definition)) definition = 35;
  var myShape = shapes[globals.shapeChosen];
  var radius = globals.r * myShape.zoom;
  var myColors = globals.colorChosen;
  var hueOn = false;
  var colorOffset = "red";
  var wireModeOn = false;
  var movingColors = $("#movingOn").prop('checked');
  var autoRotationOn  = $("#autoRotationOn").prop('checked');
  
  if(myColors == "wireframe"){
	  colorMode(RGB);
	  wireModeOn = true;
	  
  }else if(myColors == "europa"){
	  colorMode(RGB);
	  hueOn = true;
	  colorOffset = "red";
	  
  }else if(myColors == "blue"){
	  colorMode(RGB);
	  hueOn = true;
	  colorOffset="redgreen"
	  
  }else if(myColors == "black"){
	  colorMode(RGB);
	  hueOn = true;
	  colorOffset="black"
	  
  }else if(myColors == "lilac"){
	  colorMode(RGB);
	  hueOn = true;
	  colorOffset="green"
  }else if(myColors == "rainbow"){
	  colorOffset = "red";
	  colorMode(HSB)
	  hueOn = true;
  }else if(myColors == "mint"){
	  colorOffset = "redblue";
	  colorMode(RGB)
	  hueOn = true;
  }else if(myColors == "strawberry"){
	  colorOffset = "greenblue";
	  colorMode(RGB)
	  hueOn = true;
  }else{
	  colorMode(RGB);
	  hueOn = true;
	  colorOffset="other"
  }
  
  if(wireModeOn){
	 stroke(255);
	 fill(90);
  }else{
	 noStroke(); 
  }
	for(var i = 0; i < definition+1; i++){
		var lat = map(i,0,definition,-HALF_PI, HALF_PI);
		var r2 = supershape(lat,myShape.r2,latZoom,lonZoom);
		globals.globe.push([]);
		for(var j = 0; j < definition+1; j++){
			var lon = map(j,0,definition, -PI, PI);
			var r1 = supershape(lon,myShape.r1,latZoom,lonZoom);
			var x = radius * r1 * cos(lon) * r2 * cos(lat);
			var y = radius * r1 * sin(lon) * r2 * cos(lat);
			var z = radius * r2 * sin(lat);
			globals.globe[i].push(createVector(x,y,z));
		}
	}

	if(autoRotationOn){
		rotateX(globals.lastx + globals.rot*0.05);
		rotateY(globals.lasty + globals.rot*0.25);
	}else{
		rotateX(0.5);
		rotateY(1.2);
	}
	
	if(movingColors){
		globals.offset += 1;
	}else{
		globals.offset = 0;
	}
	for(var i = 0; i < definition+1; i++){
		if(hueOn){
			var hu = map(i, 0, definition, 0, 255*6);
			var colorOffsetValue =(( hu + globals.offset)  % 250);
			if(colorOffset=="red"){
				fill(colorOffsetValue, 200, 200);		
			}else if(colorOffset=="blue"){
				fill(200, 200,colorOffsetValue);	
			}else if(colorOffset=="green"){
				fill(200,colorOffsetValue,200);	
			}else if(colorOffset=="redgreen"){
				fill(colorOffsetValue,colorOffsetValue,200);	
			}else if(colorOffset=="redblue"){
				fill(colorOffsetValue,200,colorOffsetValue);	
			}else if(colorOffset=="greenblue"){
				fill(200,colorOffsetValue,colorOffsetValue);	
			}else if(colorOffset=="black"){
				fill(colorOffsetValue,colorOffsetValue,colorOffsetValue);	
			}else{
				var colorOffsetValue2 =(( hu + globals.offset)  % 170);
				var colorOffsetValue3 =(( hu + globals.offset)  % 90);
				fill(colorOffsetValue,colorOffsetValue2,colorOffsetValue3);	
			}
		}

			
		beginShape(TRIANGLE_STRIP);
		for(var j = 0; j < definition+1; j++){

			var v1 = globals.globe[i][j];	
			vertex(v1.x,v1.y,v1.z);
			
			var k = (i < definition) ? i+1 : i;
			var v2 = globals.globe[k ][j];
			vertex(v2.x,v2.y,v2.z);
		}
		endShape();
	}
 }
 
 	$( document ).ready(function() {
		  	var $label =  $("<label></label>");
			$label
				.appendTo($("#modelZone"))
				.html("Select your supershape !&nbsp;:&nbsp;");
				
		  var $select = $("<select></select>");
		  $select
			.appendTo($("#modelZone"))
			.attr("id","select-shape");
			
		  $.each(shapes, function( key, value ) {
			var $option  = $("<option></option>");
			$option
				.appendTo($select)
				.attr("value",key)
				.text(key);
				
				if(key == globals.shapeChosen){
					$option
						.attr("selected",true);
				}
			});
			$("#definitionChosen").val(globals.total);
			$("#definitionValue").text(globals.total);
			$("#select-colors").val(globals.colorChosen);

			

			$("#select-shape").on("change",function(){
				globals.shapeChosen = $(this).val();
			});	
			
			$("#select-colors").on("change",function(){
				globals.colorChosen = $(this).val();
			});	
			
			$("#definitionChosen").on("change",function(){
				$("#definitionValue").text($(this).val());
			});	
			
			$("#latZoomChosen").on("change",function(){
				$("#latZoomValue").text($(this).val());
			});	
			$("#lonZoomChosen").on("change",function(){
				$("#lonZoomValue").text($(this).val());
			});	
					
			
		});
 
