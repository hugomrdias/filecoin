---
editUrl: false
next: true
prev: true
title: "Token"
---

Defined in: [packages/iso-filecoin/src/token.js:70](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L70)

Class to work with different Filecoin denominations.

## See

https://docs.filecoin.io/basics/assets/the-fil-token/#denomonations

## Constructors

### Constructor

> **new Token**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:76](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L76)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

## Methods

### abs()

> **abs**(): `Token`

Defined in: [packages/iso-filecoin/src/token.js:144](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L144)

#### Returns

`Token`

***

### add()

> **add**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:151](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L151)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### div()

> **div**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:140](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L140)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### mul()

> **mul**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:133](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L133)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### sub()

> **sub**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:158](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L158)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### toAttoFIL()

> **toAttoFIL**(): `Token`

Defined in: [packages/iso-filecoin/src/token.js:197](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L197)

#### Returns

`Token`

***

### toBigInt()

> **toBigInt**(): `bigint`

Defined in: [packages/iso-filecoin/src/token.js:229](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L229)

#### Returns

`bigint`

***

### toBytes()

> **toBytes**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

Defined in: [packages/iso-filecoin/src/token.js:233](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L233)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

***

### toFemtoFIL()

> **toFemtoFIL**(): `Token`

Defined in: [packages/iso-filecoin/src/token.js:205](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L205)

#### Returns

`Token`

***

### toFIL()

> **toFIL**(): `Token`

Defined in: [packages/iso-filecoin/src/token.js:225](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L225)

#### Returns

`Token`

***

### toFormat()

> **toFormat**(`options?`): `string`

Defined in: [packages/iso-filecoin/src/token.js:177](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L177)

Format the number using the given options.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | [`FormatOptions`](/api/iso-filecoin/types/type-aliases/formatoptions/) |

#### Returns

`string`

#### See

https://mikemcl.github.io/bignumber.js/#toFor

***

### toMicroFIL()

> **toMicroFIL**(): `Token`

Defined in: [packages/iso-filecoin/src/token.js:217](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L217)

#### Returns

`Token`

***

### toMilliFIL()

> **toMilliFIL**(): `Token`

Defined in: [packages/iso-filecoin/src/token.js:221](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L221)

#### Returns

`Token`

***

### toNanoFIL()

> **toNanoFIL**(): `Token`

Defined in: [packages/iso-filecoin/src/token.js:213](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L213)

#### Returns

`Token`

***

### toPicoFIL()

> **toPicoFIL**(): `Token`

Defined in: [packages/iso-filecoin/src/token.js:209](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L209)

#### Returns

`Token`

***

### toString()

> **toString**(`base?`): `string`

Defined in: [packages/iso-filecoin/src/token.js:167](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L167)

Serialize the number to a string using the given base.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `base?` | `number` | `10` |

#### Returns

`string`

***

### fromAttoFIL()

> `static` **fromAttoFIL**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:84](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L84)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### fromFemtoFIL()

> `static` **fromFemtoFIL**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:91](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L91)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### fromFIL()

> `static` **fromFIL**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:126](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L126)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### fromMicroFIL()

> `static` **fromMicroFIL**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:112](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L112)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### fromMilliFIL()

> `static` **fromMilliFIL**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:119](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L119)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### fromNanoFIL()

> `static` **fromNanoFIL**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:105](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L105)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

***

### fromPicoFIL()

> `static` **fromPicoFIL**(`val`): `Token`

Defined in: [packages/iso-filecoin/src/token.js:98](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L98)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | [`Value`](/api/iso-filecoin/token/type-aliases/value/) |

#### Returns

`Token`

## Properties

### \[symbol\]

> **\[symbol\]**: `boolean` = `true`

Defined in: [packages/iso-filecoin/src/token.js:72](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L72)

***

### val

> **val**: `BigNumber`

Defined in: [packages/iso-filecoin/src/token.js:78](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/token.js#L78)
