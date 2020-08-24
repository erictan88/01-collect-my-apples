/**
 * 1) Setup Hero First
 * 
 * 1A) Setup Movement Hero
 * 
 * 2) Setup Background (Tilemap)
 * 
 * 2A) Draw the bottom wall
 * 
 * 3) Setup Apple
 * 
 * 3A) Lose Life when Apple Touching Edge (Animate)
 * 
 * 3B) Point for Apple Touching Hero
 * 
 * Extra Work
 * 
 * 4) Setup Bad Apple
 * 
 * 4A) Animate Bad Apple Touching Edge
 * 
 * 4B) Lose Life when Bad Apple Touching Hero
 */
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    Hero.x += 10
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Hero.x += -5
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprite.destroy(effects.fire, 100)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Hero.x += 5
})
scene.onHitWall(SpriteKind.Food, function (sprite, location) {
    sprite.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 100)
    info.changeLifeBy(-1)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    Hero.x += -10
})
let Apple: Sprite = null
let Bad_Apple: Sprite = null
let Hero: Sprite = null
info.setLife(3)
info.setScore(0)
let speed = 20
tiles.setTilemap(tiles.createTilemap(hex`100008000101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010102020202020202020202020202020202`, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.transparency16,myTiles.tile1,myTiles.tile2], TileScale.Sixteen))
Hero = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
Hero.setPosition(80, 110)
Hero.setFlag(SpriteFlag.StayInScreen, true)
game.onUpdateInterval(3900, function () {
    Bad_Apple = sprites.create(img`
        . . . . . . . e c 7 . . . . . . 
        . . . . e e e c 7 7 e e . . . . 
        . . c e e e e c 7 e 7 7 e e . . 
        . c e e e e e c 6 e e 7 7 7 e . 
        . c e e e 7 e c c 7 4 5 4 7 e . 
        c e e e 7 7 7 7 7 7 4 5 5 7 7 e 
        c e e 7 7 7 7 7 7 7 7 4 4 7 7 e 
        c e e 7 7 7 7 7 7 7 7 7 7 7 7 e 
        c e e 7 7 7 7 7 7 7 7 7 7 7 7 e 
        c e e 7 7 7 7 7 7 7 7 7 7 7 7 e 
        c e e 7 7 7 7 7 7 7 7 7 7 4 7 e 
        . e e e 7 7 7 7 7 7 7 7 7 4 e . 
        . 7 e e 7 7 7 7 7 7 7 7 4 7 e . 
        . . 7 e e 7 7 7 7 7 4 4 7 e . . 
        . . . 7 7 e e 4 4 4 7 e e . . . 
        . . . . . 7 7 e e e e . . . . . 
        `, SpriteKind.Enemy)
    Bad_Apple.setPosition(randint(10, 150), 10)
    Bad_Apple.setVelocity(0, speed)
})
game.onUpdateInterval(3000, function () {
    Apple = sprites.create(img`
        . . . . . . . e c 7 . . . . . . 
        . . . . e e e c 7 7 e e . . . . 
        . . c e e e e c 7 e 2 2 e e . . 
        . c e e e e e c 6 e e 2 2 2 e . 
        . c e e e 2 e c c 2 4 5 4 2 e . 
        c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
        c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
        . e e e 2 2 2 2 2 2 2 2 2 4 e . 
        . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
        . . 2 e e 2 2 2 2 2 4 4 2 e . . 
        . . . 2 2 e e 4 4 4 2 e e . . . 
        . . . . . 2 2 e e e e . . . . . 
        `, SpriteKind.Food)
    Apple.setPosition(randint(10, 150), 10)
    Apple.setVelocity(0, speed)
    speed += 1
})
