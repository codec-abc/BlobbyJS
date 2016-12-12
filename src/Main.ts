/// <reference path="../typings/node/node.d.ts"/>

import GameScreen = require('./views/screens/game/GameScreen');

let gameScreen : GameScreen.GameScreen = new GameScreen.GameScreen();
var isRunningInElectron = (<any> window).isRunningInElectron;
var modules = (<any> window).nodeModules;
if(isRunningInElectron)
{
    //import * as fileSystem from "fs";
    // let fs : typeof fileSystem  = nodeModules.fs;
    // fs.writeFile("test.txt", "Hey there!", function(err) 
}