import "./globals.css";
import Head from "next/head";
import { ReactNode } from "react";


type LayoutProps = {
  children?: ReactNode
}

export const Layout = ({ children}: LayoutProps) => {

  return <div>
    <Head>
      <title>{'todo'}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <div>{children}</div>
    </div>
}
