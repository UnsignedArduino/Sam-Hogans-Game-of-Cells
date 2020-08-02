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
function moveCell (sprite: Sprite, col: number, row: number) {
    CellsInPath = grid.getSprites(tiles.getTileLocation(grid.spriteCol(sprite) + col, grid.spriteRow(sprite) + row))
    // Move cell if nothing in way, else run through each check than move if can
    if (CellsInPath.length == 0) {
        grid.move(sprite, col, row)
    } else {
        // If type is slider
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // elif type is immobile
        // 
        // 
        // 
        // 
        // elif type is enemy
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // move cells in front and self if we have not returned
        if (sprites.readDataNumber(CellsInPath[0], "CellType") == 2) {
            // If slider variation goes left right
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // else the slider must go up and down
            if (sprites.readDataNumber(CellsInPath[0], "CellTypeVariation") == 0) {
                // If row == -1 (up)
                // 
                // 
                // elif row == 1 (down)
                // 
                // 
                // 
                // elif col == -1 (left)
                // 
                // 
                // 
                // else col must be 1
                if (row < 0) {
                    return
                } else if (row > 0) {
                    return
                } else if (col < 0) {
                	
                } else {
                	
                }
            } else {
                // If row == -1 (up)
                // 
                // 
                // elif row == 1 (down)
                // 
                // 
                // 
                // elif col == -1 (left)
                // 
                // 
                // 
                // else col must be 1
                if (row < 0) {
                	
                } else if (row > 0) {
                	
                } else if (col < 0) {
                    return
                } else {
                    return
                }
            }
        } else if (sprites.readDataNumber(CellsInPath[0], "CellType") == 5) {
            return
        } else if (sprites.readDataNumber(CellsInPath[0], "CellType") == 6) {
            CellsInPath[0].destroy(effects.spray, 100)
            sprite.destroy()
            return
        }
        moveCell(CellsInPath[0], col, row)
        moveCell(sprite, col, row)
    }
    return
}
sprites.onDestroyed(SpriteKind.Cell, function (sprite) {
    if (!(Editable)) {
        info.changeScoreBy(1)
    }
})
function cloneCell (sprite: Sprite, col: number, row: number) {
    ClonedCell = sprites.create(sprite.image, SpriteKind.Cell)
    sprites.setDataNumber(ClonedCell, "CellType", sprites.readDataNumber(sprite, "CellType"))
    sprites.setDataNumber(ClonedCell, "CellTypeVariation", sprites.readDataNumber(sprite, "CellType"))
    grid.place(ClonedCell, tiles.getTileLocation(col, row))
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    Editable = false
    Cursor.destroy()
    CursorSelectedCellImage.destroy()
    console.log("Editing is now disabled! The simulation will start shortly... ")
})
function rotateCell (sprite: Sprite, dir: boolean) {
    // if rotate (true)
    // 
    // rotate right by changing the variation type (because the images are in sequential order rotating by 90 degrees right)
    // 
    // else rotate left
    // 
    // rotate left by changing the variation type (because the images are in sequential order rotating by 90 degrees right)
    // 
    // 
    // 
    // 
    // update the image
    if (dir) {
        sprites.changeDataNumberBy(sprite, "CellTypeVariation", 1)
        if (sprites.readDataNumber(sprite, "CellTypeVariation") == CellImages[sprites.readDataNumber(sprite, "CellType")].length) {
            sprites.setDataNumber(sprite, "CellTypeVariation", 0)
        }
    } else {
        sprites.changeDataNumberBy(sprite, "CellTypeVariation", -1)
        if (sprites.readDataNumber(sprite, "CellTypeVariation") == -1) {
            sprites.setDataNumber(sprite, "CellTypeVariation", CellImages[sprites.readDataNumber(sprite, "CellType")].length - 1)
        }
    }
    sprite.setImage(CellImages[sprites.readDataNumber(sprite, "CellType")][sprites.readDataNumber(sprite, "CellTypeVariation")])
}
let Location: Sprite[] = []
let CellTypeVariation = 0
let CellType = 0
let ClonedCell: Sprite = null
let CellsInPath: Sprite[] = []
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
// Use control.heapSnapshot() if needed (prints to JS console in dev tools in browser)
game.onUpdateInterval(500, function () {
    if (!(Editable)) {
        for (let Cell of grid.allSprites()) {
            CellType = sprites.readDataNumber(Cell, "CellType")
            CellTypeVariation = sprites.readDataNumber(Cell, "CellTypeVariation")
            // mover
            // up
            // 
            // 
            // 
            // 
            // right
            // 
            // 
            // 
            // 
            // down
            // 
            // 
            // 
            // left
            // 
            // 
            // 
            // 
            // 
            // pushable
            // 
            // 
            // 
            // slider
            // 
            // 
            // rotator
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // generator
            // 
            // up
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // right
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // down
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // left
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // immobile
            // 
            // 
            // enemy
            if (CellType == 0) {
                if (CellTypeVariation == 0) {
                    moveCell(Cell, 0, -1)
                } else if (CellTypeVariation == 1) {
                    moveCell(Cell, 1, 0)
                } else if (CellTypeVariation == 2) {
                    moveCell(Cell, 0, 1)
                } else {
                    moveCell(Cell, -1, 0)
                }
            } else if (CellType == 1) {
            	
            } else if (CellType == 2) {
            	
            } else if (CellType == 3) {
                for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Top, 1)) {
                    rotateCell(CellInTile, CellTypeVariation == 0)
                }
                for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Right, 1)) {
                    rotateCell(CellInTile, CellTypeVariation == 0)
                }
                for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Bottom, 1)) {
                    rotateCell(CellInTile, CellTypeVariation == 0)
                }
                for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Left, 1)) {
                    rotateCell(CellInTile, CellTypeVariation == 0)
                }
            } else if (CellType == 4) {
                if (CellTypeVariation == 0) {
                    for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Bottom, 1)) {
                        Location = grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Top, 1)
                        if (Location.length > 0) {
                            moveCell(Location[0], 0, -1)
                        }
                        Location = grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Top, 1)
                        if (Location.length == 0) {
                            cloneCell(CellInTile, grid.spriteCol(Cell), grid.spriteRow(Cell) - 1)
                        }
                    }
                } else if (CellTypeVariation == 1) {
                    for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Left, 1)) {
                        Location = grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Right, 1)
                        if (Location.length > 0) {
                            moveCell(Location[0], 1, 0)
                        }
                        Location = grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Right, 1)
                        if (Location.length == 0) {
                            cloneCell(CellInTile, grid.spriteCol(Cell) + 1, grid.spriteRow(Cell))
                        }
                    }
                } else if (CellTypeVariation == 2) {
                    for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Top, 1)) {
                        Location = grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Bottom, 1)
                        if (Location.length > 0) {
                            moveCell(Location[0], 0, 1)
                        }
                        Location = grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Bottom, 1)
                        if (Location.length == 0) {
                            cloneCell(CellInTile, grid.spriteCol(Cell), grid.spriteRow(Cell) + 1)
                        }
                    }
                } else {
                    for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Right, 1)) {
                        Location = grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Left, 1)
                        if (Location.length > 0) {
                            moveCell(Location[0], -1, 0)
                        }
                        Location = grid.lineAdjacentSprites(grid.getLocation(Cell), CollisionDirection.Left, 1)
                        if (Location.length == 0) {
                            cloneCell(CellInTile, grid.spriteCol(Cell) - 1, grid.spriteRow(Cell))
                        }
                    }
                }
            } else if (CellType == 5) {
            	
            } else {
            	
            }
        }
        Generation += 1
        NumberOfCellsOnGrid = grid.allSprites().length
        console.log("Finished generation " + Generation + " with " + NumberOfCellsOnGrid + " cells on the grid!")
    }
})
