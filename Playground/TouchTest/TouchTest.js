/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.2.0
 */
Bridge.assembly("TouchTest", function ($asm, globals) {
    "use strict";

    Bridge.define("TouchTest.App", {
        main: function Main () {
            window.onload = Bridge.fn.combine(window.onload, TouchTest.App.OnLoad);

            TouchTest.App._canvas = document.createElement("canvas");
            TouchTest.App._canvas.className = "full";

            document.body.appendChild(TouchTest.App._canvas);
        },
        statics: {
            fields: {
                _canvas: null,
                _context: null,
                _history: null
            },
            ctors: {
                init: function () {
                    this._history = new (TouchTest.Set$1(TouchTest.TouchHistory))();
                }
            },
            methods: {
                OnLoad: function (e) {
                    TouchTest.App._context = TouchTest.App._canvas.getContext("2d");
                    TouchTest.App._context.strokeStyle = "#222222";
                    TouchTest.App.AttachTouchEvents(TouchTest.App._canvas);
                },
                AttachTouchEvents: function (canvas) {
                    canvas.ontouchcancel = Bridge.fn.combine(canvas.ontouchcancel, TouchTest.App.OnTouchCancel);
                    canvas.ontouchend = Bridge.fn.combine(canvas.ontouchend, TouchTest.App.OnTouchEnd);
                    canvas.ontouchenter = Bridge.fn.combine(canvas.ontouchenter, TouchTest.App.OnTouchEnter);
                    canvas.ontouchleave = Bridge.fn.combine(canvas.ontouchleave, TouchTest.App.OnTouchLeave);
                    canvas.ontouchmove = Bridge.fn.combine(canvas.ontouchmove, TouchTest.App.OnTouchMove);
                    canvas.ontouchstart = Bridge.fn.combine(canvas.ontouchstart, TouchTest.App.OnTouchStart);
                },
                OnTouchCancel: function (e) {
                    var $t;
                    e.preventDefault();
                    $t = Bridge.getEnumerator(e.changedTouches);
                    try {
                        while ($t.moveNext()) {
                            var t = $t.Current;
                            TouchTest.App._history.Remove(t.identifier);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    TouchTest.App.Redraw();
                },
                OnTouchEnd: function (e) {
                    var $t;
                    e.preventDefault();
                    $t = Bridge.getEnumerator(e.changedTouches);
                    try {
                        while ($t.moveNext()) {
                            var t = $t.Current;
                            TouchTest.App._history.Remove(t.identifier);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    TouchTest.App.Redraw();
                },
                OnTouchEnter: function (e) {
                    e.preventDefault();
                },
                OnTouchLeave: function (e) {
                    e.preventDefault();
                },
                OnTouchMove: function (e) {
                    var $t;
                    e.preventDefault();
                    $t = Bridge.getEnumerator(e.changedTouches);
                    try {
                        while ($t.moveNext()) {
                            var t = $t.Current;
                            var th = TouchTest.App._history.Find(t.identifier);
                            if (th != null) {
                                th.AddEvent(t);
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    TouchTest.App.Redraw();
                },
                OnTouchStart: function (e) {
                    var $t, $t1;
                    e.preventDefault();
                    $t = Bridge.getEnumerator(e.changedTouches);
                    try {
                        while ($t.moveNext()) {
                            var t = $t.Current;
                            var th = ($t1 = new TouchTest.TouchHistory(), $t1.Id = t.identifier, $t1);
                            th.AddEvent(t);
                            TouchTest.App._history.Add(th);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    TouchTest.App.Redraw();
                },
                Redraw: function () {
                    var $t;
                    TouchTest.App._context.clearRect(0, 0, TouchTest.App._canvas.width, TouchTest.App._canvas.height);
                    $t = Bridge.getEnumerator(TouchTest.App._history);
                    try {
                        while ($t.moveNext()) {
                            var h = $t.Current;
                            h.Draw(TouchTest.App._context);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }}
            }
        }
    });

    Bridge.define("TouchTest.Item", {
        props: {
            Id: 0,
            Dead: false
        }
    });

    Bridge.define("TouchTest.TouchHistory.Point", {
        props: {
            Time: null,
            ClientX: 0,
            ClientY: 0,
            PageX: 0,
            PageY: 0,
            ScreenX: 0,
            ScreenY: 0,
            RadiusX: 0,
            RadiusY: 0,
            Force: 0,
            RotationAngle: 0
        },
        ctors: {
            init: function () {
                this.Time = System.DateTime.getDefaultValue();
            },
            ctor: function (time, t) {
                this.$initialize();
                this.Time = time;
                this.ClientX = t.clientX;
                this.ClientY = t.clientY;
                this.PageX = t.pageX;
                this.PageY = t.pageY;
                this.ScreenX = t.screenX;
                this.ScreenY = t.screenY;
                this.RadiusX = t.radiusX;
                this.RadiusY = t.radiusY;
                this.Force = t.force;
                this.RotationAngle = t.rotationAngle;
            }
        }
    });

    Bridge.define("TouchTest.Set$1", function (T) { return {
        inherits: [System.Collections.Generic.IEnumerable$1(T)],
        fields: {
            _items: null
        },
        alias: ["getEnumerator", ["System$Collections$Generic$IEnumerable$1$" + Bridge.getTypeAlias(T) + "$getEnumerator", "System$Collections$Generic$IEnumerable$1$getEnumerator"]],
        ctors: {
            init: function () {
                this._items = new (System.Collections.Generic.List$1(T))();
            }
        },
        methods: {
            getEnumerator: function () {
                return this._items.getEnumerator();
            },
            System$Collections$IEnumerable$getEnumerator: function () {
                return Bridge.getEnumerator(Bridge.cast((this), System.Collections.Generic.IEnumerable$1(T)), T);
            },
            Remove: function (i) {
                var t = this.Find(i);
                if (t != null) {
                    this._items.remove(t);
                }
            },
            Find: function (i) {
                return System.Linq.Enumerable.from(this._items).firstOrDefault(function (x) {
                        return x.Id === i;
                    }, Bridge.getDefaultValue(T));
            },
            Add: function (t) {
                if (this.Has(t.Id)) {
                    return;
                }
                this._items.add(t);
            },
            Has: function (i) {
                return this.Find(i) != null;
            }
        }
    }; });

    Bridge.define("TouchTest.TouchHistory", {
        inherits: [TouchTest.Item],
        fields: {
            _events: null
        },
        ctors: {
            init: function () {
                this._events = new (System.Collections.Generic.List$1(TouchTest.TouchHistory.Point))();
            }
        },
        methods: {
            AddEvent: function (t) {
                var now = System.DateTime.getNow();
                this._events.add(new TouchTest.TouchHistory.Point(now, t));
            },
            Draw: function (context) {
                var $t;
                if (this._events.Count > 1) {
                    context.beginPath();
                    var first = true;
                    $t = Bridge.getEnumerator(this._events);
                    try {
                        while ($t.moveNext()) {
                            var b = $t.Current;
                            if (first) {
                                context.moveTo(b.ClientX, b.ClientY);
                                first = false;
                            } else {
                                context.lineTo(b.ClientX, b.ClientY);
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }context.stroke();
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUb3VjaFRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlRvdWNoSGlzdG9yeS5jcyIsIlNldC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUEsaURBQWlCQTs7WUFFakJBLHdCQUFVQTtZQUNWQTs7WUFFQUEsMEJBQTBCQTs7Ozs7Ozs7OztvQ0FUTUEsS0FBSUE7Ozs7a0NBWXJCQTtvQkFFZkEseUJBQVdBO29CQUNYQTtvQkFDQUEsZ0NBQWtCQTs7NkNBR1FBO29CQUUxQkEsK0RBQXdCQTtvQkFDeEJBLHlEQUFxQkE7b0JBQ3JCQSw2REFBdUJBO29CQUN2QkEsNkRBQXVCQTtvQkFDdkJBLDJEQUFzQkE7b0JBQ3RCQSw2REFBdUJBOzt5Q0FHREE7O29CQUV0QkE7b0JBQ0FBLEtBQWtCQTs7Ozs0QkFDZEEsOEJBQWdCQTs7Ozs7OztvQkFFcEJBOztzQ0FFbUJBOztvQkFFbkJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBQ2RBLDhCQUFnQkE7Ozs7Ozs7b0JBRXBCQTs7d0NBRXFCQTtvQkFFckJBOzt3Q0FFcUJBO29CQUVyQkE7O3VDQUVvQkE7O29CQUVwQkE7b0JBQ0FBLEtBQWtCQTs7Ozs0QkFFZEEsU0FBU0EsNEJBQWNBOzRCQUN2QkEsSUFBSUEsTUFBTUE7Z0NBQ05BLFlBQVlBOzs7Ozs7OztvQkFHcEJBOzt3Q0FHcUJBOztvQkFFckJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBRWRBLFNBQVNBLFdBQUlBLG1DQUFzQkE7NEJBQ25DQSxZQUFZQTs0QkFDWkEsMkJBQWFBOzs7Ozs7O29CQUdqQkE7Ozs7b0JBS0FBLHVDQUF5QkEsNkJBQWVBO29CQUN4Q0EsMEJBQWtCQTs7Ozs0QkFDZEEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNoRUVBLE1BQWVBOztnQkFFeEJBLFlBQU9BO2dCQUNQQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGFBQVFBO2dCQUNSQSxhQUFRQTtnQkFDUkEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGFBQVFBO2dCQUNSQSxxQkFBZ0JBOzs7Ozs7Ozs7Ozs7OzhCQ2hDUEEsS0FBSUE7Ozs7O2dCQUlqQkEsT0FBT0E7OztnQkFLUEEsT0FBT0EscUJBQUNBLFlBQWdCQSxDQUFDQTs7OEJBR1ZBO2dCQUVmQSxRQUFRQSxVQUFLQTtnQkFDYkEsSUFBSUEsS0FBS0E7b0JBQ0xBLG1CQUFjQTs7OzRCQUdSQTtnQkFFVkEsT0FBT0EsNEJBQXlDQSw0QkFBT0EsQUFBK0JBOytCQUFLQSxTQUFRQTs7OzJCQUd2RkE7Z0JBRVpBLElBQUlBLFNBQUlBO29CQUNKQTs7Z0JBQ0pBLGdCQUFXQTs7MkJBR0NBO2dCQUVaQSxPQUFPQSxVQUFLQSxNQUFNQTs7Ozs7Ozs7Ozs7OytCRGxDQUEsS0FBSUE7Ozs7Z0NBQ0xBO2dCQUVqQkEsVUFBVUE7Z0JBQ1ZBLGlCQUFZQSxJQUFJQSw2QkFBTUEsS0FBS0E7OzRCQWlDZEE7O2dCQUViQSxJQUFJQTtvQkFFQUE7b0JBQ0FBO29CQUNBQSwwQkFBa0JBOzs7OzRCQUVkQSxJQUFJQTtnQ0FFQUEsZUFBZUEsV0FBV0E7Z0NBQzFCQTs7Z0NBSUFBLGVBQWVBLFdBQVdBOzs7Ozs7O3FCQUdsQ0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcblxyXG5uYW1lc3BhY2UgVG91Y2hUZXN0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgSFRNTENhbnZhc0VsZW1lbnQgX2NhbnZhczsgXHJcbiAgICAgICAgc3RhdGljIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCBfY29udGV4dDtcclxuICAgICAgICBzdGF0aWMgU2V0PFRvdWNoSGlzdG9yeT4gX2hpc3RvcnkgPSBuZXcgU2V0PFRvdWNoSGlzdG9yeT4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2luZG93Lk9uTG9hZCArPSBPbkxvYWQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfY2FudmFzID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQ2FudmFzRWxlbWVudD4oXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIF9jYW52YXMuQ2xhc3NOYW1lID0gXCJmdWxsXCI7XHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKF9jYW52YXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Mb2FkKEV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udGV4dCA9IF9jYW52YXMuR2V0Q29udGV4dChcIjJkXCIpLkFzPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD4oKTtcclxuICAgICAgICAgICAgX2NvbnRleHQuU3Ryb2tlU3R5bGUgPSBcIiMyMjIyMjJcIjtcclxuICAgICAgICAgICAgQXR0YWNoVG91Y2hFdmVudHMoX2NhbnZhcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBBdHRhY2hUb3VjaEV2ZW50cyhIVE1MQ2FudmFzRWxlbWVudCBjYW52YXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaENhbmNlbCArPSBPblRvdWNoQ2FuY2VsO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaEVuZCArPSBPblRvdWNoRW5kO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaEVudGVyICs9IE9uVG91Y2hFbnRlcjtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hMZWF2ZSArPSBPblRvdWNoTGVhdmU7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoTW92ZSArPSBPblRvdWNoTW92ZTtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hTdGFydCArPSBPblRvdWNoU3RhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoQ2FuY2VsKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIGUuQ2hhbmdlZFRvdWNoZXMpXHJcbiAgICAgICAgICAgICAgICBfaGlzdG9yeS5SZW1vdmUodC5JZGVudGlmaWVyKTtcclxuXHJcbiAgICAgICAgICAgIFJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoRW5kKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIGUuQ2hhbmdlZFRvdWNoZXMpXHJcbiAgICAgICAgICAgICAgICBfaGlzdG9yeS5SZW1vdmUodC5JZGVudGlmaWVyKTtcclxuXHJcbiAgICAgICAgICAgIFJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoRW50ZXIoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaExlYXZlKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hNb3ZlKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIGUuQ2hhbmdlZFRvdWNoZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aCA9IF9oaXN0b3J5LkZpbmQodC5JZGVudGlmaWVyKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoLkFkZEV2ZW50KHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTsgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hTdGFydChUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGggPSBuZXcgVG91Y2hIaXN0b3J5KCkgeyBJZCA9IHQuSWRlbnRpZmllciB9O1xyXG4gICAgICAgICAgICAgICAgdGguQWRkRXZlbnQodCk7XHJcbiAgICAgICAgICAgICAgICBfaGlzdG9yeS5BZGQodGgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIFJlZHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udGV4dC5DbGVhclJlY3QoMCwgMCwgX2NhbnZhcy5XaWR0aCwgX2NhbnZhcy5IZWlnaHQpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaCBpbiBfaGlzdG9yeSlcclxuICAgICAgICAgICAgICAgIGguRHJhdyhfY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgVG91Y2hUZXN0XHJcbntcclxuICAgIGNsYXNzIFRvdWNoSGlzdG9yeSA6IEl0ZW1cclxuICAgIHtcclxuICAgICAgICBMaXN0PFBvaW50PiBfZXZlbnRzID0gbmV3IExpc3Q8UG9pbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkRXZlbnQoVG91Y2ggdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub3cgPSBEYXRlVGltZS5Ob3c7XHJcbiAgICAgICAgICAgIF9ldmVudHMuQWRkKG5ldyBQb2ludChub3csIHQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBQb2ludFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIERhdGVUaW1lIFRpbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgQ2xpZW50WCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBDbGllbnRZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFBhZ2VYIHtnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUGFnZVkgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU2NyZWVuWCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBTY3JlZW5ZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFJhZGl1c1ggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUmFkaXVzWSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGRvdWJsZSBGb3JjZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBSb3RhdGlvbkFuZ2xlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIFBvaW50KERhdGVUaW1lIHRpbWUsIFRvdWNoIHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgQ2xpZW50WCA9IHQuQ2xpZW50WDtcclxuICAgICAgICAgICAgICAgIENsaWVudFkgPSB0LkNsaWVudFk7XHJcbiAgICAgICAgICAgICAgICBQYWdlWCA9IHQuUGFnZVg7XHJcbiAgICAgICAgICAgICAgICBQYWdlWSA9IHQuUGFnZVk7XHJcbiAgICAgICAgICAgICAgICBTY3JlZW5YID0gdC5TY3JlZW5YO1xyXG4gICAgICAgICAgICAgICAgU2NyZWVuWSA9IHQuU2NyZWVuWTtcclxuICAgICAgICAgICAgICAgIFJhZGl1c1ggPSB0LlJhZGl1c1g7XHJcbiAgICAgICAgICAgICAgICBSYWRpdXNZID0gdC5SYWRpdXNZO1xyXG4gICAgICAgICAgICAgICAgRm9yY2UgPSB0LkZvcmNlO1xyXG4gICAgICAgICAgICAgICAgUm90YXRpb25BbmdsZSA9IHQuUm90YXRpb25BbmdsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgY29udGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfZXZlbnRzLkNvdW50ID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5CZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYiBpbiBfZXZlbnRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTW92ZVRvKGIuQ2xpZW50WCwgYi5DbGllbnRZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MaW5lVG8oYi5DbGllbnRYLCBiLkNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgVG91Y2hUZXN0XHJcbntcclxuICAgIGNsYXNzIFNldDxUPiA6SUVudW1lcmFibGU8VD5cclxuICAgICAgICB3aGVyZSBUOiBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxUPiBfaXRlbXMgPSBuZXcgTGlzdDxUPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgSUVudW1lcmF0b3I8VD4gR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2l0ZW1zLkdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIElFbnVtZXJhdG9yIElFbnVtZXJhYmxlLkdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoSUVudW1lcmFibGU8VD4pKHRoaXMpKS5HZXRFbnVtZXJhdG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmUoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdCA9IEZpbmQoaSk7XHJcbiAgICAgICAgICAgIGlmICh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBfaXRlbXMuUmVtb3ZlKHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFQgRmluZChpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PFQ+KF9pdGVtcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxULCBib29sPikoeCA9PiB4LklkID09IGkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChUIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoSGFzKHQuSWQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBfaXRlbXMuQWRkKHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSGFzKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEZpbmQoaSkgIT0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
