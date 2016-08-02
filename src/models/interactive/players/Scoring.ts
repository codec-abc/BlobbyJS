/**
 * @brief   Manage the scoring of a Player.
 */
export class Scoring {
    /** @brief  Default max score to make Player win. */
    public static get DefaultMaxPoints() : number {
        return 15 ;
    }


    /** @brief  Current score of the Player. */
    private m_points: number ;

    /** @brief  Max score the Player must reach to win. */
    private m_maxPoints: number ;

    /**
     * @brief   Create a new instance of Scoring.
     * @param   maxPoints   Score to make Player win.
     */
    constructor(maxPoints?: number) {
        this.m_points = 0 ;

        var areValidMaxPoints: boolean ;
        areValidMaxPoints = ((maxPoints != undefined) && (maxPoints > 0)) ;
        this.m_maxPoints = areValidMaxPoints ? maxPoints : Scoring.DefaultMaxPoints ;
    }

    /**
     * @brief   Make the Player score.
     * @param   points  Amount of points the Player has won.
     * @return  TRUE if the player has won the game, FALSE if not.
     */
    public score(points: number) : boolean {
        this.m_points += points ;
        return (this.m_points >= this.m_maxPoints) ;
    }

    /**
     * @brief   Get the score of the player.
     */
    public get CurrentPoints() : number {
        return this.m_points ;
    }
} ;
