import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const Html = ({ assets, store, content }) => {

  return (
    <html lang="en-US">
      <head>

        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover" />

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Election App 2019!" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Election App 2019!" />
        <meta name="theme-color" content="#1E90FF" />

        {/* (>>>>>>> STYLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {assets.stylesheets 
          && Object.keys(assets.stylesheets).map(key => (
            <link
              href={`${assets.publicPath}/${assets.stylesheets[key]}`}
              key={key}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
          ))}

      </head>

      <body>


        {/* (>>>>>>> CONTENT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        <div role="main" id="content" dangerouslySetInnerHTML={{ __html: content }} />


        {/* (>>>>>>> STORE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {store && (
          <script
            dangerouslySetInnerHTML={{ __html: `window.__PRELOADED__=true;window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />
        )}


        {/* (>>>>>>> DEV DLLS  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        { __DLLS__ && <script key="dlls__vendor" src="/dlls/dll__vendor.js" charSet="UTF-8" /> }


        {/* (>>>>>>> SCRIPTS  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {assets.scripts 
          && Object.keys(assets.scripts).map(key => (
            <script key={key} src={`${assets.publicPath}/${assets.scripts[key]}`} charSet="UTF-8" />
          ))}

      </body>
    </html>
  );
};

Html.propTypes = {
  assets: PropTypes.shape({ stylesheets: PropTypes.array, scripts: PropTypes.array }),
  content: PropTypes.string,
  store: PropTypes.shape({ getState: PropTypes.func })
};

Html.defaultProps = {
  assets: [],
  content: '',
};

export default Html;
