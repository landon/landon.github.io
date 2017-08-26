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
                    this._history = new (TouchTest.Set$1(TouchTest.TouchHistory))(256);
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
                    System.Console.WriteLine("touch");
                    $t = Bridge.getEnumerator(e.changedTouches);
                    try {
                        while ($t.moveNext()) {
                            var t = $t.Current;
                            if (!TouchTest.App._history.Contains(t.identifier)) {
                                var th = ($t1 = new TouchTest.TouchHistory(), $t1.Id = t.identifier, $t1);
                                th.AddEvent(t);
                                TouchTest.App._history.Add(th);
                            }
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
                    System.Console.Write(System.Linq.Enumerable.from(TouchTest.App._history).count() + " ");
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
            ctor: function (capacity) {
                if (capacity === void 0) { capacity = 256; }

                this.$initialize();
                this._items = System.Array.init(capacity, function (){
                    return Bridge.getDefaultValue(T);
                }, T);
            }
        },
        methods: {
            Add: function (i) {
                var j = -1;
                while (((j = (j + 1) | 0)) >= 0) {
                    if (this._items[System.Array.index(j, this._items)] == null || this._items[System.Array.index(j, this._items)].Dead) {
                        this._items[System.Array.index(j, this._items)] = i;
                        break;
                    }
                }
            },
            Remove: function (id) {
                var j = -1;
                while (((j = (j + 1) | 0)) >= 0) {
                    if (this._items[System.Array.index(j, this._items)] == null) {
                        while (((j = (j - 1) | 0)) > 0 && this._items[System.Array.index(j, this._items)].Dead) {
                            this._items[System.Array.index(j, this._items)] = null;
                        }
                        break;
                    }
                    if (this._items[System.Array.index(j, this._items)].Id === id) {
                        this._items[System.Array.index(j, this._items)].Dead = true;
                        if (this._items[System.Array.index(((j = (j + 1) | 0)), this._items)] == null) {
                            while (((j = (j - 1) | 0)) > 0 && this._items[System.Array.index(j, this._items)].Dead) {
                                this._items[System.Array.index(j, this._items)] = null;
                            }
                        }
                        break;
                    }
                }
            },
            Contains: function (id) {
                return this.Find(id) != null;
            },
            Find: function (id) {
                var j = -1;
                while (((j = (j + 1) | 0)) >= 0) {
                    if (this._items[System.Array.index(j, this._items)] == null) {
                        while (((j = (j - 1) | 0)) > 0 && this._items[System.Array.index(j, this._items)].Dead) {
                            this._items[System.Array.index(j, this._items)] = null;
                        }
                        break;
                    }
                    if (this._items[System.Array.index(j, this._items)].Id === id) {
                        var q = this._items[System.Array.index(j, this._items)];
                        if (j > 0 && this._items[System.Array.index(((j - 1) | 0), this._items)].Dead) {
                            var f = this._items[System.Array.index(((j + 1) | 0), this._items)] == null;
                            if (f) {
                                this._items[System.Array.index(j, this._items)] = null;
                            } else {
                                this._items[System.Array.index(j, this._items)].Dead = true;
                            }
                            while (((j = (j - 1) | 0)) > 0 && this._items[System.Array.index(j, this._items)].Dead) {
                                if (f) {
                                    this._items[System.Array.index(j, this._items)] = null;
                                } else {
                                    this._items[System.Array.index(j, this._items)].Dead = true;
                                }
                            }
                            this._items[System.Array.index(((j + 1) | 0), this._items)] = q;
                            this._items[System.Array.index(((j + 1) | 0), this._items)].Dead = false;
                        }
                        return q;
                    }
                }
                return null;
            },
            getEnumerator: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    j,
                    $async_e;

                var $enumerator = new (Bridge.GeneratorEnumerator$1(T))(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    j = -1;
                                        
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( ((j = (j + 1) | 0)) >= 0 ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 8;
                                        continue;
                                }
                                case 2: {
                                    if (this._items[System.Array.index(j, this._items)] == null) {
                                            $step = 3;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 3: {
                                    return false;
                                }
                                case 4: {
                                    if (!this._items[System.Array.index(j, this._items)].Dead) {
                                            $step = 5;
                                            continue;
                                        } 
                                        $step = 7;
                                        continue;
                                }
                                case 5: {
                                    $enumerator.current = this._items[System.Array.index(j, this._items)];
                                        $step = 6;
                                        return true;
                                }
                                case 6: {
                                    $step = 7;
                                    continue;
                                }
                                case 7: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 8: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            System$Collections$IEnumerable$getEnumerator: function () {
                return Bridge.getEnumerator(Bridge.cast(this, System.Collections.Generic.IEnumerable$1(T)), T);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUb3VjaFRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlRvdWNoSGlzdG9yeS5jcyIsIlNldC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUEsaURBQWlCQTs7WUFFakJBLHdCQUFVQTtZQUNWQTs7WUFFQUEsMEJBQTBCQTs7Ozs7Ozs7OztvQ0FUTUEsS0FBSUE7Ozs7a0NBWXJCQTtvQkFFZkEseUJBQVdBO29CQUNYQTtvQkFDQUEsZ0NBQWtCQTs7NkNBR1FBO29CQUUxQkEsK0RBQXdCQTtvQkFDeEJBLHlEQUFxQkE7b0JBQ3JCQSw2REFBdUJBO29CQUN2QkEsNkRBQXVCQTtvQkFDdkJBLDJEQUFzQkE7b0JBQ3RCQSw2REFBdUJBOzt5Q0FHREE7O29CQUV0QkE7b0JBQ0FBO29CQUNBQSxLQUFrQkE7Ozs7NEJBQ2RBLDhCQUFnQkE7Ozs7Ozs7b0JBRXBCQTs7c0NBRW1CQTs7b0JBRW5CQTtvQkFDQUEsS0FBa0JBOzs7OzRCQUNkQSw4QkFBZ0JBOzs7Ozs7O29CQUVwQkE7O3dDQUVxQkE7b0JBRXJCQTs7d0NBRXFCQTtvQkFFckJBOzt1Q0FFb0JBOztvQkFFcEJBO29CQUNBQSxLQUFrQkE7Ozs7NEJBRWRBLFNBQVNBLDRCQUFjQTs0QkFDdkJBLElBQUlBLE1BQU1BO2dDQUNOQSxZQUFZQTs7Ozs7Ozs7b0JBR3BCQTs7d0NBR3FCQTs7b0JBRXJCQTtvQkFDQUE7b0JBQ0FBLEtBQWtCQTs7Ozs0QkFFZEEsSUFBSUEsQ0FBQ0EsZ0NBQWtCQTtnQ0FFbkJBLFNBQVNBLFdBQUlBLG1DQUFzQkE7Z0NBQ25DQSxZQUFZQTtnQ0FDWkEsMkJBQWFBOzs7Ozs7OztvQkFJckJBOzs7O29CQUtBQSxxQkFBcUJBLDRCQUE2REE7b0JBQ2xGQSx1Q0FBeUJBLDZCQUFlQTtvQkFDeENBLDBCQUFrQkE7Ozs7NEJBQ2RBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDdEVFQSxNQUFlQTs7Z0JBRXhCQSxZQUFPQTtnQkFDUEEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxhQUFRQTtnQkFDUkEsYUFBUUE7Z0JBQ1JBLGVBQVVBO2dCQUNWQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBLGVBQVVBO2dCQUNWQSxhQUFRQTtnQkFDUkEscUJBQWdCQTs7Ozs7Ozs7Ozs7OzRCQy9CYkE7Ozs7Z0JBRVBBLGNBQVNBLGtCQUFNQTs7Ozs7OzJCQUdIQTtnQkFFWkEsUUFBUUE7Z0JBQ1JBLE9BQVNBO29CQUVMQSxJQUFJQSwrQkFBT0EsR0FBUEEsaUJBQWFBLFFBQVFBLCtCQUFPQSxHQUFQQTt3QkFFckJBLCtCQUFPQSxHQUFQQSxnQkFBWUE7d0JBQ1pBOzs7OzhCQUlPQTtnQkFFZkEsUUFBUUE7Z0JBQ1JBLE9BQVNBO29CQUVMQSxJQUFJQSwrQkFBT0EsR0FBUEEsaUJBQWFBO3dCQUViQSxPQUFTQSwyQkFBU0EsK0JBQU9BLEdBQVBBOzRCQUNkQSwrQkFBT0EsR0FBUEEsZ0JBQVlBOzt3QkFDaEJBOztvQkFFSkEsSUFBSUEsK0JBQU9BLEdBQVBBLHFCQUFnQkE7d0JBRWhCQSwrQkFBT0EsR0FBUEE7d0JBQ0FBLElBQUlBLCtCQUFTQSxxQkFBVEEsaUJBQWVBOzRCQUVmQSxPQUFTQSwyQkFBU0EsK0JBQU9BLEdBQVBBO2dDQUNkQSwrQkFBT0EsR0FBUEEsZ0JBQVlBOzs7d0JBRXBCQTs7OztnQ0FJU0E7Z0JBRWpCQSxPQUFPQSxVQUFLQSxPQUFPQTs7NEJBRVRBO2dCQUVWQSxRQUFRQTtnQkFDUkEsT0FBU0E7b0JBRUxBLElBQUlBLCtCQUFPQSxHQUFQQSxpQkFBYUE7d0JBRWJBLE9BQVNBLDJCQUFTQSwrQkFBT0EsR0FBUEE7NEJBQ2RBLCtCQUFPQSxHQUFQQSxnQkFBWUE7O3dCQUNoQkE7O29CQUVKQSxJQUFJQSwrQkFBT0EsR0FBUEEscUJBQWdCQTt3QkFFaEJBLFFBQVFBLCtCQUFPQSxHQUFQQTt3QkFDUkEsSUFBSUEsU0FBU0EsK0JBQU9BLGVBQVBBOzRCQUVUQSxRQUFRQSwrQkFBT0EsZUFBUEEsaUJBQWlCQTs0QkFDekJBLElBQUlBO2dDQUNBQSwrQkFBT0EsR0FBUEEsZ0JBQVlBOztnQ0FFWkEsK0JBQU9BLEdBQVBBOzs0QkFDSkEsT0FBU0EsMkJBQVNBLCtCQUFPQSxHQUFQQTtnQ0FFZEEsSUFBSUE7b0NBQ0FBLCtCQUFPQSxHQUFQQSxnQkFBWUE7O29DQUVaQSwrQkFBT0EsR0FBUEE7Ozs0QkFFUkEsK0JBQU9BLGVBQVBBLGdCQUFnQkE7NEJBQ2hCQSwrQkFBT0EsZUFBUEE7O3dCQUVKQSxPQUFPQTs7O2dCQUdmQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7b0NBS1BBLElBQVFBO3dDQUNSQTs7Ozs7eUNBQVNBOzs7Ozs7OztvQ0FFTEEsSUFBSUEsK0JBQU9BLEdBQVBBLGlCQUFhQTs7Ozs7Ozs7b0NBQ2JBOzs7b0NBQ0pBLElBQUlBLENBQUNBLCtCQUFPQSxHQUFQQTs7Ozs7Ozs7b0NBQ0RBLHNCQUFhQSwrQkFBT0EsR0FBUEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQU1yQkEsT0FBT0EscUJBQUNBLFlBQWdCQTs7Ozs7Ozs7Ozs7OytCRGpHTkEsS0FBSUE7Ozs7Z0NBQ0xBO2dCQUVqQkEsVUFBVUE7Z0JBQ1ZBLGlCQUFZQSxJQUFJQSw2QkFBTUEsS0FBS0E7OzRCQWlDZEE7O2dCQUViQSxJQUFJQTtvQkFFQUEsZUFBZUEsaUNBQW9CQTtvQkFDbkNBLDBCQUFpQkEsNEJBQWtFQTs7Ozs0QkFFL0VBLGVBQWVBLFdBQVdBOzs7Ozs7cUJBRTlCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxuXHJcbm5hbWVzcGFjZSBUb3VjaFRlc3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBIVE1MQ2FudmFzRWxlbWVudCBfY2FudmFzOyBcclxuICAgICAgICBzdGF0aWMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIF9jb250ZXh0O1xyXG4gICAgICAgIHN0YXRpYyBTZXQ8VG91Y2hIaXN0b3J5PiBfaGlzdG9yeSA9IG5ldyBTZXQ8VG91Y2hIaXN0b3J5PigyNTYpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBXaW5kb3cuT25Mb2FkICs9IE9uTG9hZDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9jYW52YXMgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxDYW52YXNFbGVtZW50PihcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgX2NhbnZhcy5DbGFzc05hbWUgPSBcImZ1bGxcIjtcclxuXHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoX2NhbnZhcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPbkxvYWQoRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb250ZXh0ID0gX2NhbnZhcy5HZXRDb250ZXh0KFwiMmRcIikuQXM8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPigpO1xyXG4gICAgICAgICAgICBfY29udGV4dC5TdHJva2VTdHlsZSA9IFwiIzIyMjIyMlwiO1xyXG4gICAgICAgICAgICBBdHRhY2hUb3VjaEV2ZW50cyhfY2FudmFzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIEF0dGFjaFRvdWNoRXZlbnRzKEhUTUxDYW52YXNFbGVtZW50IGNhbnZhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoQ2FuY2VsICs9IE9uVG91Y2hDYW5jZWw7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoRW5kICs9IE9uVG91Y2hFbmQ7XHJcbiAgICAgICAgICAgIGNhbnZhcy5PblRvdWNoRW50ZXIgKz0gT25Ub3VjaEVudGVyO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaExlYXZlICs9IE9uVG91Y2hMZWF2ZTtcclxuICAgICAgICAgICAgY2FudmFzLk9uVG91Y2hNb3ZlICs9IE9uVG91Y2hNb3ZlO1xyXG4gICAgICAgICAgICBjYW52YXMuT25Ub3VjaFN0YXJ0ICs9IE9uVG91Y2hTdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hDYW5jZWwoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoXCJjYW5jZWxcIik7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIGUuQ2hhbmdlZFRvdWNoZXMpXHJcbiAgICAgICAgICAgICAgICBfaGlzdG9yeS5SZW1vdmUodC5JZGVudGlmaWVyKTtcclxuXHJcbiAgICAgICAgICAgIFJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoRW5kKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIGUuQ2hhbmdlZFRvdWNoZXMpXHJcbiAgICAgICAgICAgICAgICBfaGlzdG9yeS5SZW1vdmUodC5JZGVudGlmaWVyKTtcclxuXHJcbiAgICAgICAgICAgIFJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRvdWNoRW50ZXIoVG91Y2hFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Ub3VjaExlYXZlKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hNb3ZlKFRvdWNoRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIGUuQ2hhbmdlZFRvdWNoZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aCA9IF9oaXN0b3J5LkZpbmQodC5JZGVudGlmaWVyKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoLkFkZEV2ZW50KHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTsgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uVG91Y2hTdGFydChUb3VjaEV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcInRvdWNoXCIpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiBlLkNoYW5nZWRUb3VjaGVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9oaXN0b3J5LkNvbnRhaW5zKHQuSWRlbnRpZmllcikpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoID0gbmV3IFRvdWNoSGlzdG9yeSgpIHsgSWQgPSB0LklkZW50aWZpZXIgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aC5BZGRFdmVudCh0KTtcclxuICAgICAgICAgICAgICAgICAgICBfaGlzdG9yeS5BZGQodGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBSZWRyYXcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIFJlZHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZShTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGdsb2JhbDo6VG91Y2hUZXN0LlRvdWNoSGlzdG9yeT4oX2hpc3RvcnkpICsgXCIgXCIpO1xyXG4gICAgICAgICAgICBfY29udGV4dC5DbGVhclJlY3QoMCwgMCwgX2NhbnZhcy5XaWR0aCwgX2NhbnZhcy5IZWlnaHQpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaCBpbiBfaGlzdG9yeSlcclxuICAgICAgICAgICAgICAgIGguRHJhdyhfY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgVG91Y2hUZXN0XHJcbntcclxuICAgIGNsYXNzIFRvdWNoSGlzdG9yeSA6IEl0ZW1cclxuICAgIHtcclxuICAgICAgICBMaXN0PFBvaW50PiBfZXZlbnRzID0gbmV3IExpc3Q8UG9pbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkRXZlbnQoVG91Y2ggdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub3cgPSBEYXRlVGltZS5Ob3c7XHJcbiAgICAgICAgICAgIF9ldmVudHMuQWRkKG5ldyBQb2ludChub3csIHQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBQb2ludFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIERhdGVUaW1lIFRpbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgQ2xpZW50WCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBDbGllbnRZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFBhZ2VYIHtnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUGFnZVkgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU2NyZWVuWCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBTY3JlZW5ZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFJhZGl1c1ggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgUmFkaXVzWSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGRvdWJsZSBGb3JjZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBSb3RhdGlvbkFuZ2xlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIFBvaW50KERhdGVUaW1lIHRpbWUsIFRvdWNoIHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgQ2xpZW50WCA9IHQuQ2xpZW50WDtcclxuICAgICAgICAgICAgICAgIENsaWVudFkgPSB0LkNsaWVudFk7XHJcbiAgICAgICAgICAgICAgICBQYWdlWCA9IHQuUGFnZVg7XHJcbiAgICAgICAgICAgICAgICBQYWdlWSA9IHQuUGFnZVk7XHJcbiAgICAgICAgICAgICAgICBTY3JlZW5YID0gdC5TY3JlZW5YO1xyXG4gICAgICAgICAgICAgICAgU2NyZWVuWSA9IHQuU2NyZWVuWTtcclxuICAgICAgICAgICAgICAgIFJhZGl1c1ggPSB0LlJhZGl1c1g7XHJcbiAgICAgICAgICAgICAgICBSYWRpdXNZID0gdC5SYWRpdXNZO1xyXG4gICAgICAgICAgICAgICAgRm9yY2UgPSB0LkZvcmNlO1xyXG4gICAgICAgICAgICAgICAgUm90YXRpb25BbmdsZSA9IHQuUm90YXRpb25BbmdsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgY29udGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfZXZlbnRzLkNvdW50ID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5Nb3ZlVG8oX2V2ZW50c1swXS5DbGllbnRYLCBfZXZlbnRzWzBdLkNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCh2YXIgZSBpbiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Z2xvYmFsOjpUb3VjaFRlc3QuVG91Y2hIaXN0b3J5LlBvaW50PihfZXZlbnRzLDEpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGluZVRvKGUuQ2xpZW50WCwgZS5DbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgVG91Y2hUZXN0XHJcbntcclxuICAgIGNsYXNzIFNldDxUPiA6SUVudW1lcmFibGU8VD5cclxuICAgICAgICB3aGVyZSBUOiBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgVFtdIF9pdGVtcztcclxuICAgICAgICBwdWJsaWMgU2V0KGludCBjYXBhY2l0eSA9IDI1NilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9pdGVtcyA9IG5ldyBUW2NhcGFjaXR5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChUIGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaiA9IC0xO1xyXG4gICAgICAgICAgICB3aGlsZSAoKytqID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaXRlbXNbal0gPT0gbnVsbCB8fCBfaXRlbXNbal0uRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfaXRlbXNbal0gPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbW92ZShpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaiA9IC0xO1xyXG4gICAgICAgICAgICB3aGlsZSAoKytqID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaXRlbXNbal0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoLS1qID4gMCAmJiBfaXRlbXNbal0uRGVhZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZW1zW2pdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChfaXRlbXNbal0uSWQgPT0gaWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2l0ZW1zW2pdLkRlYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfaXRlbXNbKytqXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKC0taiA+IDAgJiYgX2l0ZW1zW2pdLkRlYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlbXNbal0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRmluZChpZCkgIT0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFQgRmluZChpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaiA9IC0xO1xyXG4gICAgICAgICAgICB3aGlsZSAoKytqID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaXRlbXNbal0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoLS1qID4gMCAmJiBfaXRlbXNbal0uRGVhZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZW1zW2pdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChfaXRlbXNbal0uSWQgPT0gaWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHEgPSBfaXRlbXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPiAwICYmIF9pdGVtc1tqIC0gMV0uRGVhZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmID0gX2l0ZW1zW2ogKyAxXSA9PSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVtc1tqXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVtc1tqXS5EZWFkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKC0taiA+IDAgJiYgX2l0ZW1zW2pdLkRlYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVtc1tqXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZW1zW2pdLkRlYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVtc1tqICsgMV0gPSBxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaXRlbXNbaiArIDFdLkRlYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSUVudW1lcmF0b3I8VD4gR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaiA9IC0xO1xyXG4gICAgICAgICAgICB3aGlsZSAoKytqID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaXRlbXNbal0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB5aWVsZCBicmVhaztcclxuICAgICAgICAgICAgICAgIGlmICghX2l0ZW1zW2pdLkRlYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmV0dXJuIF9pdGVtc1tqXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSUVudW1lcmF0b3IgSUVudW1lcmFibGUuR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKChJRW51bWVyYWJsZTxUPil0aGlzKS5HZXRFbnVtZXJhdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
