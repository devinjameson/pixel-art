import { S } from "fpts"
import * as NT from "newtype-ts"

export interface Color
  extends NT.Newtype<{ readonly Color: unique symbol }, string> {}

export const isoColor = NT.iso<Color>()

export const fromString = isoColor.from
export const toString = isoColor.unwrap

export const eq = NT.getEq<Color>(S.Eq)
