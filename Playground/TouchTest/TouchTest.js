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
                    System.Console.WriteLine("cancel");
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
                    context.moveTo(this._events.getItem(0).ClientX, this._events.getItem(0).ClientY);
                    $t = Bridge.getEnumerator(System.Linq.Enumerable.from(this._events).skip(1));
                    try {
                        while ($t.moveNext()) {
                            var e = $t.Current;
                            context.lineTo(e.ClientX, e.ClientY);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUb3VjaFRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlRvdWNoSGlzdG9yeS5jcyIsIlNldC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUEsaURBQWlCQTs7WUFFakJBLHdCQUFVQTtZQUNWQTs7WUFFQUEsMEJBQTBCQTs7Ozs7Ozs7OztvQ0FUTUEsS0FBSUE7Ozs7a0NBWXJCQTtvQkFFZkEseUJBQVdBO29CQUNYQTtvQkFDQUEsZ0NBQWtCQTs7NkNBR1FBO29CQUUxQkEsK0RBQXdCQTtvQkFDeEJBLHlEQUFxQkE7b0JBQ3JCQSw2REFBdUJBO29CQUN2QkEsNkRBQXVCQTtvQkFDdkJBLDJEQUFzQkE7b0JBQ3RCQSw2REFBdUJBOzt5Q0FHREE7O29CQUV0QkE7b0JBQ0FBO29CQUNBQSxLQUFrQkE7Ozs7NEJBQ2RBLDhCQUFnQkE7Ozs7Ozs7b0JBRXBCQTs7c0NBRW1CQTs7b0JBRW5CQTtvQkFDQUEsS0FBa0JBOzs7OzRCQUNkQSw4QkFBZ0JBOzs7Ozs7O29CQUVwQkE7O3dDQUVxQkE7b0JBRXJCQTs7d0NBRXFCQTtvQkFFckJBOzt1Q0FFb0JBOztvQkFFcEJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBRWRBLFNBQVNBLDRCQUFjQTs0QkFDdkJBLElBQUlBLE1BQU1BO2dDQUNOQSxZQUFZQTs7Ozs7Ozs7b0JBR3BCQTs7d0NBR3FCQTs7b0JBRXJCQTtvQkFDQUEsS0FBa0JBOzs7OzRCQUVkQSxTQUFTQSxXQUFJQSxtQ0FBc0JBOzRCQUNuQ0EsWUFBWUE7NEJBQ1pBLDJCQUFhQTs7Ozs7OztvQkFHakJBOzs7O29CQUtBQSx1Q0FBeUJBLDZCQUFlQTtvQkFDeENBLDBCQUFrQkE7Ozs7NEJBQ2RBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDakVFQSxNQUFlQTs7Z0JBRXhCQSxZQUFPQTtnQkFDUEEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxhQUFRQTtnQkFDUkEsYUFBUUE7Z0JBQ1JBLGVBQVVBO2dCQUNWQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxhQUFRQTtnQkFDUkEscUJBQWdCQTs7Ozs7Ozs7Ozs7Ozs4QkNoQ1BBLEtBQUlBOzs7OztnQkFJakJBLE9BQU9BOzs7Z0JBS1BBLE9BQU9BLHFCQUFDQSxZQUFnQkEsQ0FBQ0E7OzhCQUdWQTtnQkFFZkEsUUFBUUEsVUFBS0E7Z0JBQ2JBLElBQUlBLEtBQUtBO29CQUNMQSxtQkFBY0E7Ozs0QkFHUkE7Z0JBRVZBLE9BQU9BLDRCQUF5Q0EsNEJBQU9BLEFBQStCQTsrQkFBS0EsU0FBUUE7OzsyQkFHdkZBO2dCQUVaQSxJQUFJQSxTQUFJQTtvQkFDSkE7O2dCQUNKQSxnQkFBV0E7OzJCQUdDQTtnQkFFWkEsT0FBT0EsVUFBS0EsTUFBTUE7Ozs7Ozs7Ozs7OzsrQkRsQ0FBLEtBQUlBOzs7O2dDQUNMQTtnQkFFakJBLFVBQVVBO2dCQUNWQSxpQkFBWUEsSUFBSUEsNkJBQU1BLEtBQUtBOzs0QkFpQ2RBOztnQkFFYkEsSUFBSUE7b0JBRUFBLGVBQWVBLGlDQUFvQkE7b0JBQ25DQSwwQkFBaUJBLDRCQUFrRUE7Ozs7NEJBRS9FQSxlQUFlQSxXQUFXQTs7Ozs7O3FCQUU5QkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcblxyXG5uYW1lc3BhY2UgVG91Y2hUZXN0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgSFRNTENhbnZhc0VsZW1lbnQgX2NhbnZhczsgXHJcbiAgICAgICAgc3RhdGljIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCBfY29udGV4dDtcclxuICAgICAgICBzdGF0aWMgU2V0PFRvdWNoSGlzdG9yeT4gX2hpc3RvcnkgPSBuZXcgU2V0PFRvdWNoSGlzdG9yeT4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2luZG93Lk9uTG9hZCArPSBPbkxvYWQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfY2FudmFzID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQ2FudmFzRWxlbWVudD4oXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIF9jYW52YXMuQ2xhc3NOYW1lID0gXCJmdWxsXCI7XHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKF9jYW52YXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Mb2FkKEV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udGV4dCA9IF9jYW52YXMuR2V0Q29udGV4dChcIjJkXCIpLkFzPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD4oKTtcclxuICAgICAgICAgICAgX2NvbnRleHQuU3Ryb2tlU3R5bGUgPSBcIiMyMjIyMjJcIjtcclxuICAgICAgICAgICAgQXR0YWNoVG91Y2hFdmVudHMoX2NhbnZhcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBBdHRhY2hUb3VjaEV2ZW50cyhIVE1MQ2FudmFzRWxlbWVudCBjYW52YXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaENhbmNlbCArPSBPblRvdWNoQ2FuY2VsO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaEVuZCArPSBPblRvdWNoRW5kO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaEVudGVyICs9IE9uVG91Y2hFbnRlcjtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hMZWF2ZSArPSBPblRvdWNoTGVhdmU7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoTW92ZSArPSBPblRvdWNoTW92ZTtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hTdGFydCArPSBPblRvdWNoU3RhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoQ2FuY2VsKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwiY2FuY2VsXCIpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICAgICAgX2hpc3RvcnkuUmVtb3ZlKHQuSWRlbnRpZmllcik7XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaEVuZChUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICAgICAgX2hpc3RvcnkuUmVtb3ZlKHQuSWRlbnRpZmllcik7XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaEVudGVyKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hMZWF2ZShUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoTW92ZShUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGggPSBfaGlzdG9yeS5GaW5kKHQuSWRlbnRpZmllcik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGggIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aC5BZGRFdmVudCh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7ICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoU3RhcnQoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gZS5DaGFuZ2VkVG91Y2hlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoID0gbmV3IFRvdWNoSGlzdG9yeSgpIHsgSWQgPSB0LklkZW50aWZpZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoLkFkZEV2ZW50KHQpO1xyXG4gICAgICAgICAgICAgICAgX2hpc3RvcnkuQWRkKHRoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBSZWRyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRleHQuQ2xlYXJSZWN0KDAsIDAsIF9jYW52YXMuV2lkdGgsIF9jYW52YXMuSGVpZ2h0KTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGggaW4gX2hpc3RvcnkpXHJcbiAgICAgICAgICAgICAgICBoLkRyYXcoX2NvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIFRvdWNoVGVzdFxyXG57XHJcbiAgICBjbGFzcyBUb3VjaEhpc3RvcnkgOiBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxQb2ludD4gX2V2ZW50cyA9IG5ldyBMaXN0PFBvaW50PigpO1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEV2ZW50KFRvdWNoIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm93ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICBfZXZlbnRzLkFkZChuZXcgUG9pbnQobm93LCB0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgUG9pbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBEYXRlVGltZSBUaW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IENsaWVudFggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgQ2xpZW50WSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBQYWdlWCB7Z2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFBhZ2VZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFNjcmVlblggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU2NyZWVuWSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBSYWRpdXNYIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFJhZGl1c1kgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBkb3VibGUgRm9yY2UgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUm90YXRpb25BbmdsZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBQb2ludChEYXRlVGltZSB0aW1lLCBUb3VjaCB0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgICAgIENsaWVudFggPSB0LkNsaWVudFg7XHJcbiAgICAgICAgICAgICAgICBDbGllbnRZID0gdC5DbGllbnRZO1xyXG4gICAgICAgICAgICAgICAgUGFnZVggPSB0LlBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgUGFnZVkgPSB0LlBhZ2VZO1xyXG4gICAgICAgICAgICAgICAgU2NyZWVuWCA9IHQuU2NyZWVuWDtcclxuICAgICAgICAgICAgICAgIFNjcmVlblkgPSB0LlNjcmVlblk7XHJcbiAgICAgICAgICAgICAgICBSYWRpdXNYID0gdC5SYWRpdXNYO1xyXG4gICAgICAgICAgICAgICAgUmFkaXVzWSA9IHQuUmFkaXVzWTtcclxuICAgICAgICAgICAgICAgIEZvcmNlID0gdC5Gb3JjZTtcclxuICAgICAgICAgICAgICAgIFJvdGF0aW9uQW5nbGUgPSB0LlJvdGF0aW9uQW5nbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIGNvbnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2V2ZW50cy5Db3VudCA+IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuTW92ZVRvKF9ldmVudHNbMF0uQ2xpZW50WCwgX2V2ZW50c1swXS5DbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2godmFyIGUgaW4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGdsb2JhbDo6VG91Y2hUZXN0LlRvdWNoSGlzdG9yeS5Qb2ludD4oX2V2ZW50cywxKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LkxpbmVUbyhlLkNsaWVudFgsIGUuQ2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFRvdWNoVGVzdFxyXG57XHJcbiAgICBjbGFzcyBTZXQ8VD4gOklFbnVtZXJhYmxlPFQ+XHJcbiAgICAgICAgd2hlcmUgVDogSXRlbVxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8VD4gX2l0ZW1zID0gbmV3IExpc3Q8VD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhdG9yPFQ+IEdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9pdGVtcy5HZXRFbnVtZXJhdG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJRW51bWVyYXRvciBJRW51bWVyYWJsZS5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKElFbnVtZXJhYmxlPFQ+KSh0aGlzKSkuR2V0RW51bWVyYXRvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHQgPSBGaW5kKGkpO1xyXG4gICAgICAgICAgICBpZiAodCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgX2l0ZW1zLlJlbW92ZSh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUIEZpbmQoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxUPihfaXRlbXMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8VCwgYm9vbD4pKHggPT4geC5JZCA9PSBpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoVCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEhhcyh0LklkKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgX2l0ZW1zLkFkZCh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEhhcyhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBGaW5kKGkpICE9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
