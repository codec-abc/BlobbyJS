"use strict";
class Player {
    constructor(speed, maxScore) {
        this.m_score = 0;
        var isValidMaxScore;
        isValidMaxScore = ((maxScore != undefined) && (maxScore > 0));
        this.m_maxScore = isValidMaxScore ? maxScore : Player.DefaultMaxScore();
        var isValidSpeed;
        isValidSpeed = ((speed != undefined) && (speed > 1));
        this.m_speed = isValidSpeed ? speed : Player.DefaultSpeed();
    }
    moveLeft() {
    }
    moveRight() {
    }
    jump() {
    }
    score(points) {
        this.m_score += points;
        return (this.m_score >= this.m_maxScore);
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
