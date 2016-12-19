export class GameResources {
    /** @brief  Path to resources. */
    public static get ResourcesFolder() {
        return './resources' ;
    } ;

    /** @brief  Path to image resources. */
    public static get ImagesFolder() {
        return GameResources.ResourcesFolder + '/img' ;
    } ;

    /** @brief  Path to fonts resources. */
    public static get FontsFolder() {
        return GameResources.ResourcesFolder + '/fonts' ;
    } ;
}
