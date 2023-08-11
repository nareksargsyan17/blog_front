"use client"
import { Layout } from "antd";
import HeaderBar from "../components/header/HeaderBar";
import MainBar from "../components/main/MainBar";


function Home() {
  return (
      <Layout>
        <HeaderBar/>
        <MainBar/>
      </Layout>
  )
}

export default Home