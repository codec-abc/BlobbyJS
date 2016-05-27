/**
 * @brief   A PLayer is an entity that is controlled by the user.
 */
export class Player {
    /** @brief  Current score of the Player. */
    private m_score: number ;

    /** @brief  Max score the Player must reach to win. */
    private m_maxScore: number ;

    /**
     * @brief   Create a new Player.
     * @param   maxScore    Score to make Player win.
     */
    constructor(maxScore?: number) {
        this.m_score = 0 ;

        if ((maxScore != undefined) && (maxScore > 0)) {
            this.m_maxScore = maxScore ;
        }
        else {
            this.m_score = Player.DefaultMaxScore() ;
        }
    }

    /**
     * @brief   Make the Player score.
     * @param   points  Amount of points the Player has won.
     * @return  TRUE if the player has won the game, FALSE if not.
     */
    public score(points: number) : boolean {
        this.m_score += points ;
        return (this.m_score >= this.m_maxScore) ;
    }

    /**
     * @brief   Default max score to make Player win.
     * @return  The default max score.
     */
    public static DefaultMaxScore() : number {
        return 15 ;
    }
} ;
