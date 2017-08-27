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
            window.onresize = Bridge.fn.combine(window.onresize, TouchTest.App.OnResize);
            window.ondeviceorientation = Bridge.fn.combine(window.ondeviceorientation, TouchTest.App.OnDeviceOrientation);

            TouchTest.App._canvas = document.createElement("canvas");

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
                OnDeviceOrientation: function (e) {
                    TouchTest.App.GoFull();
                },
                OnResize: function (e) {
                    TouchTest.App.GoFull();
                },
                GoFull: function () {
                    TouchTest.App._canvas.width = window.innerWidth;
                    TouchTest.App._canvas.height = window.innerHeight;
                    TouchTest.App.Redraw();
                },
                OnLoad: function (e) {
                    var el = TouchTest.App._canvas;
                    if (el.webkitRequestFullScreen) {
                        el.webkitRequestFullScreen();
                    } else {
                        el.mozRequestFullScreen();
                    }

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
                    }

                }
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
                var $t, $t1, $t2;
                if (this._events.Count > 1) {
                    context.strokeStyle = "#FF0000";
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

                    context.strokeStyle = "#00FF00";
                    context.beginPath();
                    first = true;
                    $t1 = Bridge.getEnumerator(this._events);
                    try {
                        while ($t1.moveNext()) {
                            var b1 = $t1.Current;
                            if (first) {
                                context.moveTo(b1.PageX, b1.PageY);
                                first = false;
                            } else {
                                context.lineTo(b1.PageX, b1.PageY);
                            }
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$dispose();
                        }
                    }context.stroke();

                    context.strokeStyle = "#0000FF";
                    context.beginPath();
                    first = true;
                    $t2 = Bridge.getEnumerator(this._events);
                    try {
                        while ($t2.moveNext()) {
                            var b2 = $t2.Current;
                            if (first) {
                                context.moveTo(b2.ScreenX, b2.ScreenY);
                                first = false;
                            } else {
                                context.lineTo(b2.ScreenX, b2.ScreenY);
                            }
                        }
                    } finally {
                        if (Bridge.is($t2, System.IDisposable)) {
                            $t2.System$IDisposable$dispose();
                        }
                    }context.stroke();
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUb3VjaFRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlRvdWNoSGlzdG9yeS5jcyIsIlNldC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUEsaURBQWlCQTtZQUNqQkEscURBQW1CQTtZQUNuQkEsMkVBQThCQTs7WUFFOUJBLHdCQUFVQTs7WUFFVkEsMEJBQTBCQTs7Ozs7Ozs7OztvQ0FWTUEsS0FBSUE7Ozs7K0NBYVJBO29CQUU1QkE7O29DQUdpQkE7b0JBRWpCQTs7O29CQUtBQSw4QkFBZ0JBO29CQUNoQkEsK0JBQWlCQTtvQkFDakJBOztrQ0FHZUE7b0JBRWZBLFNBQVNBO29CQUNUQSxJQUFJQTt3QkFDQUE7O3dCQUVBQTs7O29CQUVKQSx5QkFBV0E7b0JBQ1hBO29CQUNBQSxnQ0FBa0JBOzs2Q0FHUUE7b0JBRTFCQSwrREFBd0JBO29CQUN4QkEseURBQXFCQTtvQkFDckJBLDZEQUF1QkE7b0JBQ3ZCQSw2REFBdUJBO29CQUN2QkEsMkRBQXNCQTtvQkFDdEJBLDZEQUF1QkE7O3lDQUdEQTs7b0JBRXRCQTtvQkFDQUEsS0FBa0JBOzs7OzRCQUNkQSw4QkFBZ0JBOzs7Ozs7O29CQUVwQkE7O3NDQUVtQkE7O29CQUVuQkE7b0JBQ0FBLEtBQWtCQTs7Ozs0QkFDZEEsOEJBQWdCQTs7Ozs7OztvQkFFcEJBOzt3Q0FFcUJBO29CQUVyQkE7O3dDQUVxQkE7b0JBRXJCQTs7dUNBRW9CQTs7b0JBRXBCQTtvQkFDQUEsS0FBa0JBOzs7OzRCQUVkQSxTQUFTQSw0QkFBY0E7NEJBQ3ZCQSxJQUFJQSxNQUFNQTtnQ0FDTkEsWUFBWUE7Ozs7Ozs7O29CQUdwQkE7O3dDQUdxQkE7O29CQUVyQkE7b0JBQ0FBLEtBQWtCQTs7Ozs0QkFFZEEsU0FBU0EsV0FBSUEsbUNBQXNCQTs0QkFDbkNBLFlBQVlBOzRCQUNaQSwyQkFBYUE7Ozs7Ozs7b0JBR2pCQTs7OztvQkFLQUEsdUNBQXlCQSw2QkFBZUE7b0JBQ3hDQSwwQkFBa0JBOzs7OzRCQUNkQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDeEZFQSxNQUFlQTs7Z0JBRXhCQSxZQUFPQTtnQkFDUEEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxhQUFRQTtnQkFDUkEsYUFBUUE7Z0JBQ1JBLGVBQVVBO2dCQUNWQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxhQUFRQTtnQkFDUkEscUJBQWdCQTs7Ozs7Ozs7Ozs7Ozs4QkNoQ1BBLEtBQUlBOzs7OztnQkFJakJBLE9BQU9BOzs7Z0JBS1BBLE9BQU9BLHFCQUFDQSxZQUFnQkEsQ0FBQ0E7OzhCQUdWQTtnQkFFZkEsUUFBUUEsVUFBS0E7Z0JBQ2JBLElBQUlBLEtBQUtBO29CQUNMQSxtQkFBY0E7Ozs0QkFHUkE7Z0JBRVZBLE9BQU9BLDRCQUF5Q0EsNEJBQU9BLEFBQStCQTsrQkFBS0EsU0FBUUE7OzsyQkFHdkZBO2dCQUVaQSxJQUFJQSxTQUFJQTtvQkFDSkE7O2dCQUNKQSxnQkFBV0E7OzJCQUdDQTtnQkFFWkEsT0FBT0EsVUFBS0EsTUFBTUE7Ozs7Ozs7Ozs7OzsrQkRsQ0FBLEtBQUlBOzs7O2dDQUNMQTtnQkFFakJBLFVBQVVBO2dCQUNWQSxpQkFBWUEsSUFBSUEsNkJBQU1BLEtBQUtBOzs0QkFpQ2RBOztnQkFFYkEsSUFBSUE7b0JBRUFBO29CQUNBQTtvQkFDQUE7b0JBQ0FBLDBCQUFrQkE7Ozs7NEJBRWRBLElBQUlBO2dDQUVBQSxlQUFlQSxXQUFXQTtnQ0FDMUJBOztnQ0FJQUEsZUFBZUEsV0FBV0E7Ozs7Ozs7cUJBR2xDQTs7b0JBRUFBO29CQUNBQTtvQkFDQUE7b0JBQ0FBLDJCQUFrQkE7Ozs7NEJBRWRBLElBQUlBO2dDQUVBQSxlQUFlQSxVQUFTQTtnQ0FDeEJBOztnQ0FJQUEsZUFBZUEsVUFBU0E7Ozs7Ozs7cUJBR2hDQTs7b0JBRUFBO29CQUNBQTtvQkFDQUE7b0JBQ0FBLDJCQUFrQkE7Ozs7NEJBRWRBLElBQUlBO2dDQUVBQSxlQUFlQSxZQUFXQTtnQ0FDMUJBOztnQ0FJQUEsZUFBZUEsWUFBV0E7Ozs7Ozs7cUJBR2xDQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxuXHJcbm5hbWVzcGFjZSBUb3VjaFRlc3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBIVE1MQ2FudmFzRWxlbWVudCBfY2FudmFzOyBcclxuICAgICAgICBzdGF0aWMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIF9jb250ZXh0O1xyXG4gICAgICAgIHN0YXRpYyBTZXQ8VG91Y2hIaXN0b3J5PiBfaGlzdG9yeSA9IG5ldyBTZXQ8VG91Y2hIaXN0b3J5PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBXaW5kb3cuT25Mb2FkICs9IE9uTG9hZDtcclxuICAgICAgICAgICAgV2luZG93Lk9uUmVzaXplICs9IE9uUmVzaXplO1xyXG4gICAgICAgICAgICBXaW5kb3cuT25EZXZpY2VPcmllbnRhdGlvbiArPSBPbkRldmljZU9yaWVudGF0aW9uO1xyXG5cclxuICAgICAgICAgICAgX2NhbnZhcyA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTENhbnZhc0VsZW1lbnQ+KFwiY2FudmFzXCIpO1xyXG5cclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChfY2FudmFzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uRGV2aWNlT3JpZW50YXRpb24oRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdvRnVsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25SZXNpemUoRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdvRnVsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgR29GdWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jYW52YXMuV2lkdGggPSBXaW5kb3cuSW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgX2NhbnZhcy5IZWlnaHQgPSBXaW5kb3cuSW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgICAgIFJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Mb2FkKEV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSBfY2FudmFzLlRvRHluYW1pYygpO1xyXG4gICAgICAgICAgICBpZiAoZWwud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4pXHJcbiAgICAgICAgICAgICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG5cclxuICAgICAgICAgICAgX2NvbnRleHQgPSBfY2FudmFzLkdldENvbnRleHQoXCIyZFwiKS5BczxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+KCk7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LlN0cm9rZVN0eWxlID0gXCIjMjIyMjIyXCI7XHJcbiAgICAgICAgICAgIEF0dGFjaFRvdWNoRXZlbnRzKF9jYW52YXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgQXR0YWNoVG91Y2hFdmVudHMoSFRNTENhbnZhc0VsZW1lbnQgY2FudmFzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hDYW5jZWwgKz0gT25Ub3VjaENhbmNlbDtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hFbmQgKz0gT25Ub3VjaEVuZDtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hFbnRlciArPSBPblRvdWNoRW50ZXI7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoTGVhdmUgKz0gT25Ub3VjaExlYXZlO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaE1vdmUgKz0gT25Ub3VjaE1vdmU7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoU3RhcnQgKz0gT25Ub3VjaFN0YXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaENhbmNlbChUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICAgICAgX2hpc3RvcnkuUmVtb3ZlKHQuSWRlbnRpZmllcik7XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaEVuZChUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICAgICAgX2hpc3RvcnkuUmVtb3ZlKHQuSWRlbnRpZmllcik7XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaEVudGVyKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hMZWF2ZShUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoTW92ZShUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGggPSBfaGlzdG9yeS5GaW5kKHQuSWRlbnRpZmllcik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGggIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aC5BZGRFdmVudCh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7ICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoU3RhcnQoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gZS5DaGFuZ2VkVG91Y2hlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoID0gbmV3IFRvdWNoSGlzdG9yeSgpIHsgSWQgPSB0LklkZW50aWZpZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoLkFkZEV2ZW50KHQpO1xyXG4gICAgICAgICAgICAgICAgX2hpc3RvcnkuQWRkKHRoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBSZWRyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRleHQuQ2xlYXJSZWN0KDAsIDAsIF9jYW52YXMuV2lkdGgsIF9jYW52YXMuSGVpZ2h0KTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGggaW4gX2hpc3RvcnkpXHJcbiAgICAgICAgICAgICAgICBoLkRyYXcoX2NvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgVG91Y2hUZXN0XHJcbntcclxuICAgIGNsYXNzIFRvdWNoSGlzdG9yeSA6IEl0ZW1cclxuICAgIHtcclxuICAgICAgICBMaXN0PFBvaW50PiBfZXZlbnRzID0gbmV3IExpc3Q8UG9pbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkRXZlbnQoVG91Y2ggdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub3cgPSBEYXRlVGltZS5Ob3c7XHJcbiAgICAgICAgICAgIF9ldmVudHMuQWRkKG5ldyBQb2ludChub3csIHQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBQb2ludFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIERhdGVUaW1lIFRpbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgQ2xpZW50WCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBDbGllbnRZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFBhZ2VYIHtnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUGFnZVkgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU2NyZWVuWCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBTY3JlZW5ZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFJhZGl1c1ggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUmFkaXVzWSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGRvdWJsZSBGb3JjZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBSb3RhdGlvbkFuZ2xlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIFBvaW50KERhdGVUaW1lIHRpbWUsIFRvdWNoIHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgQ2xpZW50WCA9IHQuQ2xpZW50WDtcclxuICAgICAgICAgICAgICAgIENsaWVudFkgPSB0LkNsaWVudFk7XHJcbiAgICAgICAgICAgICAgICBQYWdlWCA9IHQuUGFnZVg7XHJcbiAgICAgICAgICAgICAgICBQYWdlWSA9IHQuUGFnZVk7XHJcbiAgICAgICAgICAgICAgICBTY3JlZW5YID0gdC5TY3JlZW5YO1xyXG4gICAgICAgICAgICAgICAgU2NyZWVuWSA9IHQuU2NyZWVuWTtcclxuICAgICAgICAgICAgICAgIFJhZGl1c1ggPSB0LlJhZGl1c1g7XHJcbiAgICAgICAgICAgICAgICBSYWRpdXNZID0gdC5SYWRpdXNZO1xyXG4gICAgICAgICAgICAgICAgRm9yY2UgPSB0LkZvcmNlO1xyXG4gICAgICAgICAgICAgICAgUm90YXRpb25BbmdsZSA9IHQuUm90YXRpb25BbmdsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgY29udGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfZXZlbnRzLkNvdW50ID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJva2VTdHlsZSA9IFwiI0ZGMDAwMFwiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5CZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYiBpbiBfZXZlbnRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTW92ZVRvKGIuQ2xpZW50WCwgYi5DbGllbnRZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MaW5lVG8oYi5DbGllbnRYLCBiLkNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3Ryb2tlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJva2VTdHlsZSA9IFwiIzAwRkYwMFwiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5CZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBiIGluIF9ldmVudHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Nb3ZlVG8oYi5QYWdlWCwgYi5QYWdlWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGluZVRvKGIuUGFnZVgsIGIuUGFnZVkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3Ryb2tlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJva2VTdHlsZSA9IFwiIzAwMDBGRlwiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5CZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBiIGluIF9ldmVudHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Nb3ZlVG8oYi5TY3JlZW5YLCBiLlNjcmVlblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LkxpbmVUbyhiLlNjcmVlblgsIGIuU2NyZWVuWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBUb3VjaFRlc3Rcclxue1xyXG4gICAgY2xhc3MgU2V0PFQ+IDpJRW51bWVyYWJsZTxUPlxyXG4gICAgICAgIHdoZXJlIFQ6IEl0ZW1cclxuICAgIHtcclxuICAgICAgICBMaXN0PFQ+IF9pdGVtcyA9IG5ldyBMaXN0PFQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYXRvcjxUPiBHZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfaXRlbXMuR2V0RW51bWVyYXRvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSUVudW1lcmF0b3IgSUVudW1lcmFibGUuR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKChJRW51bWVyYWJsZTxUPikodGhpcykpLkdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbW92ZShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gRmluZChpKTtcclxuICAgICAgICAgICAgaWYgKHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIF9pdGVtcy5SZW1vdmUodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBGaW5kKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8VD4oX2l0ZW1zLChnbG9iYWw6OlN5c3RlbS5GdW5jPFQsIGJvb2w+KSh4ID0+IHguSWQgPT0gaSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKFQgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChIYXModC5JZCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIF9pdGVtcy5BZGQodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBIYXMoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRmluZChpKSAhPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
