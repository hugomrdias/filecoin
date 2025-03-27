/**
 *
 * @param {React.ComponentProps<'svg'>} param0
 */
export function CopyIcon({ width = 24, height = 24, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Copy icon"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-copy"
      {...rest}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
      <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export const Logo = (props) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x={0}
    y={0}
    viewBox="0 0 40 40"
    xmlSpace="preserve"
    enableBackground="new 0 0 40 40"
    {...props}
  >
    <title>Filecoin Logo</title>
    <style>{'.st1-logo{fill-rule:evenodd;clip-rule:evenodd;fill:#fff}'}</style>
    <defs>
      <filter
        id="a-logo"
        filterUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={40}
        height={40}
      >
        <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
      </filter>
    </defs>
    <mask
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={40}
      height={40}
      id="b-logo_1"
    >
      <g filter="url(#a-logo)">
        <path id="a-logo_1" className="st1-logo" d="M0 0h40v40H0z" />
      </g>
    </mask>
    <path
      d="M20 40C9 40 0 31 0 19.9.1 8.9 9-.1 20.1 0 31.1.1 40 9 40 20.2 39.9 31.1 31 40 20 40"
      mask="url(#b-logo_1)"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#0090ff"
    />
    <path
      className="st1-logo"
      d="m21.9 17.6-.6 3.2 5.7.8-.4 1.5-5.6-.8c-.4 1.3-.6 2.7-1.1 3.9-.5 1.4-1 2.8-1.6 4.1-.8 1.7-2.2 2.9-4.1 3.2-1.1.2-2.3.1-3.2-.6-.3-.2-.6-.6-.6-.9 0-.4.2-.9.5-1.1.2-.1.7 0 1 .1.3.3.6.7.8 1.1.6.8 1.4.9 2.2.3.9-.8 1.4-1.9 1.7-3 .6-2.4 1.2-4.7 1.7-7.1v-.4l-5.3-.8.2-1.5 5.5.8.7-3.1-5.7-.9.2-1.6 5.9.8c.2-.6.3-1.1.5-1.6.5-1.8 1-3.6 2.2-5.2s2.6-2.6 4.7-2.5c.9 0 1.8.3 2.4 1 .1.1.3.3.3.5 0 .4 0 .9-.3 1.2-.4.3-.9.2-1.3-.2-.3-.3-.5-.6-.8-.9-.6-.8-1.5-.9-2.2-.2-.5.5-1 1.2-1.3 1.9-.7 2.1-1.2 4.3-1.9 6.5l5.5.8-.4 1.5z"
    />
  </svg>
)

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 * @returns
 */
export function TokenFilecoin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Filecoin Token</title>
      <path
        fill="currentColor"
        d="m13.212 10.457l-.415 2.109l3.947.528l-.277.988l-3.877-.528c-.277.859-.417 1.781-.762 2.573c-.346.923-.693 1.845-1.109 2.704c-.554 1.12-1.522 1.912-2.837 2.109c-.762.132-1.592.065-2.216-.395c-.207-.132-.416-.395-.416-.594c0-.263-.005-.573.347-.725c.351-.153.496-.045.693.065c.207.198.414.462.553.726c.415.528.969.593 1.523.197c.623-.526.97-1.252 1.177-1.977c.415-1.582.831-3.1 1.176-4.681v-.265l-3.668-.528l.138-.988l3.808.527l.483-2.043l-3.945-.595l.14-1.054l4.084.528c.137-.397.207-.726.346-1.055c.345-1.188.692-2.375 1.523-3.43c.83-1.055 1.8-1.714 3.253-1.649c.624 0 1.247.199 1.662.66c.07.066.207.198.207.329c0 .265 0 .594-.207.793c-.277.196-.623.13-.9-.132c-.208-.198-.347-.396-.554-.594c-.415-.528-1.038-.594-1.523-.132c-.375.359-.68.783-.9 1.253c-.486 1.384-.831 2.835-1.315 4.286l3.807.528l-.277.988z"
      />
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function TokenEthereum(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Ethereum Token</title>
      <path
        fill="currentColor"
        d="M12 3v6.652l5.625 2.516zm0 0l-5.625 9.166L12 9.652zm0 13.478V21l5.625-7.785zM12 21v-4.522l-5.625-3.263z"
      />
      <path
        fill="currentColor"
        d="m12 15.43l5.625-3.263L12 9.652zm-5.625-3.263L12 15.43V9.652z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m12 15.43l-5.625-3.262L12 3l5.625 9.166zm-5.25-3.528l5.162-8.41v6.115zm-.077.229l5.239-2.327v5.364zm5.418-2.327v5.364l5.233-3.037zm0-.197l5.162 2.295l-5.162-8.41z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m12 16.407l-5.625-3.195L12 21l5.625-7.789zm-4.995-2.633l4.906 2.79v4.005zm5.085 2.79v4.005l4.904-6.795z"
        clipRule="evenodd"
      />
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function TokenId(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Id Token</title>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.81 3h2.196c.089-.004.295.081.306.458s.005 2.238 0 3.176l-.001.017c-.01.104-.027.277.217.287c.26.011 2.055.005 2.922 0c.17 0 .238-.097.238-.303V3.358c0-.119.13-.357.365-.357h2.177a.37.37 0 0 1 .27.357v3.276c.014.106.131.304.278.304h2.725c.175 0 .372.113.372.308v2.218c-.006.095-.087.285-.372.285h-2.725c-.075.004-.278.046-.278.29v3.944c0 .085.096.256.278.266s1.892.004 2.725 0c.123.017.372.119.372.393v2.124c-.023.096-.129.297-.372.297h-2.725c-.075.01-.278.068-.278.253v3.415c-.008.09-.025.269-.242.269h-2.285c-.075-.02-.286-.1-.286-.269v-3.416c-.008-.087-.028-.253-.284-.253h-2.86c-.083.017-.221.082-.23.253s-.005 2.321 0 3.416c-.012.09-.108.269-.289.269H7.716c-.078-.01-.215-.079-.215-.269v-3.416c.007-.087-.06-.253-.303-.253H4.36c-.082-.011-.242-.104-.233-.341s.003-1.547 0-2.182c.042-.097.182-.29.405-.29h2.666c.094-.01.303-.105.303-.413v-3.612c.004-.105-.011-.476-.38-.476H4.53c-.139 0-.404-.011-.404-.4V7.293c.016-.115.107-.356.331-.356H7.12l.03-.003c.148-.011.351-.027.351-.405V3.358c-.02-.12.071-.358.31-.358m2.686 6.75h2.956a.316.316 0 0 1 .233.317a431 431 0 0 0 0 3.95c.014.073-.014.222-.233.23c-.22.009-2.061.003-2.956 0c-.065 0-.183-.09-.183-.23v-4.06c0-.1.061-.207.183-.207"
        clipRule="evenodd"
      />
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function QrCode(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <title>QR Code Icon</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <rect width={5} height={5} x={3} y={3} rx={1} />
        <rect width={5} height={5} x={16} y={3} rx={1} />
        <rect width={5} height={5} x={3} y={16} rx={1} />
        <path d="M21 16h-3a2 2 0 0 0-2 2v3m5 0v.01M12 7v3a2 2 0 0 1-2 2H7m-4 0h.01M12 3h.01M12 16v.01M16 12h1m4 0v.01M12 21v-1" />
      </g>
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function Send(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.width ?? 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Send Icon</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"
      />
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function Forward(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.width ?? 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Forward Icon</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      >
        <path
          strokeLinejoin="round"
          d="m12.664 5.479l3.973 3.53c1.568 1.395 2.353 2.092 2.353 2.99s-.785 1.596-2.353 2.99l-3.973 3.53c-.716.637-1.074.956-1.369.823S11 18.731 11 17.772v-2.344c-3.6 0-7.5 1.714-9 4.571c0-9.142 5.333-11.428 9-11.428V6.226c0-.958 0-1.437.295-1.57c.295-.132.653.186 1.37.823"
        />
        <path
          d="m15.539 4.5l5.216 4.844a3.897 3.897 0 0 1-.126 5.823l-5.09 4.333"
          opacity={0.5}
        />
      </g>
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function Info(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.width ?? 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Info Icon</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M8 18c-2.828 0-4.243 0-5.121-.879C2 16.243 2 14.828 2 12s0-4.243.879-5.121C3.757 6 5.172 6 8 6s4.243 0 5.121.879C14 7.757 14 9.172 14 12" />
        <path
          d="M10 12c0 2.828 0 4.243.879 5.121C11.757 18 13.172 18 16 18s4.243 0 5.121-.879C22 16.243 22 14.828 22 12s0-4.243-.879-5.121C20.243 6 18.828 6 16 6"
          opacity="0.5"
        />
      </g>
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function MetaMask(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 142 137"
      width={props.width ?? 24}
      height={props.width ?? 24}
    >
      <title>MetaMask Icon</title>
      <path
        fill="#FF5C16"
        d="m132.24 131.751-30.481-9.076-22.986 13.741-16.038-.007-23-13.734-30.467 9.076L0 100.465l9.268-34.723L0 36.385 9.268 0l47.607 28.443h27.757L132.24 0l9.268 36.385-9.268 29.357 9.268 34.723-9.268 31.286Z"
      />
      <path
        fill="#FF5C16"
        d="m9.274 0 47.608 28.463-1.893 19.534L9.274 0Zm30.468 100.478 20.947 15.957-20.947 6.24v-22.197Zm19.273-26.381L54.989 48.01l-25.77 17.74-.014-.007v.013l.08 18.26 10.45-9.918h19.28ZM132.24 0 84.632 28.463l1.887 19.534L132.24 0Zm-30.467 100.478-20.948 15.957 20.948 6.24v-22.197Zm10.529-34.723h.007-.007v-.013l-.006.007-25.77-17.739L82.5 74.097h19.272l10.457 9.917.073-18.259Z"
      />
      <path
        fill="#E34807"
        d="m39.735 122.675-30.467 9.076L0 100.478h39.735v22.197ZM59.008 74.09l5.82 37.714-8.066-20.97-27.49-6.82 10.456-9.923h19.28Zm42.764 48.585 30.468 9.076 9.268-31.273h-39.736v22.197ZM82.5 74.09l-5.82 37.714 8.065-20.97 27.491-6.82-10.463-9.923H82.5Z"
      />
      <path
        fill="#FF8D5D"
        d="m0 100.465 9.268-34.723h19.93l.073 18.266 27.492 6.82 8.065 20.969-4.146 4.618-20.947-15.957H0v.007Zm141.508 0-9.268-34.723h-19.931l-.073 18.266-27.49 6.82-8.066 20.969 4.145 4.618 20.948-15.957h39.735v.007ZM84.632 28.443H56.875L54.99 47.977l9.839 63.8H76.68l9.845-63.8-1.893-19.534Z"
      />
      <path
        fill="#661800"
        d="M9.268 0 0 36.385l9.268 29.357h19.93l25.784-17.745L9.268 0Zm43.98 81.665h-9.029l-4.916 4.819 17.466 4.33-3.521-9.155v.006ZM132.24 0l9.268 36.385-9.268 29.357h-19.931L86.526 47.997 132.24 0ZM88.273 81.665h9.042l4.916 4.825-17.486 4.338 3.528-9.17v.007Zm-9.507 42.305 2.06-7.542-4.146-4.618H64.82l-4.145 4.618 2.059 7.542"
      />
      <path fill="#C0C4CD" d="M78.766 123.969v12.453H62.735v-12.453h16.03Z" />
      <path
        fill="#E7EBF6"
        d="m39.742 122.662 23.006 13.754v-12.453l-2.06-7.541-20.946 6.24Zm62.031 0-23.007 13.754v-12.453l2.06-7.541 20.947 6.24Z"
      />
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function Wallet(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Wallet Icon</title>
      <path
        fill="currentColor"
        d="M5.75 7a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M21.188 8.004q-.094-.005-.2-.004h-2.773C15.944 8 14 9.736 14 12s1.944 4 4.215 4h2.773q.106.001.2-.004c.923-.056 1.739-.757 1.808-1.737c.004-.064.004-.133.004-.197V9.938c0-.064 0-.133-.004-.197c-.069-.98-.885-1.68-1.808-1.737m-3.217 5.063c.584 0 1.058-.478 1.058-1.067c0-.59-.474-1.067-1.058-1.067s-1.06.478-1.06 1.067c0 .59.475 1.067 1.06 1.067"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M21.14 8.002c0-1.181-.044-2.448-.798-3.355a4 4 0 0 0-.233-.256c-.749-.748-1.698-1.08-2.87-1.238C16.099 3 14.644 3 12.806 3h-2.112C8.856 3 7.4 3 6.26 3.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87C2 8.401 2 9.856 2 11.694v.112c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.749.748 1.698 1.08 2.87 1.238c1.14.153 2.595.153 4.433.153h2.112c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238q.305-.308.526-.66c.45-.72.504-1.602.504-2.45l-.15.001h-2.774C15.944 16 14 14.264 14 12s1.944-4 4.215-4h2.773q.079 0 .151.002"
        opacity="0.5"
      />
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function Ledger(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 768.91 669.35"
      {...props}
      width={props.width ?? 24}
      height={props.height ?? 24}
    >
      <title>Ledger Icon</title>
      <path d="M0 479.29v190.06h289.22V627.2H42.14V479.29H0zm726.77 0V627.2H479.69v42.14h289.22V479.29h-42.14zM289.64 190.06v289.22h190.05v-38.01H331.78V190.06h-42.14zM0 0v190.06h42.14V42.14h247.08V0H0zm479.69 0v42.14h247.08v147.92h42.14V0H479.69z" />
    </svg>
  )
}

/**
 *
 * @param {React.ComponentProps<'svg'>} props
 */
export function Burner(props) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="-5 0 34 34"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Burner Icon</title>
      <g fill="none" fillRule="evenodd">
        <path
          d="M23.555 25.1A11.979 11.979 0 0 1 0 21.857a7.9 7.9 0 0 1 .485-2.924C1.643 11.595 8.785 11.063 4.8 0c0 0 6.65 1.727 8 12.143 0 0 4.919-.163 1.6-7.286A21.31 21.31 0 0 1 24 20c.027 1.71-.122 3.42-.445 5.1"
          fill="#FF6E6E"
        />
        <path
          d="M19 26.5a7.5 7.5 0 0 1-14.975.484L4 27s-.075-3.272 0-4c.684-6.611 2.6-9.563 5-14 .067-2.639-1.115 7.273 5 10a8.19 8.19 0 0 1 5 7.5"
          fill="#0C0058"
        />
      </g>
    </svg>
  )
}
