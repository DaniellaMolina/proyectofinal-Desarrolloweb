// Initialization Area
var painArray = ["YAS", "Yeah", "Mmkay", "Ouch", "Owwwww", "AHHHHHHH"];
var pain = {}
for (var i = 0; i < painArray.length; i ++){
  pain[i] = painArray[i];
} 
var needle = $("#needle");
var prevFace = ".faces #Ouch";
var slider = document.getElementById("slider");

var level = document.getElementById("level");
level.innerHTML = slider.value;

function findPainLevel(value) {
  var painLevel = Math.floor(value / (Math.round(100/6)));
  return painLevel;
}

function moveGauge(input) {
  var value = Number(input);
  var maxScale = 943;
  var minScale = 471;
  var maxDegree = 85;
  var scaledValue = ((maxScale - minScale) / 100)* value + minScale;
  var midScale = (maxScale - minScale)/2 + minScale; // mid is actually rotate 0
  
  if (scaledValue <= midScale) {
    var rotate = 1;
  }
  else{
    var rotate = -1;
  }
  
  var scalePerDegree = (midScale - minScale) / maxDegree;
  var rotateValue = (midScale  - scaledValue)/scalePerDegree;  
  var rotation = rotate * rotateValue;
  //console.log(input,scaledValue ,midScale, rotate, rotation);
  var tl = new TimelineLite();
  tl.to(needle, 1, {rotation: rotateValue});
}

function morphFace(painLevel){
  var mouthExpression;
  mouthExpression = "#mouth_" + painLevel;
  var facialExpression = ".faces #" + pain[painLevel];
  var tl = new TimelineMax();
  tl.to("#mouth_3", 1, {morphSVG:mouthExpression});
  $(prevFace).css("visibility", "hidden");
  $(facialExpression).css("visibility", "visible");
  prevFace = facialExpression;

}




slider.oninput = function() {
  $(level).css("visibility", "visible");
  var currentLevel = this.value;
  var painLevel = findPainLevel(currentLevel);
  moveGauge(currentLevel);
  level.innerHTML = pain[painLevel];
  morphFace(painLevel);

}