namespace SpriteKind {
    export const Cell = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Editable) {
        SelectedCellImage += 1
        if (SelectedCellImage == CellImages[SelectedCellImageType].length) {
            SelectedCellImage = 0
            SelectedCellImageType += 1
        }
        if (SelectedCellImageType == CellImages.length) {
            SelectedCellImage = 0
            SelectedCellImageType = 0
        }
        console.log("User pressed [B], selected cell image is: " + SelectedCellImage + " and selected cell image type is: " + SelectedCellImageType)
        CursorSelectedCellImage.setImage(CellImages[SelectedCellImageType][SelectedCellImage])
    } else {
        console.log("Editing is not enabled, probably because you started the simulation by pressing [Menu]! Restart to clear the board and enable editing.")
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Editable) {
        if (!(SelectedCellImageType == 7)) {
            Cell = sprites.create(CellImages[SelectedCellImageType][SelectedCellImage], SpriteKind.Cell)
            Cell.setPosition(Cursor.x, Cursor.y)
            sprites.setDataNumber(Cell, "CellType", SelectedCellImageType)
            sprites.setDataNumber(Cell, "CellTypeVariation", SelectedCellImage)
        }
        if (grid.spriteCol(Cursor) == 19) {
            DirectionMoved = -1
        } else {
            DirectionMoved = 1
        }
        grid.move(Cursor, DirectionMoved, 0)
        grid.move(CursorSelectedCellImage, DirectionMoved, 0)
        for (let CellInTile of grid.getSprites(tiles.getTileLocation(grid.spriteCol(Cursor) - DirectionMoved, grid.spriteRow(Cursor)))) {
            CellInTile.destroy()
        }
        grid.move(Cursor, DirectionMoved * -1, 0)
        grid.move(CursorSelectedCellImage, DirectionMoved * -1, 0)
        if (!(SelectedCellImageType == 7)) {
            grid.snap(Cell)
        }
        NumberOfCellsOnGrid = grid.allSprites().length
        console.log("User pressed [A], just made cell type: " + "foo" + " and there are: " + NumberOfCellsOnGrid + " cells in the sandbox!")
    } else {
        console.log("Editing is not enabled, probably because you started the simulation by pressing [Menu]! Restart to clear the board and enable editing.")
    }
})
sprites.onDestroyed(SpriteKind.Cell, function (sprite) {
    info.changeScoreBy(1)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    Editable = false
    Cursor.destroy()
    CursorSelectedCellImage.destroy()
    console.log("Editing is now disabled! The simulation will start shortly... ")
})
let CellsInPath: Sprite[] = []
let CellTypeVariation = 0
let CellType = 0
let DirectionMoved = 0
let Cell: Sprite = null
let Editable = false
let NumberOfCellsOnGrid = 0
let SelectedCellImageType = 0
let SelectedCellImage = 0
let CellImages: Image[][] = []
let CursorSelectedCellImage: Sprite = null
let Cursor: Sprite = null
tiles.setTilemap(tiles.createTilemap(hex`14000f00010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101`, img`
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    `, [myTiles.transparency16,myTiles.tile2], TileScale.Eight))
Cursor = sprites.create(img`
    a a a . . a a a 
    a . . . . . . a 
    a . . . . . . a 
    . . . . . . . . 
    . . . . . . . . 
    a . . . . . . a 
    a . . . . . . a 
    a a a . . a a a 
    `, SpriteKind.Player)
Cursor.setFlag(SpriteFlag.ShowPhysics, false)
Cursor.z = 10
grid.snap(Cursor)
grid.moveWithButtons(Cursor)
CursorSelectedCellImage = sprites.create(img`
    1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 
    `, SpriteKind.Player)
