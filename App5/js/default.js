﻿// For an introduction to the Split template, see the following documentation:
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

            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }).then(init));
        }
    });

    var stage;
    function init() {
        var mc1 = document.getElementById("video1");
        var mc2 = document.getElementById("video2");
        var mc3 = document.getElementById("contenthost");
        var myTimeline = new TimelineLite();
 
        //this will have 3 tween starting one after the one before is done
        myTimeline.append(new TweenMax(mc1, 0, { y: 0, x: -1080 }));     
        myTimeline.append(new TweenMax(mc2, 0, { y: 0, x: -1080 }));
        myTimeline.append(new TweenMax(mc3, 0, { y: 0, x: -1080 }));
        myTimeline.append(new TweenMax(mc1, 2, { y: 0, x: 0 }));
        myTimeline.append(new TweenMax(mc2, 1, { y: 0, x: 0, repeat: 2 }));
        myTimeline.append(new TweenMax(mc3, 2, { bezier: [{ x: 0, y:640 }, { x: 0, y: 0 }], orientToBezier: true, ease: Bounce.easeOut }));
 
        myTimeline.play();
        // for (var i:int = 0; i < gridBoxes.length; i++) { }

        stage = new createjs.Stage("gameCanvas");
        createjs.Ticker.addEventListener("tick", stage);

        // Create the MovieClip
        var mc = new createjs.MovieClip(null, 0, true, {
            start: 0,
            middle: 40
        });
        stage.addChild(mc);

        // Create the States. Each state is just a circle shape.
        var state1 = new createjs.Shape(
        new createjs.Graphics().beginFill("#999999")
            .drawCircle(100, 100, 100));
        var state2 = new createjs.Shape(
        new createjs.Graphics().beginFill("#5a9cfb")
            .drawCircle(100, 100, 100));

        // Create a tween for each shape, animating from one side to the other.
        mc.timeline.addTween(
        createjs.Tween.get(state1)
            .to({
                x: 0
            }).to({
                x: 880
            }, 40).to({
                x: 0
            }, 40));
        mc.timeline.addTween(
        createjs.Tween.get(state2)
            .to({
                x: 880
            }).to({
                x: 0
            }, 40).to({
                x: 880
            }, 40));

        // Play the animation starting from the middle. See the MovieClip constructor above where the labels are specified.
        mc.gotoAndPlay("middle");
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
