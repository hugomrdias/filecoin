# Changelog

## [6.0.1](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-v6.0.0...iso-filecoin-v6.0.1) (2025-01-21)


### Bug Fixes

* use partial message type instead of partial schema ([a8f357d](https://github.com/hugomrdias/filecoin/commit/a8f357d1aad2f2625d697a87893de877d1fdfad4))

## [6.0.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-v5.1.1...iso-filecoin-v6.0.0) (2025-01-18)


### ⚠ BREAKING CHANGES

* changed rpc from json rpc error object to always return a `RpcError`

### Features

* changed rpc from json rpc error object to always return a `RpcError` ([efe050d](https://github.com/hugomrdias/filecoin/commit/efe050d4d08e8cb145307df728258ee17a536513))


### Bug Fixes

* update deps and fix message types ([0138970](https://github.com/hugomrdias/filecoin/commit/0138970e548f124aa051bbbe4cf5227156f14571))

## [5.1.1](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-v5.1.0...iso-filecoin-v5.1.1) (2024-12-30)


### Bug Fixes

* fix publish ([a6c0648](https://github.com/hugomrdias/filecoin/commit/a6c0648e5f7e202034c5313a736da19861c4c679))

## [5.1.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-v5.0.0...iso-filecoin-v5.1.0) (2024-12-30)


### Features

* add ledger support ([38eb8dd](https://github.com/hugomrdias/filecoin/commit/38eb8dd5b0aa2dab7f442c5c8b987315a06300c8))


### Bug Fixes

* changed tx params field from base64 to base64pad encoding ([5c0df5f](https://github.com/hugomrdias/filecoin/commit/5c0df5fd1460a37f1c1f5491aa95afda570add42))
* only use hex for address parsing and encoding base16 removed ([8039c98](https://github.com/hugomrdias/filecoin/commit/8039c9865de3b2db7961d0409084c424e117ba06))

## [5.0.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-v4.1.0...iso-filecoin-v5.0.0) (2024-10-29)


### ⚠ BREAKING CHANGES

* new methods to convert fs to 0x and to ids
* Some error messages may be different with the new http client and there more options for fetch.
* sign and signMessage now return `Signature` instance instead of the raw bytes

### Features

* add bls support, verify and changed sign return to wallet([#130](https://github.com/hugomrdias/filecoin/issues/130)) ([3508d54](https://github.com/hugomrdias/filecoin/commit/3508d54ce870144d0f2176c5709efacc44539e49))
* added new http client and methods ([6e13265](https://github.com/hugomrdias/filecoin/commit/6e13265c046f66ecc425edf02c2d0cd7adda5cd7))
* new methods to convert fs to 0x and to ids ([687eba6](https://github.com/hugomrdias/filecoin/commit/687eba667413b55ced88a33e8d114f29d66041e1))
* support f1/f2/f3 to ID and back to robust expect for f4 ([f3d5e5f](https://github.com/hugomrdias/filecoin/commit/f3d5e5f77e7e3525d1cd53dae374b1708b52f479))


### Bug Fixes

* default FilecoinAddressToEthAddress blockNumber to finalized ([12585ad](https://github.com/hugomrdias/filecoin/commit/12585ad90de5b8f54549102c790d7d778c8788ed))
* **rpc:** only cache lookups when finalized ([73051aa](https://github.com/hugomrdias/filecoin/commit/73051aae15a7a485d11742a2b917d1734fec5483))

## [4.1.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-v4.0.5...iso-filecoin-v4.1.0) (2024-06-25)


### Features

* improve eth&lt;&gt;fil address translation ([b86981d](https://github.com/hugomrdias/filecoin/commit/b86981d3958e8ac06ec2cf6ddcbc17a5dfa1892f))
* upgrade to ts 5.5 and other deps updates ([b332463](https://github.com/hugomrdias/filecoin/commit/b3324631c891023800cdd3b795ca052b1da8f0fc))


### Bug Fixes

* update readme ([f35875f](https://github.com/hugomrdias/filecoin/commit/f35875f8a62a9a18fd7455f946d90cb16db4b7b0))

## [4.0.5](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-v4.0.4...iso-filecoin-v4.0.5) (2024-05-16)


### Bug Fixes

* deps updates ([6ab647a](https://github.com/hugomrdias/filecoin/commit/6ab647a9b61bac07e73ae7b2295270e67318f062))
* provinance ([8e184ea](https://github.com/hugomrdias/filecoin/commit/8e184eaa777cd8bfb0a3bd6532ecca5d3b3390d0))
* provinance ([a471c2f](https://github.com/hugomrdias/filecoin/commit/a471c2fbc670f2ea309f5db692a987dc1f8521a3))

## [4.0.4](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-v4.0.3...iso-filecoin-v4.0.4) (2024-05-16)


### Bug Fixes

* use biome and release from new repo ([92b6b2e](https://github.com/hugomrdias/filecoin/commit/92b6b2e3e309f61406299d11feabbeb7ebd5ef82))

## [4.0.3](https://github.com/fission-codes/filecoin/compare/iso-filecoin-v4.0.2...iso-filecoin-v4.0.3) (2024-02-08)


### Bug Fixes

* fix cjs path for npm ([e6ada1b](https://github.com/fission-codes/filecoin/commit/e6ada1b3950f596411bce737365a1b60f5efdf6a))

## [4.0.2](https://github.com/fission-codes/filecoin/compare/iso-filecoin-v4.0.1...iso-filecoin-v4.0.2) (2024-02-07)


### Bug Fixes

* add cjs file for real now ([52f06d6](https://github.com/fission-codes/filecoin/commit/52f06d6e920f60e2a907c9ee723d8e328ee55a38))

## [4.0.1](https://github.com/fission-codes/filecoin/compare/iso-filecoin-v4.0.0...iso-filecoin-v4.0.1) (2024-02-07)


### Bug Fixes

* add cjs files to npm ([c794f35](https://github.com/fission-codes/filecoin/commit/c794f357c52f9041848e6d86cd0c1e11b4fa6e8c))

## [4.0.0](https://github.com/fission-codes/filecoin/compare/iso-filecoin-v3.0.3...iso-filecoin-v4.0.0) (2024-02-07)


### ⚠ BREAKING CHANGES

* support commonjs, all deps are vendored and transpile

### Features

* support commonjs, all deps are vendored and transpile ([3265f49](https://github.com/fission-codes/filecoin/commit/3265f4928ca7c155f3784bb3452a651ab41872af))

## [3.0.3](https://github.com/fission-codes/filecoin/compare/iso-filecoin-v3.0.2...iso-filecoin-v3.0.3) (2023-10-30)


### Bug Fixes

* fix docs deploy ([1a7315f](https://github.com/fission-codes/filecoin/commit/1a7315fbffcb2bebe378a976cf68300d2a5ba336))

## [3.0.2](https://github.com/fission-codes/filecoin/compare/iso-filecoin-v3.0.1...iso-filecoin-v3.0.2) (2023-10-30)


### Bug Fixes

* move iso-filecoin to fission org ([e64de20](https://github.com/fission-codes/filecoin/commit/e64de20ab1e677a92f47ac7b77b7dbed5da766f4))

## [3.0.1](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v3.0.0...iso-filecoin-v3.0.1) (2023-09-21)


### Bug Fixes

* export types ([dfaa4db](https://github.com/hugomrdias/iso-repo/commit/dfaa4dbbb64182c0b6b3b773f3191fc44afd1691))

## [3.0.0](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v2.1.0...iso-filecoin-v3.0.0) (2023-09-05)


### ⚠ BREAKING CHANGES

* change rpc methods signature to support fetch options

### Features

* change rpc methods signature to support fetch options ([e1908f9](https://github.com/hugomrdias/iso-repo/commit/e1908f9ea05e309c7f1d260ecc18584503155cb4))


### Bug Fixes

* increase `waitMsg` timeout to 60s ([553a5e1](https://github.com/hugomrdias/iso-repo/commit/553a5e1bc9f7c3a5916c54d453feea6f67ffd414))
* update deps ([1e0e7ef](https://github.com/hugomrdias/iso-repo/commit/1e0e7ef49e0d48719672129d8aff5c4ddd225ad8))

## [2.1.0](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v2.0.2...iso-filecoin-v2.1.0) (2023-07-31)


### Features

* add `fromContractDestination` for address ([#66](https://github.com/hugomrdias/iso-repo/issues/66)) ([d1e6c38](https://github.com/hugomrdias/iso-repo/commit/d1e6c38de792316f24ffd877fd5be557b11d90d8))

## [2.0.2](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v2.0.1...iso-filecoin-v2.0.2) (2023-07-25)


### Bug Fixes

* add npm provenance ([ea8a4f3](https://github.com/hugomrdias/iso-repo/commit/ea8a4f3125d0775e92ed03f804344be2be66f05c))

## [2.0.1](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v2.0.0...iso-filecoin-v2.0.1) (2023-07-24)


### Bug Fixes

* improve toFormat defaults ([d75c232](https://github.com/hugomrdias/iso-repo/commit/d75c232cfb7a77d06ba46ec14430436ffc20d732))

## [2.0.0](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v1.3.0...iso-filecoin-v2.0.0) (2023-07-24)


### ⚠ BREAKING CHANGES

* change token toFormat signature

### Features

* change token toFormat signature ([07f50b7](https://github.com/hugomrdias/iso-repo/commit/07f50b7d51530c7368b5206c960edfc36024e34f))

## [1.3.0](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v1.2.0...iso-filecoin-v1.3.0) (2023-07-23)


### Features

* add toBigInt and toContractDestination ([88251b7](https://github.com/hugomrdias/iso-repo/commit/88251b70d32f5c35caadfc67f475fc43973ba306))

## [1.2.0](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v1.1.1...iso-filecoin-v1.2.0) (2023-07-22)


### Features

* add support for all address protocols ([57ea3ce](https://github.com/hugomrdias/iso-repo/commit/57ea3cefff22130d8a94633fe40e5c3441f2210e))

## [1.1.1](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v1.1.0...iso-filecoin-v1.1.1) (2023-07-21)


### Bug Fixes

* add Address.from ([ef89490](https://github.com/hugomrdias/iso-repo/commit/ef89490efc62f82ba43908491e6de2de8c664f1f))

## [1.1.0](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v1.0.0...iso-filecoin-v1.1.0) (2023-07-21)


### Features

* add delegated address and eth address ([852a7fb](https://github.com/hugomrdias/iso-repo/commit/852a7fb03483f2fa005107f5849e88ae13d5bef2))

## [1.0.0](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.2.4...iso-filecoin-v1.0.0) (2023-07-10)


### ⚠ BREAKING CHANGES

* Token `to*` methods return bignumber instead of string and added new toFormat method

### Features

* Token `to*` methods return bignumber instead of string and added new toFormat method ([d27f5bc](https://github.com/hugomrdias/iso-repo/commit/d27f5bc8cea879c038e856342ce415fbc078ead9))

## [0.2.4](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.2.3...iso-filecoin-v0.2.4) (2023-07-07)


### Bug Fixes

* **iso-filecoin:** fix bip39 wordlist import ([168478d](https://github.com/hugomrdias/iso-repo/commit/168478d2de7280bc4847d5d59b257e078d03aacb))

## [0.2.3](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.2.2...iso-filecoin-v0.2.3) (2023-06-23)


### Bug Fixes

* dont prepare a msg with all the params ([eb32843](https://github.com/hugomrdias/iso-repo/commit/eb32843a8d98a64300a03aa79dffa1c598fe18d6))

## [0.2.2](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.2.1...iso-filecoin-v0.2.2) (2023-06-22)


### Bug Fixes

* fix token.toBytes and add raw sign ([2611be0](https://github.com/hugomrdias/iso-repo/commit/2611be03a9b92c6f3ad14f98e3b96f0c288d99dc))

## [0.2.1](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.2.0...iso-filecoin-v0.2.1) (2023-06-22)


### Bug Fixes

* add more entry points to docs ([d31ad2c](https://github.com/hugomrdias/iso-repo/commit/d31ad2c6390daf330052506c81d81c0fd1de0a95))

## [0.2.0](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.1.5...iso-filecoin-v0.2.0) (2023-06-22)


### Features

* add, msg, sig, rpc ([f574e7b](https://github.com/hugomrdias/iso-repo/commit/f574e7bbba8fcc783f534a669ef156071afc804f))

## [0.1.5](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.1.3...iso-filecoin-v0.1.5) (2023-05-15)


### Miscellaneous Chores

* **main:** release iso-base 0.1.5 ([3849a49](https://github.com/hugomrdias/iso-repo/commit/3849a49eb867fbdaf3ed95173144b448d4a42f4c))

## [0.1.3](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.1.2...iso-filecoin-v0.1.3) (2023-05-11)


### Bug Fixes

* update deps ([c5a562f](https://github.com/hugomrdias/iso-repo/commit/c5a562fd8219e99f602e5ac2400bdc0f0dd14336))

## [0.1.2](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.1.1...iso-filecoin-v0.1.2) (2023-03-28)


### Bug Fixes

* fix docs links ([dca1a62](https://github.com/hugomrdias/iso-repo/commit/dca1a6295155639bb8228cd936837cc86d404345))

## [0.1.1](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.1.0...iso-filecoin-v0.1.1) (2023-03-28)


### Bug Fixes

* add docs ([f0b2c47](https://github.com/hugomrdias/iso-repo/commit/f0b2c471ea766bb7206fb8add46de76b732ddf1c))

## [0.1.0](https://github.com/hugomrdias/iso-repo/compare/iso-filecoin-v0.0.1...iso-filecoin-v0.1.0) (2023-03-28)


### Features

* filecoin package ([a77a184](https://github.com/hugomrdias/iso-repo/commit/a77a1842c01f5e4fa171936b89669c6f10de1cdf))


### Bug Fixes

* remove unused dep ([191a8b5](https://github.com/hugomrdias/iso-repo/commit/191a8b57d5a246b5053a8b541395bce0e603fa42))
