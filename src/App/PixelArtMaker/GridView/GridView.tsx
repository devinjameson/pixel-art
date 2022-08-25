import { FC, MouseEventHandler } from "react"
import { A, B, F, O } from "fpts"

import { Cell, Grid, Scheme } from "model"

type GridViewProps = {
  grid: Grid.Grid
  onClickCell: (location: Grid.Location) => void
  scheme: Scheme.Scheme
}
const GridView: FC<GridViewProps> = ({ grid, onClickCell, scheme }) => (
  <div className="flex border border-gray-300">
    {F.pipe(
      grid,
      A.mapWithIndex((i: number, row) => (
        <RowView
          key={i}
          rowNumber={i}
          row={row}
          onClickCell={onClickCell}
          scheme={scheme}
        />
      )),
    )}
  </div>
)

type RowViewProps = {
  row: Grid.Row
  rowNumber: number
  onClickCell: (location: Grid.Location) => void
  scheme: Scheme.Scheme
}
const RowView: FC<RowViewProps> = ({ row, rowNumber, onClickCell, scheme }) => (
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
          scheme={scheme}
        />
      )),
    )}
  </div>
)

const isLeftClick = ({ buttons }: React.MouseEvent) => {
  return buttons === 1
}

type CellViewProps = {
  cell: Cell.Cell
  rowNumber: number
  columnNumber: number
  onClick: (location: Grid.Location) => void
  scheme: Scheme.Scheme
}
const CellView: FC<CellViewProps> = ({
  cell: { fill },
  rowNumber,
  columnNumber,
  onClick,
  scheme,
}) => {
  const handleOnMouseOver: MouseEventHandler<HTMLButtonElement> = F.flow(
    isLeftClick,
    B.match(F.constVoid, () => onClick({ rowNumber, columnNumber })),
  )

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () =>
    onClick({
      rowNumber,
      columnNumber,
    })

  return (
    <button
      type="button"
      onMouseOver={handleOnMouseOver}
      onClick={handleOnClick}
      className="flex w-6 h-6"
    >
      {F.pipe(
        fill,
        O.match(F.constNull, colorKey => (
          <div
            style={{
              backgroundColor: Scheme.getColorStringByKey(scheme, colorKey),
            }}
            className="w-full h-full"
          />
        )),
      )}
    </button>
  )
}

export default GridView
