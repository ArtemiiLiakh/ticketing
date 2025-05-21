/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "__barrel_optimize__?names=Container!=!../../node_modules/react-bootstrap/esm/index.js":
/*!*********************************************************************************************!*\
  !*** __barrel_optimize__?names=Container!=!../../node_modules/react-bootstrap/esm/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Container: () => (/* reexport safe */ _Container__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ "../../node_modules/react-bootstrap/esm/Container.js");



/***/ }),

/***/ "__barrel_optimize__?names=Nav!=!../../node_modules/react-bootstrap/esm/index.js":
/*!***************************************************************************************!*\
  !*** __barrel_optimize__?names=Nav!=!../../node_modules/react-bootstrap/esm/index.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Nav: () => (/* reexport safe */ _Nav__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Nav */ "../../node_modules/react-bootstrap/esm/Nav.js");



/***/ }),

/***/ "./src/api/clientBuilder.tsx":
/*!***********************************!*\
  !*** ./src/api/clientBuilder.tsx ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config */ \"./src/config/index.ts\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);\naxios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst clientBuilder = ({ req })=>{\n    return axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create({\n        baseURL: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].NEXT_PUBLIC_HOST,\n        headers: req?.headers,\n        withCredentials: true\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientBuilder);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBpL2NsaWVudEJ1aWxkZXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE4QjtBQUNKO0FBRTFCLE1BQU1FLGdCQUFnQixDQUFDLEVBQUVDLEdBQUcsRUFBTztJQUNqQyxPQUFPRixvREFBWSxDQUFDO1FBQ2xCSSxTQUFTTCxnRUFBdUI7UUFDaENPLFNBQVNKLEtBQUtJO1FBQ2RDLGlCQUFpQjtJQUNuQjtBQUNGO0FBRUEsaUVBQWVOLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYXBwMi9jbGllbnQvLi9zcmMvYXBpL2NsaWVudEJ1aWxkZXIudHN4P2Q0OTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICdAL2NvbmZpZyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG5jb25zdCBjbGllbnRCdWlsZGVyID0gKHsgcmVxIH06IGFueSkgPT4ge1xyXG4gIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgYmFzZVVSTDogY29uZmlnLk5FWFRfUFVCTElDX0hPU1QsXHJcbiAgICBoZWFkZXJzOiByZXE/LmhlYWRlcnMsXHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsaWVudEJ1aWxkZXI7Il0sIm5hbWVzIjpbImNvbmZpZyIsImF4aW9zIiwiY2xpZW50QnVpbGRlciIsInJlcSIsImNyZWF0ZSIsImJhc2VVUkwiLCJORVhUX1BVQkxJQ19IT1NUIiwiaGVhZGVycyIsIndpdGhDcmVkZW50aWFscyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/api/clientBuilder.tsx\n");

/***/ }),

