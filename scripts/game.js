import MenuScene from "./menu.js"
import Stars from "./stars.js"
import Background from "./background.js"
import Player from "./player.js"


export default class GameScene {
    constructor(game) {

        this.game = game
        this.stars = []
        this.Init()
    }

    Init() {
        for (let i = 0; i < 100; i++){
            this.stars.push(new Stars(Math.random() * this.game.canvas.width,  Math.random() * this.game.canvas.height))
        }
        this.background = new Background(this.game)
        this.player = new Player(this.game)
    }

    update(dt) {

        this.stars.forEach(
            (star, index) => {

                if (star.position.y > this.game.canvas.height) {
                    this.stars.splice(index, 1, new Stars(Math.random() * this.game.canvas.width, -10))
                }

                star.update(dt)
            }
        )

        this.background.update(dt)
        this.player.update(dt)

        if (this.game.checkKeyPress('Escape')) {
            this.game.setScene(MenuScene);
        }
        
    }

    render(dt, ctx, canvas) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        this.background.render(dt, ctx, canvas)

        this.stars.forEach(
            (star, index) => {
                star.render(dt, ctx, canvas)
            }
        )
        this.player.render(dt, ctx, canvas)

    }

}
