
$(document).ready(function() {


    (function($) {

            $.fn.pictShow = function(pictArr) {
                var currentPict; //sparar aktuell bild i en variabel
                var currentText; //sparar aktuell undertext i en variabel
                var i; //loop variable
                var lengthArr;//check length of picShow
                lengthArr = pictArr.length; //check length of array
                var stopIt; //boolean for stopping the function if image is clicked

                stopIt = false;

                i = 0; //initiera variabel till 0

                //the loop will stop if picture is clicked
                $("#my_img").click( function() {
                    stopIt = true;
                });


                function showPic() {

                    //if someone clicks the picture the loop will stop
                    if (stopIt === true) {
                        return;
                    }

                    //controll that the program is within the array spectra

                    if ( lengthArr > i) {
                        currentPict = pictArr[i][0];
                        currentText = pictArr[i][1];

                        i = i + 1; //add to the loop variable

                        //display picture

                        $('#my_img')
                        .fadeOut()
                        .fadeIn()
                        .attr('src', currentPict);

                        $("#description").html(currentText);

                        setTimeout(showPic, 4000);

                    } else {
                        i = 0; //reset the loop variable

                        //setTimeout(showPic,2000);
                    }
                }

                showPic();
            };
            //pictShow();

        }) (jQuery);


    //the function for displaying miniatures
    (function($) {

            $.fn.miniatures = function(pictArr) {
                var img; //bilden
                var i; //loop
                var imgNew; //list of picture elements
                imgNew = "";


                //display pictures, the miniatures, from array
                for (i=0; i<pictArr.length; i+=1) {
                    img = pictArr[i][0];

                    imgNew += " <img id=" + i + " src=" + img + " alt=pict width=100>";

                    $("#pict").html(imgNew);

                    console.log(imgNew);
                }

                //a function that catches the images from the loop
                //and makes them clickable + enlargens
                function makeClickable(id, img2, text2) {

                    $(id).click(function () {
                        $("#my_img").attr("src", img2);
                        $("#description").html(text2);
                    });

                }

                //get the pictures from the array and get the ids
                //get ready to be clickable
                //sends on to the function that makes the miniature a big picture

                var id;
                var img2;
                var text2;

                for (i=0; i<pictArr.length; i+=1) {
                    id = "#" + i;
                    img2 = pictArr[i][0];
                    text2 = pictArr[i][1];

                    makeClickable(id, img2, text2);
                }
            };
        }) (jQuery);

    //function for making a lightbox version

    (function($) {
                var wHeight; //height of window
                var wWidth; //width of window
                var showWidth; //check the width of the display window
                var showHeight; //check height of display window
                var pictPosT; // vaiable for storing image pos
                var pictPosL; //variable for position from lest
                var imgWidth; //var for width of image
                var imgHeight; //var for height

                wHeight = window.innerHeight || $(window).height();
                wWidth = window.innerWidth  || $(window).width();

                //checking the area that is displayed
                showWidth = $("#the_show").width() || 940;
                showHeight = $("#the_show").height() || 610;


                //function for shading the bground
                function shadeBG() {
                    var shade; //shade variable

                    shade = "<div id='shade'></div>";
                    console.log("$top");

                    //put the shade below the title
                    $("#title").append(shade);

                    //style the shade
                    $("#shade")
                    .css({
                        'opacity': '0.8',
                        'position' : 'absolute',
                        'background-color' : '#FFF',
                        'width' : showWidth,
                        'height' :  showHeight
                    });

                    console.log('White bground');
                    console.log(showWidth);
                    console.log( showHeight);
                }

                //function to show the picture
                function showPict(pictPosT, pictPosL) {

                    //get img from specific tag
                    var imgThis = $("#my_img").attr('src');
                    console.log(imgThis);

                    $('<img id="lightImg" src="">')
                    //$('<div id="yeah"></div>')
                    //.html("hello")
                    .attr('src', imgThis)

                    .css({
                        'position' : 'absolute',
                        'top':  pictPosT,
                        'left': pictPosL,
                        'opacity': '10'
                    })
                 //.fadeIn()
                 .appendTo('body');

                    console.log(pictPosT);
                    console.log(pictPosL);
                    console.log('Displaying the picture');

                }

                $.fn.lightBox = (function () {

                        //decide where the image should be
                        imgWidth = $("#my_img").width();
                        imgHeight = $("#my_img").height();

                        pictPosT = (wHeight / 2) - (imgWidth / 2);
                        pictPosL = (wWidth / 2) - (imgHeight / 2) + 16;

                        //show the pict
                        showPict(pictPosT, pictPosL);

                        //shade the bground
                        shadeBG();


                        //hide lightbox functions when image is clicked
                        $("#lightImg, #shade").click(function() {

                                $('#shade').remove();
                                $('#lightImg').fadeOut().remove();

                            });
                    });

            }) (jQuery);

    //array in numerical order with pictures for displaying
    var pictArr;
    pictArr = [];

    pictArr[0] = ["../img/flower_s.jpg", "The black flow"];
    pictArr[1] = ["../img/flower_red.jpg", "The red flow"];
    pictArr[2] = ["../img/flower_prpl.jpg", "The purple flow"];


    //the clickable plugins, works independently

    //the picture show
    $('#pictureShow').click(function () {
        //window.alert("clickClick");
        $(this).pictShow(pictArr);
        console.log('Clicked on pictureShow to see the show');
    });

    //the clickable miniatures
    $('#theMiniatures').html(function () {
        $(this).miniatures(pictArr);
        console.log('Display clickable miniatures');
    });

    //the lightbox image
    $('#my_img').click(function () {
        $(this).lightBox();
        console.log('Lightbox image');
    });

});
