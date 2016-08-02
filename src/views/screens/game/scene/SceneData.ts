/**
 * @brief   Shared scene data.
 */
export class SceneData {
    /** @brief  Offset from bottom of the scene to make players be on ground. */
    public static get PlayersOffset(): number { return 32 ; }


    /** @brief  Width of the scene. */
    private m_width: number ;

    /** @brief  Height of the scene. */
    private m_height: number ;

    /**
     * @brief   Create a new instance of the SceneData.
     */
    constructor(width: number, height: number) {
        this.m_width = width ;
        this.m_height = height ;
    }

    /** @brief  Get the width of the scene. */
    public get Width(): number { return this.m_width; }

    /** @brief  Get the height of the scene. */
    public get Height(): number { return this.m_height; }
} ;