CursorSelectedCellImage.z = 9
grid.snap(CursorSelectedCellImage)
info.setScore(0)
CellImages = [
[img`
    . 9 9 9 9 9 9 . 
    9 9 9 9 9 9 9 9 
    9 9 9 8 8 9 9 9 
    9 9 8 8 8 8 9 9 
    9 8 8 8 8 8 8 9 
    9 8 8 8 8 8 8 9 
    9 9 9 9 9 9 9 9 
    . 9 9 9 9 9 9 . 
    `, img`
    . 9 9 9 9 9 9 . 
    9 9 8 8 9 9 9 9 
    9 9 8 8 8 9 9 9 
    9 9 8 8 8 8 9 9 
    9 9 8 8 8 8 9 9 
    9 9 8 8 8 9 9 9 
    9 9 8 8 9 9 9 9 
    . 9 9 9 9 9 9 . 
    `, img`
    . 9 9 9 9 9 9 . 
    9 9 9 9 9 9 9 9 
    9 8 8 8 8 8 8 9 
    9 8 8 8 8 8 8 9 
    9 9 8 8 8 8 9 9 
    9 9 9 8 8 9 9 9 
    9 9 9 9 9 9 9 9 
    . 9 9 9 9 9 9 . 
    `, img`
    . 9 9 9 9 9 9 . 
    9 9 9 9 8 8 9 9 
    9 9 9 8 8 8 9 9 
    9 9 8 8 8 8 9 9 
    9 9 8 8 8 8 9 9 
    9 9 9 8 8 8 9 9 
    9 9 9 9 8 8 9 9 
    . 9 9 9 9 9 9 . 
    `],
[img`
    . 5 5 5 5 5 5 . 
    5 5 5 5 5 5 5 5 
    5 5 4 4 4 4 5 5 
    5 5 4 5 5 4 5 5 
    5 5 4 5 5 4 5 5 
    5 5 4 4 4 4 5 5 
    5 5 5 5 5 5 5 5 
    . 5 5 5 5 5 5 . 
    `],
[img`
    . 5 5 5 5 5 5 . 
    5 5 5 5 5 5 5 5 
    5 4 4 4 4 4 4 5 
    5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 
    5 4 4 4 4 4 4 5 
    5 5 5 5 5 5 5 5 
    . 5 5 5 5 5 5 . 
    `, img`
    . 5 5 5 5 5 5 . 
    5 5 4 5 5 4 5 5 
    5 5 4 5 5 4 5 5 
    5 5 4 5 5 4 5 5 
    5 5 4 5 5 4 5 5 
    5 5 4 5 5 4 5 5 
    5 5 4 5 5 4 5 5 
    . 5 5 5 5 5 5 . 
    `],
[img`
    . 2 2 2 2 2 2 . 
    2 2 3 3 3 2 2 2 
    2 3 2 2 2 3 2 2 
    2 3 2 2 3 3 3 2 
    2 3 2 2 2 3 2 2 
    2 3 2 2 2 2 2 2 
    2 2 3 3 3 3 2 2 
    . 2 2 2 2 2 2 . 
    `, img`
    . 2 2 2 2 2 2 . 
    2 2 2 3 3 3 2 2 
    2 2 3 2 2 2 3 2 
    2 3 3 3 2 2 3 2 
    2 2 3 2 2 2 3 2 
    2 2 2 2 2 2 3 2 
    2 2 3 3 3 3 2 2 
    . 2 2 2 2 2 2 . 
    `],
[img`
    . 7 7 7 7 7 7 . 
    7 7 7 6 6 7 7 7 
    7 7 6 6 6 6 7 7 
    7 6 6 6 6 6 6 7 
    7 7 7 6 6 7 7 7 
    7 7 7 6 6 7 7 7 
    7 7 7 6 6 7 7 7 
    . 7 7 7 7 7 7 . 
    `, img`
    . 7 7 7 7 7 7 . 
    7 7 7 7 6 7 7 7 
    7 7 7 7 6 6 7 7 
    7 6 6 6 6 6 6 7 
    7 6 6 6 6 6 6 7 
    7 7 7 7 6 6 7 7 
    7 7 7 7 6 7 7 7 
    . 7 7 7 7 7 7 . 
    `, img`
    . 7 7 7 7 7 7 . 
    7 7 7 6 6 7 7 7 
    7 7 7 6 6 7 7 7 
    7 7 7 6 6 7 7 7 
    7 6 6 6 6 6 6 7 
    7 7 6 6 6 6 7 7 
    7 7 7 6 6 7 7 7 
    . 7 7 7 7 7 7 . 
    `, img`
    . 7 7 7 7 7 7 . 
    7 7 7 6 7 7 7 7 
    7 7 6 6 7 7 7 7 
    7 6 6 6 6 6 6 7 
    7 6 6 6 6 6 6 7 
    7 7 6 6 7 7 7 7 
    7 7 7 6 7 7 7 7 
    . 7 7 7 7 7 7 . 
    `],
[img`
    . c c c c c c . 
    c c c c c c c c 
    c c c c c c c c 
    c c c c c c c c 
    c c c c c c c c 
    c c c c c c c c 
    c c c c c c c c 
    . c c c c c c . 
    `],
[img`
    . 2 2 2 2 2 2 . 
    2 2 c 2 2 c 2 2 
    2 2 2 c c 2 2 2 
    2 c 2 2 2 2 c 2 
    2 2 2 2 2 2 2 2 
    2 2 c c c c 2 2 
    2 2 c 2 2 c 2 2 
    . 2 2 2 2 2 2 . 
    `],
[img`
    2 d d d d d d 2 
    d 2 d d d d 2 d 
    d d 2 d d 2 d d 
    d d d 2 2 d d d 
    d d d 2 2 d d d 
    d d 2 d d 2 d d 
    d 2 d d d d 2 d 
    2 d d d d d d 2 
    `]
]
SelectedCellImage = 0
SelectedCellImageType = 0
NumberOfCellsOnGrid = 0
let Generation = 0
Editable = true
CursorSelectedCellImage.setImage(CellImages[SelectedCellImageType][SelectedCellImage])
console.log("Welcome to Sam Hogan's Game of Cells (Unofficial) Sandbox console!")
console.log("Written by Unsigned_Arduino on the MakeCode forums. (forum.makecode.com)")
game.onUpdate(function () {
    CursorSelectedCellImage.setPosition(Cursor.x, Cursor.y)
})
game.onUpdateInterval(500, function () {
    if (!(Editable)) {
        for (let Cell of grid.allSprites()) {
            CellType = sprites.readDataNumber(Cell, "CellType")
            CellTypeVariation = sprites.readDataNumber(Cell, "CellTypeVariation")
            if (CellType == 0) {
                console.log("Cell type is mover")
                if (CellTypeVariation == 0) {
                    CellsInPath = grid.getSprites(tiles.getTileLocation(grid.spriteCol(Cell), grid.spriteRow(Cell) - 1))
                    if (CellsInPath.length == 0) {
                        grid.move(Cell, 0, -1)
                    } else {
                        if (sprites.readDataNumber(CellsInPath[0], "CellType") == 5) {
                        	
                        } else if (sprites.readDataNumber(CellsInPath[0], "CellType") == 6) {
                            CellsInPath[0].destroy(effects.spray, 100)
                            Cell.destroy()
                        }
                    }
                } else if (CellTypeVariation == 1) {
                    grid.move(Cell, 1, 0)
                } else if (CellTypeVariation == 2) {
                    grid.move(Cell, 0, 1)
                } else {
                    grid.move(Cell, -1, 0)
                }
            } else if (CellType == 1) {
                console.log("Cell type is pushable")
            } else if (CellType == 2) {
                console.log("Cell type is slider")
            } else if (CellType == 3) {
                console.log("Cell type is rotator")
            } else if (CellType == 4) {
                console.log("Cell type is generator")
            } else if (CellType == 5) {
                console.log("Cell type is immobile")
            } else {
                console.log("Cell type is enemy")
            }
        }
        Generation += 1
        NumberOfCellsOnGrid = grid.allSprites().length
        console.log("Finished generation " + Generation + " with " + NumberOfCellsOnGrid + " cells!")
    }
})
