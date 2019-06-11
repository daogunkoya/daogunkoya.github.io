(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["currencies-currencies-module"],{

/***/ "./src/app/currencies/currencies-list/currencies-list.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/currencies/currencies-list/currencies-list.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2N1cnJlbmNpZXMvY3VycmVuY2llcy1saXN0L2N1cnJlbmNpZXMtbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/currencies/currencies-list/currencies-list.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/currencies/currencies-list/currencies-list.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<table class = \"table table-bordered table-striped\">\n   \n    <thead>\n        <tr>\n            <th>No</th>\n            <th>Created_At</th>\n            <th>Code</th>\n            <th>Origin</th>\n            <th>Origin Symbol</th>\n            <th>Destination</th>\n            <th>Destination Symbol</th>\n            <th>Income Type</th>\n            <th>Actions</th>\n          </tr>\n    </thead>\n   \n <tbody>\n    <tr *ngFor = \"let currency of currencies;let i = index\">\n        <td>{{i + 1}}</td>\n        <td>{{currency.created_at}}</td>\n        <td>{{currency.code}}</td>\n        <td>{{currency.origin}}</td>\n        <td>{{currency.origin_symbol}}</td>\n        <td>{{currency.destination}}</td>\n        <td>{{currency.destination_symbol}}</td>\n        <td>{{currency.income_category}}</td>\n        <td>\n          <a [routerLink]=\"[currency.id]\" class= \"btn btn-default\">Edit</a>\n          <a [routerLink]=\"[currency.id]\" class= \"btn btn-danger\">Delete</a>\n        </td>\n    </tr>\n </tbody> \n  \n</table>"

/***/ }),

/***/ "./src/app/currencies/currencies-list/currencies-list.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/currencies/currencies-list/currencies-list.component.ts ***!
  \*************************************************************************/
/*! exports provided: CurrenciesListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrenciesListComponent", function() { return CurrenciesListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CurrenciesListComponent = /** @class */ (function () {
    function CurrenciesListComponent() {
    }
    CurrenciesListComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('currencies'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], CurrenciesListComponent.prototype, "currencies", void 0);
    CurrenciesListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-currencies-list',
            template: __webpack_require__(/*! ./currencies-list.component.html */ "./src/app/currencies/currencies-list/currencies-list.component.html"),
            styles: [__webpack_require__(/*! ./currencies-list.component.css */ "./src/app/currencies/currencies-list/currencies-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CurrenciesListComponent);
    return CurrenciesListComponent;
}());



/***/ }),

/***/ "./src/app/currencies/currencies-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/currencies/currencies-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: CurrenciesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrenciesRoutingModule", function() { return CurrenciesRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _currencies_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currencies.component */ "./src/app/currencies/currencies.component.ts");
/* harmony import */ var _currency_currency_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currency/currency.component */ "./src/app/currencies/currency/currency.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var currenciesRouting = [
    { path: '', component: _currencies_component__WEBPACK_IMPORTED_MODULE_2__["CurrenciesComponent"], children: [
            { path: 'create', component: _currency_currency_component__WEBPACK_IMPORTED_MODULE_3__["CurrencyComponent"] },
            { path: ':id', component: _currency_currency_component__WEBPACK_IMPORTED_MODULE_3__["CurrencyComponent"] },
        ] }
];
var CurrenciesRoutingModule = /** @class */ (function () {
    function CurrenciesRoutingModule() {
    }
    CurrenciesRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(currenciesRouting)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]
            ]
        })
    ], CurrenciesRoutingModule);
    return CurrenciesRoutingModule;
}());



/***/ }),

/***/ "./src/app/currencies/currencies.component.css":
/*!*****************************************************!*\
  !*** ./src/app/currencies/currencies.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2N1cnJlbmNpZXMvY3VycmVuY2llcy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/currencies/currencies.component.html":
/*!******************************************************!*\
  !*** ./src/app/currencies/currencies.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class = \"col-md-12\">\n        <div class = \"row\">\n            <div class=\"col-md-12\">\n                <router-outlet></router-outlet>\n          </div>\n        </div>\n        <div class = \"row\">\n            <div class=\"col-md-12\">\n                <a [routerLink]=\"['create']\" class= \"btn btn-primary\">New Currency</a>\n                <app-currencies-list [currencies] = \"currencies\"></app-currencies-list>\n          </div>\n        </div>\n  </div>\n"

/***/ }),

/***/ "./src/app/currencies/currencies.component.ts":
/*!****************************************************!*\
  !*** ./src/app/currencies/currencies.component.ts ***!
  \****************************************************/
/*! exports provided: CurrenciesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrenciesComponent", function() { return CurrenciesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _currencies_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currencies.service */ "./src/app/currencies/currencies.service.ts");



