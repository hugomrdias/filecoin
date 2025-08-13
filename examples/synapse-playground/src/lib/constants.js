/**
 * Data size constants
 *
 */
export const SIZE_CONSTANTS = {
  /**
   * Bytes in 1 KiB
   */
  KiB: 1024n,

  /**
   * Bytes in 1 MiB
   */
  MiB: 1024n * 1024n,

  /**
   * Bytes in 1 GiB
   */
  GiB: 1024n * 1024n * 1024n,

  /**
   * Bytes in 1 TiB
   */
  TiB: 1024n * 1024n * 1024n * 1024n,

  /**
   * Maximum upload size (200 MiB)
   * Current limitation for PDP uploads
   */
  MAX_UPLOAD_SIZE: 200 * 1024 * 1024,

  /**
   * Minimum upload size (65 bytes)
   * CommP calculation requires at least 65 bytes
   */
  MIN_UPLOAD_SIZE: 65,

  /**
   * Default number of uploads to batch together in a single addRoots transaction
   * This balances gas efficiency with reasonable transaction sizes
   */
  DEFAULT_UPLOAD_BATCH_SIZE: 32,
}
/**
 * Time and size constants
 */
export const TIME_CONSTANTS = {
  /**
   * Duration of each epoch in seconds on Filecoin
   */
  EPOCH_DURATION: 30,

  /**
   * Number of epochs in a day (24 hours * 60 minutes * 2 epochs per minute)
   */
  EPOCHS_PER_DAY: 2880n,

  /**
   * Number of epochs in a month (30 days)
   */
  EPOCHS_PER_MONTH: 86400n, // 30 * 2880

  /**
   * Number of days in a month (used for pricing calculations)
   */
  DAYS_PER_MONTH: 30n,

  /**
   * Default lockup period in days
   */
  DEFAULT_LOCKUP_DAYS: 10n,
}
