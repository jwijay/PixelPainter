$(function(){

  function generateRGB (){
    var randomColor1 = Math.floor(Math.random() * 0xFF);
    var randomColor2 = Math.floor(Math.random() * 0xFF);
    var randomColor3 = Math.floor(Math.random() * 0xFF);

    return "rgb("+randomColor1+", "+randomColor2+", "+randomColor3+")";
  }

  function PixelPainter(height, width){
    var swatches = $('<div>', {"class" : "swatches"});
    var num_swatches = 25;
    var swatch_column_num = 5;
    var swatch_size = "20px";
    var square_size = "36px";

    var colors = [
      "rgb(243, 67, 222)",
      "rgb(47, 238, 218)", 
      "rgb(176, 245, 109)", 
      "rgb(29, 242, 87)", 
      "rgb(61, 138, 218)", 
      "rgb(188, 226, 136)", 
      "rgb(173, 180, 104)", 
      "rgb(72, 40, 234)", 
      "rgb(24, 166, 37)", 
      "rgb(222, 2, 50)", 
      "rgb(134, 92, 174)", 
      "rgb(219, 170, 207)", 
      "rgb(75, 136, 51)", 
      "rgb(194, 94, 98)", 
      "rgb(29, 112, 157)", 
      "rgb(137, 237, 183)", 
      "rgb(218, 65, 168)", 
      "rgb(187, 18, 211)", 
      "rgb(93, 87, 175)", 
      "rgb(66, 221, 132)", 
      "rgb(2, 224, 217)", 
      "rgb(47, 108, 101)", 
      "rgb(25, 142, 52)", 
      "rgb(127, 172, 154)", 
      "rgb(122, 191, 12)"
    ];

    for(var i = 0; i < num_swatches; i++) {
      var new_swatch = $('<div>', {"class" : "color"});
      new_swatch.css({
        // 'background-color' : colors[i],
        'background-color' : generateRGB(),
        'height' : swatch_size,
        'width' : swatch_size,
        'display' : 'inline-block',
        "border" : "solid #000000 2px"
      });
      swatches.append(new_swatch);

    }

    var erase = $('<button>', {
      "id" : "erase",
      html : "erase"
    });
    var clear = $('<button>' ,{
      "id" : "clear",
      html : "clear"
    });
    // var save = $('<button>' ,{
    //   "id" : "save",
    //   html : "save"
    // });

    var swatchesWidth = (Number(swatch_size.substring(0, swatch_size.length-2)) + 4) * swatch_column_num;
    $('#controls').prepend(swatches);
    $('#controls').addClass('clearfix');
    $('.swatches').after(erase, clear);
    $('.swatches').css({"width" : swatchesWidth.toString() + "px"});

    var grid = $('<div>', {"class" : "grid"});
    var rowWidth = (Number(square_size.substring(0, square_size.length-2)) + 2) * width;

    for (var j = 0; j < height; j++) {
      for(var k = 0; k < width; k++) {
        var new_square = $('<div>', {"class" : "square"});
        new_square.css({
          'border' : "solid #000000 1px",
          'height' : square_size,
          'width' : square_size,
          'display' : 'inline-block'
        });
        grid.append(new_square);
      } 
    }

    $('#artboard').append(grid);
    $('.grid').css({"width" : rowWidth.toString() + "px"});
    // console.log(rowWidth);
    $('#artboard').addClass('clearfix');

  }

  PixelPainter(20, 20);

  /*
    CLICK HANDLERS! YAY.
   */

  $('#clear').click(function(){
    $('.square').css({"background-color" : "rgb(255, 255, 255)"});
  });

  var curr_color = "rgb(255, 255, 255)";
  var isMouseDown = false;

  //selects a swatch
  $('.color').click(function(){
    curr_color = $(this).css("background-color");
    $('.color').css({"border" : "solid #000000 2px"});
    $(this).css({"border" : "solid #FFFFFF 2px"});
  });

  //keep track of mousedown/up state on document, so it won't
  //matter which square we're on when we're dragging
  //also, will allow user to drag cursor off screen and still
  //paint correctly
  $(document).bind({
    mousedown : function() {
      isMouseDown = true;
    },
    mouseup : function() {
      isMouseDown = false;
    }
  });

  //whenever we mouse over a square, check if we've moused down on the grid (if so, paint)
  $('.square').bind({
    mouseover : function () {
      if (isMouseDown) {
            $(this).css({"background-color" : curr_color});
      }
    },
    mousedown : function () {
      $(this).css({"background-color" : curr_color});
    }
  });

  //sets current color to white so we turn grid squares white (to "erase" them)
  $('#erase').click(function() {
    curr_color = "rgb(255, 255, 255)";
  });

  $('#save').click(function() {
    var file_name  = prompt("Please enter title for drawing: ", "New Drawing");
    var grid = $('.grid').html();

    if (typeof grid === "undefined") {
      grid = $('.saved-grid').html();
    }

    if (file_name !== null) {

      $.post('/', { file_name : file_name, grid : grid }, function(data) { 
          alert(file_name + " saved successfully.");
          //TODO: see if there's a way to check database for 
          //same filename, first
        });
    }
  });

  $('#load').click(function() {
    window.location = "/load";
  });

  $('#create').click(function() {
    window.location = "/";
  });

});//document.ready
