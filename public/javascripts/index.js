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
      $.ajax({
        type: "POST",
        url: "/api/projects",
        data: {name:"TestName",owner:"Gyoho",data:json},
        success: function(data){console.log("Saved")},
        dataType: "json"
      });
      console.dir(json);     
    });

    $('#loadButton').click(function(){
      // load stage as a json string
      $.ajax({
        type: "GET",
        url: "/api/projects/52905c0627a006d43e000004",
        success: function(data){
          console.log("Loaded");//,data.revision[0].data);
          initStage( Kinetic.Node.create(data.revision[0].data, 'container'));
        },
        dataType: "json"
      });
      //console.dir(json);     
    });



    //$('#mobileIcon').click(addMobileImg);

    $('#mobileWindow').click(function(){
        addMobileImg();
    });

    $('#laptopWindow').click(function(){
        addLaptopImg();
    });    

});

function initStage(loaded) {
  if(loaded){
    kin.stage = loaded;

    var array = kin.stage.find('Image');

    $.each(array, function( index, image ) {
      var imageObj = new Image();
      //console.dir(image);
      imageObj.onload = function() {
        image.setImage(imageObj);
        kin.stage.draw();
      };
      imageObj.src = 'images/' + image.attrs.name;
      
    });

  } else {
    kin.stage = new Kinetic.Stage({
      container: "container",
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  
  //create a single layer
  kin.layer = new Kinetic.Layer();
  //add it to Kinetic stage (canvas)
  kin.stage.add(kin.layer);
}

//adds a webpage image to canvas
function addMobileImg(){
  
  var imageObj = new Image();
  imageObj.src = 'images/iPhone.png';
  
  var iconImg = new Kinetic.Image({
    image: imageObj,
    x: 0,
    y: 0,
    width: kin.stage.getHeight(),
    height: kin.stage.getHeight(),
    draggable: true,
    name: 'iPhone.png'
  });

  // add cursor styling
  iconImg.on('mouseover', function() {
    document.body.style.cursor = 'pointer';
  });

  iconImg.on('mouseout', function() {
    document.body.style.cursor = 'default';
  });


  // add the shape to the layer
  kin.layer.add(iconImg);

  kin.stage.batchDraw();

  // add the layer to the stage
  //kin.stage.add(kin.layer);
}

function addLaptopImg(){
  
  var imageObj = new Image();
  imageObj.src = 'images/window.png';
  
  var iconImg = new Kinetic.Image({
    image: imageObj,
    x: 0,
    y: 0,
    width: kin.stage.getHeight(),
    height: kin.stage.getHeight(),
    draggable: true,
    name: 'window.png'
  });

  // add cursor styling
  iconImg.on('mouseover', function() {
    document.body.style.cursor = 'pointer';
  });

  iconImg.on('mouseout', function() {
    document.body.style.cursor = 'default';
  });


  // add the shape to the layer
  kin.layer.add(iconImg);

  kin.stage.batchDraw();

  // add the layer to the stage
  //kin.stage.add(kin.layer);
}


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