import Phaser from "phaser"
import {Animes, Scenes, Textures, Mouse} from "./Global"

export default class RocketMouse extends Phaser.GameObjects.Container {

    private cursor: Phaser.Types.Input.Keyboard.CursorKeys
    private flames: Phaser.GameObjects.Sprite
    private mouse: Phaser.GameObjects.Sprite
    private being = Mouse.Running
    /* TODO: private energy: number */
    public score = 1000

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y); console.log("Rocket Mousse")
        scene.physics.add.existing(this)
        this.cursor = scene.input.keyboard.createCursorKeys()
        this.flames = scene.add.sprite(-63, -15, Textures.RocketMouse).play(Animes.Jet)
        this.mouse = scene.add.sprite(0, 0, Textures.RocketMouse).play(Animes.Run).setOrigin(0.5, 1)
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(this.mouse.width/2, this.mouse.height/2)
        body.setOffset(-this.mouse.width/4, -2*this.mouse.height/3)
        body.setCollideWorldBounds(true)
        body.setVelocityX(512) // run
        this.add(this.flames)
        this.add(this.mouse)
        this.jetpack(false)
    }

    jetpack(on: boolean) {
        const body = this.body as Phaser.Physics.Arcade.Body
        if (on && this.score > 0) {
            body.setAcceleration(128, -512)
            this.mouse.play(Animes.Fly, true)
            this.flames.setVisible(true)
            this.score--
        } else {
            body.setAcceleration(0, 0)
            this.flames.setVisible(false)
        }
    }

    death() {console.log("+")
        if (this.being == Mouse.Dead) return
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setVelocityX(body.velocity.x-10)
        body.setAcceleration(0, 0)
        this.mouse.play(Animes.Dead)
        this.being = Mouse.Killed
        this.jetpack(false)
    }

    preUpdate() {
        const body = this.body as Phaser.Physics.Arcade.Body        
        switch (this.being) {
            case Mouse.Dead: { // Let dead rest in peace
                // this.scene.scene.stop(Scenes.Game)
                this.scene.scene.run(Scenes.GameOver)
            } break /* FIXME */
            
            case Mouse.Killed: {
                if (body.velocity.x < 10) {
                    body.setVelocity(0, 0)
                    this.being = Mouse.Dead
                    console.log("Rest in Peace")
                } else { // Slowly fall on the ground
                    if (body.blocked.down) {this.being = Mouse.Running}
                }
            } break
            
            case Mouse.Running: {
                if (body.blocked.up) {
                    this.death()
                    return
                } /* There is a reason for a helmet when flying */
                if (body.blocked.down) this.mouse.play(Animes.Run, true)
                else if (body.velocity.y > 0) this.mouse.play(Animes.Fall, true)
                if (this.cursor.space?.isDown) this.jetpack(true)
                else this.jetpack(false)
            } break
        }
    }
}
