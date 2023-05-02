import React, { PropsWithChildren } from "react";
import { StoreType } from "store";

type Props = {
  preloadedState: StoreType;
};

export const HTML: React.FC<PropsWithChildren & Props> = ({
  children,
  preloadedState,
}) => {
  return (
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
        <div id="root">{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(
              preloadedState
            ).replace(/</g, "\\u003c")}`,
          }}
        ></script>
        <script type="module" src="client.bundle.js"></script>
      </body>
    </html>
  );
};
