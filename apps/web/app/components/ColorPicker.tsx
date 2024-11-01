import {Colorful, Sketch} from '@uiw/react-color'
import React, {useState} from 'react'

export const ColorPicker = ({
  inputColor,
  background,
  onChange,
}: {
  inputColor?: string
  background?: string
  onChange: (color: string) => void
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false)

  return (
    <div>
      <button
        type="button"
        style={{
          background: background, // || colors[name],
          width: 30,
          height: 30,
          margin: 8,
          borderWidth: 1,
          borderRadius: 20,
          alignSelf: 'center',
          borderColor: 'gray',
        }}
        onClick={() => {
          setShowColorPicker((prev) => !prev)
        }}
      />
      {background && inputColor && showColorPicker ? (
        <Sketch
          style={{
            position: 'absolute',
            // top: 120,
          }}
          color={inputColor}
          onChange={(value) => {
            onChange(value.hexa)
            //   setColors((prev) => ({...prev, [name]: value.hexa}))
          }}
        />
      ) : null}
    </div>
  )
}
