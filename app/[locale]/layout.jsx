"use client"
import './globals.css';
import {Inter} from 'next/font/google'
import {Provider} from "react-redux"
import store from "../../redux/store";
import {Layout} from "antd";
import HeaderBar from "../../components/header/HeaderBar";
import {ConfigProvider} from 'antd';
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import theme from "../../theme/antdConfig";
const inter = Inter({subsets: ['latin']});
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';


async function RootLayout({children, params: {locale }}) {

   let messages;
   try {
      messages = (await import(`../../messages/${locale}.json`)).default;
   } catch (error) {
      notFound();
   }

   return (
      <html lang={locale}>
      <body>
      <StyledComponentsRegistry>
         <Provider store={store}>
            <ConfigProvider theme={theme}>
               <NextIntlClientProvider locale={locale} messages={messages}>
                  <Layout>
                     <HeaderBar/>
                     {children}
                  </Layout>
               </NextIntlClientProvider>
            </ConfigProvider>
         </Provider>
      </StyledComponentsRegistry>
      </body>
      </html>
   )
}

export default RootLayout;