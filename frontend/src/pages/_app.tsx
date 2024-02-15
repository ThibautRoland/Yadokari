import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";

interface Props {
  // any props that come into the component
  Component: any
  pageProps: any
}

export default function MyApp({ Component, pageProps }:Props) {
  return <Component {...pageProps} />
}