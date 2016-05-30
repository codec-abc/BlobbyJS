"use strict";
class Player {
    constructor(position, aabbSize, speed, maxScore) {
        this.m_aabb = Matter.Bodies.rectangle(position.x, position.y, aabbSize.x, aabbSize.y);
        this.m_aabb.isStatic = true;
        this.m_score = 0;
        var isValidMaxScore;
        isValidMaxScore = ((maxScore != undefined) && (maxScore > 0));
        this.m_maxScore = isValidMaxScore ? maxScore : Player.DefaultMaxScore();
        var isValidSpeed;
        isValidSpeed = ((speed != undefined) && (speed > 1));
        this.m_speed = isValidSpeed ? speed : Player.DefaultSpeed();
    }
    moveLeft() {
        var force = Matter.Vector.create(-this.m_speed, 0);
        Matter.Body.translate(this.m_aabb, force);
    }
    moveRight() {
        var force = Matter.Vector.create(this.m_speed, 0);
        Matter.Body.translate(this.m_aabb, force);
    }
    jump() {
    }
    score(points) {
        this.m_score += points;
        return (this.m_score >= this.m_maxScore);
    }
    registerToPhysicsEngine(world) {
        Matter.World.addBody(world, this.m_aabb);
    }
    static DefaultMaxScore() {
        return 15;
    }
    static DefaultSpeed() {
        return 3;
    }
}
exports.Player = Player;
;
