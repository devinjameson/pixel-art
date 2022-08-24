import { FC, useState } from "react"
import { A, NEA, O } from "fpts"

import * as Cell from "model/cell"
import * as Fill from "model/fill"
import * as Grid from "model/grid"
import * as Scheme from "model/scheme"

import ColorPicker from "./ColorPicker"
import GridView from "./GridView"

const GRID_SIZE = 20

export const buildInitialGrid = ({
  rowsCount,
  columnsCount,
}: Grid.Size): Grid.Grid => A.makeBy(rowsCount, buildInitialRow(columnsCount))

const buildInitialRow = (columnsCount: number) => (): Grid.Row =>
  A.makeBy(columnsCount, buildInitialCell)

const buildInitialCell = (): Cell.Cell => ({ fill: O.none })

const PixelArtMaker: FC = () => {
  const [grid, setGrid] = useState<Grid.Grid>(
    buildInitialGrid({ rowsCount: GRID_SIZE, columnsCount: GRID_SIZE }),
  )
  const [scheme, _] = useState<Scheme.Scheme>(Scheme.schemeA)
  const [activeFill, setActiveFill] = useState<Fill.Fill>(
    O.some(NEA.head(scheme)),
  )

  const handleOnClickCell = (location: Grid.Location): void => {
    const nextGrid = Grid.buildNext(location)(activeFill)(grid)
    setGrid(nextGrid)
  }

  const handleOnChangeActiveFill = (fill: Fill.Fill): void => {
    setActiveFill(fill)
  }

  return (
    <div className="m-4 space-y-4">
      <h1 className="font-medium">Pixel Art Maker</h1>

      <GridView onClickCell={handleOnClickCell} grid={grid} />

      <ColorPicker
        scheme={scheme}
        activeFill={activeFill}
        onChangeActiveFill={handleOnChangeActiveFill}
      />

      <div className="pt-4">
        <a
          className="mt-8 text-blue-600 underline"
          href="https://github.com/devinjameson/pixel-art-maker"
        >
          The code for this project is open source and you can see it all here.
        </a>
      </div>
    </div>
  )
}

export default PixelArtMaker
