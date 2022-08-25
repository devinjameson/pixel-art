import { FC, MouseEventHandler } from "react"
import cn from "classnames"
import { A, F, O, R } from "fpts"

import { Color, ColorKey, Fill, Scheme } from "model"

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
  <div className="flex space-x-4">
    <>
      {F.pipe(
        scheme,
        R.toEntries,
        A.map(([colorKey, color]) => (
          <ColorButton
            key={colorKey}
            colorKey={colorKey}
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
    </>
  </div>
)

type ColorButtonProps = {
  colorKey: ColorKey.ColorKey
  color: Color.Color
  activeFill: Fill.Fill
  onChangeActiveFill: (fill: Fill.Fill) => void
}
const ColorButton: FC<ColorButtonProps> = ({
  colorKey,
  color,
  activeFill,
  onChangeActiveFill,
}) => {
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    onChangeActiveFill(O.some(colorKey))
  }

  const isActive = F.pipe(
    activeFill,
    O.match(F.constFalse, fill => fill === colorKey),
  )

  const className = cn(
    "w-6 h-6 rounded-sm",
    isActive && "scale-[135%] drop-shadow-xl",
  )

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
    "w-6 h-6 rounded-sm border border-gray-300",
    isActive && "scale-[135%] drop-shadow-xl",
  )

  return <button type="button" onClick={handleOnClick} className={className} />
}

export default ColorPicker
