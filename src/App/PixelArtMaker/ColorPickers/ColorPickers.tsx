import { FC } from "react"
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

  const handleOnClickPrevious = (): void => {
    F.pipe(scheme, Scheme.getPrior, onChangeIfIsSome)
  }

  const handleOnClickNext = (): void => {
    F.pipe(scheme, Scheme.getFollowing, onChangeIfIsSome)
  }

  const isPreviousDisabled = Scheme.isFirst(scheme)

  const isNextDisabled = Scheme.isLast(scheme)

  return (
    <div className="flex justify-center space-x-4">
      <button
        type="button"
        onClick={handleOnClickPrevious}
        className="w-8 h-8 text-gray-600"
        disabled={isPreviousDisabled}
      >
        {!isPreviousDisabled && (
          <Icon.Solid.ArrowLeftIcon className="w-8 h-8" />
        )}
      </button>

      <ColorPicker
        activeFill={activeFill}
        onChangeActiveFill={onChangeActiveFill}
        scheme={scheme}
      />

      <button
        type="button"
        onClick={handleOnClickNext}
        className="w-8 h-8 text-gray-600"
        disabled={isNextDisabled}
      >
        {!isNextDisabled && <Icon.Solid.ArrowRightIcon className="w-8 h-8" />}
      </button>
    </div>
  )
}

export default ColorPickers
