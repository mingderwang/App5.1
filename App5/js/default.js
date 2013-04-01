// For an introduction to the Split template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232447
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }

            args.setPromise(WinJS.UI.processAll().then(init));
        }
    });

    function init() {
        stage1();
    }

    function stage1() {
        var mc1 = document.getElementById("video1");
        mc1.src = "movies/1080_1920_20s.mp4";
        mc1.width = 1080;
        mc1.height = 1920;
        mc1.addEventListener("MSPointerUp", stage2, false);
        var myTimeline = new TimelineLite();

        var mc2 = document.getElementById("video2");


        //this will have 3 tween starting one after the one before is done
        myTimeline.append(new TweenMax(mc1, 0, { y: 0, x: -1080 }));
        myTimeline.append(new TweenMax(mc1, 2, { y: 0, x: 0 }));
        myTimeline.play();
        
    }
    function stage2() {
        var mc1 = document.getElementById("video1");
        mc1.src = "movies/1080_640_20s.mp4";
        mc1.width = 1080;
        mc1.height = 640;
        mc1.removeEventListener("MSPointerUp", stage2, false);
        mc1.addEventListener("MSPointerUp", stage1, false);

        var mc2 = document.getElementById("video2");
        mc2.src = "http://www.gopicfreak.com/wp-content/uploads/2013/03/beautiful-girl-wallpaper-115.jpg";
        var mc3 = document.getElementById("contenthost");
        var myTimeline = new TimelineLite();

        //this will have 3 tween starting one after the one before is done
        myTimeline.append(new TweenMax(mc1, 0, { y: 0, x: -1080 }));
        myTimeline.append(new TweenMax(mc2, 0, { y: 0, x: -1080 }));
        myTimeline.append(new TweenMax(mc3, 0, { y: 0, x: -1080 }));
        myTimeline.append(new TweenMax(mc1, 2, { y: 0, x: 0 }));
        myTimeline.append(new TweenMax(mc2, 1, { y: 0, x: 0 }));
        myTimeline.append(new TweenMax(mc3, 2, { y: 0, x: 0 , ease: Bounce.easeOut }));
//        myTimeline.append(new TweenMax(mc3, 2, { bezier: [{ x: 0, y: 640 }, { x: 0, y: 0 }], orientToBezier: true, ease: Bounce.easeOut }));

        myTimeline.play();
        // for (var i:int = 0; i < gridBoxes.length; i++) { }

        // for WinJS navigator
        if (nav.location) {
            nav.history.current.initialPlaceholder = true;
            return nav.navigate(nav.location, nav.state);
        } else {
            return nav.navigate(Application.navigator.home);
        }
    }
    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
