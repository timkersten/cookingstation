 /**
       * Javascript Cooking Wheel file.
       * This file contains the functionality that random selects a category when the spin 
       * button on the cooking wheel is pressed. When the random selection takes place, the 
       * cooking wheel is changing the main image of the cooking wheel every few milliseconds 
       * with the current selected category. The animation stops randomly after a few seconds 
       * between a given range
       *
       * This files requires jquery 1.11.2 or above in order to work. It also requires a #div 
       * called food_wheel_image inside the HTML file and a number of images wich are defind in * the $wheel_image_paths array.
       * 
       * @todo: Select an individually category by clicking on the category name
       * @todo: Add the possibility to run the animation again after it has been finished playing
       *
       * @author Tim Kersten, Roel de Man
       * @version v0.2
       */

      /**
       * Place the url path's from the cooking station wheel images in an array of strings.
       * @array
       */
      var $wheel_image_paths = [
        "assets/img/wheel/wheel_01.png",
        "assets/img/wheel/wheel_02.png",
        "assets/img/wheel/wheel_03.png",
        "assets/img/wheel/wheel_04.png",
        "assets/img/wheel/wheel_05.png"
      ];

      /**
       * Preload the images that are defined in the $wheel_image_paths array, so these images could be used directly.
       */
      var $images = [];
      for($i = 0; $i < $wheel_image_paths.length; $i++ )
      {
        $images[$i] = new Image();
        $images[$i].src = $wheel_image_paths[$i];
        console.log("The image path from image: " + $i + " has been preloaded! --> url(" + $wheel_image_paths[$i] + ")"); 
      }

      /**
       * Preload audio file's
       */
       $audio_loop = new Audio();
       $audio_loop.src = "assets/audio/wheel_loop.wav";
       $audio_stop = new Audio();
       $audio_stop.src = "assets/audio/wheel_stop.wav";

      /**
       * create an empty array to store the corresponding image display time in later on.
       * @array
       */
       var $track_image_time = [];

      /**
       * @boolean
       * Boolean that will determine if the cooking wheel has finish played its animation.
       */
      var $stop = false;

      /**
       * The animation time between the images in milliseconds (1000ms = 1 sec)
       * @int
       */
      var $time_between_images = 150; 


       /**
       * Set the minimum number of times to spin the cooking wheel before wheel must calculate 
       * when to stop.
       * @int
       */
       var $min_number_of_spins = 4;


      /**
       * boolean that checks if the spin button has been pressed by the user.
       * default value = false (because the button has not been pressed yet)
       * @boolean
       */
      var $spin_btn_click = false; 

      /**
       * Declare an empty var that will be filled later (with the index and url path of an image)
       * @array 
       */
      var $latest_image;
      

      /**
       * Collect the width and height of the food wheel image
       */
       var $wheel_width = document.getElementById('food_wheel_image').clientWidth;
       var $wheel_height = document.getElementById('food_wheel_image').clientHeight;

       console.log($wheel_width);
       console.log($wheel_height);
       
       /**
        * Create array's with x and y values that define the spin button's position relative to the food wheel image
        * array structure:
        *
        * $wheel_spin_point = [
        *  points x position,
        *  points y position
        * ]
        */
       var $wheel_spin_point1 = [ ($wheel_width / 100) * 43, ($wheel_height / 100) * 43 ];
       var $wheel_spin_point2 = [ ($wheel_width / 100) * 57, ($wheel_height / 100) * 43 ];
       var $wheel_spin_point3 = [ ($wheel_width / 100) * 43, ($wheel_height / 100) * 57 ];
       var $wheel_spin_point4 = [ ($wheel_width / 100) * 57, ($wheel_height / 100) * 57 ];

       console.log($wheel_spin_point1[0]);
       console.log($wheel_spin_point2[0]);
       console.log($wheel_spin_point3[0]);
       console.log($wheel_spin_point4[1]);


      /**
       * Checks if the user clicked on the cooking wheel image and calls the action that needs 
       * to be executed if the spin button is clicked. This is done by checking the coordinates 
       * of the mouse click relative to the image. 
       */
      $("#food_wheel_image").click( function(e) {

        // Get the position from the mouse click relative to the cooking wheel image. 
        var $offset = $(this).offset();
        var $x = e.pageX - $offset.left;
        var $y = e.pageY - $offset.top;


        // Check if the user has clicked on the spin button 
        // (the spin button is located between x-coordinates(240,312) and y-coordinates(240,312))
        //if($x >= 240 && $x <= 312 && $y >=240 && $y <=312 && $spin_btn_click == false)
        if($x >= $wheel_spin_point1[0] && $x <= $wheel_spin_point2[0] && $y >= $wheel_spin_point3[0] && $y <= $wheel_spin_point4[1] && $spin_btn_click == false)
        {

          // Set the boolean for the spin button to true (meaning the spin button may not be pressed as long as the animations plays)
          $spin_btn_click = true;

          // Call the spin_wheel_sequentially function 1 time so it immediately starts playing after the user clicked on the spin button 
          spin_wheel_sequentially();

          // Call the spin_wheel_sequentially function as long as the interval has not been cleared
          var interval = setInterval(function () {
                  spin_wheel_sequentially();
              }, 
              // Calculate the number of (mili) seconds the spin_wheel_sequentially function may be executed again.
              $time_between_images*$wheel_image_paths.length);

              // setTimeout clears the interval that has been set above after a given time (in milliseconds)
              var timeout = setTimeout(function() { 

                // Clear the interval and change the value of the $stop boolean (so a check can be performed if the cooking wheel has stopped playing the animation)
                clearInterval(interval);
                $stop = true;

                /*
                  // Set the boolean for the spin button back to false (meaning it may be pressed again)
                  $spin_btn_click = false; 
                */

                // check the current category
                check_category();
              }, 
              // Calculate when the timeout must be activated
              ($min_number_of_spins * ($wheel_image_paths.length * $time_between_images)) + get_random_number()); 
  
        }
        // Determine what to do if the user clicked on the cooking wheel image minus the spin button part
        else 
        { 
          console.log("Er is wel op de afbeelding geklikt maar niet op het vraagteken. Positie:  " + $x +","+ $y);
        }
      });


      /**
       * Get a value from the given array ($track_image_time)
       */
      function get_random_number()
      {
        // Call the function that fills the global array ($track_image_time)
        fill_image_time_array();
        // Create a var (int) and fil it with a random value from the $track_image_time array.
        var $my_random_number = $track_image_time[Math.floor(Math.random() * $track_image_time.length)];
        return $my_random_number;     
      }

      /**
       * Checks what the current category is, based on the result that has been stored in the 
       * latest_image array. Additionally this function also determinate what to do next if a 
       * category has been choosen by the cooking wheel shuffle mode.
       */
      function check_category()
      {
        switch($latest_image[0])
        {
          // 0 = joker
          case 0:
           $audio_stop.play();
            alert("Joker, is de uitgekozen categorie");
            console.log("'Joker' is the given category");
            break;
          // 1 = goedkoop 
          case 1:
            $audio_stop.play();
            alert("Goedkoop, is de uitgekozen categorie");
            console.log("'Goedkoop' is the given category");
            break;
          // 2 = vet lekker
          case 2:
            $audio_stop.play();
            alert("Vet Lekker, is de uitgekozen categorie");
            console.log("'Vet Lekker' is the given category");
            break;
          // 3 = snel 
          case 3:
            $audio_stop.play();
            alert("Snel, is de uitgekozen categorie");
            console.log("'Snel' is the given category");
            break;
          // 4 = gezond           
          case 4:
            $audio_stop.play();
            alert("Gezond, is de uitgekozen categorie");
            console.log("'Gezond' is the given category");
            break;
          default:
            console.log("To bad! No category could be selected :(");
        }
      }

      /**
       * Function that spins the cooking wheel sequentially by loading the cooking station 
       * images in a certain order.
       */
      function spin_wheel_sequentially()
      {
        
        // Iterate through the values from the $wheel_image_paths array
        for (var $i = 0; $i <= $wheel_image_paths.length -1; $i++) 
        {
          // Set a timeout so the cooking wheel image stays visible for an x amount of time
            setTimeout(function($x) { return function() 
            { 
              // Checks if the interval has come to an end
              if($stop)
              {
                /*
                  //If the spin button must be pressed again the code below is required.
                  $stop = false;
                */
                return false;
              }
              // If the interval (animation) has not come to an end keep pushing a new image to the given html #div
              else
              {
                $audio_loop.play();
                document.getElementById('food_wheel_image').src = $wheel_image_paths[$x];
                // fill an array with the current image and images index number. Which is necessary for the check_category() function
                $latest_image = [
                  $x,
                  $wheel_image_paths[$x]
                ];
              }
            }; }($i), $time_between_images*$i);
        } 
      }

      /**
       * Fill the track_image_time array with corresponding time values. 
       */
      function fill_image_time_array()
      {
        for (var $i = 0; $i < $wheel_image_paths.length; $i++) {
          $track_image_time[$i] = $time_between_images * $i;
        };
      }