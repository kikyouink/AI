webpackJsonp([3],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HttpProvider = /** @class */ (function () {
    function HttpProvider(platform, http, mhttp, file) {
        this.platform = platform;
        this.http = http;
        this.mhttp = mhttp;
        this.file = file;
        this.basicUrl = 'https://aip.baidubce.com/rpc/2.0/nlp/v1/depparser?charset=UTF-8&access_token=';
        this.token = '24.9ef1d08dd86089475358c1055f47716a.2592000.1546273111.282335-15004681';
        this.apiUrl = this.basicUrl + this.token;
        this.githubUrl = "https://raw.githubusercontent.com/q2578443177/AI/master/";
        this.nodeUrl = "http://localhost:3000";
    }
    HttpProvider.prototype.get = function (url) {
        this.mhttp.get(url, {}, {}).then(function (res) {
            console.log(res);
            res.data = JSON.parse(res.data);
            console.log(res.data);
        });
    };
    HttpProvider.prototype.post = function (text) {
        var url;
        var body = {
            "text": text
        };
        var options;
        if (this.platform.is('android')) {
            url = this.apiUrl;
            options = {
                'Content-Type': 'application/json;charset=utf-8',
            };
            this.mhttp.setDataSerializer('json');
            return this.mhttp.post(url, body, options);
        }
        else {
            url = this.nodeUrl;
            options = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            return this.http.post(url, body, options);
        }
    };
    HttpProvider.prototype.checkUpdate = function () {
        var url = "https://raw.githubusercontent.com/q2578443177/AI/master/update.js";
        this.get(url);
    };
    HttpProvider.prototype.downloadFile = function (fileName) {
        this.mhttp.downloadFile(this.githubUrl, {}, {}, this.file.externalApplicationStorageDirectory + fileName).then(function (entry) {
            // prints the filename
            console.log(entry.name);
            // prints the filePath
            console.log(entry.fullPath);
        }).catch(function (response) {
            console.error(response.error);
        });
    };
    HttpProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */]) === "function" && _d || Object])
    ], HttpProvider);
    return HttpProvider;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=http.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RxjsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var RxjsProvider = /** @class */ (function () {
    function RxjsProvider() {
        this.subject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    RxjsProvider.prototype.sendMessage = function (message) {
        this.subject.next({ text: message });
    };
    RxjsProvider.prototype.clearMessage = function () {
        this.subject.next();
    };
    RxjsProvider.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    RxjsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], RxjsProvider);
    return RxjsProvider;
}());

