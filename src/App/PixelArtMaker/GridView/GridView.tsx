import { FC, MouseEventHandler } from "react"
import { A, B, F, O } from "fpts"

import { Cell, Grid, Scheme } from "model"

type GridViewProps = {
  grid: Grid.Grid
  onFillCell: (location: Grid.Location) => void
  scheme: Scheme.Scheme
}
const GridView: FC<GridViewProps> = ({ grid, onFillCell, scheme }) => (
  <div className="flex w-[80vw] max-w-[40rem] h-48 border border-gray-300 h-[80vw] max-h-[40rem]">
    {F.pipe(
      grid,
      A.mapWithIndex((i: number, row) => (
        <RowView
          key={i}
          rowNumber={i}
          row={row}
          onFillCell={onFillCell}
          scheme={scheme}
        />
      )),
    )}
  </div>
)

type RowViewProps = {
  row: Grid.Row
  rowNumber: number
  onFillCell: (location: Grid.Location) => void
  scheme: Scheme.Scheme
}
const RowView: FC<RowViewProps> = ({ row, rowNumber, onFillCell, scheme }) => (
  <div className="flex flex-col flex-1">
    {F.pipe(
      row,
      A.mapWithIndex((i: number, cell) => (
        <CellView
          key={i}
          rowNumber={rowNumber}
          columnNumber={i}
          cell={cell}
          onFill={onFillCell}
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
  onFill: (location: Grid.Location) => void
  scheme: Scheme.Scheme
}
const CellView: FC<CellViewProps> = ({
  cell: { fill },
  rowNumber,
  columnNumber,
  onFill,
  scheme,
}) => {
  const handleOnMouseDownOrOver: MouseEventHandler<HTMLButtonElement> = F.flow(
    isLeftClick,
    B.match(F.constVoid, () => onFill({ rowNumber, columnNumber })),
  )

  return (
    <button
      type="button"
      onMouseOver={handleOnMouseDownOrOver}
      onMouseDown={handleOnMouseDownOrOver}
      className="flex flex-1"
    >
      {F.pipe(
        fill,
        O.match(F.constNull, colorKey => (
          <div
            className="w-full h-full transition-colors"
            style={{
              backgroundColor: Scheme.getColorStringByKey(scheme, colorKey),
            }}
          />
        )),
      )}
    </button>
  )
}

export default GridView
