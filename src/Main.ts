/// <reference path="../typings/node/node.d.ts"/>

import GameScreen = require('./views/screens/game/GameScreen');
import * as fileSystem from "fs";

export module Main
{
    export function start(isRunningInElectron : boolean, nodeModules : any)
    {
        let gameScreen : GameScreen.GameScreen = new GameScreen.GameScreen();
        if(isRunningInElectron)
        {
            // could be using node module here is they were registered in the nodeModules object.
            
            /*
            let fs : typeof fileSystem  = nodeModules.fs;
            fs.writeFile("test.txt", "Hey there!", function(err) 
            {
                if(err) 
                {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
            */ 
        }
    }
}