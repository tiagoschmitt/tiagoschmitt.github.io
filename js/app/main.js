"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
requirejs.config({
    map: {
        '*': {
            'pixi.js': '../lib/pixi',
            'gsap': '../lib/gsap.min',
            'PixiPlugin': '../lib/gsap.min/PixiPlugin'
        }
    }
});
require(["pixi.js", "gsap", "PixiPlugin"], function () {
    require(["com/adventurecapitalist/adventureCapitalist"], function (adventureCapitalist) {
        new adventureCapitalist.AdventureCapitalist();
    });
});
define("com/gameclosure/components/positionable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("com/gameclosure/components/display/displayable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("com/gameclosure/pool/reusable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("com/gameclosure/components/updatable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("com/gameclosure/components/baseComponent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseComponent extends PIXI.utils.EventEmitter {
        constructor(id) {
            super();
            this._id = id;
            this._children = new Array();
        }
        get id() {
            return this._id;
        }
        get parent() {
            return this._parent;
        }
        update() {
            for (let component of this._children) {
                component.update();
            }
        }
        clear() {
            for (let component of this._children) {
                component.clear();
            }
            this._children = new Array();
        }
        add(component) {
            component._parent = this;
            this._children.push(component);
        }
        remove(component) {
            var index = this._children.indexOf(component);
            if (index >= 0) {
                this._children.splice(index, 1);
            }
        }
        children() {
            return this._children;
        }
    }
    exports.BaseComponent = BaseComponent;
});
define("com/gameclosure/components/display/DisplayComponent", ["require", "exports", "pixi.js", "com/gameclosure/components/baseComponent"], function (require, exports, pixi_js_1, baseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DisplayComponent extends baseComponent_1.BaseComponent {
        constructor(id, content) {
            super(id || content.name);
            this._content = content;
            if (content == null) {
                this._content = new pixi_js_1.Container();
            }
            this.draw();
        }
        draw() {
        }
        get id() {
            return this._id;
        }
        clear() {
            this.position(0, 0);
        }
        add(component) {
            super.add(component);
            this.content.addChild(component.content);
        }
        remove(component) {
            super.remove(component);
            this.content.removeChild(component.content);
        }
        set x(x) {
            this._x = x;
            if (this._content != null) {
                this._content.x = x;
            }
        }
        get x() {
            return this._x;
        }
        set y(y) {
            this._y = y;
            if (this._content != null) {
                this._content.y = y;
            }
        }
        get y() {
            return this._y;
        }
        position(x, y) {
            this.x = x;
            this.y = y;
        }
        set content(content) {
            this._content = content;
        }
        get content() {
            return this._content;
        }
    }
    exports.DisplayComponent = DisplayComponent;
});
define("com/gameclosure/components/display/imageDisplayComponent", ["require", "exports", "com/gameclosure/components/display/DisplayComponent"], function (require, exports, DisplayComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImageDisplayComponent extends DisplayComponent_1.DisplayComponent {
        constructor(content) {
            super(content.name, content);
        }
    }
    exports.ImageDisplayComponent = ImageDisplayComponent;
});
define("com/gameclosure/factories/display/displayableFactory", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("com/gameclosure/views/view", ["require", "exports", "com/gameclosure/components/display/DisplayComponent", "pixi.js"], function (require, exports, DisplayComponent_2, pixi_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class View extends DisplayComponent_2.DisplayComponent {
        constructor(id, container) {
            super(id, container || new pixi_js_2.Container());
        }
        show() {
            this.content.visible = true;
            this.emit(ViewEvent.VIEW_OPENED);
        }
        hide() {
            this.content.visible = false;
            this.destroy();
        }
        destroy() {
            this.clear();
            if (this._content.parent != null) {
                this._content.parent.removeChild(this._content);
            }
            delete this._content;
            this.emit(ViewEvent.VIEW_DESTROYED);
        }
    }
    exports.View = View;
});
define("com/gameclosure/router/routerOption", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RouterOptionType;
    (function (RouterOptionType) {
        RouterOptionType[RouterOptionType["NORMAL"] = 1] = "NORMAL";
        RouterOptionType[RouterOptionType["MODAL"] = 2] = "MODAL";
    })(RouterOptionType = exports.RouterOptionType || (exports.RouterOptionType = {}));
    ;
    class RouterOption {
    }
    exports.RouterOption = RouterOption;
});
define("com/gameclosure/factories/imageFactory", ["require", "exports", "pixi.js"], function (require, exports, pixi_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImageFactory {
        getImage(id) {
            return new pixi_js_3.Sprite(pixi_js_3.Texture.fromFrame(id));
        }
    }
    exports.ImageFactory = ImageFactory;
});
define("com/adventurecapitalist/views/intro", ["require", "exports", "com/gameclosure/views/view", "pixi.js", "com/gameclosure/game"], function (require, exports, view_1, pixi_js_4, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Intro extends view_1.View {
        constructor() {
            super("intro");
        }
        show() {
            super.show();
            var background = new pixi_js_4.Graphics();
            background.beginFill(0x329957);
            background.drawRect(0, 0, game_1.Game.app.view.width, game_1.Game.app.view.height);
            background.endFill();
            this.content.addChild(background);
            var logo = game_1.Game.imageFactory.getImage("logo");
            logo.x = (game_1.Game.app.view.width - logo.width) / 2;
            logo.y = (game_1.Game.app.view.height - logo.height) / 2;
            this.content.addChild(logo);
            var adventurelogo = game_1.Game.imageFactory.getImage("adventurelogo");
            adventurelogo.scale = new pixi_js_4.Point(0.8, 0.8);
            adventurelogo.x = (game_1.Game.app.view.width - adventurelogo.width) / 2;
            adventurelogo.y = (game_1.Game.app.view.height - adventurelogo.height) / 2;
            this.content.addChild(adventurelogo);
            var timeLine = new TimelineLite();
            timeLine.from(logo, { alpha: 0, duration: 1 });
            timeLine.from(logo, { alpha: 1, duration: 1, delay: 1 });
            timeLine.from(adventurelogo, { alpha: 0, duration: 1 }, "end");
            timeLine.from(background, { alpha: 0, duration: 1 }, "end");
            timeLine.to(adventurelogo, { alpha: 0, duration: 1, delay: 2 });
            timeLine.play();
            timeLine.eventCallback("onComplete", () => {
                game_1.Game.router.show("companies");
            });
        }
    }
    exports.Intro = Intro;
});
define("com/gameclosure/router/router", ["require", "exports", "com/gameclosure/router/routerOption"], function (require, exports, routerOption_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Router {
        constructor(container, routeOptions) {
            this._container = container;
            this._routeOptions = routeOptions;
        }
        init() {
            this._routeOptions.forEach((option) => {
                if (option.isDefault) {
                    this.show(option.path);
                    return;
                }
            });
        }
        update() {
            if (this._currentRoute != null) {
                this._currentRoute.componentRef.update();
            }
        }
        show(path) {
            if (this._nextRoute == null) {
                var routeOption = this.getRouteOptionByPath(path);
                if (this._currentRoute != null && path != this._currentRoute.path) {
                    if (routeOption.type == routerOption_1.RouterOptionType.MODAL) {
                        this._previousRoute = this._currentRoute;
                        this._currentRoute = routeOption;
                        this.showContent();
                    }
                    else {
                        this._nextRoute = routeOption;
                        this._currentRoute.componentRef.hide();
                    }
                }
                else {
                    this._currentRoute = routeOption;
                    this.showContent();
                }
            }
        }
        close() {
            if (this._nextRoute != null) {
                this._previousRoute = this._currentRoute;
                this._currentRoute = this._nextRoute;
                this._nextRoute = null;
                this.removeContent(this._previousRoute);
            }
            else if (this._currentRoute.type == routerOption_1.RouterOptionType.MODAL) {
                this.removeContent(this._currentRoute);
                this._currentRoute = this._previousRoute;
            }
            this.showContent();
        }
        showContent() {
            var view = this.getComponent(this._currentRoute);
            this._container.addChild(view.content);
            view.show();
        }
        removeContent(routerOption) {
            let view = this.getComponent(routerOption);
            this._container.removeChild(view.content);
        }
        getComponent(option) {
            if (option.componentRef != null) {
                return option.componentRef;
            }
            option.componentRef = new option.component();
            option.componentRef.on(ViewEvent.VIEW_DESTROYED, this.close.bind(this));
            return option.componentRef;
        }
        getRouteOptionByPath(path) {
            for (var option of this._routeOptions) {
                if (option.path == path) {
                    return option;
                }
            }
            return null;
        }
    }
    exports.Router = Router;
});
define("com/gameclosure/store/iState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("com/gameclosure/store/iStore", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("com/gameclosure/store/storeable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("com/gameclosure/store/store", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Store {
        constructor(data) {
            this._data = data;
        }
        get data() {
            return this._data;
        }
        getState(id, path) {
            for (var state of this._data[path]) {
                if (id == state.id) {
                    return state;
                }
            }
        }
        commit() {
            if (this.storage != null) {
                this.storage.save(this);
            }
        }
    }
    exports.Store = Store;
});
define("com/gameclosure/utils/asset", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Asset {
        constructor(id, url) {
            this.id = id;
            this.url = url;
        }
    }
    exports.Asset = Asset;
});
define("com/gameclosure/game", ["require", "exports", "pixi.js", "com/gameclosure/factories/imageFactory"], function (require, exports, pixi_js_5, imageFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        static init(displayFactory, router, store) {
            Game._diplayFactory = displayFactory;
            Game._router = router;
            Game._store = store;
            Game._imageFactory = new imageFactory_1.ImageFactory();
        }
        static get app() {
            return Game._app;
        }
        static get router() {
            return Game._router;
        }
        static get store() {
            return Game._store;
        }
        static get displayFactory() {
            return Game._diplayFactory;
        }
        static get imageFactory() {
            return Game._imageFactory;
        }
        static setupRender(options) {
            Game._app = new pixi_js_5.Application(options);
            document.body.appendChild(this._app.view);
            this._app.view.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
        }
        static loadAssets(assets) {
            return __awaiter(this, void 0, void 0, function* () {
                var loader = new PIXI.loaders.Loader();
                for (var asset of assets) {
                    loader.add(asset.id, asset.url);
                }
                return new Promise((resolve) => {
                    loader.load((loader, resources) => {
                        resolve(resources);
                    });
                });
            });
        }
    }
    exports.Game = Game;
});
define("com/gameclosure/factories/display/displayComponentFactory", ["require", "exports", "com/gameclosure/components/display/imageDisplayComponent"], function (require, exports, imageDisplayComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DisplayComponentFactory {
        constructor(imageFactory) {
            this._imageFactory = imageFactory;
        }
        create(id, Component) {
            if (id != null && Component == null) {
                return new imageDisplayComponent_1.ImageDisplayComponent(this._imageFactory.getImage(id));
            }
            else if (id != null) {
                return new Component(id);
            }
            else {
                return new Component();
            }
        }
    }
    exports.DisplayComponentFactory = DisplayComponentFactory;
});
define("com/adventurecapitalist/store/companyState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyState {
        getState(id) {
            throw new Error("Method not implemented.");
        }
    }
    exports.CompanyState = CompanyState;
});
define("com/adventurecapitalist/store/gameState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameState {
        getState(id) {
            throw new Error("Method not implemented.");
        }
    }
    exports.GameState = GameState;
});
define("com/adventurecapitalist/components/display/company/investmentLogoButton", ["require", "exports", "com/gameclosure/components/display/DisplayComponent", "com/gameclosure/game", "pixi.js"], function (require, exports, DisplayComponent_3, game_2, pixi_js_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InvestmentLogoButton extends DisplayComponent_3.DisplayComponent {
        constructor(id) {
            super(id);
        }
        draw() {
            this._state = game_2.Game.store.getState(this.id, "companies");
            this._frame = game_2.Game.imageFactory.getImage("investmentFrame");
            this._highlight = new pixi_js_6.Graphics();
            this._highlight.beginFill(0x64cc47);
            this._highlight.drawCircle(0, 0, 82);
            this._highlight.x = 75;
            this._highlight.y = 75;
            this._highlight.visible = false;
            var bg = new pixi_js_6.Graphics();
            bg.beginFill(0x3b79b8);
            bg.drawCircle(0, 0, 70);
            bg.x = 75;
            bg.y = 75;
            this.content.addChild(this._highlight);
            this.content.addChild(bg);
            this.content.addChild(this._frame);
            var logoImage = game_2.Game.imageFactory.getImage(this.id);
            this.content.addChild(logoImage);
            logoImage.x = (this._frame.width - logoImage.width) / 2;
            logoImage.y = (this._frame.height - logoImage.height) / 2 - 21;
            var style = new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 35,
                fill: "white"
            });
            this._investmentCounter = new PIXI.Text("", style);
            this._investmentCounter.y = 108;
            this.content.addChild(this._investmentCounter);
            this.content.scale = new pixi_js_6.Point(0.6, 0.6);
            this.addEvents();
        }
        update() {
            this._investmentCounter.x = (this._frame.width - this._investmentCounter.width) / 2;
            this._investmentCounter.text = this._state.owned ? this._state.owned.toString() : "";
            if (!this._state.progressStarted && !this._state.hasManager && this._state.owned > 0) {
                this._highlight.visible = true;
            }
            else {
                this._highlight.visible = false;
            }
        }
        addEvents() {
            this.content.interactive = true;
            this.content.buttonMode = true;
            this.content.on("click", this.onClick.bind(this));
        }
        onClick(e) {
            this._state.progressStarted = true;
        }
    }
    exports.InvestmentLogoButton = InvestmentLogoButton;
});
define("com/gameclosure/utils/graphicsUtil", ["require", "exports", "pixi.js"], function (require, exports, pixi_js_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GraphicsUtil {
        static drawRect(width, height, color, alpha = 1, borderColor, radius) {
            var graphic = new pixi_js_7.Graphics();
            graphic.beginFill(color, alpha);
            if (borderColor != null) {
                graphic.lineStyle(3, borderColor);
            }
            if (radius != null) {
                graphic.drawRoundedRect(0, 0, width, height, radius);
            }
            else {
                graphic.drawRect(0, 0, width, height);
            }
            graphic.endFill();
            return graphic;
        }
    }
    exports.GraphicsUtil = GraphicsUtil;
});
define("com/gameclosure/utils/money", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumberScale;
    (function (NumberScale) {
    })(NumberScale || (NumberScale = {}));
    class Money {
        constructor(value) {
            this._formatted = "";
            this._unit = "";
            this._currency = "$";
            this._units = [
                "",
                "MILLION",
                "BILLION",
                "TRILLION",
                "QUADRILLION",
                "QUINTILLION",
                "SEXTILLION",
                "SEPTILLION",
                "OCTILLION"
            ];
            this.convert(value);
        }
        get formatted() {
            return this._formatted || "";
        }
        get unit() {
            return this._unit || "";
        }
        convert(value, min = 1) {
            min = min || 1e3;
            if (value >= min) {
                var order = Math.floor(Math.log(value) / Math.log(1000));
                this._unit = this._units[(order - 1)];
                if (value < 999999) {
                    this._formatted = this._currency + value.toLocaleString("en-US");
                }
                else if (value < 999999999) {
                    this._formatted = this._currency + parseFloat(value.toLocaleString("pt-BR")).toLocaleString("en-US");
                }
                else {
                    this._formatted = this._currency + parseFloat(value.toLocaleString("pt-BR")).toString();
                }
            }
        }
    }
    exports.Money = Money;
});
define("com/adventurecapitalist/components/display/company/investmentProgressBar", ["require", "exports", "com/gameclosure/components/display/DisplayComponent", "pixi.js", "com/gameclosure/utils/graphicsUtil", "com/gameclosure/utils/money", "com/gameclosure/game"], function (require, exports, DisplayComponent_4, pixi_js_8, graphicsUtil_1, money_1, game_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InvestmentProgressBar extends DisplayComponent_4.DisplayComponent {
        constructor(id) {
            super(id);
        }
        draw() {
            this._state = game_3.Game.store.getState(this.id, "companies");
            this.size = new pixi_js_8.Rectangle(0, 0, 210, 30);
            var border = graphicsUtil_1.GraphicsUtil.drawRect(this.size.width, this.size.height, 0x6a8a94, 1, 0x444444, 5);
            this.content.addChild(border);
            this._progress = graphicsUtil_1.GraphicsUtil.drawRect(this.size.width, this.size.height, 0x1ec81b);
            this.content.addChild(this._progress);
            var mask = graphicsUtil_1.GraphicsUtil.drawRect(this.size.width - 4, this.size.height - 4, 0x1ec81b, 1, null, 5);
            mask.y = 2;
            mask.x = 2;
            this.content.addChild(mask);
            this._progress.mask = mask;
            var style = new pixi_js_8.TextStyle({
                fontFamily: "Arial",
                fontSize: 15,
                fill: "black"
            });
            this._incomeText = new pixi_js_8.Text("", style);
            this._incomeText.y = 6;
            this.content.addChild(this._incomeText);
            this.progress();
        }
        update() {
            if (this._state.owned > 0) {
                this.progress();
            }
        }
        progress() {
            var money = new money_1.Money(this._state.initialRevenue * this._state.owned);
            this._incomeText.text = money.formatted + " " + money.unit.toLowerCase();
            var time = this._state.initialTime / Math.ceil(this._state.owned / 25);
            if (time <= 0.2) {
                this._incomeText.text += "/sec";
                this._progress.width = this.size.width;
            }
            else {
                this._progress.width = this.size.width * this._state.progress / 100;
            }
            this._incomeText.x = (this.size.width - this._incomeText.width) / 2;
        }
    }
    exports.InvestmentProgressBar = InvestmentProgressBar;
});
define("com/adventurecapitalist/components/display/company/investmentBuyButton", ["require", "exports", "com/gameclosure/components/display/DisplayComponent", "pixi.js", "com/gameclosure/utils/graphicsUtil", "com/gameclosure/utils/money", "com/gameclosure/game"], function (require, exports, DisplayComponent_5, pixi_js_9, graphicsUtil_2, money_2, game_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InvestmentBuyButton extends DisplayComponent_5.DisplayComponent {
        constructor(id) {
            super(id);
        }
        draw() {
            this._gameState = game_4.Game.store.data;
            this._state = game_4.Game.store.getState(this.id, "companies");
            this.size = new pixi_js_9.Rectangle(0, 0, 148, 50);
            this._disabled = graphicsUtil_2.GraphicsUtil.drawRect(this.size.width, this.size.height, 0x6a8a94, 1, 0x444444, 5);
            this.content.addChild(this._disabled);
            this._enabled = graphicsUtil_2.GraphicsUtil.drawRect(this.size.width, this.size.height, 0xe08b4e, 1, 0x444444, 5);
            this.content.addChild(this._enabled);
            this.createTexts();
            this.addEvents();
        }
        addEvents() {
            this._enabled.interactive = true;
            this._enabled.buttonMode = true;
            this._enabled.on("click", this.onClick.bind(this));
        }
        update() {
            var money = new money_2.Money(this._state.currentCost);
            this.updatePrice(money);
            if (this._gameState.total >= this._state.currentCost && this._state.owned > 0) {
                this.enable();
            }
            else {
                this.disable();
            }
        }
        enable() {
            this._disabled.visible = false;
            this._enabled.visible = true;
        }
        disable() {
            this._disabled.visible = true;
            this._enabled.visible = false;
        }
        updatePrice(price) {
            this._price.text = price.formatted;
            this._price.x = this.size.width - this._price.width - 10;
            this._price.y = 5;
            this._unit.text = price.unit.toUpperCase();
            this._unit.x = this.size.width - this._unit.width - 10;
            this._unit.y = 25;
        }
        createTexts() {
            var style = new pixi_js_9.TextStyle({
                fontFamily: "Arial",
                fontSize: 15,
                fill: "white"
            });
            var buyText = new pixi_js_9.Text("Buy\nx1", style);
            buyText.x = 10;
            buyText.y = 5;
            this._price = new pixi_js_9.Text("", style);
            style = new pixi_js_9.TextStyle({
                fontFamily: "Arial Black",
                fontSize: 10,
                fill: "black"
            });
            this._unit = new pixi_js_9.Text("", style);
            this.content.addChild(buyText, this._price, this._unit);
        }
        onClick(e) {
            if (this._gameState.total >= this._state.currentCost && this._state.owned > 0) {
                this._state.owned++;
                this._gameState.total -= this._state.currentCost;
            }
        }
    }
    exports.InvestmentBuyButton = InvestmentBuyButton;
});
define("com/adventurecapitalist/components/display/company/investmentTimer", ["require", "exports", "pixi.js", "com/gameclosure/components/display/DisplayComponent", "com/gameclosure/utils/graphicsUtil", "com/gameclosure/game"], function (require, exports, pixi_js_10, DisplayComponent_6, graphicsUtil_3, game_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InvestmentTimer extends DisplayComponent_6.DisplayComponent {
        constructor(id) {
            super(id);
        }
        draw() {
            this._state = game_5.Game.store.getState(this.id, "companies");
            this.size = new pixi_js_10.Rectangle(0, 0, 58, 50);
            var background = graphicsUtil_3.GraphicsUtil.drawRect(this.size.width, this.size.height, 0x6a8a94, 1, 0x444444, 5);
            this.content.addChild(background);
            var style = new pixi_js_10.TextStyle({
                fontFamily: "Arial",
                fontSize: 15,
                fill: "white"
            });
            this._timerText = new pixi_js_10.Text("", style);
            this.content.addChild(this._timerText);
        }
        update() {
            var time = Math.floor(this._state.currentTime).toString() + "s";
            this.updateTimer(time);
        }
        updateTimer(time) {
            this._timerText.text = time;
            this._timerText.x = (this.size.width - this._timerText.width) / 2;
            this._timerText.y = (this.size.height - this._timerText.height) / 2;
        }
    }
    exports.InvestmentTimer = InvestmentTimer;
});
define("com/adventurecapitalist/components/display/company/buyButton", ["require", "exports", "com/gameclosure/components/display/DisplayComponent", "pixi.js", "com/gameclosure/utils/graphicsUtil", "com/gameclosure/game", "com/gameclosure/utils/money"], function (require, exports, DisplayComponent_7, pixi_js_11, graphicsUtil_4, game_6, money_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BuyButton extends DisplayComponent_7.DisplayComponent {
        constructor(id) {
            super(id);
        }
        draw() {
            this._gameState = game_6.Game.store.data;
            this._state = game_6.Game.store.getState(this.id, "companies");
            this._disableBg = graphicsUtil_4.GraphicsUtil.drawRect(200, 70, 0x7c989c, 1, 0x444444, 5);
            this.content.addChild(this._disableBg);
            this._enabledBg = graphicsUtil_4.GraphicsUtil.drawRect(200, 70, 0xebb734, 1, null, 5);
            this._enabledBg.buttonMode = true;
            this._enabledBg.interactive = true;
            this.content.addChild(this._enabledBg);
            var style = new pixi_js_11.TextStyle({
                fontFamily: "Arial",
                fontSize: 20,
                fill: "black"
            });
            var buyText = new pixi_js_11.Text("BUY", style);
            buyText.x = (this.content.width - buyText.width) / 2;
            buyText.y = (this.content.height - buyText.height) / 2 - 20;
            style = style.clone();
            style.fontSize = 15;
            var investmentName = new pixi_js_11.Text(this._state.name, style);
            investmentName.x = (this.content.width - investmentName.width) / 2;
            investmentName.y = (this.content.height - investmentName.height) / 2;
            var costMoney = new money_3.Money(this._state.initialCost);
            var cost = new pixi_js_11.Text(costMoney.formatted + " " + costMoney.unit, style);
            cost.x = (this.content.width - cost.width) / 2;
            cost.y = (this.content.height - cost.height) / 2 + 20;
            this.content.addChild(buyText, investmentName, cost);
            this._enabledBg.on("click", this.onClickBuy.bind(this));
        }
        update() {
            if (this._state.owned == 0) {
                this.showButton(true);
            }
            else {
                this.showButton(false);
            }
            if (this._state.initialCost <= this._gameState.total) {
                this.enable(true);
            }
            else {
                this.enable(false);
            }
        }
        showButton(show) {
            if (show) {
                this.content.visible = true;
            }
            else {
                this.content.visible = false;
            }
        }
        enable(enabled) {
            this._enabledBg.visible = false;
            this._disableBg.visible = false;
            if (enabled) {
                this._enabledBg.visible = true;
            }
            else {
                this._disableBg.visible = true;
            }
        }
        onClickBuy(e) {
            this._gameState.total -= this._state.initialCost;
            this._state.owned++;
        }
    }
    exports.BuyButton = BuyButton;
});
define("com/adventurecapitalist/components/display/company/hireManagerButton", ["require", "exports", "com/gameclosure/components/display/DisplayComponent", "pixi.js", "com/gameclosure/utils/graphicsUtil", "com/gameclosure/game", "com/gameclosure/utils/money"], function (require, exports, DisplayComponent_8, pixi_js_12, graphicsUtil_5, game_7, money_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HireManagerButton extends DisplayComponent_8.DisplayComponent {
        constructor(id) {
            super(id);
        }
        draw() {
            this._gameState = game_7.Game.store.data;
            this._state = game_7.Game.store.getState(this.id, "companies");
            this.size = new pixi_js_12.Rectangle(0, 0, 85, 85);
            this._disabled = graphicsUtil_5.GraphicsUtil.drawRect(this.size.width, this.size.height, 0x6a8a94, 1, 0x444444, 5);
            this.content.addChild(this._disabled);
            this._enabled = graphicsUtil_5.GraphicsUtil.drawRect(this.size.width, this.size.height, 0xe08b4e, 1, 0x444444, 5);
            this.content.addChild(this._enabled);
            this.createTexts();
            this.addEvents();
        }
        addEvents() {
            this._enabled.interactive = true;
            this._enabled.buttonMode = true;
            this._enabled.on("click", this.onClick.bind(this));
        }
        update() {
            if (this._gameState.total >= this._state.managerCost && !this._state.hasManager) {
                this.enable();
            }
            else {
                this.disable();
            }
        }
        enable() {
            this._disabled.visible = false;
            this._enabled.visible = true;
        }
        disable() {
            this._disabled.visible = true;
            this._enabled.visible = false;
        }
        createTexts() {
            var style = new pixi_js_12.TextStyle({
                fontFamily: "Arial",
                fontSize: 12,
                fill: "white",
            });
            var money = new money_4.Money(this._state.managerCost);
            var text;
            text = new pixi_js_12.Text("BUY", style);
            this.content.addChild(text);
            text.x = (this.content.width - text.width) / 2;
            text.y = 5;
            text = new pixi_js_12.Text("MANAGER", style);
            this.content.addChild(text);
            text.x = (this.content.width - text.width) / 2;
            text.y = 20;
            text = new pixi_js_12.Text(money.formatted + " " + money.unit, style);
            this.content.addChild(text);
            text.x = (this.content.width - text.width) / 2;
            text.y = 45;
        }
        onClick(e) {
            this._state.hasManager = true;
            this._gameState.total -= this._state.managerCost;
        }
    }
    exports.HireManagerButton = HireManagerButton;
});
define("com/adventurecapitalist/components/display/company/companyItem", ["require", "exports", "com/gameclosure/game", "com/gameclosure/components/display/DisplayComponent", "com/adventurecapitalist/components/display/company/investmentLogoButton", "com/adventurecapitalist/components/display/company/investmentProgressBar", "com/adventurecapitalist/components/display/company/investmentBuyButton", "com/adventurecapitalist/components/display/company/investmentTimer", "com/adventurecapitalist/components/display/company/buyButton", "com/adventurecapitalist/components/display/company/hireManagerButton"], function (require, exports, game_8, DisplayComponent_9, investmentLogoButton_1, investmentProgressBar_1, investmentBuyButton_1, investmentTimer_1, buyButton_1, hireManagerButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyItem extends DisplayComponent_9.DisplayComponent {
        constructor(id) {
            super(id);
        }
        draw() {
            var logo = game_8.Game.displayFactory.create(this.id, investmentLogoButton_1.InvestmentLogoButton);
            this.add(logo);
            var progressBar = game_8.Game.displayFactory.create(this.id, investmentProgressBar_1.InvestmentProgressBar);
            this.add(progressBar);
            progressBar.x = 100;
            var buy = game_8.Game.displayFactory.create(this.id, investmentBuyButton_1.InvestmentBuyButton);
            this.add(buy);
            buy.x = 100;
            buy.y = 35;
            var timer = game_8.Game.displayFactory.create(this.id, investmentTimer_1.InvestmentTimer);
            this.add(timer);
            timer.x = 252;
            timer.y = 35;
            var hireManagerBtn = game_8.Game.displayFactory.create(this.id, hireManagerButton_1.HireManagerButton);
            this.add(hireManagerBtn);
            hireManagerBtn.x = 315;
            hireManagerBtn.y = 0;
            var buyBtn = game_8.Game.displayFactory.create(this.id, buyButton_1.BuyButton);
            //this.add(buyBtn);
            buyBtn.x = 150;
            buyBtn.y = 8;
        }
    }
    exports.CompanyItem = CompanyItem;
});
define("com/gameclosure/utils/scrollContainer", ["require", "exports", "pixi.js", "com/gameclosure/game"], function (require, exports, pixi_js_13, game_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* globals TweenMax, Quad, Back, Elastic */
    /*
     * Original implementation: https://codepen.io/wiledal/pen/ZYoNEa?editors=0010
     * Requires GreenSockss GSAP 2.0.1
     * Works with PixiJS 4.7.3
     */
    class ScrollContainer extends pixi_js_13.Container {
        constructor(offset) {
            super();
            this.offset = offset;
            this.scrollContainer = new pixi_js_13.Container();
            super.addChild(this.scrollContainer);
            this.containerMask = new pixi_js_13.Graphics();
            this.containerMask
                .beginFill(0x000000)
                .drawRect(this.x, this.y, game_9.Game.app.renderer.width, game_9.Game.app.renderer.height)
                .endFill();
            super.addChild(this.containerMask);
            this.scrollContainer.mask = this.containerMask;
            this.isMouseDown = false;
            this.lastPos = null;
            this.lastDiff = null;
            this.scrollTween = null;
            this.interactive = true;
            this.on("mousemove", this.onmousemove.bind(this));
            this.on("mousedown", this.onmousedown.bind(this));
            this.on("mouseup", this.onmouseup.bind(this));
            this.on("mouseupoutside", this.onmouseup.bind(this));
            this.on("touchmove", this.onmousemove.bind(this));
            this.on("touchstart", this.onmousedown.bind(this));
            this.on("touchend", this.onmouseup.bind(this));
            this.on("touchendoutside", this.onmouseup.bind(this));
        }
        onmousemove(e) {
            const { originalEvent } = e.data;
            var clientY = !originalEvent.touches ? originalEvent.clientY : originalEvent.touches[0].clientY;
            if (this.isMouseDown) {
                this.lastDiff = clientY - this.lastPos.y;
                this.lastPos.y = clientY;
                if (-this.scrollContainer.y < 0) {
                    this.scrollContainer.y += this.lastDiff / 2;
                }
                else {
                    this.scrollContainer.y += this.lastDiff;
                }
            }
        }
        onmousedown(e) {
            const { originalEvent } = e.data;
            const clientY = !originalEvent.touches ? originalEvent.clientY : originalEvent.touches[0].clientY;
            this.isMouseDown = true;
            if (this.scrollTween) {
                this.scrollTween.kill();
            }
            this.lastPos = {
                y: clientY
            };
        }
        onmouseup(e) {
            if (this.lastDiff) {
                let goY = this.scrollContainer.y + this.lastDiff * 10;
                let ease = Quad.easeOut;
                let time = Math.abs(this.lastDiff / 150);
                if (goY < -this.scrollContainer.height - this.offset + this.containerMask.height + this.y) {
                    goY = -this.scrollContainer.height - this.offset + this.containerMask.height + this.y;
                }
                if (goY > this.y) {
                    goY = this.y;
                }
                ease = Back.easeOut;
                time = 0.5;
                this.scrollTween = TweenMax.to(this.scrollContainer, time, {
                    y: goY,
                    ease
                });
            }
            this.isMouseDown = false;
            this.lastPos = null;
            this.lastDiff = null;
        }
        addChild(child) {
            return this.scrollContainer.addChild(child);
        }
        addChildToContainer(child) {
            return super.addChildAt(child, 0);
        }
    }
    exports.ScrollContainer = ScrollContainer;
});
define("com/adventurecapitalist/views/companies", ["require", "exports", "com/gameclosure/views/view", "com/gameclosure/game", "com/adventurecapitalist/components/display/company/companyItem", "pixi.js", "com/gameclosure/utils/scrollContainer", "com/gameclosure/utils/graphicsUtil", "com/gameclosure/utils/money"], function (require, exports, view_2, game_10, companyItem_1, pixi_js_14, scrollContainer_1, graphicsUtil_6, money_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Companies extends view_2.View {
        constructor() {
            super("companies", new scrollContainer_1.ScrollContainer(200));
        }
        show() {
            super.show();
            this.drawBackground();
            var companiesData = game_10.Game.store.data;
            var company;
            var timeLine = new TimelineLite();
            companiesData.companies.forEach((state, index) => {
                company = game_10.Game.displayFactory.create(state.id, companyItem_1.CompanyItem);
                this.add(company);
                company.x = 30;
                company.y = 100 + (index * 120);
                timeLine.from(company.content, { y: company.y - 20, alpha: 0, duration: 0.1 });
            });
            timeLine.play();
            this.createInterface();
        }
        update() {
            super.update();
            var money = new money_5.Money(game_10.Game.store.data.total);
            this._totalText.text = money.formatted;
            this._totalUnitText.text = money.unit;
        }
        createInterface() {
            var container = new pixi_js_14.Container();
            this.content.parent.addChild(container);
            var bg = graphicsUtil_6.GraphicsUtil.drawRect(game_10.Game.app.renderer.width, 80, 0x000000, 0.3);
            container.addChild(bg);
            var style = new pixi_js_14.TextStyle({
                fontFamily: "Arial",
                fontSize: 40,
                fill: "white"
            });
            this._totalText = new pixi_js_14.Text("", style);
            this._totalText.x = 40;
            this._totalText.y = 10;
            container.addChild(this._totalText);
            style = style.clone();
            style.fontSize = 20;
            this._totalUnitText = new pixi_js_14.Text("", style);
            this._totalUnitText.x = 40;
            this._totalUnitText.y = 50;
            container.addChild(this._totalUnitText);
        }
        drawBackground() {
            var bg = new pixi_js_14.Graphics(true);
            bg.beginFill(0x6fa2b3);
            bg.drawRect(0, 0, game_10.Game.app.renderer.width, game_10.Game.app.renderer.height);
            bg.endFill();
            this.content.addChildToContainer(bg);
            return bg;
        }
    }
    exports.Companies = Companies;
});
define("com/adventurecapitalist/views/managers", ["require", "exports", "com/gameclosure/views/view"], function (require, exports, view_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Managers extends view_3.View {
        constructor() {
            super("managers");
        }
        show() {
        }
    }
    exports.Managers = Managers;
});
define("com/adventurecapitalist/managers/companyManager", ["require", "exports", "com/gameclosure/game"], function (require, exports, game_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyManager {
        constructor() {
            this._state = game_11.Game.store.data;
            this.project();
        }
        update() {
            var companies = this._state.companies;
            this._state.timestamp = Date.now();
            companies.forEach((state) => {
                if (state.owned > 0) {
                    this.cost(state);
                    if (state.hasManager) {
                        state.progressStarted = true;
                        if (state.progress == 100) {
                            this.updateTotal(state);
                            state.progress = 0;
                            state.timestamp = Date.now();
                        }
                        else {
                            this.progress(state);
                        }
                    }
                    else {
                        if (state.progress == 100) {
                            state.progress = 0;
                            state.progressStarted = false;
                            this.updateTotal(state);
                        }
                        else if (state.progress == 0 && state.progressStarted) {
                            state.timestamp = Date.now();
                            state.progress = 1;
                        }
                        else if (state.progress > 0) {
                            this.progress(state);
                        }
                    }
                    this.timer(state);
                }
            });
        }
        cost(state) {
            state.currentCost = state.initialCost * (state.coefficient * state.owned);
        }
        timer(state) {
            state.currentTime = ((100 - state.progress) / 100) * this.initialTime(state);
        }
        progress(state) {
            var currentSec = (Date.now() - state.timestamp);
            var progress = (currentSec * 100) / (this.initialTime(state) * 1000);
            state.progress = progress < 100 ? progress : 100;
        }
        updateTotal(state) {
            this._state.total += state.initialRevenue * state.owned;
        }
        initialTime(state) {
            var factor = Math.ceil(state.owned / 25);
            if (factor == 0) {
                return 1;
            }
            return state.initialTime / factor;
        }
        project() {
            var companies = this._state.companies;
            if (this._state.timestamp != null) {
                var currentTime = Date.now();
                var totalDiff = currentTime - this._state.timestamp;
                companies.forEach((state) => {
                    if (state.hasManager) {
                        state.timestamp;
                        var stateCicles = Math.floor(totalDiff / (state.initialTime * 1000));
                        this._state.total += stateCicles * (state.initialRevenue * state.owned);
                        var remainder = (totalDiff % (state.initialTime * 1000)) / 1000;
                        var progress = (remainder * 100) / (this.initialTime(state) * 1000);
                        state.progress = progress < 100 ? progress : 100;
                    }
                });
            }
        }
    }
    exports.CompanyManager = CompanyManager;
});
define("com/gameclosure/store/localStore", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LocalStore {
        constructor(id, frequency) {
            this._id = id;
            this._frequency = frequency;
            setInterval(this.sendData.bind(this), this._frequency * 1000);
        }
        save(store) {
            this._data = store.data;
        }
        retrive() {
            var data = localStorage.getItem(this._id);
            if (data != null) {
                return JSON.parse(data);
            }
        }
        sendData() {
            if (this._data != null) {
                localStorage.setItem(this._id, JSON.stringify(this._data));
            }
        }
    }
    exports.LocalStore = LocalStore;
});
define("com/adventurecapitalist/adventureCapitalist", ["require", "exports", "gsap/PixiPlugin", "com/gameclosure/game", "com/gameclosure/router/router", "com/gameclosure/factories/imageFactory", "com/gameclosure/factories/display/displayComponentFactory", "com/gameclosure/store/store", "com/gameclosure/router/routerOption", "com/adventurecapitalist/views/intro", "com/adventurecapitalist/views/companies", "com/adventurecapitalist/views/managers", "com/adventurecapitalist/managers/companyManager", "com/gameclosure/store/localStore"], function (require, exports, PixiPlugin_1, game_12, router_1, imageFactory_2, displayComponentFactory_1, store_1, routerOption_2, intro_1, companies_1, managers_1, companyManager_1, localStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AdventureCapitalist {
        constructor() {
            gsap.registerPlugin(PixiPlugin_1.PixiPlugin);
            this.startGame();
        }
        startGame() {
            return __awaiter(this, void 0, void 0, function* () {
                var resources = yield game_12.Game.loadAssets([{
                        id: "sprites",
                        url: "./assets/sprites.json"
                    }, {
                        id: "config",
                        url: "./assets/config.json"
                    }
                ]);
                game_12.Game.setupRender({
                    width: 472,
                    height: 840,
                    antialias: true,
                    transparent: false,
                    resolution: 1,
                    backgroundColor: 0xFFFFFF,
                });
                var displayFactory = this.configDisplayFactory();
                var router = this.configRouter();
                var store = this.configStore(resources.config);
                game_12.Game.init(displayFactory, router, store);
                router.init();
                this._companyManager = new companyManager_1.CompanyManager();
                this.startTick();
            });
        }
        startTick() {
            this.resize();
            window.addEventListener('resize', this.resize.bind(this));
            game_12.Game.app.ticker.add(this.update.bind(this));
        }
        update() {
            this._companyManager.update();
            game_12.Game.router.update();
            game_12.Game.store.commit();
        }
        configDisplayFactory() {
            return new displayComponentFactory_1.DisplayComponentFactory(new imageFactory_2.ImageFactory());
        }
        configStore(config) {
            this._storage = new localStore_1.LocalStore("adventure", 2);
            var gameState = this._storage.retrive() || config.data;
            var store = new store_1.Store(gameState);
            store.storage = this._storage;
            return store;
        }
        configRouter() {
            return new router_1.Router(game_12.Game.app.stage, [{
                    path: "intro",
                    type: routerOption_2.RouterOptionType.NORMAL,
                    component: intro_1.Intro
                }, {
                    isDefault: true,
                    path: "companies",
                    type: routerOption_2.RouterOptionType.NORMAL,
                    component: companies_1.Companies
                }, {
                    path: "managers",
                    type: routerOption_2.RouterOptionType.MODAL,
                    component: managers_1.Managers
                }
            ]);
        }
        resize() {
            game_12.Game.app.renderer.view.style.position = 'absolute';
            game_12.Game.app.renderer.view.style.left = ((window.innerWidth - game_12.Game.app.renderer.width) >> 1) + 'px';
            game_12.Game.app.renderer.view.style.top = ((window.innerHeight - game_12.Game.app.renderer.height) >> 1) + 'px';
        }
    }
    exports.AdventureCapitalist = AdventureCapitalist;
});
var LoadEvent;
(function (LoadEvent) {
    LoadEvent["LOAD_COMPLETE"] = "loadComplete";
})(LoadEvent || (LoadEvent = {}));
var ViewEvent;
(function (ViewEvent) {
    ViewEvent["VIEW_OPENED"] = "vieOpened";
    ViewEvent["VIEW_DESTROYED"] = "viewDestroyed";
})(ViewEvent || (ViewEvent = {}));
define("com/gameclosure/pool/pool", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Pool {
        constructor() {
            this._reusablesFree = new Array();
            this._reusablesUsed = new Array();
        }
        static get instance() {
            if (!Pool._instance) {
                Pool._instance = new Pool();
            }
            return Pool._instance;
        }
        addReusable(reusable) {
            this._reusablesFree.push(reusable);
        }
        acquire(id) {
            var length = this._reusablesFree.length;
            var reusable;
            for (var i = 0; i < length; i++) {
                if (this._reusablesFree[i].id == id) {
                    reusable = this._reusablesFree.splice(i, 1)[0];
                    this._reusablesUsed.push(reusable);
                    return reusable;
                }
            }
            return null;
        }
        release(reusable) {
            var length = this._reusablesUsed.length;
            for (var i = 0; i < length; i++) {
                if (this._reusablesUsed[i] == reusable) {
                    this._reusablesFree.push(this._reusablesUsed.splice(i, 1)[0]);
                    break;
                }
            }
        }
        releaseAll() {
            var length = this._reusablesUsed.length;
            for (var i = 0; i < length; i++) {
                this._reusablesFree.push(this._reusablesUsed[i]);
            }
            this._reusablesUsed = new Array();
        }
    }
    exports.Pool = Pool;
});
//# sourceMappingURL=main.js.map