import * as NEA from "fp-ts/NonEmptyArray"

import * as Color from "./color"

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
