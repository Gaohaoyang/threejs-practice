/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/4-material-lambert/index.js":
/*!*****************************************!*\
  !*** ./src/4-material-lambert/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/_three@0.123.0@three/build/three.module.js\");\n\nvar width = 400;\nvar height = 300;\nvar renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();\nrenderer.setSize(width, height);\ndocument.body.appendChild(renderer.domElement);\nvar scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\nvar axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__.AxesHelper(2.5);\nscene.add(axesHelper);\nvar camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45, width / height, 1, 50);\ncamera.position.set(2, 3, 4);\ncamera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0));\nscene.add(camera);\nvar geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(1, 1, 1);\nvar material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({\n  color: 0xff00ff\n});\nvar cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\nscene.add(cube);\nvar light = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight();\nlight.position.set(2, 3, 4);\nscene.add(light);\nrenderer.render(scene, camera);\n\n//# sourceURL=webpack://threejs-practice/./src/4-material-lambert/index.js?");

/***/ }),

/***/ "./node_modules/_three@0.123.0@three/build/three.module.js":
/*!*****************************************************************!*\
  !*** ./node_modules/_three@0.123.0@three/build/three.module.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/4-material-lambert/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;