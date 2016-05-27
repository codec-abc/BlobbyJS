"use strict";
class Player {
    constructor(maxScore) {
        this.m_score = 0;
        if ((maxScore != undefined) && (maxScore > 0)) {
            this.m_maxScore = maxScore;
        }
        else {
            this.m_score = Player.DefaultMaxScore();
        }
    }
    score(points) {
        this.m_score += points;
        return (this.m_score >= this.m_maxScore);
    }
    static DefaultMaxScore() {
        return 15;
    }
}
exports.Player = Player;
;
