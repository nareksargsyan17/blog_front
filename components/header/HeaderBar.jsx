"use client"
import {Button, Layout, Space} from "antd";
import LogoImg from "./LogoImg";
import RegistrationBar from "./RegistrationBar";

const { Header } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: 'rgb(25 25 25)',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#ffffff',
  width: "100%",
  padding: "0 30%",
  display: "flex",
  justifyContent: "space-between"
};


export default function HeaderBar() {
  return (
    <Header style={headerStyle}>
      <LogoImg/>
      <RegistrationBar/>
    </Header>
  )
}