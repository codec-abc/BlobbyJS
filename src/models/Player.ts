/**
 * @brief   A PLayer is an entity that is controlled by the user.
 */
export class Player {
    /** @brief  Speed of the Player when moving. */
    private m_speed: number ;

    /** @brief  Current score of the Player. */
    private m_score: number ;

    /** @brief  Max score the Player must reach to win. */
    private m_maxScore: number ;

    /**
     * @brief   Create a new Player.
     * @param   position    Position of the Player at creation.
     * @param   aabbSize    Size of the AABB of the Player.
     * @param   speed       Speed of the Player when moving.
     * @param   maxScore    Score to make Player win.
     */
    constructor(
                speed?: number,
                maxScore?: number
               ) {
        this.m_score = 0 ;

        var isValidMaxScore: boolean ;
        isValidMaxScore = ((maxScore != undefined) && (maxScore > 0)) ;
        this.m_maxScore = isValidMaxScore ? maxScore : Player.DefaultMaxScore() ;

        var isValidSpeed: boolean ;
        isValidSpeed = ((speed != undefined) && (speed > 1)) ;
        this.m_speed = isValidSpeed ? speed : Player.DefaultSpeed() ;
    }

    /**
     * @brief   Move Player on left.
     */
    public moveLeft() : void {
    }

    /**
     * @brief   Move Player on right.
     */
    public moveRight() : void {
    }

    /**
     * @brief   Make player jump.
     */
    public jump() : void {
        // @TODO
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

    /**
     * @brief   Default speed to make Player move.
     * @return  The default speed.
     */
    public static DefaultSpeed() : number {
        return 3 ;
    }
} ;
