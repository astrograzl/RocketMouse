import Phaser from "phaser"
import {Animes, Scenes, Textures} from "../consts/Global"

export default class Game extends Phaser.Scene {
    
    constructor() {super(Scenes.Game)}
    
    preload() {}
    
    create() {
        const width = this.scale.width
        const height = this.scale.height
        // this.add.image(0, 0, "background").setOrigin(0)
        this.add.tileSprite(0, 0, width, height, Textures.Background).setOrigin(0)
        this.add.sprite(width/2, height*0.85, Textures.RocketMouse, "rocketmouse_fly01.png").play(Animes.Run)
    }

    update() {}
}