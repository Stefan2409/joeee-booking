/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./development/admin/js/extras.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./development/admin/js/extras.js":
/*!****************************************!*\
  !*** ./development/admin/js/extras.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    _x = _wp$i18n._x,
    _n = _wp$i18n._n,
    _nx = _wp$i18n._nx;
jQuery(document).ready(function () {
  var EXTRASFORM = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extras-form');
  var EXTRASADD = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extras-add');

  function edit_extras(id, text, column_name) {
    var editExtra = {};

    if (column_name === 'title') {
      editExtra.title = text;
    }

    if (column_name === 'price') {
      editExtra.price = parseFloat(text.trim().replace(',', '.'));
    }

    if (column_name === 'bookable') {
      editExtra.bookable = text;
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      url: joeeeExtrasRest.restURL + 'joeee-booking/v1/extra/' + id,
      success: function success(data) {
        console.log("Success: ");
        console.log(data);
      },
      error: function error(data) {
        console.log("Error: ");
        console.log(data);
      },
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', joeeeExtrasRest.restNonce);
      },
      data: JSON.stringify(editExtra)
    });
  }

  EXTRASADD.click(function () {
    var newExtra = {};
    newExtra.title = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extra-title').val();
    var extraPrice = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extra-price').val();
    newExtra.price = parseFloat(extraPrice.trim().replace(',', '.'));
    newExtra.bookable = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extra-bookable').is(":checked");

    if (newExtra.title == '') {
      alert(__("You have to enter a title!", 'joeee-booking'));
      return false;
    }

    if (newExtra.price == '') {
      alert(__("You have to enter a price!", 'joeee-booking'));
      return false;
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      url: joeeeExtrasRest.restURL + 'joeee-booking/v1/extra',
      success: function success(data) {
        location.reload(true);
      },
      error: function error(data) {
        console.log("Error: ");
        console.log(data);
      },
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', joeeeExtrasRest.restNonce);
      },
      data: JSON.stringify(newExtra)
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('blur', '.joeee_booking_extra_title', function () {
    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("id1");
    var title = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    edit_extras(id, title, "title");
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('blur', '.joeee_booking_extra_price', function () {
    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("id2");
    var price = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    edit_extras(id, price, "price");
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('blur', '.joeee_booking_extra_bookable', function () {
    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("id3");
    var bookable = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(":checked");
    edit_extras(id, bookable, "bookable");
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '.button-delete', function () {
    var button_id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("id4");
    console.log(button_id);
    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
      type: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      url: joeeeExtrasRest.restURL + 'joeee-booking/v1/extra/' + button_id,
      success: function success(data) {
        location.reload(true);
      },
      error: function error(data) {
        console.log("Error: ");
        console.log(data);
      },
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', joeeeExtrasRest.restNonce);
      }
    });
  });
});

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvYWRtaW4vanMvZXh0cmFzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiIl0sIm5hbWVzIjpbIndwIiwiaTE4biIsIl9fIiwiX3giLCJfbiIsIl9ueCIsImpRdWVyeSIsImRvY3VtZW50IiwicmVhZHkiLCJFWFRSQVNGT1JNIiwiJCIsIkVYVFJBU0FERCIsImVkaXRfZXh0cmFzIiwiaWQiLCJ0ZXh0IiwiY29sdW1uX25hbWUiLCJlZGl0RXh0cmEiLCJ0aXRsZSIsInByaWNlIiwicGFyc2VGbG9hdCIsInRyaW0iLCJyZXBsYWNlIiwiYm9va2FibGUiLCJhamF4IiwidHlwZSIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJ1cmwiLCJqb2VlZUV4dHJhc1Jlc3QiLCJyZXN0VVJMIiwic3VjY2VzcyIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJiZWZvcmVTZW5kIiwieGhyIiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3ROb25jZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjbGljayIsIm5ld0V4dHJhIiwidmFsIiwiZXh0cmFQcmljZSIsImlzIiwiYWxlcnQiLCJsb2NhdGlvbiIsInJlbG9hZCIsIm9uIiwiYnV0dG9uX2lkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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LGlCQUFXLEVBQUUsa0JBSFY7QUFJSEMsU0FBRyxFQUFFQyxlQUFlLENBQUNDLE9BQWhCLEdBQTBCLHlCQUExQixHQUFzRHFCLFNBSnhEO0FBS0hwQixhQUFPLEVBQUUsaUJBQVVDLElBQVYsRUFBZ0I7QUFDckJnQixnQkFBUSxDQUFDQyxNQUFULENBQWdCLElBQWhCO0FBRUgsT0FSRTtBQVNIZCxXQUFLLEVBQUUsZUFBVUgsSUFBVixFQUFnQjtBQUNuQkMsZUFBTyxDQUFDQyxHQUFSLENBQVksU0FBWjtBQUNBRCxlQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBWjtBQUNILE9BWkU7QUFhSEksZ0JBQVUsRUFBRSxvQkFBVUMsR0FBVixFQUFlO0FBQ3ZCQSxXQUFHLENBQUNDLGdCQUFKLENBQXFCLFlBQXJCLEVBQW1DVCxlQUFlLENBQUNVLFNBQW5EO0FBQ0g7QUFmRSxLQUFQO0FBa0JILEdBdEJEO0FBd0JILENBM0hELEU7Ozs7Ozs7Ozs7O0FDSkEsd0IiLCJmaWxlIjoiZXh0cmFzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9kZXZlbG9wbWVudC9hZG1pbi9qcy9leHRyYXMuanNcIik7XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5jb25zdCB7IF9fLCBfeCwgX24sIF9ueCB9ID0gd3AuaTE4bjtcblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgRVhUUkFTRk9STSA9ICQoJyNqb2VlZS1ib29raW5nLWV4dHJhcy1mb3JtJyk7XG4gICAgY29uc3QgRVhUUkFTQUREID0gJCgnI2pvZWVlLWJvb2tpbmctZXh0cmFzLWFkZCcpO1xuXG5cbiAgICBmdW5jdGlvbiBlZGl0X2V4dHJhcyhpZCwgdGV4dCwgY29sdW1uX25hbWUpIHtcbiAgICAgICAgbGV0IGVkaXRFeHRyYSA9IHt9O1xuICAgICAgICBpZiAoY29sdW1uX25hbWUgPT09ICd0aXRsZScpIHtcbiAgICAgICAgICAgIGVkaXRFeHRyYS50aXRsZSA9IHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbl9uYW1lID09PSAncHJpY2UnKSB7XG4gICAgICAgICAgICBlZGl0RXh0cmEucHJpY2UgPSBwYXJzZUZsb2F0KHRleHQudHJpbSgpLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sdW1uX25hbWUgPT09ICdib29rYWJsZScpIHtcbiAgICAgICAgICAgIGVkaXRFeHRyYS5ib29rYWJsZSA9IHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdQVVQnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICB1cmw6IGpvZWVlRXh0cmFzUmVzdC5yZXN0VVJMICsgJ2pvZWVlLWJvb2tpbmcvdjEvZXh0cmEvJyArIGlkLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3M6IFwiKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1XUC1Ob25jZScsIGpvZWVlRXh0cmFzUmVzdC5yZXN0Tm9uY2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGVkaXRFeHRyYSksXG4gICAgICAgIH0pO1xuXG5cblxuICAgIH1cblxuICAgIEVYVFJBU0FERC5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbGV0IG5ld0V4dHJhID0ge307XG5cbiAgICAgICAgbmV3RXh0cmEudGl0bGUgPSAkKCcjam9lZWUtYm9va2luZy1leHRyYS10aXRsZScpLnZhbCgpO1xuICAgICAgICBsZXQgZXh0cmFQcmljZSA9ICQoJyNqb2VlZS1ib29raW5nLWV4dHJhLXByaWNlJykudmFsKCk7XG4gICAgICAgIG5ld0V4dHJhLnByaWNlID0gcGFyc2VGbG9hdChleHRyYVByaWNlLnRyaW0oKS5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgICAgIG5ld0V4dHJhLmJvb2thYmxlID0gJCgnI2pvZWVlLWJvb2tpbmctZXh0cmEtYm9va2FibGUnKS5pcyhcIjpjaGVja2VkXCIpO1xuICAgICAgICBpZiAobmV3RXh0cmEudGl0bGUgPT0gJycpIHtcbiAgICAgICAgICAgIGFsZXJ0KF9fKFwiWW91IGhhdmUgdG8gZW50ZXIgYSB0aXRsZSFcIiwgJ2pvZWVlLWJvb2tpbmcnKSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0V4dHJhLnByaWNlID09ICcnKSB7XG4gICAgICAgICAgICBhbGVydChfXyhcIllvdSBoYXZlIHRvIGVudGVyIGEgcHJpY2UhXCIsICdqb2VlZS1ib29raW5nJykpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgdXJsOiBqb2VlZUV4dHJhc1Jlc3QucmVzdFVSTCArICdqb2VlZS1ib29raW5nL3YxL2V4dHJhJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKHRydWUpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1XUC1Ob25jZScsIGpvZWVlRXh0cmFzUmVzdC5yZXN0Tm9uY2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG5ld0V4dHJhKSxcbiAgICAgICAgfSk7XG5cblxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2JsdXInLCAnLmpvZWVlX2Jvb2tpbmdfZXh0cmFfdGl0bGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZCA9ICQodGhpcykuZGF0YShcImlkMVwiKTtcbiAgICAgICAgdmFyIHRpdGxlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgZWRpdF9leHRyYXMoaWQsIHRpdGxlLCBcInRpdGxlXCIpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2JsdXInLCAnLmpvZWVlX2Jvb2tpbmdfZXh0cmFfcHJpY2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZCA9ICQodGhpcykuZGF0YShcImlkMlwiKTtcbiAgICAgICAgdmFyIHByaWNlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgZWRpdF9leHRyYXMoaWQsIHByaWNlLCBcInByaWNlXCIpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2JsdXInLCAnLmpvZWVlX2Jvb2tpbmdfZXh0cmFfYm9va2FibGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZCA9ICQodGhpcykuZGF0YShcImlkM1wiKTtcbiAgICAgICAgdmFyIGJvb2thYmxlID0gJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpO1xuICAgICAgICBlZGl0X2V4dHJhcyhpZCwgYm9va2FibGUsIFwiYm9va2FibGVcIik7XG4gICAgfSk7XG5cblxuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b24tZGVsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgYnV0dG9uX2lkID0gJCh0aGlzKS5kYXRhKFwiaWQ0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhidXR0b25faWQpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgdXJsOiBqb2VlZUV4dHJhc1Jlc3QucmVzdFVSTCArICdqb2VlZS1ib29raW5nL3YxL2V4dHJhLycgKyBidXR0b25faWQsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtV1AtTm9uY2UnLCBqb2VlZUV4dHJhc1Jlc3QucmVzdE5vbmNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pOyIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyJdLCJzb3VyY2VSb290IjoiIn0=