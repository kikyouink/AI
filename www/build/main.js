webpackJsonp([3],{

/***/ 113:
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
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/ai/ai.module": [
		281,
		2
	],
	"../pages/book/book.module": [
		282,
		1
	],
	"../pages/tabs/tabs.module": [
		283,
		0
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
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewAsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sentence_sentence__ = __webpack_require__(49);
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
    function ViewAsProvider(sentence) {
        this.sentence = sentence;
    }
    ViewAsProvider.prototype.getWhen = function () {
        var when;
        var HED = this.sentence.findHED();
        var when1 = this.sentence.findChildren(HED, "VV")[0];
        var when2 = this.sentence.findSibling(when1);
        if (!when2)
            when = this.sentence.translate(when1.word);
        else {
            var arr = [];
            arr.push(this.sentence.translate(when1.word));
            arr.push(this.sentence.translate(when2.word));
            when = arr;
        }
        console.log(when);
        return when;
    };
    ViewAsProvider.prototype.getFilterCard = function () {
        var filterCard;
    };
    ViewAsProvider.prototype.getSelectCard = function () {
    };
    ViewAsProvider.prototype.getPosition = function () {
    };
    ViewAsProvider.prototype.getViewAs = function () {
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
        this.getPosition();
        this.getViewAs();
        this.getPrompt();
    };
    ViewAsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sentence_sentence__["a" /* SentenceProvider */]])
    ], ViewAsProvider);
    return ViewAsProvider;
}());

//# sourceMappingURL=view-as.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PainterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(77);
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
        canvas.height = parent.offsetHeight;
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
    ], PainterProvider);
    return PainterProvider;
    var _a;
}());

//# sourceMappingURL=painter.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(77);
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
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HttpProvider = /** @class */ (function () {
    function HttpProvider(http) {
        this.http = http;
        this.basicUrl = '/rpc/2.0/nlp/v1/depparser?charset=UTF-8&access_token=';
        this.token = '24.9ef1d08dd86089475358c1055f47716a.2592000.1546273111.282335-15004681';
        this.apiUrl = this.basicUrl + this.token;
        this.nodeUrl = "http://localhost:3000";
        console.log('Hello HttpProvider Provider');
    }
    HttpProvider.prototype.get = function () {
    };
    HttpProvider.prototype.post = function (text) {
        var url = this.apiUrl;
        // var url = this.nodeUrl; 
        var body = {
            "text": text
        };
        var options = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return this.http.post(url, body, options);
    };
    HttpProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], HttpProvider);
    return HttpProvider;
}());

//# sourceMappingURL=http.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_as_view_as__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sentence_sentence__ = __webpack_require__(49);
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
        var HED = this.sentence.findHED();
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

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_painter_painter__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_http_http__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_code_code__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_view_as_view_as__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_sentence_sentence__ = __webpack_require__(49);
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
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
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
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_painter_painter__["a" /* PainterProvider */],
                __WEBPACK_IMPORTED_MODULE_9__providers_http_http__["a" /* HttpProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_code_code__["a" /* CodeProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_view_as_view_as__["a" /* ViewAsProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_sentence_sentence__["a" /* SentenceProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import VConsole from 'vconsole';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.rootPage = 'TabsPage';
        platform.ready().then(function () {
            // var vConsole = new VConsole();
            statusBar.styleDefault();
            splashScreen.hide();
            _this.items = [
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
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Linka\Desktop\teach\go\src\app\app.html"*/'<ion-menu [content]="content">\n	<ion-content>\n		<div class="bg"></div>\n		<ion-list no-lines>\n			<ion-list-header>\n				菜单\n			</ion-list-header>\n			<button ion-item menuClose *ngFor="let item of items">\n				<ion-icon [name]="item.icon" item-start></ion-icon>{{item.name}}\n			</button>\n		</ion-list>\n	</ion-content>\n</ion-menu>\n<ion-nav [root]="rootPage" #content></ion-nav>'/*ion-inline-end:"C:\Users\Linka\Desktop\teach\go\src\app\app.html"*/,
            animations: []
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SentenceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function SentenceProvider() {
        this.translation = {
            "使用": 'chooseToUse',
            "打出": "chooseToRespond",
            "红色": 'red',
            "黑色": 'black',
            "梅花": 'club',
            "方块": 'diamond',
            "红桃": 'heart',
            "黑桃": 'spade'
        };
        this.replaceList = [
            {
                // reg:'/【[\u4e00-\u9fa5]+】/g',
                reg: "【[\u4e00-\u9fa5]+】",
                replacement: 'X',
            }, {
                reg: "梅花",
                replacement: '草花',
            }
        ];
    }
    SentenceProvider.prototype.replaceCardName = function (msg) {
        var newMsg = msg;
        var i = this.replaceList.length;
        while (i--) {
            var k = this.replaceList[i];
            console.log(k);
            newMsg = newMsg.replace(new RegExp(k.reg, "g"), k.replacement);
        }
        console.log(newMsg);
        return newMsg;
    };
    SentenceProvider.prototype.receiveJson = function (json) {
        this.json = json;
    };
    SentenceProvider.prototype.translate = function (word) {
        for (var i in this.translation) {
            if (i == word)
                return this.translation[i];
        }
    };
    //判断类型
    SentenceProvider.prototype.findHED = function () {
        var HED = this.json.filter(function (i) {
            return i.head == 0;
        });
        console.log(HED[0]);
        return HED[0];
    };
    SentenceProvider.prototype.findParent = function (item) {
        var parent = this.json.filter(function (i) {
            return i.id == item.head;
        });
        console.log(parent[0]);
        return parent[0];
    };
    SentenceProvider.prototype.findChildren = function (item, deprel) {
        var num, result = this.json;
        if (!deprel) {
            var children = result.filter(function (i) {
                return i.head == item.id;
            });
        }
        else {
            if (typeof deprel == "string")
                num = 1;
            else if (Array.isArray(deprel))
                num = deprel.length;
            while (num--) {
                var children = result.filter(function (i) {
                    return i.head == item.id && i.deprel == deprel;
                });
                result = children;
            }
        }
        console.log(children);
        return children;
    };
    SentenceProvider.prototype.findSibling = function (item) {
        var sibling = this.findChildren(item).filter(function (i) {
            return i.deprel == "COO";
        });
        console.log(sibling[0]);
        return sibling[0];
    };
    SentenceProvider.prototype.findDeprel = function (array, deprel) {
        var result = array.filter(function (i) {
            return i.deprel == deprel;
        });
        console.log(result);
        return result;
    };
    SentenceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SentenceProvider);
    return SentenceProvider;
}());

//# sourceMappingURL=sentence.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map