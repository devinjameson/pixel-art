import { A, EQ, F, NEA, O, R, ST } from "fpts"

import { ColorKey } from "./colorKey"
import { Color } from "./index"

export type Scheme = {
  [key in ColorKey]: Color.Color
}

const fromColorStrings = ST.evolve<
  Record<ColorKey, string>,
  { [key in ColorKey]: (s: string) => Color.Color }
>({
  C1: Color.fromString,
  C2: Color.fromString,
  C3: Color.fromString,
  C4: Color.fromString,
  C5: Color.fromString,
})

export const getColorByKey = (scheme: Scheme, colorKey: ColorKey) =>
  scheme[colorKey]

export const getColorStringByKey = F.flow(getColorByKey, Color.toString)

export const schemeA: Scheme = fromColorStrings({
  C1: "#fe4365",
  C2: "#fc9d9a",
  C3: "#f9cdad",
  C4: "#c8c8a9",
  C5: "#83af9b",
})

export const schemeB: Scheme = fromColorStrings({
  C1: "#4c3f91",
  C2: "#9145b6",
  C3: "#b958a5",
  C4: "#ff5677",
  C5: "#2c3333",
})

export const schemeC: Scheme = fromColorStrings({
  C1: "#4c3a51",
  C2: "#774360",
  C3: "#b25068",
  C4: "#e7ab79",
  C5: "#1b2430",
})

export const eq: EQ.Eq<Scheme> = R.getEq(Color.eq)

export const equals =
  (a: Scheme) =>
  (b: Scheme): boolean =>
    eq.equals(a, b)

type Schemes = NEA.NonEmptyArray<Scheme>

export const all: Schemes = [schemeA, schemeB, schemeC]

export const first = NEA.head(all)
export const isFirst = equals(first)

export const last = NEA.last(all)
export const isLast = equals(last)

const findIndexInAll = (v: Scheme) => F.pipe(all, A.findIndex(equals(v)))

const lookupInAll = (i: number) => F.pipe(all, A.lookup(i))

const add = (a: number) => (b: number) => a + b

export const getByDistanceFromInAll = (distance: number) =>
  F.flow(findIndexInAll, O.filterMap(F.flow(add(distance), lookupInAll)))

export const getPrior = getByDistanceFromInAll(-1)
export const getFollowing = getByDistanceFromInAll(1)
