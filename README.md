# unocss-preset-unit-to-vw

## Installation

```
npm i -D unocss-preset-unit-to-vw
```

//vite.config.ts

```ts
import presetUno from "@unocss/preset-uno"
import presetUnitToVw from "unocss-preset-unit-to-vw"
export default defineConfig({
  plugins: [
    react(),
    Unocss({
      presets: [
        presetUno(),
        presetUnitToVw(/* preset options */ )
      ],

    }),
  ],
})
```

### preset options

```ts
interface UnitToVwOptions {
	baseFontSize?: number // defalut 16
	baseWidth?: number // defalut 375
	unitPrecision?: number // defalut 4
	units?: string // defalut 'rem'
}
```

## Usage

### without

```css
.m-2 {
	margin: 0.5rem;
}
.m-8px {
	margin: 8px;
}
```

</td><td width="500px" valign="top">

### with

```css
.m-2 {
	margin: 2.1333vw;
}

.m-8px {
	margin: 2.1333vw;
}
```

</td></tr></table>
