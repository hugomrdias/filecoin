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
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4m0-4h.01" />
      </g>
    </svg>
  )
}
