import { FC } from "react"
import { A, F, O } from "fpts"

import { Cell, Color, Grid } from "model"

type GridViewProps = {
  grid: Grid.Grid
  onClickCell: (location: Grid.Location) => void
}
const GridView: FC<GridViewProps> = ({ grid, onClickCell }) => (
  <div className="flex">
    {F.pipe(
      grid,
      A.mapWithIndex((i: number, row) => (
        <RowView key={i} rowNumber={i} row={row} onClickCell={onClickCell} />
      )),
    )}
  </div>
)

type RowViewProps = {
  row: Grid.Row
  rowNumber: number
  onClickCell: (location: Grid.Location) => void
}
const RowView: FC<RowViewProps> = ({ row, rowNumber, onClickCell }) => (
  <div className="flex flex-col">
    {F.pipe(
      row,
      A.mapWithIndex((i: number, cell) => (
        <CellView
          key={i}
          rowNumber={rowNumber}
          columnNumber={i}
          cell={cell}
          onClick={onClickCell}
        />
      )),
    )}
  </div>
)

type CellViewProps = {
  cell: Cell.Cell
  rowNumber: number
  columnNumber: number
  onClick: (location: Grid.Location) => void
}
const CellView: FC<CellViewProps> = ({
  cell: { fill },
  rowNumber,
  columnNumber,
  onClick,
}) => {
  const handleOnClick = (): void => {
    onClick({ rowNumber, columnNumber })
  }

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className="flex w-6 h-6 border border-gray-200"
    >
      {F.pipe(
        fill,
        O.match(
          () => <></>,
          color => (
            <div
              style={{ backgroundColor: Color.toString(color) }}
              className="w-full h-full"
            />
          ),
        ),
      )}
    </button>
  )
}

export default GridView
