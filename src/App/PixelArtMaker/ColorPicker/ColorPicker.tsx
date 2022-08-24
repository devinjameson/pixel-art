import { FC } from "react"
import cn from "classnames"
import { A, F, O } from "fpts"

import { Color, Fill, Scheme } from "model"

type ColorPickerProps = {
  scheme: Scheme.Scheme
  activeFill: Fill.Fill
  onChangeActiveFill: (fill: Fill.Fill) => void
}
const ColorPicker: FC<ColorPickerProps> = ({
  scheme,
  activeFill,
  onChangeActiveFill,
}) => (
  <div className="flex space-x-2">
    {F.pipe(
      scheme,
      A.mapWithIndex((i, color) => (
        <ColorButton
          key={i}
          color={color}
          activeFill={activeFill}
          onChangeActiveFill={onChangeActiveFill}
        />
      )),
    )}

    <EraserButton
      activeFill={activeFill}
      onChangeActiveFill={onChangeActiveFill}
    />
  </div>
)

type ColorButtonProps = {
  color: Color.Color
  activeFill: Fill.Fill
  onChangeActiveFill: (fill: Fill.Fill) => void
}
const ColorButton: FC<ColorButtonProps> = ({
  color,
  activeFill,
  onChangeActiveFill,
}) => {
  const handleOnClick = (): void => {
    onChangeActiveFill(O.some(color))
  }

  const isActive = F.pipe(
    activeFill,
    O.match(F.constFalse, fill => fill === color),
  )

  const className = cn("w-8 h-8", isActive && "border-2 border-black")

  return (
    <button
      type="button"
      onClick={handleOnClick}
      style={{ backgroundColor: Color.toString(color) }}
      className={className}
    />
  )
}

type EraserButtonProps = {
  activeFill: Fill.Fill
  onChangeActiveFill: (fill: Fill.Fill) => void
}
const EraserButton: FC<EraserButtonProps> = ({
  activeFill,
  onChangeActiveFill,
}) => {
  const handleOnClick = (): void => {
    onChangeActiveFill(O.none)
  }

  const isActive = O.isNone(activeFill)

  const className = cn(
    "w-8 h-8 border-2",
    isActive ? "border-black" : "border-gray-400",
  )

  return <button type="button" onClick={handleOnClick} className={className} />
}

export default ColorPicker
