'use client'

import React, {useRef, useState} from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import {Colorful} from '@uiw/react-color'
import chroma from 'chroma-js'

import styles from '../styles/index.module.css'
import {
  colorShadesFromArray,
  colorShadesWithName,
  getBgColors,
  getTextColor,
  textColorShade,
} from './utils'

export default function Web() {
  const [isDark, setIsDark] = useState(false)

  const [colors, setColors] = useState({
    primary: '#1A73E8',
    accent: '#7B2EDA',
    success: '#6BD731',
    info: '#318CE7',
    warning: '#FFFF00',
    error: '#F06418',
  })

  const themeObjRef = useRef({})

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  const renderColorShades = (
    inputColor?: string,
    name = '',
    data: object = {},
  ) => {
    if (!inputColor && !Object.keys(data).length) return null
    let colorsData = data
    if (!Object.keys(data).length) {
      colorsData = colorShadesWithName(inputColor, name)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showColorPicker, setShowColorPicker] = useState(false)

    themeObjRef.current = {
      ...themeObjRef.current,
      ...colorsData,
    }

    return (
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
          flex: 1,
          marginTop: 8,
        }}>
        <b>{name}</b>
        <button
          type="button"
          style={{
            // @ts-ignore

            background: colors[name],
            width: 30,
            height: 30,
            margin: 8,
            borderWidth: 0,
            borderRadius: 20,
            alignSelf: 'center',
          }}
          onClick={() => {
            setShowColorPicker((prev) => !prev)
          }}
        />
        {name && inputColor && showColorPicker ? (
          <Colorful
            style={{
              position: 'absolute',
              top: 120,
            }}
            color={inputColor}
            onChange={(value) => {
              setColors((prev) => ({...prev, [name]: value.hexa}))
            }}
          />
        ) : null}

        {Object.entries(colorsData).map(
          ([key, color]: [string, string], index) => (
            <div
              key={key}
              className="center"
              style={{
                width: 100,
                height: 60,
                padding: index === 5 ? 4 : 0,
                fontWeight: index === 5 ? 'bold' : 'normal',
                backgroundColor: color,
                alignSelf: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <div
                style={{
                  // display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <p
                  style={{
                    color: chroma(getTextColor(color)).alpha(0.8).hex(),
                  }}>
                  {(index + 1) * 100}
                </p>
                <p
                  style={{
                    color: getTextColor(color),
                  }}>
                  {color}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div>
        <label>Dark Theme</label>
        <input type="checkbox" onChange={toggleTheme} />

        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(
              JSON.stringify(themeObjRef.current, null, 4),
            )
          }}>
          Copy JSON
        </button>
      </div>
      <input
        defaultValue={colors.primary}
        placeholder="Primary Color"
        onChange={(e) => {
          if (chroma.valid(e.target.value))
            setColors((prev) => ({...prev, primary: e.target.value}))
        }}
      />
      <input
        defaultValue={colors.accent}
        placeholder="Accent Color"
        onChange={(e) => {
          if (chroma.valid(e.target.value))
            setColors((prev) => ({...prev, accent: e.target.value}))
        }}
      />

      <div style={{flexDirection: 'row', display: 'flex'}}>
        {renderColorShades(colors.primary, 'primary')}
        {renderColorShades(colors.accent, 'accent')}

        {renderColorShades(colors.success, 'success')}
        {renderColorShades(colors.info, 'info')}
        {renderColorShades(colors.warning, 'warning')}
        {renderColorShades(colors.error, 'error')}

        {renderColorShades(
          undefined,
          'bgLight',
          colorShadesFromArray(getBgColors('light'), 'bgLight'),
        )}
        {renderColorShades(
          undefined,
          'bgDark',
          colorShadesFromArray(getBgColors('dark'), 'bgDark'),
        )}
        {renderColorShades(
          undefined,
          'background',
          colorShadesFromArray(
            isDark ? textColorShade().reverse() : textColorShade(),
            'background',
          ),
        )}
      </div>
    </div>
  )
}
