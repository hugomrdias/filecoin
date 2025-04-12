# Changelog

## [2.2.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-react-v2.1.1...iso-filecoin-react-v2.2.0) (2025-04-11)


### Features

* **react:** support appkit with useAppKitAdapter hook ([4f38e34](https://github.com/hugomrdias/filecoin/commit/4f38e34244b35121f15bb11b81c64b507d6e5573))

## [2.1.1](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-react-v2.1.0...iso-filecoin-react-v2.1.1) (2025-04-02)


### Bug Fixes

* export connection state type ([0881329](https://github.com/hugomrdias/filecoin/commit/088132921b783b08493876b2c0b28458d675289b))
* **react:** rename useWalletProvider to useFilecoinProvider and update references ([61ca3a2](https://github.com/hugomrdias/filecoin/commit/61ca3a294fa2811fc603db230d1eb3d6ca83e5f3))

## [2.1.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-react-v2.0.0...iso-filecoin-react-v2.1.0) (2025-03-28)


### Features

* **react:** useAccount return address string and useAddresses requires address input ([93e4262](https://github.com/hugomrdias/filecoin/commit/93e42621f7e9753573dff51a6ddf13581e3e0d46))

## [2.0.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-react-v1.2.0...iso-filecoin-react-v2.0.0) (2025-03-27)


### ⚠ BREAKING CHANGES

* change provider name to `FilecoinProvider`, add `useSign` and new option `reconnectOnMount`

### Features

* change provider name to `FilecoinProvider`, add `useSign` and new option `reconnectOnMount` ([71d7dc9](https://github.com/hugomrdias/filecoin/commit/71d7dc9d9a3790f3f7d80fb12c65658924fbf063))

## [1.2.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-react-v1.1.0...iso-filecoin-react-v1.2.0) (2025-03-26)


### Features

* **react:** add `useEstimateGas`, `useSendMessage` and some improvements to the other hooks ([554683e](https://github.com/hugomrdias/filecoin/commit/554683e851271944f778bb725b0c48915a5661db))

## [1.1.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-react-v1.0.1...iso-filecoin-react-v1.1.0) (2025-03-18)


### Features

* **react:** extract everything into hooks ([af0e3f5](https://github.com/hugomrdias/filecoin/commit/af0e3f59ff82a0da03ad91b26fd4e81186241bf9))

## [1.0.1](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-react-v1.0.0...iso-filecoin-react-v1.0.1) (2025-03-13)


### Bug Fixes

* **react:** use adapters and update deps ([00b6809](https://github.com/hugomrdias/filecoin/commit/00b680997c102a0797c322379f7c56228d9de3e6))

## [1.0.0](https://github.com/hugomrdias/filecoin/compare/iso-filecoin-react-v0.0.1...iso-filecoin-react-v1.0.0) (2025-02-18)


### ⚠ BREAKING CHANGES

* ledger `getAddress` return type changed and wallet return types using `pubKey` changed to `publicKey` to match `IAcount` type

### Features

* wallet adapters, react hooks and changes to wallet and message ([#180](https://github.com/hugomrdias/filecoin/issues/180)) ([7a568c6](https://github.com/hugomrdias/filecoin/commit/7a568c61643934dd98fe03aff3735c5acfc810ba))
