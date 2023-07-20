import Phaser from "phaser"
import {Textures} from "./Global"

export default class LaserObstacle extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        scene.physics.add.existing(this, true)
        const body = this.body as Phaser.Physics.Arcade.StaticBody
        const top = scene.add.image(0, 0, Textures.Stop).setOrigin(0.5, 0)
        const laser = scene.add.image(0, top.y+top.displayHeight, Textures.Laser).setOrigin(0.5, 0)
        laser.setDisplaySize(laser.width, 128)
        const bottom = scene.add.image(0, laser.y+laser.displayHeight, Textures.Stop)
                                .setOrigin(0.5, 0).setFlipY(true)
        const width = laser.displayWidth
        const height = 2*top.displayHeight + laser.displayHeight
        body.setSize(width/2, height)
        body.setOffset(-width/4, 0)
        body.position.x = this.x + body.offset.x
        body.position.y = this.y
        this.add(top)
        this.add(laser)
        this.add(bottom)
    }
    flash() {this.setVisible(!this.visible)}
}