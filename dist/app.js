"use strict";

$(document).ready(function () {
  var $wishlistBtn = $('.wishlist-button'),
      $buyBtn = $('.buy-button'),
      $radioBtn = $('input[name="size"]'),
      $targetEle; // Toggle active class on wishlist-button click to change icon state

  $wishlistBtn.on("click", function () {
    $(this).toggleClass('active');
  }); // Add class on Quick Buy button click

  $buyBtn.on("click", function () {
    $(this).addClass('hide');
    $(this).siblings('.size-wrapper').addClass('active');
  }); // Function that adds/removes class to buttons

  function enableDisableBtn(ele, targetBtn) {
    $targetEle = ele.closest('.size-wrapper');
    $targetEle.find('.button').addClass('hide');
    $targetEle.find(targetBtn).removeClass('hide');
  } // Toggle class on buttons click to show/hide buttons


  $radioBtn.on("click", function () {
    var $this = $(this);

    if ($this.hasClass("disabled")) {
      enableDisableBtn($this, '.out-of-stock-button');
    } else {
      if ($(this).is(':checked')) {
        enableDisableBtn($this, '.add-to-bag-button');
      } else {
        enableDisableBtn($this, '.size-select-button');
      }
    }
  }); // Remove class on Add to Bag button click

  $('.add-to-bag-button').on("click", function () {
    $(this).closest('.size-wrapper').removeClass('active');
    $(this).closest('.size-wrapper').siblings('.buy-button').removeClass('hide');
  });
});