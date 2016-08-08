import RigidBodyModule = require('./RigidBody');

/**
 * @brief   Physics engine to manage rigid bodies in the game.
 */
export class PhysicsEngine {
    /** @brief  Event to register a RigidBody. */
    public static get RegisterRigidBodyEvent(): string { return 'RegisterRigidBody' ; }
    /** @brief  Event to unregister a RigidBody. */
    public static get UnregisterRigidBodyEvent(): string { return 'UnregisterRigidBody' ; }

    /** @brief  Event to register an Obstacle. */
    public static get RegisterObstacleEvent(): string { return 'RegisterObstacle' ; }
    /** @brief  Event to unregister an Obstacle. */
    public static get UnregisterObstacleEvent(): string { return 'UnregisterObstacle' ; }


    /** @brief  List of rigid bodies. */
    private m_rigidBodies: RigidBodyModule.RigidBody[] ;

    // private m_obstacles ;

    /**
     * @brief   Instanciation of the PhysicsEngine.
     */
    constructor() {
        this.m_rigidBodies = [] ;

        addEventListener(PhysicsEngine.RegisterRigidBodyEvent, this.addRigidBody.bind(this)) ;
        addEventListener(PhysicsEngine.UnregisterRigidBodyEvent, this.removeRigidBody.bind(this)) ;

        addEventListener(PhysicsEngine.RegisterObstacleEvent, this.addObstacle.bind(this)) ;
        addEventListener(PhysicsEngine.UnregisterObstacleEvent, this.removeObstacle.bind(this)) ;
    }

    /**
     * @brief   Update the PhysicsEngine and notify RigidBody instances when
     *          needed (collision, etc).
     */
    private update(): void {

    }

    /**
     * @brief   Register a RigidBody to the PhysicsEngine.
     * @param   event   Event containing the RigidBody to register.
     */
    private addRigidBody(event: CustomEvent): void {
        this.m_rigidBodies.push(event.detail) ;
    }

    /**
     * @brief   Unregister a RigidBody from the PhysicsEngine.
     * @param   event   Event containing the RigidBody to unregister.
     */
    private removeRigidBody(event: CustomEvent): void {
        var index: number = this.m_rigidBodies.indexOf(event.detail) ;

        if (index > -1) {
            this.m_rigidBodies.splice(index, 1) ;
        }
    }

    /**
     * @brief   Register an Obstacle to the PhysicsEngine.
     * @param   event   Event containing the Obstacle to register.
     */
    private addObstacle(event: CustomEvent): void {
        // @TODO...
    }

    /**
     * @brief   Unregister an Obstacle from the PhysicsEngine.
     * @param   event   Event containing the Obstacle to unregister.
     */
    private removeObstacle(event: CustomEvent): void {
        // var index: number = this.m_rigidBodies.indexOf(event.detail) ;
        //
        // if (index > -1) {
        //     this.m_rigidBodies.splice(index, 1) ;
        // }
    }
} ;
