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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUb3VjaFRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlRvdWNoSGlzdG9yeS5jcyIsIlNldC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUEsaURBQWlCQTs7WUFFakJBLHdCQUFVQTtZQUNWQTs7WUFFQUEsMEJBQTBCQTs7Ozs7Ozs7OztvQ0FUTUEsS0FBSUE7Ozs7a0NBWXJCQTtvQkFFZkEseUJBQVdBO29CQUNYQTtvQkFDQUEsZ0NBQWtCQTs7NkNBR1FBO29CQUUxQkEsK0RBQXdCQTtvQkFDeEJBLHlEQUFxQkE7b0JBQ3JCQSw2REFBdUJBO29CQUN2QkEsNkRBQXVCQTtvQkFDdkJBLDJEQUFzQkE7b0JBQ3RCQSw2REFBdUJBOzt5Q0FHREE7O29CQUV0QkE7b0JBQ0FBLEtBQWtCQTs7Ozs0QkFDZEEsOEJBQWdCQTs7Ozs7OztvQkFFcEJBOztzQ0FFbUJBOztvQkFFbkJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBQ2RBLDhCQUFnQkE7Ozs7Ozs7b0JBRXBCQTs7d0NBRXFCQTtvQkFFckJBOzt3Q0FFcUJBO29CQUVyQkE7O3VDQUVvQkE7O29CQUVwQkE7b0JBQ0FBLEtBQWtCQTs7Ozs0QkFFZEEsU0FBU0EsNEJBQWNBOzRCQUN2QkEsSUFBSUEsTUFBTUE7Z0NBQ05BLFlBQVlBOzs7Ozs7OztvQkFHcEJBOzt3Q0FHcUJBOztvQkFFckJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBRWRBLFNBQVNBLFdBQUlBLG1DQUFzQkE7NEJBQ25DQSxZQUFZQTs0QkFDWkEsMkJBQWFBOzs7Ozs7O29CQUdqQkE7Ozs7b0JBS0FBLHVDQUF5QkEsNkJBQWVBO29CQUN4Q0EsMEJBQWtCQTs7Ozs0QkFDZEEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNoRUVBLE1BQWVBOztnQkFFeEJBLFlBQU9BO2dCQUNQQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGFBQVFBO2dCQUNSQSxhQUFRQTtnQkFDUkEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGFBQVFBO2dCQUNSQSxxQkFBZ0JBOzs7Ozs7Ozs7Ozs7OzhCQ2hDUEEsS0FBSUE7Ozs7O2dCQUlqQkEsT0FBT0E7OztnQkFLUEEsT0FBT0EscUJBQUNBLFlBQWdCQSxDQUFDQTs7OEJBR1ZBO2dCQUVmQSxRQUFRQSxVQUFLQTtnQkFDYkEsSUFBSUEsS0FBS0E7b0JBQ0xBLG1CQUFjQTs7OzRCQUdSQTtnQkFFVkEsT0FBT0EsNEJBQXlDQSw0QkFBT0EsQUFBK0JBOytCQUFLQSxTQUFRQTs7OzJCQUd2RkE7Z0JBRVpBLElBQUlBLFNBQUlBO29CQUNKQTs7Z0JBQ0pBLGdCQUFXQTs7MkJBR0NBO2dCQUVaQSxPQUFPQSxVQUFLQSxNQUFNQTs7Ozs7Ozs7Ozs7OytCRGxDQUEsS0FBSUE7Ozs7Z0NBQ0xBO2dCQUVqQkEsVUFBVUE7Z0JBQ1ZBLGlCQUFZQSxJQUFJQSw2QkFBTUEsS0FBS0E7OzRCQWlDZEE7O2dCQUViQSxJQUFJQTtvQkFFQUEsZUFBZUEsaUNBQW9CQTtvQkFDbkNBLDBCQUFpQkEsNEJBQWtFQTs7Ozs0QkFFL0VBLGVBQWVBLFdBQVdBOzs7Ozs7cUJBRTlCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxuXHJcbm5hbWVzcGFjZSBUb3VjaFRlc3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBIVE1MQ2FudmFzRWxlbWVudCBfY2FudmFzOyBcclxuICAgICAgICBzdGF0aWMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIF9jb250ZXh0O1xyXG4gICAgICAgIHN0YXRpYyBTZXQ8VG91Y2hIaXN0b3J5PiBfaGlzdG9yeSA9IG5ldyBTZXQ8VG91Y2hIaXN0b3J5PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBXaW5kb3cuT25Mb2FkICs9IE9uTG9hZDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9jYW52YXMgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxDYW52YXNFbGVtZW50PihcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgX2NhbnZhcy5DbGFzc05hbWUgPSBcImZ1bGxcIjtcclxuXHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoX2NhbnZhcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPbkxvYWQoRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb250ZXh0ID0gX2NhbnZhcy5HZXRDb250ZXh0KFwiMmRcIikuQXM8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPigpO1xyXG4gICAgICAgICAgICBfY29udGV4dC5TdHJva2VTdHlsZSA9IFwiIzIyMjIyMlwiO1xyXG4gICAgICAgICAgICBBdHRhY2hUb3VjaEV2ZW50cyhfY2FudmFzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIEF0dGFjaFRvdWNoRXZlbnRzKEhUTUxDYW52YXNFbGVtZW50IGNhbnZhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoQ2FuY2VsICs9IE9uVG91Y2hDYW5jZWw7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoRW5kICs9IE9uVG91Y2hFbmQ7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoRW50ZXIgKz0gT25Ub3VjaEVudGVyO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaExlYXZlICs9IE9uVG91Y2hMZWF2ZTtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hNb3ZlICs9IE9uVG91Y2hNb3ZlO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaFN0YXJ0ICs9IE9uVG91Y2hTdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hDYW5jZWwoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gZS5DaGFuZ2VkVG91Y2hlcylcclxuICAgICAgICAgICAgICAgIF9oaXN0b3J5LlJlbW92ZSh0LklkZW50aWZpZXIpO1xyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hFbmQoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gZS5DaGFuZ2VkVG91Y2hlcylcclxuICAgICAgICAgICAgICAgIF9oaXN0b3J5LlJlbW92ZSh0LklkZW50aWZpZXIpO1xyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hFbnRlcihUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoTGVhdmUoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaE1vdmUoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gZS5DaGFuZ2VkVG91Y2hlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoID0gX2hpc3RvcnkuRmluZCh0LklkZW50aWZpZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGguQWRkRXZlbnQodCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFJlZHJhdygpOyAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaFN0YXJ0KFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIGUuQ2hhbmdlZFRvdWNoZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aCA9IG5ldyBUb3VjaEhpc3RvcnkoKSB7IElkID0gdC5JZGVudGlmaWVyIH07XHJcbiAgICAgICAgICAgICAgICB0aC5BZGRFdmVudCh0KTtcclxuICAgICAgICAgICAgICAgIF9oaXN0b3J5LkFkZCh0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgUmVkcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LkNsZWFyUmVjdCgwLCAwLCBfY2FudmFzLldpZHRoLCBfY2FudmFzLkhlaWdodCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoIGluIF9oaXN0b3J5KVxyXG4gICAgICAgICAgICAgICAgaC5EcmF3KF9jb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxuXHJcbm5hbWVzcGFjZSBUb3VjaFRlc3Rcclxue1xyXG4gICAgY2xhc3MgVG91Y2hIaXN0b3J5IDogSXRlbVxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8UG9pbnQ+IF9ldmVudHMgPSBuZXcgTGlzdDxQb2ludD4oKTtcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRFdmVudChUb3VjaCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vdyA9IERhdGVUaW1lLk5vdztcclxuICAgICAgICAgICAgX2V2ZW50cy5BZGQobmV3IFBvaW50KG5vdywgdCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIFBvaW50XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgVGltZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBDbGllbnRYIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IENsaWVudFkgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUGFnZVgge2dldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBQYWdlWSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBTY3JlZW5YIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFNjcmVlblkgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUmFkaXVzWCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBSYWRpdXNZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgZG91YmxlIEZvcmNlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFJvdGF0aW9uQW5nbGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgUG9pbnQoRGF0ZVRpbWUgdGltZSwgVG91Y2ggdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgICAgICBDbGllbnRYID0gdC5DbGllbnRYO1xyXG4gICAgICAgICAgICAgICAgQ2xpZW50WSA9IHQuQ2xpZW50WTtcclxuICAgICAgICAgICAgICAgIFBhZ2VYID0gdC5QYWdlWDtcclxuICAgICAgICAgICAgICAgIFBhZ2VZID0gdC5QYWdlWTtcclxuICAgICAgICAgICAgICAgIFNjcmVlblggPSB0LlNjcmVlblg7XHJcbiAgICAgICAgICAgICAgICBTY3JlZW5ZID0gdC5TY3JlZW5ZO1xyXG4gICAgICAgICAgICAgICAgUmFkaXVzWCA9IHQuUmFkaXVzWDtcclxuICAgICAgICAgICAgICAgIFJhZGl1c1kgPSB0LlJhZGl1c1k7XHJcbiAgICAgICAgICAgICAgICBGb3JjZSA9IHQuRm9yY2U7XHJcbiAgICAgICAgICAgICAgICBSb3RhdGlvbkFuZ2xlID0gdC5Sb3RhdGlvbkFuZ2xlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCBjb250ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9ldmVudHMuQ291bnQgPiAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lk1vdmVUbyhfZXZlbnRzWzBdLkNsaWVudFgsIF9ldmVudHNbMF0uQ2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoKHZhciBlIGluIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxnbG9iYWw6OlRvdWNoVGVzdC5Ub3VjaEhpc3RvcnkuUG9pbnQ+KF9ldmVudHMsMSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MaW5lVG8oZS5DbGllbnRYLCBlLkNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBUb3VjaFRlc3Rcclxue1xyXG4gICAgY2xhc3MgU2V0PFQ+IDpJRW51bWVyYWJsZTxUPlxyXG4gICAgICAgIHdoZXJlIFQ6IEl0ZW1cclxuICAgIHtcclxuICAgICAgICBMaXN0PFQ+IF9pdGVtcyA9IG5ldyBMaXN0PFQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYXRvcjxUPiBHZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfaXRlbXMuR2V0RW51bWVyYXRvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSUVudW1lcmF0b3IgSUVudW1lcmFibGUuR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKChJRW51bWVyYWJsZTxUPikodGhpcykpLkdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbW92ZShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gRmluZChpKTtcclxuICAgICAgICAgICAgaWYgKHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIF9pdGVtcy5SZW1vdmUodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBGaW5kKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8VD4oX2l0ZW1zLChnbG9iYWw6OlN5c3RlbS5GdW5jPFQsIGJvb2w+KSh4ID0+IHguSWQgPT0gaSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKFQgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChIYXModC5JZCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIF9pdGVtcy5BZGQodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBIYXMoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRmluZChpKSAhPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