var CurrenciesComponent = /** @class */ (function () {
    function CurrenciesComponent(currenciesService) {
        this.currenciesService = currenciesService;
    }
    CurrenciesComponent.prototype.ngOnInit = function () {
        this.currencies = this.currenciesService.getCurrencies();
    };
    CurrenciesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-currencies',
            template: __webpack_require__(/*! ./currencies.component.html */ "./src/app/currencies/currencies.component.html"),
            styles: [__webpack_require__(/*! ./currencies.component.css */ "./src/app/currencies/currencies.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_currencies_service__WEBPACK_IMPORTED_MODULE_2__["CurrenciesService"]])
    ], CurrenciesComponent);
    return CurrenciesComponent;
}());



/***/ }),

/***/ "./src/app/currencies/currencies.module.ts":
/*!*************************************************!*\
  !*** ./src/app/currencies/currencies.module.ts ***!
  \*************************************************/
/*! exports provided: CurrenciesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrenciesModule", function() { return CurrenciesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _currencies_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./currencies-routing.module */ "./src/app/currencies/currencies-routing.module.ts");
/* harmony import */ var _currencies_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./currencies.component */ "./src/app/currencies/currencies.component.ts");
/* harmony import */ var _currencies_list_currencies_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./currencies-list/currencies-list.component */ "./src/app/currencies/currencies-list/currencies-list.component.ts");
/* harmony import */ var _currency_currency_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./currency/currency.component */ "./src/app/currencies/currency/currency.component.ts");








var CurrenciesModule = /** @class */ (function () {
    function CurrenciesModule() {
    }
    CurrenciesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _currencies_component__WEBPACK_IMPORTED_MODULE_5__["CurrenciesComponent"],
                _currencies_list_currencies_list_component__WEBPACK_IMPORTED_MODULE_6__["CurrenciesListComponent"],
                _currency_currency_component__WEBPACK_IMPORTED_MODULE_7__["CurrencyComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _currencies_routing_module__WEBPACK_IMPORTED_MODULE_4__["CurrenciesRoutingModule"]
            ]
        })
    ], CurrenciesModule);
    return CurrenciesModule;
}());



/***/ }),

/***/ "./src/app/currencies/currency/currency.component.css":
/*!************************************************************!*\
  !*** ./src/app/currencies/currency/currency.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2N1cnJlbmNpZXMvY3VycmVuY3kvY3VycmVuY3kuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/currencies/currency/currency.component.html":
/*!*************************************************************!*\
  !*** ./src/app/currencies/currency/currency.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-11  text-center\">\n      <div class=\"panel panel-default\">\n      <div class=\"panel-heading text-center\">\n          <h6 class= \"text-center text-primary\">New Currency Setup</h6>\n      </div>\n      <div class=\"panel-body\">\n          <form >\n          <input name=\"user_id\" type=\"hidden\" value=\"7\">\n            <br/><br/>\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Origin\">Origin</label>\n                  <input class=\"form-control col-md-12 btn-block\" placeholder=\"Origin Name\" required=\"required\" name=\"origin\" type=\"text\" value=\"United Kingdom\">\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Origin Symbol To\">Origin Symbol</label>\n                  <input class=\"form-control col-md-12 btn-block\" placeholder=\"Origin Symbol\" required=\"required\" id=\"origin_symbol\" name=\"origin_symbol\" type=\"text\" value=\"UK\">\n                </div>\n              </div>\n            </div>\n            <p></p>\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Destination\">Destination</label>\n                  <input class=\"form-control col-md-12 btn-block\" placeholder=\"Country Destination\" required=\"required\" name=\"destination\" type=\"text\">\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Destination Symbol\">Destination Symbol</label>\n                  <input class=\"form-control col-md-12 btn-block\" placeholder=\"Destination Symbol\" required=\"required\" id=\"destination_symbol\" name=\"destination_symbol\" type=\"text\">\n                </div>\n              </div>\n            </div>\n            <p><p>\t\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Currency Code\">Currency Code</label>\n                  <input class=\"form-control col-md-12 btn-block\" placeholder=\"Currency\" required=\"required\" id=\"code\" name=\"code\" type=\"text\">\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Income Category\">Income Category</label>\n                  <select class=\"form-control col-md-12 btn-block\" required=\"required\" name=\"income_category\"><option value=\"commission\">commission</option><option value=\"profit\">profit</option></select>\n                </div>\n              </div>\n              \n            </div>\n            <p>\t</p>\n            <div class=\"row\">\n               <input class=\"btn btn-info btn-lg col-md-12 btn-block\" type=\"submit\" value=\"Submit\">\n            </div>\n\n          </form>\n\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/currencies/currency/currency.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/currencies/currency/currency.component.ts ***!
  \***********************************************************/
/*! exports provided: CurrencyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyComponent", function() { return CurrencyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CurrencyComponent = /** @class */ (function () {
    function CurrencyComponent() {
    }
    CurrencyComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('currencies'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], CurrencyComponent.prototype, "currencies", void 0);
    CurrencyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-currency',
            template: __webpack_require__(/*! ./currency.component.html */ "./src/app/currencies/currency/currency.component.html"),
            styles: [__webpack_require__(/*! ./currency.component.css */ "./src/app/currencies/currency/currency.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CurrencyComponent);
    return CurrencyComponent;
}());



/***/ })

}]);
//# sourceMappingURL=currencies-currencies-module.js.map