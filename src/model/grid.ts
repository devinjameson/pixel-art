import { A, F } from "fpts"

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
    rowIdx === locationOfCellToUpdate.rowNumber
      ? F.pipe(
          row,
          A.mapWithIndex(
            buildNextCell(locationOfCellToUpdate.columnNumber)(activeFill),
          ),
        )
      : row

const buildNextCell =
  (columnNumberOfCellToUpdate: number) =>
  (activeFill: Fill.Fill) =>
  (columnIdx: number, cell: Cell.Cell): Cell.Cell =>
    columnIdx === columnNumberOfCellToUpdate
      ? { ...cell, fill: activeFill }
      : cell