//# sourceMappingURL=rxjs.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/ai/ai.module": [
		284,
		0
	],
	"../pages/book/book.module": [
		285,
		2
	],
	"../pages/tabs/tabs.module": [
		286,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewAsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sentence_sentence__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__knowledge_knowledge__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewAsProvider = /** @class */ (function () {
    function ViewAsProvider(sentence, knowledge) {
        this.sentence = sentence;
        this.knowledge = knowledge;
    }
    ViewAsProvider.prototype.getWhen = function () {
        var when;
        var HED = this.sentence.getHED()[0];
        var when1 = this.sentence.getChildren(HED, "VV")[0];
        var when2 = this.sentence.getSibling(when1)[0];
        if (!when2)
            when = this.knowledge.getTranslation(when1.word);
        else {
            var arr = [];
            arr.push(this.knowledge.getTranslation(when1.word));
            arr.push(this.knowledge.getTranslation(when2.word));
            when = arr;
        }
        console.log('时机:');
        console.log(when);
        return when;
    };
    ViewAsProvider.prototype.getFilterCard = function () {
        var _this = this;
        // debugger;
        var main = "", filter = [];
        var card = this.sentence.getFilter('BA', 'n')[0];
        var ATT = this.sentence.getChildren(card, 'ATT', 'n');
        ATT.map(function (i) {
            var type = _this.knowledge.getType(i.word);
            if (type == 'suit' || type == 'color') {
                var value = _this.knowledge.getTranslation(i.word);
                filter.push({
                    type: type,
                    value: value
                });
            }
        });
        var j = filter.length;
        while (j--) {
            var _a = [filter[j].type, filter[j].value], type = _a[0], value = _a[1];
            main += "get." + type + "(card)=='" + value + "'";
            if (j)
                main += "&&";
        }
        main = "return " + main;
        var filterCard = new Function("card", "player", main);
        console.log('卡牌条件:');
        console.log(filterCard);
        return filterCard;
    };
    ViewAsProvider.prototype.getSelectCard = function () {
        var num = this.sentence.getDeprel('QUN')[0].word;
        var num2 = this.knowledge.getTranslation(num);
        console.log('卡牌数量:');
        console.log(num2);
        return num2;
    };
    ViewAsProvider.prototype.getPosition = function () {
        var _this = this;
        var position;
        var card = this.sentence.getFilter('BA', 'n')[0];
        var ATT = this.sentence.getChildren(card, 'ATT', 'n');
        ATT.map(function (i) {
            var type = _this.knowledge.getType(i.word);
            if (type == 'position') {
                position = _this.knowledge.getTranslation(i.word);
            }
        });
        if (!position)
            position = "he";
        console.log('卡牌区域:');
        console.log(position);
        return position;
    };
    ViewAsProvider.prototype.getViewAs = function () {
        var HED = this.sentence.getHED()[0];
        var viewAs = this.sentence.getChildren(HED, 'VOB');
    };
    ViewAsProvider.prototype.getPrompt = function () {
    };
    ViewAsProvider.prototype.compile = function () {
    };
    //视为技
    ViewAsProvider.prototype.start = function () {
        console.log('开始编写视为技');
        this.getWhen();
        this.getFilterCard();
        this.getSelectCard();
        this.getPosition();
        this.getViewAs();
        this.getPrompt();
    };
    ViewAsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sentence_sentence__["a" /* SentenceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__knowledge_knowledge__["a" /* KnowledgeProvider */]])
    ], ViewAsProvider);
    return ViewAsProvider;
}());

//# sourceMappingURL=view-as.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PainterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the PainterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PainterProvider = /** @class */ (function () {
    function PainterProvider(http) {
        this.http = http;
    }
    PainterProvider.prototype.clear = function (canvas) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    PainterProvider.prototype.resize = function (canvas, parent) {
        canvas.width = parent.offsetWidth;
        // canvas.height = parent.offsetHeight; 
    };
    PainterProvider.prototype.draw = function (canvas, x1, x2, x3) {
        var y1, y2, y3;
        y1 = y3 = 80;
        var dire;
        var ctx = canvas.getContext("2d");
        if (x2 < x3) {
            y2 = 0;
            dire = "right";
            ctx.strokeStyle = "#488aff";
        }
        else {
            y2 = 160;
            dire = "left";
            ctx.strokeStyle = "#ff4848";
        }
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1); //起始点
        //绘制二次贝塞尔曲线
        ctx.quadraticCurveTo(x2, y2, x3, y3);
        ctx.stroke();
        this.drawArrow(ctx, x2, dire);
    };
    PainterProvider.prototype.drawArrow = function (ctx, x2, dire) {
        ctx.beginPath();
        var x, y, top, bottom;
        if (dire == "right") {
            x = x2 - 10;
            top = {
                x: x,
                y: 45,
            };
            bottom = {
                x: x,
                y: 35,
            };
            ctx.strokeStyle = "#488aff";
        }
        else {
            x = x2 + 10;
            top = {
                x: x,
                y: 115,
            };
            bottom = {
                x: x,
                y: 125,
            };
            ctx.strokeStyle = "#ff4848";
        }
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(x2, (top.y + bottom.y) / 2);
        ctx.lineTo(bottom.x, bottom.y);
        ctx.stroke();
    };
    PainterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], PainterProvider);
    return PainterProvider;
}());

