/**
 * Events for physics engine.
 */
export class PhysicsEvents {
    /** @brief  Event to register a RigidBody. */
    public static get RegisterRigidBodyEvent(): string { return 'RegisterRigidBody' ; }
    /** @brief  Event to unregister a RigidBody. */
    public static get UnregisterRigidBodyEvent(): string { return 'UnregisterRigidBody' ; }

    /** @brief  Event to register an Obstacle. */
    public static get RegisterObstacleEvent(): string { return 'RegisterObstacle' ; }
    /** @brief  Event to unregister an Obstacle. */
    public static get UnregisterObstacleEvent(): string { return 'UnregisterObstacle' ; }
}
