import { FC, useState } from "react"
import { A, O } from "fpts"

import { Cell, Fill, Grid, Scheme } from "model"

import ColorPickers from "./ColorPickers"
import GridView from "./GridView"

const GRID_SIZE = 26

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
  const [scheme, setScheme] = useState<Scheme.Scheme>(Scheme.schemeA)
  const [activeFill, setActiveFill] = useState<Fill.Fill>(O.some("C1"))

  const handleOnClickCell = (location: Grid.Location): void => {
    const nextGrid = Grid.buildNext(location)(activeFill)(grid)
    setGrid(nextGrid)
  }

  const handleOnChangeActiveFill = (nextActiveFill: Fill.Fill): void => {
    setActiveFill(nextActiveFill)
  }

  const handleOnChangeScheme = (nextScheme: Scheme.Scheme): void => {
    setScheme(nextScheme)
  }

  return (
    <div className="flex flex-col items-center m-4">
      <h1 className="mb-4 text-xl font-medium">Pixel Art Maker</h1>

      <GridView onClickCell={handleOnClickCell} grid={grid} scheme={scheme} />

      <div className="mt-8">
        <ColorPickers
          scheme={scheme}
          activeFill={activeFill}
          onChangeActiveFill={handleOnChangeActiveFill}
          onChangeScheme={handleOnChangeScheme}
        />
      </div>

      <div className="pt-12">
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
