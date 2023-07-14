import Phaser from "phaser"

export default class Game extends Phaser.Scene {
    
    constructor() {super("game")}
    
    preload() {
        this.load.image("background", "images/bg_repeat_340x640.png")
        this.load.atlas("rcm", "rocket-mouse.png", "rocket-mouse.json")
    }
    
    create() {
        const width = this.scale.width
        const height = this.scale.height
        // this.add.image(0, 0, "background").setOrigin(0)
        this.add.tileSprite(0, 0, width, height, "background").setOrigin(0)
        this.anims.create({
            key: "rcm-run",
            frames: this.anims.generateFrameNames("rcm", {
                start: 1,
                end: 4,
                prefix: "rocketmouse_run",
                zeroPad: 2,
                suffix: ".png"}),
                frameRate: 10,
                repeat: -1})
        this.add.sprite(width/2, height*0.85, "rcm", "rocketmouse_fly01.png").play("rcm-run")
    }

    update() {}
}