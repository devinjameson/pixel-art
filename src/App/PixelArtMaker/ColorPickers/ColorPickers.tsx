import { FC, MouseEventHandler } from "react"
import { F, O } from "fpts"
import { Icon } from "heroIcon"

import { Fill, Scheme } from "model"

import ColorPicker from "./ColorPicker"

type ColorPickersProps = {
  activeFill: Fill.Fill
  onChangeActiveFill: (fill: Fill.Fill) => void
  scheme: Scheme.Scheme
  onChangeScheme: (scheme: Scheme.Scheme) => void
}
const ColorPickers: FC<ColorPickersProps> = ({
  activeFill,
  onChangeActiveFill,
  scheme,
  onChangeScheme,
}) => {
  const onChangeIfIsSome = O.match(F.constVoid, onChangeScheme)

  const handleOnClickPrevious: MouseEventHandler<HTMLButtonElement> = () => {
    F.pipe(scheme, Scheme.getPrior, onChangeIfIsSome)
  }

  const handleOnClickNext: MouseEventHandler<HTMLButtonElement> = () => {
    F.pipe(scheme, Scheme.getFollowing, onChangeIfIsSome)
  }

  const isPreviousDisabled = Scheme.isFirst(scheme)

  const isNextDisabled = Scheme.isLast(scheme)

  return (
    <div className="flex items-center justify-center space-x-8">
      <button
        type="button"
        onClick={handleOnClickPrevious}
        className="w-8 h-8 text-gray-500"
        disabled={isPreviousDisabled}
      >
        <Icon.Solid.ArrowCircleLeftIcon className="w-8 h-8" />
      </button>

      <ColorPicker
        activeFill={activeFill}
        onChangeActiveFill={onChangeActiveFill}
        scheme={scheme}
      />

      <button
        type="button"
        onClick={handleOnClickNext}
        className="w-8 h-8 text-gray-500"
        disabled={isNextDisabled}
      >
        <Icon.Solid.ArrowCircleRightIcon className="w-8 h-8" />
      </button>
    </div>
  )
}

export default ColorPickers
