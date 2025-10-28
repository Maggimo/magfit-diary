import { __commonJS } from "./chunk-DbKvDyjX.js";

//#region node_modules/dayjs/plugin/isoWeek.js
var require_isoWeek = /* @__PURE__ */ __commonJS({ "node_modules/dayjs/plugin/isoWeek.js": ((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isoWeek = t();
	})(exports, (function() {
		var e = "day";
		return function(t, i, s) {
			var a = function(t$1) {
				return t$1.add(4 - t$1.isoWeekday(), e);
			}, d = i.prototype;
			d.isoWeekYear = function() {
				return a(this).year();
			}, d.isoWeek = function(t$1) {
				if (!this.$utils().u(t$1)) return this.add(7 * (t$1 - this.isoWeek()), e);
				var i$1, d$1, n$1, o, r = a(this), u = (i$1 = this.isoWeekYear(), d$1 = this.$u, n$1 = (d$1 ? s.utc : s)().year(i$1).startOf("year"), o = 4 - n$1.isoWeekday(), n$1.isoWeekday() > 4 && (o += 7), n$1.add(o, e));
				return r.diff(u, "week") + 1;
			}, d.isoWeekday = function(e$1) {
				return this.$utils().u(e$1) ? this.day() || 7 : this.day(this.day() % 7 ? e$1 : e$1 - 7);
			};
			var n = d.startOf;
			d.startOf = function(e$1, t$1) {
				var i$1 = this.$utils(), s$1 = !!i$1.u(t$1) || t$1;
				return "isoweek" === i$1.p(e$1) ? s$1 ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : n.bind(this)(e$1, t$1);
			};
		};
	}));
}) });

//#endregion
export default require_isoWeek();

//# sourceMappingURL=dayjs_plugin_isoWeek.js.map