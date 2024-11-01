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
import {ColorPicker} from './components/ColorPicker'

export default function Web() {
  const [isDark, setIsDark] = useState(false)

  const [colors, setColors] = useState({
    primary: '#1A7AF5',
    accent: '#7B2EDA',
    success: '#22bb33',
    info: '#2d9de5',
    warning: '#f9e154',
    error: '#ff3333',
    bgLight: '#fff',
    bgDark: '#000',
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

        <ColorPicker
          inputColor={inputColor}
          // @ts-ignore
          background={colors[name]}
          onChange={(value) => {
            setColors((prev) => ({...prev, [name]: value}))
          }}
        />

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <div>
          <label>Choose Light Theme Surface Color</label>

          <ColorPicker
            inputColor={colors['bgLight']}
            background={colors['bgLight']}
            onChange={(value) => {
              setColors((prev) => ({...prev, bgLight: value}))
            }}
          />
        </div>
        <div>
          <label>Choose Dark Theme Surface Color</label>

          <ColorPicker
            inputColor={colors['bgDark']}
            background={colors['bgDark']}
            onChange={(value) => {
              setColors((prev) => ({...prev, bgDark: value}))
            }}
          />
        </div>
      </div>

      <div style={{flexDirection: 'row', display: 'flex'}}>
        {renderColorShades(colors.primary, 'primary')}
        {renderColorShades(colors.accent, 'accent')}

        {renderColorShades(colors.success, 'success')}
        {renderColorShades(colors.info, 'info')}
        {renderColorShades(colors.warning, 'warning')}
        {renderColorShades(colors.error, 'error')}

        {renderColorShades(
          undefined,
          'background',
          colorShadesFromArray(
            isDark ? textColorShade().reverse() : textColorShade(),
            'background',
          ),
        )}
        {renderColorShades(
          undefined,
          'text',
          colorShadesFromArray(
            !isDark ? textColorShade().reverse() : textColorShade(),
            'text',
          ),
        )}

        {renderColorShades(
          undefined,
          'bgLight',
          colorShadesFromArray(getBgColors('light', colors.bgLight), 'bgLight'),
        )}
        {renderColorShades(
          undefined,
          'bgDark',
          colorShadesFromArray(getBgColors('dark', colors.bgDark), 'bgDark'),
        )}
      </div>
    </div>
  )
}
