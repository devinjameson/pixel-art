import { A, B, F } from "fpts"

import { Cell, Fill } from "./index"

export type Row = Cell.Cell[]

export type Grid = Row[]

export type Size = {
  columnsCount: number
  rowsCount: number
}

export type Location = {
  rowNumber: number
  columnNumber: number
}

export const buildNext =
  (locationOfCellToUpdate: Location) =>
  (activeFill: Fill.Fill) =>
  (grid: Grid): Grid =>
    F.pipe(
      grid,
      A.mapWithIndex(buildNextRow(locationOfCellToUpdate)(activeFill)),
    )

const buildNextRow =
  (locationOfCellToUpdate: Location) =>
  (activeFill: Fill.Fill) =>
  (rowIdx: number, row: Row): Row =>
    F.pipe(
      rowIdx === locationOfCellToUpdate.rowNumber,
      B.match(
        () => row,
        () =>
          F.pipe(
            row,
            A.mapWithIndex(
              buildNextCell(locationOfCellToUpdate.columnNumber)(activeFill),
            ),
          ),
      ),
    )

const buildNextCell =
  (columnNumberOfCellToUpdate: number) =>
  (activeFill: Fill.Fill) =>
  (columnIdx: number, cell: Cell.Cell): Cell.Cell =>
    F.pipe(
      columnIdx === columnNumberOfCellToUpdate,
      B.match(
        () => cell,
        () => ({ ...cell, fill: activeFill }),
      ),
    )
