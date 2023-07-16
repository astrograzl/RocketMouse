import Phaser from "phaser"
import {Scenes} from "./Global"

export default class GameOver extends Phaser.Scene {
    constructor() {super(Scenes.GameOver)}
    preload() {}
    create() {
        const {width, height} = this.scale
        /* https://ourcade.co/tools/phaser3-text-styler/ */
        this.add.text(width/2, height/2, "Game Over!", {
			fontSize: '128px',
            fontStyle: 'bold',
            color: '#FF0000', 
		}).setOrigin(0.5)
        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.stop(Scenes.GameOver)
            this.scene.stop(Scenes.Game)
            this.scene.start(Scenes.Game)
        })
    }
    update() {}
}