import { __commonJS } from "./chunk-DbKvDyjX.js";
import { require_dayjs_min } from "./dayjs.min-D5O0C5lT.js";

//#region node_modules/dayjs/locale/ru.js
var require_ru = /* @__PURE__ */ __commonJS({ "node_modules/dayjs/locale/ru.js": ((exports, module) => {
	(function(_, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], t) : (_ = "undefined" != typeof globalThis ? globalThis : _ || self).dayjs_locale_ru = t(_.dayjs);
	})(exports, (function(_) {
		function t(_$1) {
			return _$1 && "object" == typeof _$1 && "default" in _$1 ? _$1 : { default: _$1 };
		}
		var e = t(_), n = "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"), s = "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"), r = "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"), o = "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"), i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
		function d(_$1, t$1, e$1) {
			var n$1, s$1;
			return "m" === e$1 ? t$1 ? "минута" : "минуту" : _$1 + " " + (n$1 = +_$1, s$1 = {
				mm: t$1 ? "минута_минуты_минут" : "минуту_минуты_минут",
				hh: "час_часа_часов",
				dd: "день_дня_дней",
				MM: "месяц_месяца_месяцев",
				yy: "год_года_лет"
			}[e$1].split("_"), n$1 % 10 == 1 && n$1 % 100 != 11 ? s$1[0] : n$1 % 10 >= 2 && n$1 % 10 <= 4 && (n$1 % 100 < 10 || n$1 % 100 >= 20) ? s$1[1] : s$1[2]);
		}
		var u = function(_$1, t$1) {
			return i.test(t$1) ? n[_$1.month()] : s[_$1.month()];
		};
		u.s = s, u.f = n;
		var a = function(_$1, t$1) {
			return i.test(t$1) ? r[_$1.month()] : o[_$1.month()];
		};
		a.s = o, a.f = r;
		var m = {
			name: "ru",
			weekdays: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
			weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
			weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
			months: u,
			monthsShort: a,
			weekStart: 1,
			yearStart: 4,
			formats: {
				LT: "H:mm",
				LTS: "H:mm:ss",
				L: "DD.MM.YYYY",
				LL: "D MMMM YYYY г.",
				LLL: "D MMMM YYYY г., H:mm",
				LLLL: "dddd, D MMMM YYYY г., H:mm"
			},
			relativeTime: {
				future: "через %s",
				past: "%s назад",
				s: "несколько секунд",
				m: d,
				mm: d,
				h: "час",
				hh: d,
				d: "день",
				dd: d,
				M: "месяц",
				MM: d,
				y: "год",
				yy: d
			},
			ordinal: function(_$1) {
				return _$1;
			},
			meridiem: function(_$1) {
				return _$1 < 4 ? "ночи" : _$1 < 12 ? "утра" : _$1 < 17 ? "дня" : "вечера";
			}
		};
		return e.default.locale(m, null, !0), m;
	}));
}) });

//#endregion
export default require_ru();

//# sourceMappingURL=dayjs_locale_ru.js.map