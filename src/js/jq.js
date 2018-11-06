// Mega drop down
//
// Admin bar toggle
;( function( $, window, document, undefined ) {
  'use strict';

  // -- Dropdown ------------------------------------------
  // TODO: implement timer on mouseenter and mouseleave like old version
  var currentTimer;

  var menuNode = $('#navigation');
  var dropdownItems = $('#navigation .dropdown');

  dropdownItems.hover(onDropdownMouseEnter, onDropdownMouseLeave);

  function onDropdownMouseEnter(e) {
    var currentTarget = $(e.currentTarget);

    dropdownItems.removeClass('on');
    dropdownItems.find('.mega-drop').removeClass('on');

    currentTarget.addClass('on');
    currentTarget.find('.mega-drop').addClass('on');

  }

  function onDropdownMouseLeave(e) {
    var currentTarget = $(e.currentTarget);

    currentTarget.removeClass('on');
    currentTarget.find('.mega-drop').removeClass('on');


  }

  // -- iFeed ------------------------------------------

  configureHandlebars();
  setupIfeedHandlebars();

  function configureHandlebars() {
    // Add conditional helper
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
      switch (operator) {
          case '==':
              return (v1 == v2) ? options.fn(this) : options.inverse(this);
          case '===':
              return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '<':
              return (v1 < v2) ? options.fn(this) : options.inverse(this);
          case '<=':
              return (v1 <= v2) ? options.fn(this) : options.inverse(this);
          case '>':
              return (v1 > v2) ? options.fn(this) : options.inverse(this);
          case '>=':
              return (v1 >= v2) ? options.fn(this) : options.inverse(this);
          case '&&':
              return (v1 && v2) ? options.fn(this) : options.inverse(this);
          case '||':
              return (v1 || v2) ? options.fn(this) : options.inverse(this);
          default:
              return options.inverse(this);
      }
    });
  }


  function setupIfeedHandlebars() {
    var ifeedConsumerNodes = $('.ifeed-consumer');

    $(ifeedConsumerNodes).each(function (index, item) {
      var consumerNode = $(item);

      var feedContainers = consumerNode.find('.ifeed-parsed-container');
      var templateNodeId = consumerNode.data('templatenodeid');
      var templateNode = $('#' + templateNodeId);

      $(feedContainers).each(function(index, feedContainer) {
        var url = $(feedContainer).data('url');
        var feedContentNode = $(feedContainer).first('.ifeed-parsed-content');

        $.ajax({
          dataType: "jsonp",
          url: url,
          success: function(data) {
            ifeedJsonpSuccessCallback(data, feedContainer, templateNode);
          },
          failure: function(data) {
            // TODO: write failure callback
          }
        });

      });

    });
  }

  function setupIfeedDisplayTypes(feedContainer) {

    var displayType = $(feedContainer).data('displaytype');
    var feedContentNode = $(feedContainer).find('.ifeed-parsed-content');
    var titleNode = $(feedContainer).find('.ifeed-parsed-title');

    var hasTitleNode = false;
    if(titleNode) {
      hasTitleNode = true;
    }

    if(hasTitleNode && (displayType == 'collapsible-open' || displayType == 'collapsible-closed') ) {

      if(displayType == 'collapsible-closed') {
        $(feedContentNode).hide();
      }

      $(titleNode).click(function() {
        $(this).toggleClass('ifeed-parsed-title-expanded');
        $(feedContentNode).toggle(400);
      });

      $(feedContainer).addClass('ifeed-parsed-collapsible');
    }

  }

  function ifeedJsonpSuccessCallback(json, feedContainer, templateNode) {

    console.log('ifeedJsonpSuccessCallback');

    var templateNodeContent = templateNode.html();
    var template = Handlebars.compile(templateNodeContent);
    //
    var feedContentNode = $(feedContainer).find('.ifeed-parsed-content');
    //
    feedContentNode.html(template(json));

    setupIfeedDisplayTypes(feedContainer);
  }




})( jQuery, window, document );


// Sticky Navigation
// initStickyNavigation();
//
// function initStickyNavigation() {
//   var navWrapper = $('.navigation-wrapper');
//   var navScrolledCssClass = 'navigation-wrapper-scrolled';
//   var scrollHeightLimit = $('.banner-nav').height();
//   scrollHeightLimit = scrollHeightLimit*0.7;
//
//
//   $(window).scroll(function() {
//     if( $(this).scrollTop() > scrollHeightLimit ) {
//       navWrapper.addClass(navScrolledCssClass);
//     } else {
//       navWrapper.removeClass(navScrolledCssClass);
//     }
//   });
// }
