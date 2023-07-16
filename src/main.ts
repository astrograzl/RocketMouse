import Phaser from 'phaser'

import Boot from "./Boot"
import Game from "./Game"
import GameOver from "./GameOver"
import HelloWorld from './HelloWorld'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1840,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true,
		},
	},
	scene: [Boot, Game, GameOver, HelloWorld],
}

export default new Phaser.Game(config)