//# sourceMappingURL=painter.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_as_view_as__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sentence_sentence__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the CodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CodeProvider = /** @class */ (function () {
    function CodeProvider(viewAs, sentence) {
        this.viewAs = viewAs;
        this.sentence = sentence;
    }
    CodeProvider.prototype.create = function (json) {
        console.log('coding...');
        var type = this.judgeType(json);
        console.log(json);
        switch (type) {
            case "viewAs":
                this.viewAs.start();
                break;
            // case "enable": this.enable.compile(json); break;
            // case "trigger": this.trigger.compile(json); break;
            default: this.quit();
        }
    };
    CodeProvider.prototype.getPassages = function () {
    };
    CodeProvider.prototype.judgeType = function (json) {
        return this.judgeViewAs(json) ? "viewAs" : this.judgeEnable(json) ? "enable" : this.judgeTrigger(json) ? "trigger" : this.quit();
    };
    CodeProvider.prototype.judgeViewAs = function (json) {
        var BA = json.some(function (i) {
            return i.deprel == "BA";
        });
        var HED = this.sentence.getHED()[0];
        if (BA && HED.postag == 'v')
            return true;
    };
    CodeProvider.prototype.judgeEnable = function (json) {
        return false;
    };
    CodeProvider.prototype.judgeTrigger = function (json) {
        return false;
    };
    CodeProvider.prototype.quit = function () {
    };
    CodeProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__view_as_view_as__["a" /* ViewAsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__sentence_sentence__["a" /* SentenceProvider */]])
    ], CodeProvider);
    return CodeProvider;
}());

//# sourceMappingURL=code.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_painter_painter__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_http_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_code_code__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_view_as_view_as__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_sentence_sentence__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_knowledge_knowledge__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_rxjs_rxjs__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/ai/ai.module#AiPageModule', name: 'AiPage', segment: 'ai', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/book/book.module#BookPageModule', name: 'BookPage', segment: 'book', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_painter_painter__["a" /* PainterProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_http_http__["a" /* HttpProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_code_code__["a" /* CodeProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_view_as_view_as__["a" /* ViewAsProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_sentence_sentence__["a" /* SentenceProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_knowledge_knowledge__["a" /* KnowledgeProvider */],
                __WEBPACK_IMPORTED_MODULE_15__providers_rxjs_rxjs__["a" /* RxjsProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_http_http__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, http) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.http = http;
        this.rootPage = 'TabsPage';
        this.items = [
            {
                icon: 'leaf',
                name: '个人主页',
                page: 'PersonPage',
            },
            {
                icon: 'shirt',
                name: '个性装扮',
                page: 'DressPage',
            },
            {
                icon: 'star',
                name: '我的收藏',
                page: 'StarPage',
            },
            {
                icon: 'photos',
                name: '我的相册',
                page: 'PhotoPage',
            },
            {
                icon: 'folder',
                name: '我的文件',
                page: 'FolderPage',
            },
        ];
        platform.ready().then(function () {
            _this.http.checkUpdate();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Linka\Desktop\teach\ionic3\src\app\app.html"*/'<ion-menu [content]="content">\n	<ion-content>\n		<div class="bg"></div>\n		<ion-list no-lines>\n			<ion-list-header>\n				菜单\n			</ion-list-header>\n			<button ion-item menuClose *ngFor="let item of items">\n				<ion-icon [name]="item.icon" item-start></ion-icon>{{item.name}}\n			</button>\n		</ion-list>\n	</ion-content>\n</ion-menu>\n<ion-nav [root]="rootPage" #content></ion-nav>'/*ion-inline-end:"C:\Users\Linka\Desktop\teach\ionic3\src\app\app.html"*/,
            animations: []
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SentenceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__knowledge_knowledge__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SentenceProvider = /** @class */ (function () {
    function SentenceProvider(knowledge) {
        this.knowledge = knowledge;
    }
    SentenceProvider.prototype.receiveJson = function (json) {
        this.json = json;
    };
    //判断类型
    SentenceProvider.prototype.getHED = function () {
        var HED = this.json.filter(function (i) {
            return i.head == 0;
        });
        return HED;
    };
    SentenceProvider.prototype.getParent = function (item) {
        var parent = this.json.filter(function (i) {
            return i.id == item.head;
        });
        return parent;
    };
    SentenceProvider.prototype.getChildren = function (item, deprel, postag) {
        var children = this.json.filter(function (i) {
            if (i.head != item.id)
                return false;
            if (deprel && deprel != i.deprel)
                return false;
            if (postag && postag != i.postag)
                return false;
            return true;
        });
        return children;
    };
    SentenceProvider.prototype.getSibling = function (item) {
        var sibling = this.getChildren(item).filter(function (i) {
            return i.deprel == "COO";
        });
        return sibling;
    };
    SentenceProvider.prototype.getDeprel = function (deprel, array) {
        if (array === void 0) { array = this.json; }
        var result = array.filter(function (i) {
            return i.deprel == deprel;
        });
        return result;
    };
    SentenceProvider.prototype.getFilter = function (deprel, postag) {
        var filter = this.json.filter(function (i) {
            return i.deprel == deprel && i.postag == postag;
        });
        return filter;
    };
    SentenceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__knowledge_knowledge__["a" /* KnowledgeProvider */]])
    ], SentenceProvider);
    return SentenceProvider;
}());

