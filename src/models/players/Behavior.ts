/**
 * @brief   Behavior of a Player.
 */
export class Behavior {
    /** @brief  Default max score to make Player win. */
    public static get DefaultMaxScore() : number {
        return 15 ;
    }

    /** @brief  Default speed to make Player move. */
    public static get DefaultSpeed() : number { return 3 ; }


    /** @brief  Speed of the Player when moving. */
    private m_speed: number ;

    /** @brief  Current score of the Player. */
    private m_score: number ;

    /** @brief  Max score the Player must reach to win. */
    private m_maxScore: number ;


    /**
     * @brief   Create a new Behavior.
     * @param   speed       Speed of the Player when moving.
     * @param   maxScore    Score to make Player win.
     */
    constructor(speed?: number, maxScore?: number) {
        this.m_score = 0 ;

        var isValidMaxScore: boolean ;
        isValidMaxScore = ((maxScore != undefined) && (maxScore > 0)) ;
        this.m_maxScore = isValidMaxScore ? maxScore : Behavior.DefaultMaxScore ;

        var isValidSpeed: boolean ;
        isValidSpeed = ((speed != undefined) && (speed > 1)) ;
        this.m_speed = isValidSpeed ? speed : Behavior.DefaultSpeed ;
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
} ;
