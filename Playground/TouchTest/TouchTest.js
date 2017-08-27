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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUb3VjaFRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlRvdWNoSGlzdG9yeS5jcyIsIlNldC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUEsaURBQWlCQTs7WUFFakJBLHdCQUFVQTtZQUNWQTs7WUFFQUEsMEJBQTBCQTs7Ozs7Ozs7OztvQ0FUTUEsS0FBSUE7Ozs7a0NBWXJCQTtvQkFFZkEseUJBQVdBO29CQUNYQTtvQkFDQUEsZ0NBQWtCQTs7NkNBR1FBO29CQUUxQkEsK0RBQXdCQTtvQkFDeEJBLHlEQUFxQkE7b0JBQ3JCQSw2REFBdUJBO29CQUN2QkEsNkRBQXVCQTtvQkFDdkJBLDJEQUFzQkE7b0JBQ3RCQSw2REFBdUJBOzt5Q0FHREE7O29CQUV0QkE7b0JBQ0FBLEtBQWtCQTs7Ozs0QkFDZEEsOEJBQWdCQTs7Ozs7OztvQkFFcEJBOztzQ0FFbUJBOztvQkFFbkJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBQ2RBLDhCQUFnQkE7Ozs7Ozs7b0JBRXBCQTs7d0NBRXFCQTtvQkFFckJBOzt3Q0FFcUJBO29CQUVyQkE7O3VDQUVvQkE7O29CQUVwQkE7b0JBQ0FBLEtBQWtCQTs7Ozs0QkFFZEEsU0FBU0EsNEJBQWNBOzRCQUN2QkEsSUFBSUEsTUFBTUE7Z0NBQ05BLFlBQVlBOzs7Ozs7OztvQkFHcEJBOzt3Q0FHcUJBOztvQkFFckJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBRWRBLFNBQVNBLFdBQUlBLG1DQUFzQkE7NEJBQ25DQSxZQUFZQTs0QkFDWkEsMkJBQWFBOzs7Ozs7O29CQUdqQkE7Ozs7b0JBS0FBLHVDQUF5QkEsNkJBQWVBO29CQUN4Q0EsMEJBQWtCQTs7Ozs0QkFDZEEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNoRUVBLE1BQWVBOztnQkFFeEJBLFlBQU9BO2dCQUNQQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGFBQVFBO2dCQUNSQSxhQUFRQTtnQkFDUkEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGFBQVFBO2dCQUNSQSxxQkFBZ0JBOzs7Ozs7Ozs7Ozs7OzhCQ2hDUEEsS0FBSUE7Ozs7O2dCQUlqQkEsT0FBT0E7OztnQkFLUEEsT0FBT0EscUJBQUNBLFlBQWdCQSxDQUFDQTs7OEJBR1ZBO2dCQUVmQSxRQUFRQSxVQUFLQTtnQkFDYkEsSUFBSUEsS0FBS0E7b0JBQ0xBLG1CQUFjQTs7OzRCQUdSQTtnQkFFVkEsT0FBT0EsNEJBQXlDQSw0QkFBT0EsQUFBK0JBOytCQUFLQSxTQUFRQTs7OzJCQUd2RkE7Z0JBRVpBLElBQUlBLFNBQUlBO29CQUNKQTs7Z0JBQ0pBLGdCQUFXQTs7MkJBR0NBO2dCQUVaQSxPQUFPQSxVQUFLQSxNQUFNQTs7Ozs7Ozs7Ozs7OytCRGxDQUEsS0FBSUE7Ozs7Z0NBQ0xBO2dCQUVqQkEsVUFBVUE7Z0JBQ1ZBLGlCQUFZQSxJQUFJQSw2QkFBTUEsS0FBS0E7OzRCQWlDZEE7O2dCQUViQSxJQUFJQTtvQkFFQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUEsMEJBQWtCQTs7Ozs0QkFFZEEsSUFBSUE7Z0NBRUFBLGVBQWVBLFdBQVdBO2dDQUMxQkE7O2dDQUlBQSxlQUFlQSxXQUFXQTs7Ozs7OztxQkFHbENBOztvQkFFQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUEsMkJBQWtCQTs7Ozs0QkFFZEEsSUFBSUE7Z0NBRUFBLGVBQWVBLFVBQVNBO2dDQUN4QkE7O2dDQUlBQSxlQUFlQSxVQUFTQTs7Ozs7OztxQkFHaENBOztvQkFFQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUEsMkJBQWtCQTs7Ozs0QkFFZEEsSUFBSUE7Z0NBRUFBLGVBQWVBLFlBQVdBO2dDQUMxQkE7O2dDQUlBQSxlQUFlQSxZQUFXQTs7Ozs7OztxQkFHbENBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5cclxubmFtZXNwYWNlIFRvdWNoVGVzdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIEhUTUxDYW52YXNFbGVtZW50IF9jYW52YXM7IFxyXG4gICAgICAgIHN0YXRpYyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgX2NvbnRleHQ7XHJcbiAgICAgICAgc3RhdGljIFNldDxUb3VjaEhpc3Rvcnk+IF9oaXN0b3J5ID0gbmV3IFNldDxUb3VjaEhpc3Rvcnk+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFdpbmRvdy5PbkxvYWQgKz0gT25Mb2FkO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX2NhbnZhcyA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTENhbnZhc0VsZW1lbnQ+KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBfY2FudmFzLkNsYXNzTmFtZSA9IFwiZnVsbFwiO1xyXG5cclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChfY2FudmFzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uTG9hZChFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRleHQgPSBfY2FudmFzLkdldENvbnRleHQoXCIyZFwiKS5BczxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+KCk7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LlN0cm9rZVN0eWxlID0gXCIjMjIyMjIyXCI7XHJcbiAgICAgICAgICAgIEF0dGFjaFRvdWNoRXZlbnRzKF9jYW52YXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgQXR0YWNoVG91Y2hFdmVudHMoSFRNTENhbnZhc0VsZW1lbnQgY2FudmFzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hDYW5jZWwgKz0gT25Ub3VjaENhbmNlbDtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hFbmQgKz0gT25Ub3VjaEVuZDtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hFbnRlciArPSBPblRvdWNoRW50ZXI7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoTGVhdmUgKz0gT25Ub3VjaExlYXZlO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaE1vdmUgKz0gT25Ub3VjaE1vdmU7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoU3RhcnQgKz0gT25Ub3VjaFN0YXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaENhbmNlbChUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICAgICAgX2hpc3RvcnkuUmVtb3ZlKHQuSWRlbnRpZmllcik7XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaEVuZChUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICAgICAgX2hpc3RvcnkuUmVtb3ZlKHQuSWRlbnRpZmllcik7XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaEVudGVyKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hMZWF2ZShUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoTW92ZShUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGggPSBfaGlzdG9yeS5GaW5kKHQuSWRlbnRpZmllcik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGggIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aC5BZGRFdmVudCh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7ICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoU3RhcnQoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gZS5DaGFuZ2VkVG91Y2hlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoID0gbmV3IFRvdWNoSGlzdG9yeSgpIHsgSWQgPSB0LklkZW50aWZpZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoLkFkZEV2ZW50KHQpO1xyXG4gICAgICAgICAgICAgICAgX2hpc3RvcnkuQWRkKHRoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBSZWRyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRleHQuQ2xlYXJSZWN0KDAsIDAsIF9jYW52YXMuV2lkdGgsIF9jYW52YXMuSGVpZ2h0KTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGggaW4gX2hpc3RvcnkpXHJcbiAgICAgICAgICAgICAgICBoLkRyYXcoX2NvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIFRvdWNoVGVzdFxyXG57XHJcbiAgICBjbGFzcyBUb3VjaEhpc3RvcnkgOiBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxQb2ludD4gX2V2ZW50cyA9IG5ldyBMaXN0PFBvaW50PigpO1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEV2ZW50KFRvdWNoIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm93ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICBfZXZlbnRzLkFkZChuZXcgUG9pbnQobm93LCB0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgUG9pbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBEYXRlVGltZSBUaW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IENsaWVudFggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgQ2xpZW50WSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBQYWdlWCB7Z2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFBhZ2VZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFNjcmVlblggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU2NyZWVuWSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBSYWRpdXNYIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFJhZGl1c1kgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBkb3VibGUgRm9yY2UgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUm90YXRpb25BbmdsZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBQb2ludChEYXRlVGltZSB0aW1lLCBUb3VjaCB0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgICAgIENsaWVudFggPSB0LkNsaWVudFg7XHJcbiAgICAgICAgICAgICAgICBDbGllbnRZID0gdC5DbGllbnRZO1xyXG4gICAgICAgICAgICAgICAgUGFnZVggPSB0LlBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgUGFnZVkgPSB0LlBhZ2VZO1xyXG4gICAgICAgICAgICAgICAgU2NyZWVuWCA9IHQuU2NyZWVuWDtcclxuICAgICAgICAgICAgICAgIFNjcmVlblkgPSB0LlNjcmVlblk7XHJcbiAgICAgICAgICAgICAgICBSYWRpdXNYID0gdC5SYWRpdXNYO1xyXG4gICAgICAgICAgICAgICAgUmFkaXVzWSA9IHQuUmFkaXVzWTtcclxuICAgICAgICAgICAgICAgIEZvcmNlID0gdC5Gb3JjZTtcclxuICAgICAgICAgICAgICAgIFJvdGF0aW9uQW5nbGUgPSB0LlJvdGF0aW9uQW5nbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIGNvbnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2V2ZW50cy5Db3VudCA+IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3Ryb2tlU3R5bGUgPSBcIiNGRjAwMDBcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuQmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGIgaW4gX2V2ZW50cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk1vdmVUbyhiLkNsaWVudFgsIGIuQ2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGluZVRvKGIuQ2xpZW50WCwgYi5DbGllbnRZKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cm9rZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3Ryb2tlU3R5bGUgPSBcIiMwMEZGMDBcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuQmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYiBpbiBfZXZlbnRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTW92ZVRvKGIuUGFnZVgsIGIuUGFnZVkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LkxpbmVUbyhiLlBhZ2VYLCBiLlBhZ2VZKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cm9rZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3Ryb2tlU3R5bGUgPSBcIiMwMDAwRkZcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuQmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYiBpbiBfZXZlbnRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTW92ZVRvKGIuU2NyZWVuWCwgYi5TY3JlZW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MaW5lVG8oYi5TY3JlZW5YLCBiLlNjcmVlblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgVG91Y2hUZXN0XHJcbntcclxuICAgIGNsYXNzIFNldDxUPiA6SUVudW1lcmFibGU8VD5cclxuICAgICAgICB3aGVyZSBUOiBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxUPiBfaXRlbXMgPSBuZXcgTGlzdDxUPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgSUVudW1lcmF0b3I8VD4gR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2l0ZW1zLkdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIElFbnVtZXJhdG9yIElFbnVtZXJhYmxlLkdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoSUVudW1lcmFibGU8VD4pKHRoaXMpKS5HZXRFbnVtZXJhdG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmUoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdCA9IEZpbmQoaSk7XHJcbiAgICAgICAgICAgIGlmICh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBfaXRlbXMuUmVtb3ZlKHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFQgRmluZChpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PFQ+KF9pdGVtcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxULCBib29sPikoeCA9PiB4LklkID09IGkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChUIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoSGFzKHQuSWQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBfaXRlbXMuQWRkKHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSGFzKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEZpbmQoaSkgIT0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
