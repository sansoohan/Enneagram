"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color");
var platform_1 = require("tns-core-modules/platform");
var app = require("tns-core-modules/application");
var view_1 = require("tns-core-modules/ui/core/view");
var checkbox_common_1 = require("./checkbox-common");
exports.checkedProperty = new view_1.Property({
    name: "checked",
    defaultValue: false,
    valueConverter: view_1.booleanConverter,
    valueChanged: onCheckedPropertyChanged
});
exports.textProperty = new view_1.Property({
    name: "text",
    defaultValue: "",
    valueChanged: onTextPropertyChanged
});
exports.fillColorProperty = new view_1.CssProperty({
    name: "fillColor",
    cssName: "fill-color",
    valueConverter: function (v) {
        return String(v);
    }
});
exports.tintColorProperty = new view_1.CssProperty({
    name: "tintColor",
    cssName: "tint-color",
    defaultValue: "#0075ff",
    valueConverter: function (v) {
        return String(v);
    }
});
var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CheckBox.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "boxType", {
        get: function () {
            return this._boxType;
        },
        set: function (value) {
            this._boxType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkStyle", {
        get: function () {
            return this._checkStyle;
        },
        set: function (style) {
            this._checkStyle = style;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPadding", {
        get: function () {
            return this._checkPadding;
        },
        set: function (padding) {
            this._checkPadding = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingLeft", {
        get: function () {
            return this._checkPaddingLeft;
        },
        set: function (padding) {
            this._checkPaddingLeft = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingTop", {
        get: function () {
            return this._checkPaddingTop;
        },
        set: function (padding) {
            this._checkPaddingTop = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingRight", {
        get: function () {
            return this._checkPaddingRight;
        },
        set: function (padding) {
            this._checkPaddingRight = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingBottom", {
        get: function () {
            return this._checkPaddingBottom;
        },
        set: function (padding) {
            this._checkPaddingBottom = padding;
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype[exports.checkedProperty.getDefault] = function () {
        return false;
    };
    CheckBox.prototype[exports.checkedProperty.setNative] = function (value) {
        this.nativeView.setChecked(Boolean(value));
    };
    CheckBox.prototype[exports.textProperty.getDefault] = function () {
        return "";
    };
    CheckBox.prototype[exports.textProperty.setNative] = function (value) {
        this.nativeView.setText(java.lang.String.valueOf(value));
    };
    Object.defineProperty(CheckBox.prototype, "fillColor", {
        get: function () {
            return this.style.fillColor;
        },
        set: function (color) {
            this.style.fillColor = color;
            if (this._android && platform_1.device.sdkVersion >= "21") {
                this._android.setButtonTintList(android.content.res.ColorStateList.valueOf(new color_1.Color(color).android));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "tintColor", {
        get: function () {
            return this.style.fillColor;
        },
        set: function (color) {
            this.style.fillColor = color;
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype.createNativeView = function () {
        this._android = new android.support.v7.widget[checkbox_common_1.BoxType[this.boxType] === checkbox_common_1.BoxType.circle
            ? "AppCompatRadioButton"
            : "AppCompatCheckBox"](this._context, null);
        if (this.checkPaddingLeft) {
            this._android.setPadding(parseInt(this.checkPaddingLeft), this._android.getPaddingTop(), this._android.getPaddingRight(), this._android.getPaddingBottom());
        }
        if (this.checkPaddingTop) {
            this._android.setPadding(this._android.getPaddingLeft(), parseInt(this.checkPaddingTop), this._android.getPaddingRight(), this._android.getPaddingBottom());
        }
        if (this.checkPaddingRight) {
            this._android.setPadding(this._android.getPaddingLeft(), this._android.getPaddingTop(), parseInt(this.checkPaddingRight), this._android.getPaddingBottom());
        }
        if (this.checkPaddingBottom) {
            this._android.setPadding(this._android.getPaddingLeft(), this._android.getPaddingTop(), this._android.getPaddingRight(), parseInt(this.checkPaddingBottom));
        }
        if (this.checkPadding) {
            var pads = this.checkPadding.toString().split(",");
            switch (pads.length) {
                case 1:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[0]), parseInt(pads[0]), parseInt(pads[0]));
                    break;
                case 2:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[0]), parseInt(pads[1]));
                    break;
                case 3:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[2]), parseInt(pads[1]));
                    break;
                case 4:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[2]), parseInt(pads[3]));
                    break;
            }
        }
        if (this.style.color) {
            this._android.setTextColor(this.style.color.android);
        }
        if (!this.style.fontSize) {
            this.style.fontSize = 15;
        }
        this._android.setTextSize(this.style.fontSize);
        var typeface = this.style.fontInternal.getAndroidTypeface();
        if (typeface) {
            this._android.setTypeface(typeface);
        }
        if (this._checkStyle) {
            var drawable = app.android.context
                .getResources()
                .getIdentifier(this._checkStyle, "drawable", app.android.context.getPackageName());
            this._android.setButtonDrawable(drawable);
        }
        if (this._android) {
            if (this.fillColor) {
                android.support.v4.widget.CompoundButtonCompat.setButtonTintList(this._android, android.content.res.ColorStateList.valueOf(new color_1.Color(this.fillColor).android));
            }
        }
        return this._android;
    };
    CheckBox.prototype.initNativeView = function () {
        var that = new WeakRef(this);
        this.nativeView.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
            get owner() {
                return that.get();
            },
            onCheckedChanged: function (sender, isChecked) {
                if (this.owner) {
                    exports.checkedProperty.nativeValueChange(this.owner, isChecked);
                }
            }
        }));
    };
    CheckBox.prototype.disposeNativeView = function () {
        this.nativeView.setOnCheckedChangeListener(null);
    };
    CheckBox.prototype.toggle = function () {
        this.nativeView.toggle();
    };
    CheckBox.prototype._onCheckedPropertyChanged = function (checkbox, oldValue, newValue) {
        if (!this.nativeView) {
            return;
        }
        exports.checkedProperty.nativeValueChange(this, newValue);
    };
    CheckBox.prototype._onTextPropertyChanged = function (checkbox, oldValue, newValue) {
        if (!this.nativeView) {
            return;
        }
        exports.textProperty.nativeValueChange(this, newValue);
    };
    return CheckBox;
}(view_1.View));
exports.CheckBox = CheckBox;
function onCheckedPropertyChanged(checkbox, oldValue, newValue) {
    checkbox._onCheckedPropertyChanged(checkbox, oldValue, newValue);
}
function onTextPropertyChanged(checkbox, oldValue, newValue) {
    checkbox._onTextPropertyChanged(checkbox, oldValue, newValue);
}
exports.checkedProperty.register(CheckBox);
exports.textProperty.register(CheckBox);
exports.fillColorProperty.register(view_1.Style);
exports.tintColorProperty.register(view_1.Style);
