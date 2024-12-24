import type { Preset } from '@unocss/core'

const remRE = /(-?[\.\d]+)rem/g
const pxRE = /(-?[\.\d]+)px/g
const pwRE = /(-?[\.\d]+)pw/g
const phRE = /(-?[\.\d]+)ph/g

export interface UnitToVwOptions {
  /**
   * 1rem = n px
   * @default 16
   *
   */
  baseFontSize?: number
  baseWidth?: number
  baseHeight?: number
  unitPrecision?: number
  units?: string[]
}

export default function presetUnitToVw(options: UnitToVwOptions = {}): Preset {
  const {
    baseFontSize = 16,
    baseWidth = 375,
    baseHeight = 667,
    unitPrecision = 4,
    units = ['rem'],
  } = options

  const unitToVw = (value: number) =>
    ((100 / baseWidth) * value).toFixed(unitPrecision)
  const unitToVh = (value: number) =>
    ((100 / baseHeight) * value).toFixed(unitPrecision)

  return {
    name: 'preset-unit-to-vw',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string') {
          if (units.includes('rem') && remRE.test(value))
            i[1] = value.replace(
              remRE,
              (_, p1) => `${unitToVw(p1 * baseFontSize)}vw`
            )
          else if (units.includes('px') && pxRE.test(value))
            i[1] = value.replace(pxRE, (_, p1) => `${unitToVw(p1)}vw`)
          else if (units.includes('pw') && pwRE.test(value))
            i[1] = value.replace(pwRE, (_, p1) => `${unitToVw(p1)}vw`)
          else if (units.includes('ph') && phRE.test(value))
            i[1] = value.replace(phRE, (_, p1) => `${unitToVh(p1)}vh`)
        }
      })
    },
  }
}
