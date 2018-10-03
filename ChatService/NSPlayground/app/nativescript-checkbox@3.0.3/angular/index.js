"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var element_registry_1 = require("nativescript-angular/element-registry");
var base_value_accessor_1 = require("nativescript-angular/forms/value-accessors/base-value-accessor");
var lang_facade_1 = require("nativescript-angular/lang-facade");
function convertToInt(value) {
    var normalizedValue;
    if (lang_facade_1.isBlank(value)) {
        normalizedValue = 0;
    }
    else {
        if (typeof value === "number") {
            normalizedValue = value;
        }
        else {
            var parsedValue = parseInt(value.toString(), 10);
            normalizedValue = isNaN(parsedValue) ? 0 : parsedValue;
        }
    }
    return Math.round(normalizedValue);
}
element_registry_1.registerElement("CheckBox", function () { return require("../checkbox").CheckBox; });
var CHECKED_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CheckedValueAccessor; }),
    multi: true
};
var CheckedValueAccessor = (function (_super) {
    __extends(CheckedValueAccessor, _super);
    function CheckedValueAccessor(elementRef) {
        var _this = _super.call(this, elementRef.nativeElement) || this;
        _this.onTouched = function () { };
        return _this;
    }
    CheckedValueAccessor.prototype.checkedChangeListener = function (event) {
        this.onChange(event.value);
    };
    CheckedValueAccessor.prototype.writeValue = function (value) {
        this.view.checked = value;
    };
    CheckedValueAccessor.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return CheckedValueAccessor;
}(base_value_accessor_1.BaseValueAccessor));
__decorate([
    core_1.HostListener("checkedChange", ["$event"])
], CheckedValueAccessor.prototype, "checkedChangeListener", null);
CheckedValueAccessor = __decorate([
    core_1.Directive({
        selector: "CheckBox[ngModel], CheckBox[formControlName], CheckBox[formControl], checkBox[ngModel], checkBox[formControlName], checkBox[formControl], check-box[ngModel], check-box[formControlName], check-box[formControl]",
        providers: [CHECKED_VALUE_ACCESSOR]
    }),
    __param(0, core_1.Inject(core_1.ElementRef))
], CheckedValueAccessor);
exports.CheckedValueAccessor = CheckedValueAccessor;
var TNSCheckBoxModule = (function () {
    function TNSCheckBoxModule() {
    }
    return TNSCheckBoxModule;
}());
TNSCheckBoxModule = __decorate([
    core_1.NgModule({
        declarations: [CheckedValueAccessor],
        providers: [],
        imports: [forms_1.FormsModule],
        exports: [forms_1.FormsModule, CheckedValueAccessor]
    })
], TNSCheckBoxModule);
exports.TNSCheckBoxModule = TNSCheckBoxModule;
