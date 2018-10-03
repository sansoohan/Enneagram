"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkbox_common_1 = require("./checkbox-common");
var view_1 = require("tns-core-modules/ui/core/view");
var color_1 = require("tns-core-modules/color");
var button_1 = require("tns-core-modules/ui/button");
var checkBoxBackgroundColorProperty = new view_1.CssProperty({
    name: "checkBoxBackgroundColor",
    cssName: "checkbox-background-color",
    valueConverter: function (v) {
        return String(v);
    }
});
var onCheckColorProperty = new view_1.CssProperty({
    name: "onCheckColor",
    cssName: "on-check-color",
    defaultValue: "#ffffff",
    valueConverter: function (v) {
        return String(v);
    }
});
var tintColorProperty = new view_1.CssProperty({
    name: "tintColor",
    cssName: "tint-color",
    valueConverter: function (v) {
        return String(v);
    }
});
var onTintColorProperty = new view_1.CssProperty({
    name: "onTintColor",
    cssName: "on-tint-color",
    valueConverter: function (v) {
        return String(v);
    }
});
var fillColorProperty = new view_1.CssProperty({
    name: "fillColor",
    cssName: "fill-color",
    valueConverter: function (v) {
        return String(v);
    }
});
var checkedProperty = new view_1.Property({
    name: "checked",
    defaultValue: false,
    valueConverter: view_1.booleanConverter,
    valueChanged: onCheckedPropertyChanged
});
var boxTypeProperty = new view_1.Property({
    name: "boxType",
    valueConverter: function (v) {
        return checkbox_common_1.BoxType[v] === checkbox_common_1.BoxType.circle
            ? 0
            : 1;
    }
});
var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        var _this = _super.call(this) || this;
        _this._lineWidth = 1;
        _this._iosCheckbox = BEMCheckBox.alloc().initWithFrame(CGRectMake(0, 0, 21, 21));
        return _this;
    }
    Object.defineProperty(CheckBox.prototype, "fillColor", {
        set: function (color) {
            this._fillColor = color;
            this._iosCheckbox.onFillColor = new color_1.Color(color).ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "onFillColor", {
        set: function (color) {
            this._onFillColor = color;
            this._iosCheckbox.onFillColor = new color_1.Color(color).ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "tintColor", {
        set: function (color) {
            this._tintColor = color;
            this._iosCheckbox.tintColor = new color_1.Color(color).ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "onTintColor", {
        set: function (color) {
            this._onTintColor = color;
            this._iosCheckbox.onTintColor = new color_1.Color(color).ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkBoxBackgroundColor", {
        set: function (color) {
            this._checkBoxBackgroundColor = color;
            this._iosCheckbox.offFillColor = new color_1.Color(color).ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "onCheckColor", {
        set: function (color) {
            this._onCheckColor = color;
            this._iosCheckbox.onCheckColor = new color_1.Color(color).ios;
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype[boxTypeProperty.setNative] = function (value) {
        if (this._iosCheckbox) {
            this._iosCheckbox.boxType = value;
        }
    };
    CheckBox.prototype[checkedProperty.getDefault] = function () {
        return false;
    };
    CheckBox.prototype[checkedProperty.setNative] = function (value) {
        this._iosCheckbox.setOnAnimated(value, true);
    };
    Object.defineProperty(CheckBox.prototype, "checkedAnimated", {
        set: function (value) {
            this._iosCheckbox.setOnAnimated(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "lineWidth", {
        set: function (value) {
            this._iosCheckbox.lineWidth = value;
            this._lineWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "hideBox", {
        set: function (value) {
            this._iosCheckbox.hideBox = value;
            this._hideBox = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "animationDuration", {
        set: function (value) {
            this._iosCheckbox.animationDuration = value;
            this._animationDuration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "onAnimationType", {
        set: function (value) {
            if (this._iosCheckbox)
                this._iosCheckbox.onAnimationType = this.getAnimationType(value);
            else
                this._onAnimationType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "offAnimationType", {
        set: function (value) {
            this._iosCheckbox.offAnimationType = this.getAnimationType(value);
            this._offAnimationType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "nativeiOSCheckBox", {
        get: function () {
            return this._iosCheckbox;
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype.reload = function (value) {
        this._iosCheckbox.reload();
    };
    CheckBox.prototype.initNativeView = function () {
        this.addEventListener("tap", function (args) {
            var checkbox = args.object;
            checkbox.checked = !checkbox.checked;
        });
        this._onAnimationType = 2;
        this._offAnimationType = 2;
        this._delegate = BEMCheckBoxDelegateImpl.initWithOwner(new WeakRef(this));
        var fontSize;
        if (!this.style.fontSize) {
            fontSize = 15;
        }
        else {
            fontSize = this.style.fontSize;
        }
        this._iosCheckbox.delegate = this._delegate;
        this._iosCheckbox.frame = CGRectMake(0, 0, fontSize, fontSize);
        this._iosCheckbox.center = CGPointMake(this._iosCheckbox.center.x, fontSize / 2 + 3);
        this.style.paddingLeft = fontSize + (fontSize > 20 ? 10 : 5);
        this.style.textAlignment = "left";
        if (this._onCheckColor) {
            this._iosCheckbox.onCheckColor = new color_1.Color(this._onCheckColor).ios;
        }
        if (this._onFillColor) {
            this._iosCheckbox.onFillColor = new color_1.Color(this._onFillColor).ios;
        }
        if (this._onTintColor) {
            this._iosCheckbox.onTintColor = new color_1.Color(this._onTintColor).ios;
        }
        if (this._fillColor) {
            this._iosCheckbox.onFillColor = new color_1.Color(this._fillColor).ios;
        }
        if (this._tintColor) {
            this._iosCheckbox.tintColor = new color_1.Color(this._tintColor).ios;
        }
        this.nativeView.addSubview(this._iosCheckbox);
        if (typeof this._lineWidth !== "undefined") {
            this.lineWidth = this._lineWidth;
        }
        if (typeof this._hideBox !== "undefined") {
            this.hideBox = this._hideBox;
        }
        this.boxType = this.boxType === 0 ? 0 : 1;
        if (typeof this._animationDuration !== "undefined") {
            this.animationDuration = this._animationDuration;
        }
        if (typeof this._onAnimationType !== "undefined") {
            this.onAnimationType = this._onAnimationType;
        }
        if (typeof this._offAnimationType !== "undefined") {
            this.offAnimationType = this._offAnimationType;
        }
    };
    CheckBox.prototype.disposeNativeView = function () {
        this._iosCheckbox.delegate = null;
        this.removeEventListener("tap");
    };
    CheckBox.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    CheckBox.prototype.getAnimationType = function (value) {
        switch (value) {
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 3;
            case 5:
                return 0;
            case 6:
                return 5;
        }
    };
    CheckBox.prototype._onCheckedPropertyChanged = function (checkbox, oldValue, newValue) {
        if (!this.nativeView) {
            return;
        }
        checkedProperty.nativeValueChange(this, newValue);
    };
    return CheckBox;
}(button_1.Button));
exports.CheckBox = CheckBox;
var BEMCheckBoxDelegateImpl = (function (_super) {
    __extends(BEMCheckBoxDelegateImpl, _super);
    function BEMCheckBoxDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BEMCheckBoxDelegateImpl.initWithOwner = function (owner) {
        var delegate = BEMCheckBoxDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    };
    BEMCheckBoxDelegateImpl.prototype.animationDidStopForCheckBox = function (checkBox) {
    };
    BEMCheckBoxDelegateImpl.prototype.didTapCheckBox = function (checkBox) {
        var owner = this._owner.get();
        if (owner) {
            checkedProperty.nativeValueChange(owner, checkBox.on);
        }
    };
    return BEMCheckBoxDelegateImpl;
}(NSObject));
BEMCheckBoxDelegateImpl.ObjCProtocols = [BEMCheckBoxDelegate];
function onCheckedPropertyChanged(checkbox, oldValue, newValue) {
    checkbox._onCheckedPropertyChanged(checkbox, oldValue, newValue);
}
boxTypeProperty.register(CheckBox);
checkedProperty.register(CheckBox);
fillColorProperty.register(view_1.Style);
onTintColorProperty.register(view_1.Style);
onCheckColorProperty.register(view_1.Style);
checkBoxBackgroundColorProperty.register(view_1.Style);
tintColorProperty.register(view_1.Style);