/***/ "./src/components/header.tsx":
/*!***********************************!*\
  !*** ./src/components/header.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"../../node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=Nav!=!react-bootstrap */ \"__barrel_optimize__?names=Nav!=!../../node_modules/react-bootstrap/esm/index.js\");\n\n\n\nconst Header = ({ user })=>{\n    const links = [\n        {\n            auth: true,\n            href: \"/\",\n            label: \"Home\"\n        },\n        {\n            auth: false,\n            href: \"/auth/login\",\n            label: \"Login\"\n        },\n        {\n            auth: false,\n            href: \"/auth/signup\",\n            label: \"Sign up\"\n        },\n        {\n            auth: true,\n            href: \"/auth/signout\",\n            label: \"Sign out\"\n        }\n    ].filter(({ auth })=>!auth === !user).map(({ href, label }, index)=>{\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Nav.Item, {\n            className: \"nav-item\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: href,\n                children: label\n            }, void 0, false, {\n                fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                lineNumber: 14,\n                columnNumber: 9\n            }, undefined)\n        }, index, false, {\n            fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n            lineNumber: 13,\n            columnNumber: 7\n        }, undefined);\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"header\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n            className: \"navbar navbar-light bd-light\",\n            \"data-bs-theme\": \"light\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Nav.Item, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                href: \"/\",\n                                children: \"App\"\n                            }, void 0, false, {\n                                fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                                lineNumber: 24,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                            lineNumber: 23,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Nav.Item, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                href: \"/tickets/new\",\n                                children: \"New ticket\"\n                            }, void 0, false, {\n                                fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                                lineNumber: 27,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                            lineNumber: 26,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Nav.Item, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                href: \"/tickets\",\n                                children: \"Tickets\"\n                            }, void 0, false, {\n                                fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                                lineNumber: 30,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                            lineNumber: 29,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                    lineNumber: 22,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"d-flex justify-content-end\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Nav, {\n                        className: \"d-flex align-items-center\",\n                        children: [\n                            links,\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Nav.Item, {\n                                children: user ? \"You are logged in\" : \"Unauthorized\"\n                            }, void 0, false, {\n                                fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                                lineNumber: 36,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n                    lineNumber: 33,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n            lineNumber: 21,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/components/header.tsx\",\n        lineNumber: 20,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9oZWFkZXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBNkI7QUFDUztBQUV0QyxNQUFNRSxTQUFTLENBQUMsRUFBRUMsSUFBSSxFQUFPO0lBQzNCLE1BQU1DLFFBQVE7UUFDWjtZQUFFQyxNQUFNO1lBQU1DLE1BQU07WUFBS0MsT0FBTztRQUFPO1FBQ3ZDO1lBQUVGLE1BQU07WUFBT0MsTUFBTTtZQUFlQyxPQUFPO1FBQU87UUFDbEQ7WUFBRUYsTUFBTTtZQUFPQyxNQUFNO1lBQWdCQyxPQUFPO1FBQVM7UUFDckQ7WUFBRUYsTUFBTTtZQUFNQyxNQUFNO1lBQWlCQyxPQUFPO1FBQVU7S0FDdkQsQ0FBQ0MsTUFBTSxDQUFDLENBQUMsRUFBRUgsSUFBSSxFQUFFLEdBQUssQ0FBQ0EsU0FBUyxDQUFDRixNQUNqQ00sR0FBRyxDQUFDLENBQUMsRUFBRUgsSUFBSSxFQUFFQyxLQUFLLEVBQUUsRUFBRUc7UUFDckIscUJBQ0UsOERBQUNULDJFQUFHQSxDQUFDVSxJQUFJO1lBQUNDLFdBQVU7c0JBQ2xCLDRFQUFDWixrREFBSUE7Z0JBQUNNLE1BQU1BOzBCQUFPQzs7Ozs7O1dBRGVHOzs7OztJQUl4QztJQUVBLHFCQUNFLDhEQUFDRztRQUFJRCxXQUFVO2tCQUNiLDRFQUFDRTtZQUFJRixXQUFVO1lBQStCRyxpQkFBYzs7OEJBQzFELDhEQUFDRjs7c0NBQ0MsOERBQUNaLDJFQUFHQSxDQUFDVSxJQUFJO3NDQUNQLDRFQUFDWCxrREFBSUE7Z0NBQUNNLE1BQUs7MENBQUk7Ozs7Ozs7Ozs7O3NDQUVqQiw4REFBQ0wsMkVBQUdBLENBQUNVLElBQUk7c0NBQ1AsNEVBQUNYLGtEQUFJQTtnQ0FBQ00sTUFBSzswQ0FBZTs7Ozs7Ozs7Ozs7c0NBRTVCLDhEQUFDTCwyRUFBR0EsQ0FBQ1UsSUFBSTtzQ0FDUCw0RUFBQ1gsa0RBQUlBO2dDQUFDTSxNQUFLOzBDQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFHMUIsOERBQUNPO29CQUFJRCxXQUFVOzhCQUNiLDRFQUFDWCwyRUFBR0E7d0JBQUNXLFdBQVU7OzRCQUNaUjswQ0FDRCw4REFBQ0gsMkVBQUdBLENBQUNVLElBQUk7MENBQ05SLE9BQU8sc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTzVDO0FBRUEsaUVBQWVELE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYXBwMi9jbGllbnQvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIudHN4PzEzMTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcclxuaW1wb3J0IHsgTmF2IH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuXHJcbmNvbnN0IEhlYWRlciA9ICh7IHVzZXIgfTogYW55KSA9PiB7XHJcbiAgY29uc3QgbGlua3MgPSBbXHJcbiAgICB7IGF1dGg6IHRydWUsIGhyZWY6ICcvJywgbGFiZWw6ICdIb21lJyB9LFxyXG4gICAgeyBhdXRoOiBmYWxzZSwgaHJlZjogJy9hdXRoL2xvZ2luJywgbGFiZWw6ICdMb2dpbid9LFxyXG4gICAgeyBhdXRoOiBmYWxzZSwgaHJlZjogJy9hdXRoL3NpZ251cCcsIGxhYmVsOiAnU2lnbiB1cCd9LFxyXG4gICAgeyBhdXRoOiB0cnVlLCBocmVmOiAnL2F1dGgvc2lnbm91dCcsIGxhYmVsOiAnU2lnbiBvdXQnfSxcclxuICBdLmZpbHRlcigoeyBhdXRoIH0pID0+ICFhdXRoID09PSAhdXNlcilcclxuICAubWFwKCh7IGhyZWYsIGxhYmVsIH0sIGluZGV4KSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8TmF2Lkl0ZW0gY2xhc3NOYW1lPSduYXYtaXRlbScga2V5PXtpbmRleH0+XHJcbiAgICAgICAgPExpbmsgaHJlZj17aHJlZn0+e2xhYmVsfTwvTGluaz5cclxuICAgICAgPC9OYXYuSXRlbT5cclxuICAgICk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxyXG4gICAgICA8bmF2IGNsYXNzTmFtZT0nbmF2YmFyIG5hdmJhci1saWdodCBiZC1saWdodCcgZGF0YS1icy10aGVtZT1cImxpZ2h0XCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxOYXYuSXRlbT5cclxuICAgICAgICAgICAgPExpbmsgaHJlZj0nLyc+QXBwPC9MaW5rPlxyXG4gICAgICAgICAgPC9OYXYuSXRlbT5cclxuICAgICAgICAgIDxOYXYuSXRlbT5cclxuICAgICAgICAgICAgPExpbmsgaHJlZj0nL3RpY2tldHMvbmV3Jz5OZXcgdGlja2V0PC9MaW5rPlxyXG4gICAgICAgICAgPC9OYXYuSXRlbT5cclxuICAgICAgICAgIDxOYXYuSXRlbT5cclxuICAgICAgICAgICAgPExpbmsgaHJlZj0nL3RpY2tldHMnPlRpY2tldHM8L0xpbms+XHJcbiAgICAgICAgICA8L05hdi5JdGVtPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1lbmRcIj5cclxuICAgICAgICAgIDxOYXYgY2xhc3NOYW1lPSdkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyJz5cclxuICAgICAgICAgICAge2xpbmtzfVxyXG4gICAgICAgICAgICA8TmF2Lkl0ZW0+XHJcbiAgICAgICAgICAgICAge3VzZXIgPyAnWW91IGFyZSBsb2dnZWQgaW4nIDogJ1VuYXV0aG9yaXplZCd9XHJcbiAgICAgICAgICAgIDwvTmF2Lkl0ZW0+XHJcbiAgICAgICAgICA8L05hdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uYXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiBcclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyOyJdLCJuYW1lcyI6WyJMaW5rIiwiTmF2IiwiSGVhZGVyIiwidXNlciIsImxpbmtzIiwiYXV0aCIsImhyZWYiLCJsYWJlbCIsImZpbHRlciIsIm1hcCIsImluZGV4IiwiSXRlbSIsImNsYXNzTmFtZSIsImRpdiIsIm5hdiIsImRhdGEtYnMtdGhlbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/header.tsx\n");

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\n    API_URL: \"http://local.test.com:8080\" + \"/api\",\n    NEXT_PUBLIC_HOST: \"http://local.test.com:8080\",\n    STRIPE_PUBLIC: \"pk_test_51PfUUx2N6ReztLwe2QM4WoIbXf4oJ7Vv0JtP6r49Aye23kClroDdkA1FdFazBMfAXzqnhtujMjze72ML0V4suvGa00c7JLJ3KM\",\n    NEXT_PUBLIC_OKTA_CLIENT_ID: \"XqSd8fWGX1iFFY1RYOncap53oV9eyPBH\",\n    NEXT_PUBLIC_GOOGLE_CLIENT_ID: \"1016362831944-4qhh1aoliae188eutvdci8pd6m6q9n4t.apps.googleusercontent.com\",\n    NEXT_PUBLIC_GITHUB_CLIENT_ID: \"Ov23liDYV9eidolJ1e69\"\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29uZmlnL2luZGV4LnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFTQSxNQUFNQSxTQUF1QjtJQUMzQkMsU0FBU0MsNEJBQTRCLEdBQUk7SUFDekNFLGtCQUFrQkYsNEJBQTRCO0lBQzlDRyxlQUFlSCw2R0FBcUM7SUFDcERLLDRCQUE0Qkwsa0NBQXNDO0lBQ2xFTSw4QkFBOEJOLDJFQUF3QztJQUN0RU8sOEJBQThCUCxzQkFBd0M7QUFDeEU7QUFFQSxpRUFBZUYsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BhcHAyL2NsaWVudC8uL3NyYy9jb25maWcvaW5kZXgudHM/ZGE5MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgQ29uZmlnU2NoZW1hIHtcbiAgQVBJX1VSTDogc3RyaW5nO1xuICBTVFJJUEVfUFVCTElDOiBzdHJpbmc7XG4gIE5FWFRfUFVCTElDX09LVEFfQ0xJRU5UX0lEOiBzdHJpbmc7XG4gIE5FWFRfUFVCTElDX0dPT0dMRV9DTElFTlRfSUQ6IHN0cmluZztcbiAgTkVYVF9QVUJMSUNfR0lUSFVCX0NMSUVOVF9JRDogc3RyaW5nO1xuICBORVhUX1BVQkxJQ19IT1NUOiBzdHJpbmc7XG59XG5cbmNvbnN0IGNvbmZpZzogQ29uZmlnU2NoZW1hID0ge1xuICBBUElfVVJMOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19IT1NUISArICcvYXBpJyxcbiAgTkVYVF9QVUJMSUNfSE9TVDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfSE9TVCEsXG4gIFNUUklQRV9QVUJMSUM6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NUUklQRV9QVUJMSUMhLFxuICBORVhUX1BVQkxJQ19PS1RBX0NMSUVOVF9JRDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfT0tUQV9DTElFTlRfSUQhLFxuICBORVhUX1BVQkxJQ19HT09HTEVfQ0xJRU5UX0lEOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HT09HTEVfQ0xJRU5UX0lEISxcbiAgTkVYVF9QVUJMSUNfR0lUSFVCX0NMSUVOVF9JRDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0lUSFVCX0NMSUVOVF9JRCEsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7Il0sIm5hbWVzIjpbImNvbmZpZyIsIkFQSV9VUkwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfSE9TVCIsIlNUUklQRV9QVUJMSUMiLCJORVhUX1BVQkxJQ19TVFJJUEVfUFVCTElDIiwiTkVYVF9QVUJMSUNfT0tUQV9DTElFTlRfSUQiLCJORVhUX1BVQkxJQ19HT09HTEVfQ0xJRU5UX0lEIiwiTkVYVF9QVUJMSUNfR0lUSFVCX0NMSUVOVF9JRCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/index.ts\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ \"../../node_modules/bootstrap/dist/css/bootstrap.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_styles_header_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/styles/header.css */ \"./src/components/styles/header.css\");\n/* harmony import */ var _components_styles_header_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_styles_header_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _api_clientBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/clientBuilder */ \"./src/api/clientBuilder.tsx\");\n/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/header */ \"./src/components/header.tsx\");\n/* harmony import */ var _barrel_optimize_names_Container_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=Container!=!react-bootstrap */ \"__barrel_optimize__?names=Container!=!../../node_modules/react-bootstrap/esm/index.js\");\n/* harmony import */ var _styles_login_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/login.css */ \"./src/pages/styles/login.css\");\n/* harmony import */ var _styles_login_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_login_css__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_clientBuilder__WEBPACK_IMPORTED_MODULE_3__]);\n_api_clientBuilder__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\nconst App = ({ Component, pageProps, user })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_header__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                user: user\n            }, void 0, false, {\n                fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/pages/_app.tsx\",\n                lineNumber: 16,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Container_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__.Container, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/pages/_app.tsx\",\n                    lineNumber: 18,\n                    columnNumber: 7\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/pages/_app.tsx\",\n                lineNumber: 17,\n                columnNumber: 5\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/artemii/Programming/backend/ticketing/apps/client/src/pages/_app.tsx\",\n        lineNumber: 15,\n        columnNumber: 10\n    }, undefined);\n};\nApp.getInitialProps = async (context)=>{\n    const client = (0,_api_clientBuilder__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(context.ctx);\n    const { data } = await client.get(\"/api/auth/me\").catch(()=>({\n            data: null\n        }));\n    const pageProps = await context.Component.getInitialProps?.(context.ctx, client, data);\n    return {\n        user: data,\n        pageProps: {\n            ...pageProps,\n            user: data\n        }\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNEO0FBRVE7QUFDUDtBQUNHO0FBRWhCO0FBTTVCLE1BQU1HLE1BQU0sQ0FBQyxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFrQjtJQUN6RCxxQkFBTyw4REFBQ0M7OzBCQUNOLDhEQUFDTiwwREFBTUE7Z0JBQUNLLE1BQU1BOzs7Ozs7MEJBQ2QsOERBQUNKLHVGQUFTQTswQkFDUiw0RUFBQ0U7b0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHOUI7QUFFQUYsSUFBSUssZUFBZSxHQUFHLE9BQU9DO0lBQzNCLE1BQU1DLFNBQVNWLDhEQUFhQSxDQUFDUyxRQUFRRSxHQUFHO0lBQ3hDLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUcsTUFBTUYsT0FBT0csR0FBRyxDQUFDLGdCQUFnQkMsS0FBSyxDQUFDLElBQU87WUFBRUYsTUFBTTtRQUFLO0lBRTVFLE1BQU1QLFlBQVksTUFBT0ksUUFBUUwsU0FBUyxDQUFDSSxlQUFlLEdBQVdDLFFBQVFFLEdBQUcsRUFBRUQsUUFBUUU7SUFFMUYsT0FBTztRQUNMTixNQUFNTTtRQUNOUCxXQUFXO1lBQ1QsR0FBR0EsU0FBUztZQUNaQyxNQUFNTTtRQUNSO0lBQ0Y7QUFDRjtBQUVBLGlFQUFlVCxHQUFHQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGFwcDIvY2xpZW50Ly4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcydcclxuaW1wb3J0ICdAL2NvbXBvbmVudHMvc3R5bGVzL2hlYWRlci5jc3MnO1xyXG5pbXBvcnQgeyBBcHBDb250ZXh0LCBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcclxuaW1wb3J0IGNsaWVudEJ1aWxkZXIgZnJvbSAnQC9hcGkvY2xpZW50QnVpbGRlcic7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnQC9jb21wb25lbnRzL2hlYWRlcic7XHJcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5pbXBvcnQgJy4vc3R5bGVzL2xvZ2luLmNzcyc7XHJcblxyXG5pbnRlcmZhY2UgQ2xpZW50QXBwUHJvcHMgZXh0ZW5kcyBBcHBQcm9wcyB7XHJcbiAgdXNlcjogYW55O1xyXG59XHJcblxyXG5jb25zdCBBcHAgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcywgdXNlciB9OiBDbGllbnRBcHBQcm9wcykgPT4ge1xyXG4gIHJldHVybiA8ZGl2PlxyXG4gICAgPEhlYWRlciB1c2VyPXt1c2VyfS8+XHJcbiAgICA8Q29udGFpbmVyPlxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICA8L0NvbnRhaW5lcj5cclxuICA8L2Rpdj5cclxufVxyXG5cclxuQXBwLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChjb250ZXh0OiBBcHBDb250ZXh0KSA9PiB7XHJcbiAgY29uc3QgY2xpZW50ID0gY2xpZW50QnVpbGRlcihjb250ZXh0LmN0eCk7XHJcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBjbGllbnQuZ2V0KCcvYXBpL2F1dGgvbWUnKS5jYXRjaCgoKSA9PiAoeyBkYXRhOiBudWxsIH0pKTtcclxuXHJcbiAgY29uc3QgcGFnZVByb3BzID0gYXdhaXQgKGNvbnRleHQuQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyBhcyBhbnkpPy4oY29udGV4dC5jdHgsIGNsaWVudCwgZGF0YSk7XHJcbiAgXHJcbiAgcmV0dXJuIHtcclxuICAgIHVzZXI6IGRhdGEsXHJcbiAgICBwYWdlUHJvcHM6IHtcclxuICAgICAgLi4ucGFnZVByb3BzLFxyXG4gICAgICB1c2VyOiBkYXRhLFxyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHA7Il0sIm5hbWVzIjpbImNsaWVudEJ1aWxkZXIiLCJIZWFkZXIiLCJDb250YWluZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJ1c2VyIiwiZGl2IiwiZ2V0SW5pdGlhbFByb3BzIiwiY29udGV4dCIsImNsaWVudCIsImN0eCIsImRhdGEiLCJnZXQiLCJjYXRjaCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/components/styles/header.css":
/*!******************************************!*\
  !*** ./src/components/styles/header.css ***!
  \******************************************/
/***/ (() => {



/***/ }),

/***/ "./src/pages/styles/login.css":
/*!************************************!*\
  !*** ./src/pages/styles/login.css ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "@restart/ui/Anchor":
/*!*************************************!*\
  !*** external "@restart/ui/Anchor" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@restart/ui/Anchor");

/***/ }),

/***/ "@restart/ui/Nav":
/*!**********************************!*\
  !*** external "@restart/ui/Nav" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@restart/ui/Nav");

/***/ }),

/***/ "@restart/ui/NavItem":
/*!**************************************!*\
  !*** external "@restart/ui/NavItem" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@restart/ui/NavItem");

/***/ }),

/***/ "@restart/ui/SelectableContext":
/*!************************************************!*\
  !*** external "@restart/ui/SelectableContext" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@restart/ui/SelectableContext");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("classnames");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "uncontrollable":
/*!*********************************!*\
  !*** external "uncontrollable" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("uncontrollable");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/react-bootstrap","vendor-chunks/bootstrap"], () => (__webpack_exec__("./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();