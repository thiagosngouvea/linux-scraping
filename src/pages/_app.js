import { ConfigProvider } from 'antd';
import { LayoutTheme } from '@/layout';

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider>
      <LayoutTheme>
        <Component {...pageProps} />
      </LayoutTheme>
    </ConfigProvider>
  )
}
