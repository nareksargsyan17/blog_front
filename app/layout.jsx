"use client"
import './globals.css'
import {Inter} from 'next/font/google'
import {Provider} from "react-redux"
import store from "../redux/store";
import {Layout} from "antd";
import HeaderBar from "../components/header/HeaderBar";
import {ConfigProvider} from 'antd';
import StyledComponentsRegistry from "../lib/AntdRegistry";
import theme from "../theme/antdConfig";

const inter = Inter({subsets: ['latin']})

function RootLayout({children}) {
  return (
    <html lang="en">
    <body>
    <StyledComponentsRegistry>
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <Layout>
            <HeaderBar/>
            {children}
          </Layout>
        </ConfigProvider>
      </Provider>
    </StyledComponentsRegistry>
    </body>
    </html>
  )
}

export default RootLayout;