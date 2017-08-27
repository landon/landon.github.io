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
                var $t;
                if (this._events.Count > 1) {
                    context.strokeStyle = "#00FF00";
                    context.beginPath();
                    var first = true;
                    $t = Bridge.getEnumerator(this._events);
                    try {
                        while ($t.moveNext()) {
                            var b = $t.Current;
                            if (first) {
                                context.moveTo(b.PageX, b.PageY);
                                first = false;
                            } else {
                                context.lineTo(b.PageX, b.PageY);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUb3VjaFRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlRvdWNoSGlzdG9yeS5jcyIsIlNldC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUEsaURBQWlCQTtZQUNqQkEscURBQW1CQTtZQUNuQkEsMkVBQThCQTs7WUFFOUJBLHdCQUFVQTs7WUFFVkEsMEJBQTBCQTs7Ozs7Ozs7OztvQ0FWTUEsS0FBSUE7Ozs7K0NBYVJBO29CQUU1QkE7O29DQUdpQkE7b0JBRWpCQTs7O29CQUtBQSw4QkFBZ0JBO29CQUNoQkEsK0JBQWlCQTtvQkFDakJBOztrQ0FHZUE7b0JBRWZBLHlCQUFXQTtvQkFDWEE7b0JBQ0FBLGdDQUFrQkE7OzZDQUdRQTtvQkFFMUJBLCtEQUF3QkE7b0JBQ3hCQSx5REFBcUJBO29CQUNyQkEsNkRBQXVCQTtvQkFDdkJBLDZEQUF1QkE7b0JBQ3ZCQSwyREFBc0JBO29CQUN0QkEsNkRBQXVCQTs7eUNBR0RBOztvQkFFdEJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBQ2RBLDhCQUFnQkE7Ozs7Ozs7b0JBRXBCQTs7c0NBRW1CQTs7b0JBRW5CQTtvQkFDQUEsS0FBa0JBOzs7OzRCQUNkQSw4QkFBZ0JBOzs7Ozs7O29CQUVwQkE7O3dDQUVxQkE7b0JBRXJCQTs7d0NBRXFCQTtvQkFFckJBOzt1Q0FFb0JBOztvQkFFcEJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBRWRBLFNBQVNBLDRCQUFjQTs0QkFDdkJBLElBQUlBLE1BQU1BO2dDQUNOQSxZQUFZQTs7Ozs7Ozs7b0JBR3BCQTs7d0NBR3FCQTs7b0JBRXJCQTtvQkFDQUEsS0FBa0JBOzs7OzRCQUVkQSxTQUFTQSxXQUFJQSxtQ0FBc0JBOzRCQUNuQ0EsWUFBWUE7NEJBQ1pBLDJCQUFhQTs7Ozs7OztvQkFHakJBOzs7O29CQUtBQSx1Q0FBeUJBLDZCQUFlQTtvQkFDeENBLDBCQUFrQkE7Ozs7NEJBQ2RBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNsRkVBLE1BQWVBOztnQkFFeEJBLFlBQU9BO2dCQUNQQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGFBQVFBO2dCQUNSQSxhQUFRQTtnQkFDUkEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGFBQVFBO2dCQUNSQSxxQkFBZ0JBOzs7Ozs7Ozs7Ozs7OzhCQ2hDUEEsS0FBSUE7Ozs7O2dCQUlqQkEsT0FBT0E7OztnQkFLUEEsT0FBT0EscUJBQUNBLFlBQWdCQSxDQUFDQTs7OEJBR1ZBO2dCQUVmQSxRQUFRQSxVQUFLQTtnQkFDYkEsSUFBSUEsS0FBS0E7b0JBQ0xBLG1CQUFjQTs7OzRCQUdSQTtnQkFFVkEsT0FBT0EsNEJBQXlDQSw0QkFBT0EsQUFBK0JBOytCQUFLQSxTQUFRQTs7OzJCQUd2RkE7Z0JBRVpBLElBQUlBLFNBQUlBO29CQUNKQTs7Z0JBQ0pBLGdCQUFXQTs7MkJBR0NBO2dCQUVaQSxPQUFPQSxVQUFLQSxNQUFNQTs7Ozs7Ozs7Ozs7OytCRGxDQUEsS0FBSUE7Ozs7Z0NBQ0xBO2dCQUVqQkEsVUFBVUE7Z0JBQ1ZBLGlCQUFZQSxJQUFJQSw2QkFBTUEsS0FBS0E7OzRCQWlDZEE7O2dCQUViQSxJQUFJQTtvQkFFQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUEsMEJBQWtCQTs7Ozs0QkFFZEEsSUFBSUE7Z0NBRUFBLGVBQWVBLFNBQVNBO2dDQUN4QkE7O2dDQUlBQSxlQUFlQSxTQUFTQTs7Ozs7OztxQkFHaENBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5cclxubmFtZXNwYWNlIFRvdWNoVGVzdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIEhUTUxDYW52YXNFbGVtZW50IF9jYW52YXM7IFxyXG4gICAgICAgIHN0YXRpYyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgX2NvbnRleHQ7XHJcbiAgICAgICAgc3RhdGljIFNldDxUb3VjaEhpc3Rvcnk+IF9oaXN0b3J5ID0gbmV3IFNldDxUb3VjaEhpc3Rvcnk+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFdpbmRvdy5PbkxvYWQgKz0gT25Mb2FkO1xyXG4gICAgICAgICAgICBXaW5kb3cuT25SZXNpemUgKz0gT25SZXNpemU7XHJcbiAgICAgICAgICAgIFdpbmRvdy5PbkRldmljZU9yaWVudGF0aW9uICs9IE9uRGV2aWNlT3JpZW50YXRpb247XHJcblxyXG4gICAgICAgICAgICBfY2FudmFzID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQ2FudmFzRWxlbWVudD4oXCJjYW52YXNcIik7XHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKF9jYW52YXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25EZXZpY2VPcmllbnRhdGlvbihFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR29GdWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblJlc2l6ZShFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR29GdWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBHb0Z1bGwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NhbnZhcy5XaWR0aCA9IFdpbmRvdy5Jbm5lcldpZHRoO1xyXG4gICAgICAgICAgICBfY2FudmFzLkhlaWdodCA9IFdpbmRvdy5Jbm5lckhlaWdodDtcclxuICAgICAgICAgICAgUmVkcmF3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPbkxvYWQoRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb250ZXh0ID0gX2NhbnZhcy5HZXRDb250ZXh0KFwiMmRcIikuQXM8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPigpO1xyXG4gICAgICAgICAgICBfY29udGV4dC5TdHJva2VTdHlsZSA9IFwiIzIyMjIyMlwiO1xyXG4gICAgICAgICAgICBBdHRhY2hUb3VjaEV2ZW50cyhfY2FudmFzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIEF0dGFjaFRvdWNoRXZlbnRzKEhUTUxDYW52YXNFbGVtZW50IGNhbnZhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoQ2FuY2VsICs9IE9uVG91Y2hDYW5jZWw7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoRW5kICs9IE9uVG91Y2hFbmQ7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoRW50ZXIgKz0gT25Ub3VjaEVudGVyO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaExlYXZlICs9IE9uVG91Y2hMZWF2ZTtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hNb3ZlICs9IE9uVG91Y2hNb3ZlO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaFN0YXJ0ICs9IE9uVG91Y2hTdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hDYW5jZWwoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gZS5DaGFuZ2VkVG91Y2hlcylcclxuICAgICAgICAgICAgICAgIF9oaXN0b3J5LlJlbW92ZSh0LklkZW50aWZpZXIpO1xyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hFbmQoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gZS5DaGFuZ2VkVG91Y2hlcylcclxuICAgICAgICAgICAgICAgIF9oaXN0b3J5LlJlbW92ZSh0LklkZW50aWZpZXIpO1xyXG5cclxuICAgICAgICAgICAgUmVkcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hFbnRlcihUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoTGVhdmUoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaE1vdmUoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gZS5DaGFuZ2VkVG91Y2hlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoID0gX2hpc3RvcnkuRmluZCh0LklkZW50aWZpZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGguQWRkRXZlbnQodCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFJlZHJhdygpOyAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaFN0YXJ0KFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIGUuQ2hhbmdlZFRvdWNoZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aCA9IG5ldyBUb3VjaEhpc3RvcnkoKSB7IElkID0gdC5JZGVudGlmaWVyIH07XHJcbiAgICAgICAgICAgICAgICB0aC5BZGRFdmVudCh0KTtcclxuICAgICAgICAgICAgICAgIF9oaXN0b3J5LkFkZCh0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgUmVkcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LkNsZWFyUmVjdCgwLCAwLCBfY2FudmFzLldpZHRoLCBfY2FudmFzLkhlaWdodCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoIGluIF9oaXN0b3J5KVxyXG4gICAgICAgICAgICAgICAgaC5EcmF3KF9jb250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIFRvdWNoVGVzdFxyXG57XHJcbiAgICBjbGFzcyBUb3VjaEhpc3RvcnkgOiBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxQb2ludD4gX2V2ZW50cyA9IG5ldyBMaXN0PFBvaW50PigpO1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEV2ZW50KFRvdWNoIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm93ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICBfZXZlbnRzLkFkZChuZXcgUG9pbnQobm93LCB0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgUG9pbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBEYXRlVGltZSBUaW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IENsaWVudFggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgQ2xpZW50WSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBQYWdlWCB7Z2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFBhZ2VZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFNjcmVlblggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU2NyZWVuWSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBSYWRpdXNYIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFJhZGl1c1kgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBkb3VibGUgRm9yY2UgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUm90YXRpb25BbmdsZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBQb2ludChEYXRlVGltZSB0aW1lLCBUb3VjaCB0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgICAgIENsaWVudFggPSB0LkNsaWVudFg7XHJcbiAgICAgICAgICAgICAgICBDbGllbnRZID0gdC5DbGllbnRZO1xyXG4gICAgICAgICAgICAgICAgUGFnZVggPSB0LlBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgUGFnZVkgPSB0LlBhZ2VZO1xyXG4gICAgICAgICAgICAgICAgU2NyZWVuWCA9IHQuU2NyZWVuWDtcclxuICAgICAgICAgICAgICAgIFNjcmVlblkgPSB0LlNjcmVlblk7XHJcbiAgICAgICAgICAgICAgICBSYWRpdXNYID0gdC5SYWRpdXNYO1xyXG4gICAgICAgICAgICAgICAgUmFkaXVzWSA9IHQuUmFkaXVzWTtcclxuICAgICAgICAgICAgICAgIEZvcmNlID0gdC5Gb3JjZTtcclxuICAgICAgICAgICAgICAgIFJvdGF0aW9uQW5nbGUgPSB0LlJvdGF0aW9uQW5nbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIGNvbnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2V2ZW50cy5Db3VudCA+IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3Ryb2tlU3R5bGUgPSBcIiMwMEZGMDBcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuQmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGIgaW4gX2V2ZW50cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk1vdmVUbyhiLlBhZ2VYLCBiLlBhZ2VZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MaW5lVG8oYi5QYWdlWCwgYi5QYWdlWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBUb3VjaFRlc3Rcclxue1xyXG4gICAgY2xhc3MgU2V0PFQ+IDpJRW51bWVyYWJsZTxUPlxyXG4gICAgICAgIHdoZXJlIFQ6IEl0ZW1cclxuICAgIHtcclxuICAgICAgICBMaXN0PFQ+IF9pdGVtcyA9IG5ldyBMaXN0PFQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYXRvcjxUPiBHZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfaXRlbXMuR2V0RW51bWVyYXRvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSUVudW1lcmF0b3IgSUVudW1lcmFibGUuR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKChJRW51bWVyYWJsZTxUPikodGhpcykpLkdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbW92ZShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gRmluZChpKTtcclxuICAgICAgICAgICAgaWYgKHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIF9pdGVtcy5SZW1vdmUodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBGaW5kKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8VD4oX2l0ZW1zLChnbG9iYWw6OlN5c3RlbS5GdW5jPFQsIGJvb2w+KSh4ID0+IHguSWQgPT0gaSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKFQgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChIYXModC5JZCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIF9pdGVtcy5BZGQodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBIYXMoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRmluZChpKSAhPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
