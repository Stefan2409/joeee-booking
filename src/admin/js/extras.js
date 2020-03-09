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
  var EXTRASCANCELBTN = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extras-cancel-btn');
  var EXTRASSUBMIT = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extras-submit');
  var i = 1;
  EXTRASADD.click(function () {
    i++;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extras-table-dynamic').append('<tr id="joeee-booking-extras-row' + i + '"><td><input type="text" name="name[]" placeholder="Extra" class="joeee-booking-form--extras-control"></td><td><input type="text" name="price[]" placeholder="Price" class="joeee-booking-form--extras-control"></td><td><input type="checkbox" name="bookingonline" id="joeee-booking-extras-0" value="on"></td><td><button type="button" name="remove" id="' + i + '" class="button-delete btn-remove">X</button></td></tr>');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '.btn-remove', function () {
    var button_id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr("id");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extras-row' + button_id).remove();
  });
  EXTRASSUBMIT.click(function (ev) {
    ev.preventDefault();
    var data = EXTRASFORM.serializeArray();
    console.log(data);
  });
  EXTRASCANCELBTN.click(function (ev) {
    ev.preventDefault();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extras-row0 input').val('');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#joeee-booking-extras-0').prop("checked", false);
    location.reload();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvYWRtaW4vanMvZXh0cmFzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiIl0sIm5hbWVzIjpbIndwIiwiaTE4biIsIl9fIiwiX3giLCJfbiIsIl9ueCIsImpRdWVyeSIsImRvY3VtZW50IiwicmVhZHkiLCJFWFRSQVNGT1JNIiwiJCIsIkVYVFJBU0FERCIsIkVYVFJBU0NBTkNFTEJUTiIsIkVYVFJBU1NVQk1JVCIsImkiLCJjbGljayIsImFwcGVuZCIsIm9uIiwiYnV0dG9uX2lkIiwiYXR0ciIsInJlbW92ZSIsImV2IiwicHJldmVudERlZmF1bHQiLCJkYXRhIiwic2VyaWFsaXplQXJyYXkiLCJjb25zb2xlIiwibG9nIiwidmFsIiwicHJvcCIsImxvY2F0aW9uIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO2VBRTRCQSxFQUFFLENBQUNDLEk7SUFBdkJDLEUsWUFBQUEsRTtJQUFJQyxFLFlBQUFBLEU7SUFBSUMsRSxZQUFBQSxFO0lBQUlDLEcsWUFBQUEsRztBQUVwQkMsTUFBTSxDQUFDQyxRQUFELENBQU4sQ0FBaUJDLEtBQWpCLENBQXVCLFlBQVc7QUFDOUIsTUFBTUMsVUFBVSxHQUFHQyw2Q0FBQyxDQUFDLDRCQUFELENBQXBCO0FBQ0EsTUFBTUMsU0FBUyxHQUFHRCw2Q0FBQyxDQUFDLDJCQUFELENBQW5CO0FBQ0EsTUFBTUUsZUFBZSxHQUFHRiw2Q0FBQyxDQUFDLGtDQUFELENBQXpCO0FBQ0EsTUFBTUcsWUFBWSxHQUFHSCw2Q0FBQyxDQUFDLDhCQUFELENBQXRCO0FBQ0EsTUFBSUksQ0FBQyxHQUFHLENBQVI7QUFFSEgsV0FBUyxDQUFDSSxLQUFWLENBQWlCLFlBQVc7QUFDM0JELEtBQUM7QUFDREosaURBQUMsQ0FBQyxxQ0FBRCxDQUFELENBQXlDTSxNQUF6QyxDQUFnRCxxQ0FBbUNGLENBQW5DLEdBQXFDLCtWQUFyQyxHQUFxWUEsQ0FBclksR0FBdVkseURBQXZiO0FBQ0EsR0FIRDtBQUtBSiwrQ0FBQyxDQUFDSCxRQUFELENBQUQsQ0FBWVUsRUFBWixDQUFlLE9BQWYsRUFBd0IsYUFBeEIsRUFBdUMsWUFBVztBQUNqRCxRQUFJQyxTQUFTLEdBQUdSLDZDQUFDLENBQUMsSUFBRCxDQUFELENBQVFTLElBQVIsQ0FBYSxJQUFiLENBQWhCO0FBQ0FULGlEQUFDLENBQUMsOEJBQTRCUSxTQUE3QixDQUFELENBQXlDRSxNQUF6QztBQUNHLEdBSEo7QUFLR1AsY0FBWSxDQUFDRSxLQUFiLENBQW1CLFVBQVNNLEVBQVQsRUFBYTtBQUM1QkEsTUFBRSxDQUFDQyxjQUFIO0FBRUEsUUFBSUMsSUFBSSxHQUFHZCxVQUFVLENBQUNlLGNBQVgsRUFBWDtBQUNBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWUgsSUFBWjtBQUVILEdBTkQ7QUFRQVgsaUJBQWUsQ0FBQ0csS0FBaEIsQ0FBdUIsVUFBU00sRUFBVCxFQUFhO0FBQ2hDQSxNQUFFLENBQUNDLGNBQUg7QUFDQVosaURBQUMsQ0FBQyxrQ0FBRCxDQUFELENBQXNDaUIsR0FBdEMsQ0FBMEMsRUFBMUM7QUFDQWpCLGlEQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QmtCLElBQTdCLENBQWtDLFNBQWxDLEVBQTZDLEtBQTdDO0FBQ0FDLFlBQVEsQ0FBQ0MsTUFBVDtBQUVILEdBTkQ7QUFRSCxDQWpDRCxFOzs7Ozs7Ozs7OztBQ0pBLHdCIiwiZmlsZSI6ImV4dHJhcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZGV2ZWxvcG1lbnQvYWRtaW4vanMvZXh0cmFzLmpzXCIpO1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmNvbnN0IHsgX18sIF94LCBfbiwgX254IH0gPSB3cC5pMThuO1xyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgXHJcbiAgICBjb25zdCBFWFRSQVNGT1JNID0gJCgnI2pvZWVlLWJvb2tpbmctZXh0cmFzLWZvcm0nKTtcclxuICAgIGNvbnN0IEVYVFJBU0FERCA9ICQoJyNqb2VlZS1ib29raW5nLWV4dHJhcy1hZGQnKTtcclxuICAgIGNvbnN0IEVYVFJBU0NBTkNFTEJUTiA9ICQoJyNqb2VlZS1ib29raW5nLWV4dHJhcy1jYW5jZWwtYnRuJyk7XHJcbiAgICBjb25zdCBFWFRSQVNTVUJNSVQgPSAkKCcjam9lZWUtYm9va2luZy1leHRyYXMtc3VibWl0Jyk7XHJcbiAgICBsZXQgaSA9IDE7XHJcblxyXG5cdEVYVFJBU0FERC5jbGljayggZnVuY3Rpb24oKSB7XHJcblx0XHRpKys7XHJcblx0XHQkKCcjam9lZWUtYm9va2luZy1leHRyYXMtdGFibGUtZHluYW1pYycpLmFwcGVuZCgnPHRyIGlkPVwiam9lZWUtYm9va2luZy1leHRyYXMtcm93JytpKydcIj48dGQ+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVbXVwiIHBsYWNlaG9sZGVyPVwiRXh0cmFcIiBjbGFzcz1cImpvZWVlLWJvb2tpbmctZm9ybS0tZXh0cmFzLWNvbnRyb2xcIj48L3RkPjx0ZD48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicHJpY2VbXVwiIHBsYWNlaG9sZGVyPVwiUHJpY2VcIiBjbGFzcz1cImpvZWVlLWJvb2tpbmctZm9ybS0tZXh0cmFzLWNvbnRyb2xcIj48L3RkPjx0ZD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImJvb2tpbmdvbmxpbmVcIiBpZD1cImpvZWVlLWJvb2tpbmctZXh0cmFzLTBcIiB2YWx1ZT1cIm9uXCI+PC90ZD48dGQ+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cInJlbW92ZVwiIGlkPVwiJytpKydcIiBjbGFzcz1cImJ1dHRvbi1kZWxldGUgYnRuLXJlbW92ZVwiPlg8L2J1dHRvbj48L3RkPjwvdHI+Jyk7XHJcblx0fSk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnRuLXJlbW92ZScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IGJ1dHRvbl9pZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG5cdFx0JCgnI2pvZWVlLWJvb2tpbmctZXh0cmFzLXJvdycrYnV0dG9uX2lkKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBFWFRSQVNTVUJNSVQuY2xpY2soZnVuY3Rpb24oZXYpIHtcclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IEVYVFJBU0ZPUk0uc2VyaWFsaXplQXJyYXkoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBFWFRSQVNDQU5DRUxCVE4uY2xpY2soIGZ1bmN0aW9uKGV2KSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcjam9lZWUtYm9va2luZy1leHRyYXMtcm93MCBpbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgJCgnI2pvZWVlLWJvb2tpbmctZXh0cmFzLTAnKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwic291cmNlUm9vdCI6IiJ9