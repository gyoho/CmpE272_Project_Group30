$(document).ready(function(){
  //Kin is a global object defined to mak it easy to get Kinetic context
  kin = {};
  initStage(kin);

  $('.iconbox').click(addIcon);


});

function initStage(kin) {
  kin.stage = new Kinetic.Stage({
    container: "container",
    width: 990,
    height: 590,
  });
  
  //create a single layer
  kin.layer = new Kinetic.Layer();
  //add it to Kinetic stage (canvas)
  kin.stage.add(kin.layer);
}

//adds a draggable vader to canvas
function addIcon(){
  
  var imageObj = new Image();
  imageObj.src = 'images/darth-vader.jpg';
  
  var darthVaderImg = new Kinetic.Image({
    image: imageObj,
    x: kin.stage.getWidth() / 2 - 200 / 2,
    y: kin.stage.getHeight() / 2 - 137 / 2,
    width: 200,
    height: 137,
    draggable: true
});

// darth vader
var darthVaderImg = new Kinetic.Image({
  image: imageObj,
  x: stage.getWidth() / 2 - 200 / 2,
  y: stage.getHeight() / 2 - 137 / 2,
  width: 200,
  height: 137,
  draggable: true
});

// add cursor styling
darthVaderImg.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
});
darthVaderImg.on('mouseout', function() {
  document.body.style.cursor = 'default';
});

layer.add(darthVaderImg);
stage.add(layer);
}

/*
var imageObj = new Image();
imageObj.onload = function() {
  drawImage(this);
};
imageObj.src = 'images/darth-vader.jpg';
*/

/*** Alert ***/
$(".alert").alert('close');