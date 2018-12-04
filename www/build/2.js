webpackJsonp([2],{

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AiPageModule", function() { return AiPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ai__ = __webpack_require__(282);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AiPageModule = /** @class */ (function () {
    function AiPageModule() {
    }
    AiPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__ai__["a" /* AiPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__ai__["a" /* AiPage */]),
            ],
        })
    ], AiPageModule);
    return AiPageModule;
}());

//# sourceMappingURL=ai.module.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_painter_painter__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_http_http__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_code_code__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AiPage = /** @class */ (function () {
    function AiPage(navCtrl, navParams, http, painter, code) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.painter = painter;
        this.code = code;
        this.loading = false;
        this.received = false;
    }
    AiPage.prototype.ionViewDidLoad = function () {
        this.canvas = this.canvasE.nativeElement;
        this.mix = this.mixE.nativeElement;
        this.btnBox = this.btnBoxE.nativeElement;
        console.log('ionViewDidLoad AiPage');
    };
    AiPage.prototype.e = function (i) {
        return i._elementRef.nativeElement;
    };
    AiPage.prototype.getData = function () {
        var _this = this;
        var msg = this.text.nativeElement.textContent;
        this.loading = true;
        this.painter.clear(this.canvas);
        this.text.nativeElement.blur();
        this.http.post(msg).subscribe(function (data) {
            console.log(data);
            _this.passages = data["items"];
            _this.loading = false;
            _this.received = true;
            _this.handleData();
        });
    };
    AiPage.prototype.handleData = function () {
        var _this = this;
        setTimeout(function () {
            var result = _this.buttons._results;
            console.log(result);
            _this.painter.resize(_this.canvas, _this.btnBox);
            result.map(function (i) {
                var child = _this.e(i);
                if (child.dataset.head != 0) {
                    var parent = _this.findParent(child.dataset.head);
                    var start = _this.getPoint(child);
                    var end = _this.getPoint(parent);
                    var center = (start + end) / 2;
                    console.log('start:' + start + '中点' + center + 'end' + end);
                    _this.painter.draw(_this.canvas, start, center, end);
                }
            });
            _this.code.create();
        }, 100);
    };
    AiPage.prototype.skip = function (head) {
        var parent = this.findParent(head);
        if (parent)
            parent.scrollIntoView({
                behavior: "smooth"
            });
    };
    AiPage.prototype.findParent = function (head) {
        var _this = this;
        var parent = this.buttons._results.filter(function (i) {
            var button = _this.e(i);
            return button.dataset.id == head;
        });
        return parent.length ? this.e(parent[0]) : null;
    };
    AiPage.prototype.getPoint = function (button) {
        var left = button.offsetLeft;
        var width = button.offsetWidth;
        var centerPoint = left + width / 2;
        console.log(left + width);
        return centerPoint;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('mix'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _a || Object)
    ], AiPage.prototype, "mixE", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('text'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _b || Object)
    ], AiPage.prototype, "text", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('canvas'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _c || Object)
    ], AiPage.prototype, "canvasE", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('btnBox'),
        __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _d || Object)
    ], AiPage.prototype, "btnBoxE", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])('button'),
        __metadata("design:type", Object)
    ], AiPage.prototype, "buttons", void 0);
    AiPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ai',template:/*ion-inline-start:"C:\Users\Linka\Desktop\teach\go\src\pages\ai\ai.html"*/'<ion-header>\n\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>AI</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n	<ion-card>\n		<ion-card-content>\n			<div class="text" contenteditable="true" text-center #text>当你受到伤害后，你可以摸两张牌</div>\n			<div class="mix" #mix [hidden]="!received" [@fade]="received?\'show\':\'hide\'">\n				<canvas #canvas></canvas>\n				<div class="buttons" #btnBox>\n					<button ion-button round small #button *ngFor="let item of passages" (click)="skip(item.head)" [color]="item.head==0?\'danger\':\'primary\'" [attr.data-postag]="item.postag" [attr.data-head]="item.head" [attr.data-id]="item.id" [attr.data-deprel]="item.deprel">\n						{{item.word}}{{item.deprel}}\n					</button>\n				</div>\n			</div>\n		</ion-card-content>\n	</ion-card>\n\n	<button ion-button (click)="getData()" full round>\n		<span *ngIf="!loading">发送</span>\n		<ion-spinner *ngIf="loading" name="crescent"></ion-spinner>\n	</button>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Linka\Desktop\teach\go\src\pages\ai\ai.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('fade', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('show', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({
                        opacity: 1,
                        transform: "none",
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('hide', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({
                        opacity: 0,
                        transform: "translateX(15px)",
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('hide => show', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('0.75s ease-out')
                    ]),
                ])
            ],
        }),
        __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* NavController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavParams */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__providers_http_http__["a" /* HttpProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_http_http__["a" /* HttpProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__providers_painter_painter__["a" /* PainterProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_painter_painter__["a" /* PainterProvider */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_5__providers_code_code__["a" /* CodeProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_code_code__["a" /* CodeProvider */]) === "function" && _j || Object])
    ], AiPage);
    return AiPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());

//# sourceMappingURL=ai.js.map

/***/ })

});
//# sourceMappingURL=2.js.map