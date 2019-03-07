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
            ifeedJsonpSuccessCallback(data, feedContainer, templateNode, url);
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

    var hasTitleNode = (titleNode.length > 0);

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

  function ifeedJsonpSuccessCallback(json, feedContainer, templateNode, url) {

    // FLAGGA PB
    var urlParams = getAllUrlParams(url);

    var sortParam = urlParams['by'];
    if(sortParam == '') {
      sortParam = 'dc.title';
    }

    var sortAsc = true;
    if(urlParams['dir'] == 'desc') {
      sortAsc = false;
    }

    json = sortJson(json, sortParam, sortAsc);

    var templateNodeContent = templateNode.html();
    var template = Handlebars.compile(templateNodeContent);

    var feedContentNode = $(feedContainer).find('.ifeed-parsed-content');

    feedContentNode.html(template(json));

    setupIfeedDisplayTypes(feedContainer);
  }

  function sortJson(json, prop, asc) {
    var sortedJson = json.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    return sortedJson;
  }

  function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url.split('?')[1];

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];

      // split our query string into its component parts
      var arr = queryString.split('&');

      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');

        // set parameter name and value (use '' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? '' : a[1];

        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {

          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];

          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }

    return obj;
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
