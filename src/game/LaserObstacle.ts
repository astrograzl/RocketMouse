import Phaser from "phaser"
import {Textures} from "../consts/Global"

export default class LaserObstacle extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        scene.physics.add.existing(this, true)
        const body = this.body as Phaser.Physics.Arcade.StaticBody
        const top = scene.add.image(0, 0, Textures.Stop).setOrigin(0.5, 0)
        const middle = scene.add.image(0, top.y+top.displayHeight, Textures.Laser).setOrigin(0.5, 0)
        middle.setDisplaySize(middle.width, 128)
        const bottom = scene.add.image(0, middle.y+middle.displayHeight, Textures.Stop)
        .setOrigin(0.5, 0).setFlipY(true)
        const width = top.displayWidth
        const height = 2*top.displayHeight + middle.displayHeight
        body.setSize(width, height)
        body.setOffset(-width/2, 0)
        body.position.x = this.x + body.offset.x
        body.position.y = this.y
        this.add(top)
        this.add(middle)
        this.add(bottom)
    }
}