import { NEA } from "fpts"

import { Color } from "./index"

export type Scheme = NEA.NonEmptyArray<Color.Color>

const fromColorList = NEA.map(Color.fromString)

const colorsA: NEA.NonEmptyArray<string> = [
  "#fe4365",
  "#fc9d9a",
  "#f9cdad",
  "#c8c8a9",
  "#83af9b",
]
export const schemeA = fromColorList(colorsA)
