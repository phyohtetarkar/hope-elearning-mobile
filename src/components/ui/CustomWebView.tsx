import { useState } from 'react';
import WebView from 'react-native-webview';
import { useAppearance } from '../appearance';

interface CustomWebViewProps {
  html?: string;
}

export const CustomWebView = ({ html }: CustomWebViewProps) => {
  const {
    theme: { dark, colors },
  } = useAppearance();

  const [webViewHeight, setWebViewHeight] = useState<number>();
  const injectedJavaScript = `
        window.ReactNativeWebView.postMessage(
        document.body.scrollHeight
        );
    `;

  const htmlWrapper = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, user-scalable=no">
      <style type="text/css">
        @font-face {
          font-family: "Roboto";
          font-weight: 400;
          src: url('Roboto-Regular.ttf') format('truetype');
        }
        @font-face {
          font-family: "Roboto";
          font-weight: 500;
          src: url('Roboto-Medium.ttf') format('truetype');
        }
        @font-face {
          font-family: "Roboto";
          font-weight: 600;
          src: url('Roboto-Bold.ttf') format('truetype');
        }
        @font-face {
          font-family: "Roboto";
          font-weight: 700;
          src: url('Roboto-Black.ttf') format('truetype');
        }
        body {
          font-family: Roboto;
          margin: 0;
          padding: 0;
          color: ${colors.text};
        }
      </style>
    </head>
    <body>
      ${html ?? '<p></p>'}
    </body>
  </html>
`;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlWrapper, baseUrl: '' }}
      scrollEnabled={false}
      overScrollMode="never"
      style={{
        height: webViewHeight,
        backgroundColor: 'transparent',
      }}
      onMessage={evt => {
        setWebViewHeight(Number(evt.nativeEvent.data));
      }}
      injectedJavaScript={injectedJavaScript}
    />
  );
};
