window.jQuery = window.$ = require("jquery");
require("velocity-animate/velocity.js");
require("lazysizes");
require("lazysizes/plugins/unveilhooks/ls.unveilhooks.js");

// Jquery & Velocity JS included in GULP
$(document).ready(function () {
  toggleMobileNav();
  ShowHideNav();
  formCheck();
});

// Close modal if ESC is pressed
$(document).keyup(function (e) {
  e.keyCode === 27 ? removeModal() : null;
});

$(window).resize(function () {
  $(".header").removeClass("hide-nav");
  $(".header__links").removeAttr("style");
  $(".header__overlay").remove();
});

/*-------------------------------------------------------------------------*/
/* MOBILE NAVIGATION */
/* -----------------------------------------------------------------------*/

function toggleMobileNav() {
  $(".header__toggle").click(function () {
    if ($(".header__links").hasClass("js--open")) {
      hideMobileNav();
    } else {
      openMobileNav();
    }
  });

  $("body").on("click", function (e) {
    if (e.target.classList.contains("header__overlay")) {
      hideMobileNav();
    } else {
      return;
    }
  });
}

function openMobileNav() {
  $(".header__links").velocity("slideDown", {
    duration: 300,
    easing: "ease-out",
    display: "block",
    visibility: "visible",
    begin: function () {
      $(".header__toggle").addClass("--open");
      $("body").append("<div class='header__overlay'></div>");
    },
    progress: function () {
      $(".header__overlay").addClass("--open");
    },
    complete: function () {
      $(this).addClass("js--open");
    },
  });
}

function hideMobileNav() {
  $(".header__overlay").remove();
  $(".header__links").velocity("slideUp", {
    duration: 300,
    easing: "ease-out",
    display: "none",
    visibility: "hidden",
    begin: function () {
      $(".header__toggle").removeClass("--open");
    },
    progress: function () {
      $(".header__overlay").removeClass("--open");
    },
    complete: function () {
      $(this).removeClass("js--open");
      $(".header__toggle, .header__overlay").removeClass("--open");
    },
  });
}

/* Ensure nav closes when a link is clicked (for mobile UX) */
$(document).on("click", ".header__links a", function () {
  if ($(".header__links").hasClass("js--open")) {
    hideMobileNav();
  }
});

/*-------------------------------------------------------------------------*/
/* SHOW/SCROLL NAVIGATION */
/* -----------------------------------------------------------------------*/

function ShowHideNav() {
  var previousScroll = 0,
    $header = $(".header"),
    navHeight = $header.outerHeight(),
    detachPoint = 576 + 60,
    hideShowOffset = 6;

  $(window).scroll(function () {
    var wW = 1024;

    if ($(window).width() >= wW) {
      if (!$header.hasClass("fixed")) {
        var currentScroll = $(this).scrollTop(),
          scrollDifference = Math.abs(currentScroll - previousScroll);

        if (currentScroll > navHeight) {
          if (currentScroll > detachPoint) {
            if (!$header.hasClass("fix-nav")) {
              $header.addClass("fix-nav");
            }
          }

          if (scrollDifference >= hideShowOffset) {
            if (currentScroll > previousScroll) {
              if (!$header.hasClass("hide-nav")) {
                $header.addClass("hide-nav");
              }
            } else {
              if ($header.hasClass("hide-nav")) {
                $($header).removeClass("hide-nav");
              }
            }
          }
        } else {
          if (currentScroll <= 0) {
            $header.removeClass("hide-nav show-nav");
            $header.addClass("top");
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        $header.removeClass("hide-nav");
      }
      previousScroll = currentScroll;
    } else {
      $header.addClass("fix-nav");
    }
  });
}

/*-------------------------------------------------------------------------*/
/* HANDLE MODAL */
/* -----------------------------------------------------------------------*/

function openModal() {
  $("body").css("overflow", "hidden");
  $(".modal, .modal__overlay").show().css("display", "flex");
  $(".modal__inner").velocity({ translateY: 0, opacity: 1 });
  $(".modal__overlay").velocity({ opacity: 1 }, 100);
}

function removeModal() {
  $("body").css({ overflow: "visible" });
  $(".modal, .modal__overlay, .modal__inner").velocity({ opacity: 0 }, function () {
    $(".modal").css({ opacity: 1 });
    $(".modal__inner").css({
      "-webkit-transform": "translateY(200px)",
      "-ms-transform": "translateY(200px)",
      transform: "translateY(200px)",
    });
    $(".modal, .modal__overlay").hide();
    $(".modal__body").empty();
  });
}

$(".js-modal-close").click(function () {
  removeModal();
});

$(".modal__overlay").click(function () {
  removeModal();
});

/*-------------------------------------------------------------------------*/
/* FORM VALIDATION */
/* -----------------------------------------------------------------------*/

function formCheck() {
  $(".js-submit").click(function (e) {
    e.preventDefault();

    var $inputs = $(".form__input input");
    var textarea = $(".form__input textarea");
    var isError = false;

    $(".form__input").removeClass("error");
    $(".error-data").remove();

    for (var i = 0; i < $inputs.length; i++) {
      var input = $inputs[i];
      if ($(input).attr("required", true) && !validateRequired($(input).val())) {
        addErrorData($(input), "This field is required");
        isError = true;
      }
      if (
        $(input).attr("required", true) &&
        $(input).attr("type") === "email" &&
        !validateEmail($(input).val())
      ) {
        addErrorData($(input), "Email address is invalid");
        isError = true;
      }
      if (
        $(textarea).attr("required", true) &&
        !validateRequired($(textarea).val())
      ) {
        addErrorData($(textarea), "This field is required");
        isError = true;
      }
    }
    if (isError === false) {
      $("#contactForm").submit();
    }
  });
}

function validateRequired(value) {
  return value !== "";
}

function validateEmail(value) {
  if (value !== "") {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
      value
    );
  }
  return true;
}

function addErrorData(element, error) {
  element.parent().addClass("error");
  element.after("<span class='error-data'>" + error + "</span>");
}

/*-------------------------------------------------------------------------*/
/* AJAX FORM SUBMIT */
/* -----------------------------------------------------------------------*/

$("#contactForm").submit(function (e) {
  e.preventDefault();

  var $btn = $(".js-submit"),
    $inputs = $(".form__input input"),
    $textarea = $(".form__input textarea"),
    $name = $("input#name").val();

  $.ajax({
    url: "https://formspree.io/sahil.ravgotra@austin.utexas.edu",
    method: "POST",
    data: $(this).serialize(),
    dataType: "json",

    beforeSend: function () {
      $btn.prop("disabled", true);
      $btn.text("Sending...");
    },
    success: function (data) {
      $inputs.val("");
      $textarea.val("");
      $btn.prop("disabled", false);
      $btn.text("Send");
      openModal();
      $(".modal__body").append(
        "<h1>Thanks " +
          $name +
          "!</h1><p>Your message was successfully sent! Will get back to you soon.</p>"
      );
    },
    error: function (err) {
      $(".modal, .modal__overlay").addClass("--show");
      $(".modal__body").append(
        "<h1>Aww snap!</h1><p>Something went wrong, please try again. Error message: </p>" +
          err
      );
    },
  });
});
