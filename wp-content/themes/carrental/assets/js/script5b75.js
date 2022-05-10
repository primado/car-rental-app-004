"use strict";

(function ($) {
  "use strict";

  $(window).on("scroll", function () {
    var scrolltop = $(window).scrollTop();
    if ($(document).width() < 992) {
      return;
    }
    if (scrolltop > 300) {
      $(".navbar-sticky").addClass("fixed-top");
    } else {
      $(".navbar-sticky").removeClass("fixed-top");
    }
  });
  $(".navbar-nav")
    .find(".dropdown-toggle")
    .on("click", function () {
      if ($(document).width() > 992) {
        return;
      }
      $(this)
        .siblings(".dropdown-menu")
        .slideToggle();
    });

  $(".nav-search").on("click", function () {
    $(this)
      .siblings(".search-block")
      .slideToggle();
  });

  //  back to top

  $(window).on("scroll", function () {
    var scrolltop = $(window).scrollTop(),
      docHeight = $(document).height() / 2;

    if (scrolltop > docHeight) {
      $(".back_to_top, .sassico-back-to-top-wraper").fadeIn("slow");
    } else {
      $(".back_to_top, .sassico-back-to-top-wraper").fadeOut("slow");
    }
  });
  $("body, html").on("click", ".back_to_top, .sassico-back-to-top", function (
    e
  ) {
    e.preventDefault();
    $("html, body").animate({
        scrollTop: 0
      },
      800
    );
  });

  // Car Select Form
//-------------------------------------------------------------------------------
//   $("#car-select-form").submit(function (e) {
//     e.preventDefault();

//       var selectedCar = $("#car-select").find(":selected").text();
//       var selectedCarVal = $("#car-select").find(":selected").val();
//       var selectedCarImage = $("#car-select").val();
//       var pickupLocation = $("#pick-up-location").val();
//       var dropoffLocation = $("#drop-off-location").val();
//       var pickUpDate = $("#pick-up-date").val();
//       var pickUpTime = $("#pick-up-time").val();
//       var dropOffDate = $("#drop-off-date").val();
//       var dropOffTime = $("#drop-off-time").val();

//       var error = 0;

//       if (validateNotEmpty(selectedCarVal)) {
//           error = 1;
//       }
//       if (validateNotEmpty(pickupLocation)) {
//           error = 1;
//       }
//       if (validateNotEmpty(pickUpDate)) {
//           error = 1;
//       }
//       if (validateNotEmpty(dropOffDate)) {
//           error = 1;
//       }

//       var data = "";

//       if (0 == error)
//       {

//           $("#selected-car-ph").html(selectedCar);
//           data = data + "Selected Cars" + ': ' + selectedCar + '\n';
//           $("#selected-vehicle-image").attr('src', selectedCarImage);

//           $("#pickup-location-ph").html(pickupLocation);
//           data = data + "Pickup Location" + ': ' + pickupLocation + '\n';

//           if ("" == dropoffLocation)
//           {
//               $("#dropoff-location-ph").html(pickupLocation);
//               $("#dropoff-location").val(pickupLocation);
//               data = data + "DropOff Location" + ': ' + pickupLocation + '\n';
//           } else
//           {
//               $("#dropoff-location-ph").html(dropoffLocation);
//               data = data + "DropOff Location" + ': ' + dropoffLocation + '\n';
//           }

//           $("#pick-up-date-ph").html(pickUpDate);
//           $("#pick-up-time-ph").html(pickUpTime);
//           data = data + "Pickup" + ': ' + pickUpDate + ' at ' + pickUpTime + '\n';

//           $("#drop-off-date-ph").html(dropOffDate);
//           $("#drop-off-time-ph").html(dropOffTime);
//           data = data + "DropOff" + ': ' + dropOffDate + ' at ' + dropOffTime + '\n';

//         // $('#checkoutModal').modal();
//         $('#checkoutModal').modal('show');
//           $('.reserve_info textarea, textarea.reserve_info').html(data);
//       } else
//       {
//           $('#car-select-form-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
//       }

//       return false;
//   });
//   // Not Empty Validator Function
// //-------------------------------------------------------------------------------

// function validateNotEmpty(data) {
//   if (data == '') {
//       return true;
//   } else {
//       return false;
//   }
// }

})(jQuery);