import type { Preset } from '@unocss/core'

const remRE = /(-?[\.\d]+)rem/g
const pxRE = /(-?[\.\d]+)px/g

export interface UnitToVwOptions {
  /**
   * 1rem = n px
   * @default 16
   *
   */
  baseFontSize?: number
  baseWidth?: number
  unitPrecision?: number
  units?: string
}

export default function presetUnitToVw(options: UnitToVwOptions = {}): Preset {
  const {
    baseFontSize = 16,
    baseWidth = 375,
    unitPrecision = 4,
    units = 'rem',
  } = options

  const pxToVw = (px: number) => ((100 / baseWidth) * px).toFixed(unitPrecision)

  return {
    name: 'preset-unit-to-vw',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string') {
          if (units.includes('rem') && remRE.test(value))
            i[1] = value.replace(
              remRE,
              (_, p1) => `${pxToVw(p1 * baseFontSize)}vw`
            )
          else if (units.includes('px') && pxRE.test(value))
            i[1] = value.replace(pxRE, (_, p1) => `${pxToVw(p1)}vw`)
        }
      })
    },
  }
}
