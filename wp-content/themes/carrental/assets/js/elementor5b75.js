"use strict";

(function($, elementor) {
  "use strict";

  var CarRental = {
    init: function init() {
      var widgets = {
        "carrental-cars.default": CarRental.Cars,
        "carrental-maps.default": CarRental.Maps,
        "carrental-banner.default": CarRental.Banner,
        "carrental-back-to-top.default": CarRental.BackToTop,
        "carrental-reservation.default": CarRental.Reservation,
      };

      $.each(widgets, function(widget, callback) {
        elementor.hooks.addAction("frontend/element_ready/" + widget, callback);
      });

      elementor.hooks.addAction(
        "frontend/element_ready/global",
        CarRental.GlobalCallback
      );
    },

    Cars: function($scope) {
        if ($scope.find('.xs-car-vehicles').length > 0) {

          $scope.find(".vehicle-data").hide();
          let activeVehicleData = $scope.find(".vehicle-tab-nav .active a").attr("href");
          $(activeVehicleData).show();

          $scope.find('.vehicle-nav-scroll').on("click", function () {
              let topPos = 0,
                  direction = $(this).data('direction'),
                  scrollHeight = $('.vehicle-tab-nav li').height() + 1,
                  navHeight = $('.vehicle-nav-container').height() + 1,
                  actTopPos = $(".vehicle-tab-nav").position().top,
                  navChildHeight = $('.vehicle-nav-container').find('.vehicle-tab-nav').height(),
                  x = -(navChildHeight - navHeight),
                  fullHeight = 0;

              $scope.find('.vehicle-tab-nav li').each(function () {
                  fullHeight += scrollHeight;
              });

              navHeight = fullHeight - navHeight + scrollHeight;
              // Scroll Down
              if ((direction == 'down') && (actTopPos > x) && (-navHeight <= (actTopPos - (scrollHeight * 2)))) {
                  topPos = actTopPos - scrollHeight;
                  $scope.find(".vehicle-tab-nav").css('top', topPos);
              }
              // Scroll Up
              if (direction == 'up' && 0 > actTopPos) {
                  topPos = actTopPos + scrollHeight;
                  $scope.find(".vehicle-tab-nav").css('top', topPos);
              }
              return false;
          });

          $scope.find(".vehicle-tab-nav li").on("click", function () {

              $scope.find(".vehicle-tab-nav .active").removeClass("active");
              $(this).addClass('active');

              $(activeVehicleData).fadeOut("slow", function () {
                  activeVehicleData = $scope.find(".vehicle-tab-nav .active a").attr("href");
                  $(activeVehicleData).fadeIn("slow");
              });

              return false;
          });

          // Vehicles Responsive Nav
          //-------------------------------------------------------------
          $scope.find(".select-vehicle-data").on("change", function () {
              $(activeVehicleData).fadeOut("slow", function () {
                  activeVehicleData = $scope.find(".select-vehicle-data").val();
                  $(activeVehicleData).fadeIn("slow");
              });
              return false;
          });


          let lists = $scope.find('.vehicle-tab-nav > li');
          if (lists.length <= 6) {
              $scope.find('.vehicle-nav-control').hide();
          }
        }

        if ($scope.find('.horizontal_car_tab_style').length > 0) {
          var galleryThumbs = new Swiper($scope.find('.horizontal_car_tab_gallery-thumbs'), {
              freeMode: true,
              watchSlidesVisibility: true,
              watchSlidesProgress: true,
              navigation: {
                nextEl: $scope.find('.car-button-next'),
                prevEl: $scope.find('.car-button-prev'),
              },
              breakpoints: {
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
              }
          });
          new Swiper($scope.find('.horizontal_car_tab_gallery-top'), {
              spaceBetween: 0,
              thumbs: {
                swiper: galleryThumbs
              },
              breakpoints: {
                640: {
                  allowTouchMove: true,
                },
                768: {
                  allowTouchMove: true,
                },
                1024: {
                  allowTouchMove: false,
                },
              }
          });
          $scope.find('.vehicle-price-rate').each(function () {
            $(this).parents('.vehicle-prices').prepend("<span class='price-sign'>" + $(this).text().charAt(0) + "</span>");
            $(this).html($(this).text().slice(1));
          })
        }
    },

    Maps: function($scope) {
      if ($scope.find('.car-rental-maps').length > 0) {
        function map_location_tigger(current, event) {
          let val = event === "change" ? current.val() : current.val(),
              iframe = $scope.find('.map-container > iframe'),
              zoom = iframe.data("zoom");
              iframe.attr('src', "//maps.google.com/maps?q="+val+"&t=m&z="+Number(zoom)+"&output=embed&iwloc=near");
        }
        map_location_tigger($scope.find('.xs-map-select'));
        $scope.find('.xs-map-select').on("change", function (event) {
          map_location_tigger($(this), event.type);
        });
        let height = $scope.find('.location-map-container').outerHeight(),
            mapContainer = $scope.find('.map-container');
        mapContainer.css({
          marginTop: -Math.floor(height / 2)
        })
      }
    },

    Banner: function ($scope) {
      new Swiper($scope.find('.car-banner-slider-wraper'), {
        // lazy: true,
        navigation: {
          nextEl: $scope.find('.banner-button-next'),
          prevEl: $scope.find('.banner-button-prev'),
        },
      });
    },

    BackToTop: function ($scope) {
      $(window).on("scroll", function () {
        var scrolltop = $(window).scrollTop(),
          docHeight = $(document).height() / 2;

        if (scrolltop > docHeight) {
          $(".car_back_to_top").slideUp();
        } else {
          $(".car_back_to_top").slideDown();
        }
      });

      $scope.find('.scrollup').on('click', function (e) {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: 0
        })
      });
    },

    Reservation: function ($scope) {
      if ($scope.find('.pick-up-date').length >0 && $scope.find('.drop-off-date').length > 0) {
        let nowTemp = new Date(),
          now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0),
          format = "dd/mm/yyyy",
          weekStart = 1;

        let checkin = $scope.find('.pick-up-date').datepicker({
            format,
            weekStart,
            onRender: function (date) {
                return date.valueOf() < now.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                let newDate = new Date(ev.date);
                newDate.setDate(newDate.getDate());
                checkout.setValue(newDate);
            }
            checkin.hide();
            $scope.find('.drop-off-date')[0].focus();
        }).data('datepicker');

        let checkout = $scope.find('.drop-off-date').datepicker({
            format,
            weekStart,
            onRender: function (date) {
                return date.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            checkout.hide();
        }).data('datepicker');
      }

      // Car reservation form submit handeler
      let mailContent = "";
      if ($scope.find(".car-select-form").length > 0) {
        $scope.find(".car-select-form").on("submit", function (e) {
          e.preventDefault();
          let dataArray = $(this).serializeArray(),
            error = 0;

          // Validation data
          jQuery.each( dataArray, function( i, field ) {
            if (validateNotEmpty(field.value)) {
              return error = 1;
            }
            // If error clear
            if (0 == error) {
                let name = field.name.charAt(0).toUpperCase() + field.name.replace(/-/g, " ").slice(1);
                if (field.name !== "car-select") {
                  $("[data-name="+ field.name +"]").html(field.value)
                  mailContent += name + " : " + field.value + '\n';
                } else {
                  if (field.value.indexOf('{') !== -1) {
                    var car_info = JSON.parse(field.value);
                    $("[data-name="+ field.name +"]").attr("src", car_info.src);
                    $(".selected-car-name").html(car_info.val);
                    mailContent += "Selected Car" + " : " + car_info.val + '\n';
                  }
                }
            }
          });
          if (0 == error) {
            $scope.find('.modal').modal('show');
          } else {
            $scope.find('.alert').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
          }
        });
      }

      if ($scope.find('.reservation-inline-style').length > 0) {
        $scope.find('.reservation-inline-style').parents('.elementor-widget-carrental-reservation').addClass('reservation-inline-style');
      }

      if ($scope.find('.mf-form-wrapper').length > 0) {
        // let name = "";
        // setTimeout(() => {
        //   name = $scope.find('.xs-car-details textarea').attr('name');
        // }, 1000);
        $scope.find('.mf-form-wrapper').on('metform/before_submit', function (e, data) {
          // data[name] = mailContent;
          data['car-details'] = mailContent;
        });
        $scope.find('.mf-form-wrapper').on('metform/after_submit', function (e, data) {
          mailContent = "";
        });
      }
      if ($scope.find('.modal').length) {
        $scope.find('.modal').on('hidden.bs.modal', function (e) {
          console.log('modal hide');
          mailContent = "";
        })
      }

      // Not Empty Validator Function
      //-------------------------------------------------------------------------------
      function validateNotEmpty(data) {
        if (data == '') {
            return true;
        } else {
            return false;
        }
      }
    },
  };

  $(window).on("elementor/frontend/init", CarRental.init);
})(jQuery, window.elementorFrontend);