//# sourceMappingURL=sentence.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KnowledgeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rxjs_rxjs__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var KnowledgeProvider = /** @class */ (function () {
    function KnowledgeProvider(rxjs) {
        this.rxjs = rxjs;
        this.typeList = {
            suit: ['club', 'diamond', 'heart', 'spade'],
            color: ['red', 'black'],
            position: ['h', 'e', 'he'],
        };
        this.replaceList = [
            {
                reg: "【[\u4e00-\u9fa5]+】",
                replacement: '扑克',
            }, {
                reg: "梅花|草花|方块|方片|红桃|黑桃",
                replacement: '花色',
            }
        ];
        this.translationList = {
            "一": "1",
            "两/二": 2,
            "三": 3,
            "四": 4,
            "五": 5,
            "六": 6,
            "七": 7,
            "使用": 'chooseToUse',
            "打出": "chooseToRespond",
            "和/与": '&&',
            "非": '!',
            "红色": 'red',
            "黑色": 'black',
            "梅花/草花": 'club',
            "方块/方片": 'diamond',
            "红桃": 'heart',
            "黑桃": 'spade',
            "杀": 'sha',
            "闪": "shan",
            "桃": 'tao',
            "万箭齐发": 'wanjian',
            "装备": 'e',
            "判定": 'j',
            "手": 'h',
        };
    }
    KnowledgeProvider.prototype.getType = function (word) {
        var w;
        if (/[\u4e00-\u9fa5]+/.test(word))
            w = this.getTranslation(word);
        else
            w = word;
        for (var i in this.typeList) {
            if (this.typeList[i].includes(w))
                return i;
        }
    };
    KnowledgeProvider.prototype.getTranslation = function (word) {
        for (var i in this.translationList) {
            if (i == word || (i.indexOf("/") != -1 && i.indexOf(word) != -1))
                return this.translationList[i];
        }
        console.error("\u554A\u54C8\uFF0C\u6CA1\u6709\u627E\u5230\u3010" + word + "\u3011\u7684\u7FFB\u8BD1...");
        this.rxjs.sendMessage("\u554A\u54C8\uFF0C\u6CA1\u6709\u627E\u5230\u3010" + word + "\u3011\u7684\u7FFB\u8BD1...");
        return word;
    };
    KnowledgeProvider.prototype.getReplace = function (msg) {
        var newMsg = msg;
        this.replaceList.map(function (i) {
            newMsg = newMsg.replace(new RegExp(i.reg, "g"), i.replacement + ' ');
        });
        return newMsg;
    };
    KnowledgeProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__rxjs_rxjs__["a" /* RxjsProvider */]])
    ], KnowledgeProvider);
    return KnowledgeProvider;
}());

//# sourceMappingURL=knowledge.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map