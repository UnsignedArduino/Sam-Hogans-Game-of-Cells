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
            CellThing = sprites.create(CellImages[SelectedCellImageType][SelectedCellImage], SpriteKind.Cell)
            CellThing.setPosition(Cursor.x, Cursor.y)
            sprites.setDataNumber(CellThing, "CellType", SelectedCellImageType)
            sprites.setDataNumber(CellThing, "CellTypeVariation", SelectedCellImage)
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
            grid.snap(CellThing)
        }
        NumberOfCellsOnGrid = grid.allSprites().length
        console.log("User pressed [A], just made cell type: " + "foo" + " and there are: " + NumberOfCellsOnGrid + " cells in the sandbox!")
    } else {
        console.log("Editing is not enabled, probably because you started the simulation by pressing [Menu]! Restart to clear the board and enable editing.")
    }
})
function moveCell (sprite: Sprite, col: number, row: number): any {
    CellsInPath = grid.getSprites(grid.add(grid.getLocation(sprite), col, row))
    if (CellsInPath.length == 0) {
        if (grid.spriteRow(sprite) == 0 && row < 0) {
            return false
        } else if (grid.spriteRow(sprite) == grid.numRows() - 1 && row > 0) {
            return false
        } else if (grid.spriteCol(sprite) == 0 && col < 0) {
            return false
        } else if (grid.spriteCol(sprite) == grid.numColumns() - 1 && col > 0) {
            return false
        } else {
            grid.move(sprite, col, row)
            return true
        }
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
                if (row < 0) {
                    return false
                } else if (row > 0) {
                    return false
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
                    return false
                } else {
                    return false
                }
            }
        } else if (sprites.readDataNumber(CellsInPath[0], "CellType") == 5) {
            return false
        } else if (sprites.readDataNumber(CellsInPath[0], "CellType") == 6 && !(sprites.readDataNumber(sprite, "CellType") == 6)) {
            CellsInPath[0].destroy(effects.spray, 100)
            sprite.destroy()
            return false
        }
        if (moveCell(CellsInPath[0], col, row)) {
            moveCell(sprite, col, row)
        } else {
            return false
        }
    }
}
sprites.onDestroyed(SpriteKind.Cell, function (sprite) {
    if (!(Editable)) {
        info.changeScoreBy(1)
    }
})
function cloneCell (sprite: Sprite, col: number, row: number) {
    ClonedCell = sprites.create(sprite.image, SpriteKind.Cell)
    sprites.setDataNumber(ClonedCell, "CellType", sprites.readDataNumber(sprite, "CellType"))
    sprites.setDataNumber(ClonedCell, "CellTypeVariation", sprites.readDataNumber(sprite, "CellTypeVariation"))
    grid.place(ClonedCell, tiles.getTileLocation(col, row))
}
function makeCursor () {
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
    sprites.setDataBoolean(Cursor, "Skip", true)
    grid.snap(Cursor)
    grid.moveWithButtons(Cursor)
    CursorSelectedCellImage = sprites.create(CellImages[SelectedCellImageType][SelectedCellImage], SpriteKind.Player)
    CursorSelectedCellImage.z = 9
    sprites.setDataBoolean(CursorSelectedCellImage, "Skip", true)
    grid.snap(CursorSelectedCellImage)
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Editable) {
        game.showLongText("Please select what you want to do:\\n" + "0 - cancel\\n" + "1 - start simulation\\n" + "2 - save grid to disk\\n" + "3 - load grid from disk\\n" + "4 - remove grid from disk\\n" + "5 - about", DialogLayout.Full)
        Action = game.askForNumber("Please select action (0 for cancel)", 1)
        if (Action == 0) {
        	
        } else if (Action == 1) {
            Editable = false
            Cursor.destroy()
            CursorSelectedCellImage.destroy()
            console.log("Editing is now disabled! The simulation will start shortly... ")
            Paused = !(Paused)
        } else if (Action == 2) {
            saveGridConfig("GridConfig")
        } else if (Action == 3) {
            loadGridConfig("GridConfig")
        } else if (Action == 4) {
            if (game.ask("Are you really sure you want", "to clear ALL grid configs?") && game.ask("Are you REALLY sure you want", "to clear ALL grid configs?")) {
                blockSettings.clear()
                if (blockSettings.list().length == 0) {
                    game.showLongText("Successfully cleared all grid configurations!", DialogLayout.Bottom)
                } else {
                    game.showLongText("Error clearing all grid configurations! :(", DialogLayout.Bottom)
                }
            }
        } else if (Action == 5) {
            game.showLongText("This is Sam Hogan's Cell Machine, now on MakeCode Arcade!\\n" + "Coded by Unsigned_Arduino on the MakeCode forums. (forum.makecode.com)\\n" + "This project was based of Sam Hogan's Cell Machine, which you can find on YouTube at\\nhttps://youtu.be/N-BbgqOjIqk.\\nWithout his video, I would have never done this project.\\n" + "Many thanks to the MakeCode developers. Without their hard work, this project would not exist.\\n" + "And I would also like to thank you too, for playing my sandbox!\\n" + "Find the code of this game on my Github repository at\\nhttps://github.com/Unsig\\nnedArduino/Sam-Hogans-Gam\\ne-of-Cells\\n" + "If you want to suggest a feature (or more likely report a bug), go to\\nhttps://github.com/Unsig\\nnedArduino/Sam-Hogans-Game-of-Cells/issues\\n", DialogLayout.Full)
        } else {
            game.showLongText("Sorry, that isn't a valid choice! Press [Menu] to try again!", DialogLayout.Bottom)
        }
    } else {
        Paused = !(Paused)
    }
})
function saveGridConfig (name: string) {
    if (blockSettings.exists(name) && !(game.ask("You already have a grid", "saved! Overwrite?"))) {
        return
    }
    GridConfig = []
    for (let CellInTile of grid.allSprites()) {
        if (!(sprites.readDataBoolean(CellInTile, "Skip"))) {
            GridConfig.push(sprites.readDataNumber(CellInTile, "CellType"))
            GridConfig.push(sprites.readDataNumber(CellInTile, "CellTypeVariation"))
            GridConfig.push(grid.spriteRow(CellInTile))
            GridConfig.push(grid.spriteCol(CellInTile))
        }
    }
    blockSettings.writeNumberArray(name, GridConfig)
    if (blockSettings.exists(name)) {
        game.showLongText("Successfully saved grid config!", DialogLayout.Bottom)
    } else {
        game.showLongText("Error saving grid config! :(", DialogLayout.Bottom)
    }
}
function loadGridConfig (name: string) {
    if (!(blockSettings.exists(name))) {
        game.showLongText("Could not find '" + name + "' on the disk!", DialogLayout.Bottom)
        return
    }
    if (!(game.ask("Are you sure you want to", "overwrite the grid?"))) {
        return
    }
    for (let CellInTile of grid.allSprites()) {
        CellInTile.destroy()
    }
    GridConfig = blockSettings.readNumberArray(name)
    Position = 0
    while (Position < GridConfig.length) {
        CellThing = sprites.create(CellImages[GridConfig[Position + 0]][GridConfig[Position + 1]], SpriteKind.Cell)
        sprites.setDataNumber(CellThing, "CellType", GridConfig[Position + 0])
        sprites.setDataNumber(CellThing, "CellTypeVariation", GridConfig[Position + 1])
        grid.place(CellThing, tiles.getTileLocation(GridConfig[Position + 3], GridConfig[Position + 2]))
        Position += 4
    }
    makeCursor()
    NumberOfCellsOnGrid = grid.allSprites().length
    game.showLongText("Finished loading grid config!", DialogLayout.Bottom)
}
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
let Generation = 0
let Location: Sprite[] = []
let CellTypeVariation = 0
let CellType = 0
let Position = 0
let GridConfig: number[] = []
let Action = 0
let ClonedCell: Sprite = null
let CellsInPath: Sprite[] = []
let DirectionMoved = 0
let Cursor: Sprite = null
let CellThing: Sprite = null
let CursorSelectedCellImage: Sprite = null
let Paused = false
let Editable = false
let NumberOfCellsOnGrid = 0
let SelectedCellImageType = 0
let SelectedCellImage = 0
let CellImages: Image[][] = []
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
Editable = true
Paused = true
makeCursor()
console.log("Welcome to Sam Hogan's Game of Cells (Unofficial) Sandbox console!")
console.log("Written by Unsigned_Arduino on the MakeCode forums. (forum.makecode.com)")
game.showLongText("Welcome to Sam Hogan's Game of Cells (Unofficial) Sandbox!", DialogLayout.Bottom)
game.showLongText("Written by \\nUnsigned_Arduino on the MakeCode forums. (forum.makecode.com)", DialogLayout.Bottom)
game.onUpdate(function () {
    CursorSelectedCellImage.setPosition(Cursor.x, Cursor.y)
})
// Use control.heapSnapshot() if needed (prints to JS console in dev tools in browser)
game.onUpdateInterval(500, function () {
    control.heapSnapshot()
if (!(Editable) && !(Paused)) {
        for (let CellThing of grid.allSprites()) {
            CellType = sprites.readDataNumber(CellThing, "CellType")
            CellTypeVariation = sprites.readDataNumber(CellThing, "CellTypeVariation")
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
                    moveCell(CellThing, 0, -1)
                } else if (CellTypeVariation == 1) {
                    moveCell(CellThing, 1, 0)
                } else if (CellTypeVariation == 2) {
                    moveCell(CellThing, 0, 1)
                } else {
                    moveCell(CellThing, -1, 0)
                }
            } else if (CellType == 1) {
            	
            } else if (CellType == 2) {
            	
            } else if (CellType == 3) {
                for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Top, 1)) {
                    rotateCell(CellInTile, CellTypeVariation == 0)
                }
                for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Right, 1)) {
                    rotateCell(CellInTile, CellTypeVariation == 0)
                }
                for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Bottom, 1)) {
                    rotateCell(CellInTile, CellTypeVariation == 0)
                }
                for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Left, 1)) {
                    rotateCell(CellInTile, CellTypeVariation == 0)
                }
            } else if (CellType == 4) {
                if (CellTypeVariation == 0) {
                    for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Bottom, 1)) {
                        Location = grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Top, 1)
                        if (Location.length > 0) {
                            moveCell(Location[0], 0, -1)
                        }
                        Location = grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Top, 1)
                        if (Location.length == 0) {
                            cloneCell(CellInTile, grid.spriteCol(CellThing), grid.spriteRow(CellThing) - 1)
                        }
                    }
                } else if (CellTypeVariation == 1) {
                    for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Left, 1)) {
                        Location = grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Right, 1)
                        if (Location.length > 0) {
                            moveCell(Location[0], 1, 0)
                        }
                        Location = grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Right, 1)
                        if (Location.length == 0) {
                            cloneCell(CellInTile, grid.spriteCol(CellThing) + 1, grid.spriteRow(CellThing))
                        }
                    }
                } else if (CellTypeVariation == 2) {
                    for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Top, 1)) {
                        Location = grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Bottom, 1)
                        if (Location.length > 0) {
                            moveCell(Location[0], 0, 1)
                        }
                        Location = grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Bottom, 1)
                        if (Location.length == 0) {
                            cloneCell(CellInTile, grid.spriteCol(CellThing), grid.spriteRow(CellThing) + 1)
                        }
                    }
                } else {
                    for (let CellInTile of grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Right, 1)) {
                        Location = grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Left, 1)
                        if (Location.length > 0) {
                            moveCell(Location[0], -1, 0)
                        }
                        Location = grid.lineAdjacentSprites(grid.getLocation(CellThing), CollisionDirection.Left, 1)
                        if (Location.length == 0) {
                            cloneCell(CellInTile, grid.spriteCol(CellThing) - 1, grid.spriteRow(CellThing))
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
