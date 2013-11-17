$(document).ready(function(){
  //Kin is a global object defined to mak it easy to get Kinetic context
  kin = {};
  initStage();

/*
  $('.iconbox button').click(function(){
    console.dir($(this).children();
    addText("\uE060");
  });
*/

/***
    $('.iconbox button').click(function(){
    //var source = $(this).html();
    //var source = $(this).contents();
    //var icon = $(source).contents();
    //var icon = $(source).html();
    //var icon = $(source).text();
    //addText(source);
    //addText(icon);


    var source = $(this)
    var source1 = $('source'):nth-child(1);
    //.attr('class');
    //var icon = $('source:nth-child(1)')
    addText(source1);
  });
***/

    $('.iconbox button').click(function(){
      addText("\uE060");
    });

    $('#saveButton').click(function(){
      // save stage as a json string
      var json = kin.stage.toJSON();
      console.dir(json);     
    });

    $('#mobileIocn').click(function(){
      addMobileImg();    
    });

});

function initStage() {
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

//adds a webpage image to canvas
function addMobileImg(){
  
  var imageObj = new Image();
  imageObj.src = 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/IPhone_5.png/240px-IPhone_5.png';
  
  var iconImg = new Kinetic.Image({
    image: imageObj,
    x: kin.stage.getWidth() / 2 - 200 / 2,
    y: kin.stage.getHeight() / 2 - 137 / 2,
    width: 200,
    height: 137,
    draggable: false,

    // add the shape to the layer
    kin.layer.add(iconImg);

    kin.stage.batchDraw();

    // add the layer to the stage
    kin.stage.add(kin.layer);
});

// add cursor styling
iconImg.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
});

iconImg.on('mouseout', function() {
  document.body.style.cursor = 'default';
});



function addText(string){
  var simpleText = new Kinetic.Text({
        x: kin.stage.getWidth() / 2,
        y: 15,
        text: string,
        fontSize: 30,
        fontFamily:'Glyphicons Halflings',
        fill: 'black',
        draggable: true
      });
 
  kin.layer.add(simpleText);
  //kin.stage.add(layer);

  kin.stage.batchDraw();
}