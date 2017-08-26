Bridge.assembly("TouchTest", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,TouchTest,System.Collections.Generic];
    $m($n[1].App, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"AttachTouchEvents","is":true,"t":8,"pi":[{"n":"canvas","pt":HTMLCanvasElement,"ps":0}],"sn":"AttachTouchEvents","rt":$n[0].Void,"p":[HTMLCanvasElement]},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[0].Void},{"a":1,"n":"OnLoad","is":true,"t":8,"pi":[{"n":"e","pt":Event,"ps":0}],"sn":"OnLoad","rt":$n[0].Void,"p":[Event]},{"a":1,"n":"OnTouchCancel","is":true,"t":8,"pi":[{"n":"e","pt":TouchEvent,"ps":0}],"sn":"OnTouchCancel","rt":$n[0].Void,"p":[TouchEvent]},{"a":1,"n":"OnTouchEnd","is":true,"t":8,"pi":[{"n":"e","pt":TouchEvent,"ps":0}],"sn":"OnTouchEnd","rt":$n[0].Void,"p":[TouchEvent]},{"a":1,"n":"OnTouchEnter","is":true,"t":8,"pi":[{"n":"e","pt":TouchEvent,"ps":0}],"sn":"OnTouchEnter","rt":$n[0].Void,"p":[TouchEvent]},{"a":1,"n":"OnTouchLeave","is":true,"t":8,"pi":[{"n":"e","pt":TouchEvent,"ps":0}],"sn":"OnTouchLeave","rt":$n[0].Void,"p":[TouchEvent]},{"a":1,"n":"OnTouchMove","is":true,"t":8,"pi":[{"n":"e","pt":TouchEvent,"ps":0}],"sn":"OnTouchMove","rt":$n[0].Void,"p":[TouchEvent]},{"a":1,"n":"OnTouchStart","is":true,"t":8,"pi":[{"n":"e","pt":TouchEvent,"ps":0}],"sn":"OnTouchStart","rt":$n[0].Void,"p":[TouchEvent]},{"a":1,"n":"Redraw","is":true,"t":8,"sn":"Redraw","rt":$n[0].Void},{"a":1,"n":"_canvas","is":true,"t":4,"rt":HTMLCanvasElement,"sn":"_canvas"},{"a":1,"n":"_context","is":true,"t":4,"rt":CanvasRenderingContext2D,"sn":"_context"},{"a":1,"n":"_history","is":true,"t":4,"rt":$n[1].Set$1(TouchTest.TouchHistory),"sn":"_history"}]}; });
    $m($n[1].Item, function () { return {"att":1048704,"a":4,"m":[{"a":3,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Dead","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Dead","t":8,"rt":$n[0].Boolean,"fg":"Dead","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":2,"n":"set_Dead","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"Dead"},"fn":"Dead"},{"a":2,"n":"Id","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_Id","t":8,"rt":$n[0].Int32,"fg":"Id","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":2,"n":"set_Id","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"Id"},"fn":"Id"}]}; });
    $m($n[1].Set$1, function (T) { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].Int32],"pi":[{"n":"capacity","dv":256,"o":true,"pt":$n[0].Int32,"ps":0}],"sn":"ctor"},{"a":2,"n":"Add","t":8,"pi":[{"n":"i","pt":T,"ps":0}],"sn":"Add","rt":$n[0].Void,"p":[T]},{"a":2,"n":"Contains","t":8,"pi":[{"n":"id","pt":$n[0].Int32,"ps":0}],"sn":"Contains","rt":$n[0].Boolean,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"Find","t":8,"pi":[{"n":"id","pt":$n[0].Int32,"ps":0}],"sn":"Find","rt":T,"p":[$n[0].Int32]},{"a":2,"n":"GetEnumerator","t":8,"sn":"getEnumerator","rt":$n[2].IEnumerator$1(T)},{"a":2,"n":"Remove","t":8,"pi":[{"n":"id","pt":$n[0].Int32,"ps":0}],"sn":"Remove","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"_items","t":4,"rt":System.Array.type(T),"sn":"_items"}]}; });
    $m($n[1].TouchHistory, function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"AddEvent","t":8,"pi":[{"n":"t","pt":Touch,"ps":0}],"sn":"AddEvent","rt":$n[0].Void,"p":[Touch]},{"a":2,"n":"Draw","t":8,"pi":[{"n":"context","pt":CanvasRenderingContext2D,"ps":0}],"sn":"Draw","rt":$n[0].Void,"p":[CanvasRenderingContext2D]},{"a":1,"n":"_events","t":4,"rt":$n[2].List$1(TouchTest.TouchHistory.Point),"sn":"_events"}]}; });
    $m($n[1].TouchHistory.Point, function () { return {"td":$n[1].TouchHistory,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].DateTime,Touch],"pi":[{"n":"time","pt":$n[0].DateTime,"ps":0},{"n":"t","pt":Touch,"ps":1}],"sn":"ctor"},{"a":2,"n":"ClientX","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_ClientX","t":8,"rt":$n[0].Int32,"fg":"ClientX","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_ClientX","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"ClientX"},"fn":"ClientX"},{"a":2,"n":"ClientY","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_ClientY","t":8,"rt":$n[0].Int32,"fg":"ClientY","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_ClientY","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"ClientY"},"fn":"ClientY"},{"a":2,"n":"Force","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Force","t":8,"rt":$n[0].Double,"fg":"Force","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},"s":{"a":1,"n":"set_Force","t":8,"p":[$n[0].Double],"rt":$n[0].Void,"fs":"Force"},"fn":"Force"},{"a":2,"n":"PageX","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_PageX","t":8,"rt":$n[0].Int32,"fg":"PageX","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_PageX","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"PageX"},"fn":"PageX"},{"a":2,"n":"PageY","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_PageY","t":8,"rt":$n[0].Int32,"fg":"PageY","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_PageY","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"PageY"},"fn":"PageY"},{"a":2,"n":"RadiusX","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_RadiusX","t":8,"rt":$n[0].Int32,"fg":"RadiusX","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_RadiusX","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"RadiusX"},"fn":"RadiusX"},{"a":2,"n":"RadiusY","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_RadiusY","t":8,"rt":$n[0].Int32,"fg":"RadiusY","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_RadiusY","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"RadiusY"},"fn":"RadiusY"},{"a":2,"n":"RotationAngle","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_RotationAngle","t":8,"rt":$n[0].Int32,"fg":"RotationAngle","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_RotationAngle","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"RotationAngle"},"fn":"RotationAngle"},{"a":2,"n":"ScreenX","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_ScreenX","t":8,"rt":$n[0].Int32,"fg":"ScreenX","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_ScreenX","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"ScreenX"},"fn":"ScreenX"},{"a":2,"n":"ScreenY","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_ScreenY","t":8,"rt":$n[0].Int32,"fg":"ScreenY","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_ScreenY","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"ScreenY"},"fn":"ScreenY"},{"a":2,"n":"Time","t":16,"rt":$n[0].DateTime,"g":{"a":2,"n":"get_Time","t":8,"rt":$n[0].DateTime,"fg":"Time","box":function ($v) { return Bridge.box($v, System.DateTime, System.DateTime.format);}},"s":{"a":1,"n":"set_Time","t":8,"p":[$n[0].DateTime],"rt":$n[0].Void,"fs":"Time"},"fn":"Time"}]}; });
});
