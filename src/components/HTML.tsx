import React, { FC, PropsWithChildren } from "react";

export const HTML: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <link rel="icon" href="favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created to testting react-ssr"
      />
      <link rel="apple-touch-icon" href="logo192.png" />

      <link rel="manifest" href="manifest.json" />

      <title>React-ssr App</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      {children}
    </body>
  </html>
);
