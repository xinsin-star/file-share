import {Flex, Layout, Watermark} from "antd";
import {Content, Header, Footer} from "antd/es/layout/layout";
import React from "react";
import Index from "./views";
import "./App.css"

function App() {
    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        height: '10vh',
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#ffd6e7',
    };

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        maxHeight: '78vh',
    };

    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        height: '10vh',
        backgroundColor: '#b7eb8f',
    };

    const layoutStyle = {
        height: '97vh',
        width: '100vw',
    };

    return (
      <Flex gap="middle" wrap>
          <Watermark content="guess">
              <Layout style={layoutStyle}>
                  <Header style={headerStyle}>Header</Header>
                  <Content style={contentStyle}>
                      <Index></Index>
                  </Content>
                  <Footer style={footerStyle}>Footer</Footer>
              </Layout>
          </Watermark>
      </Flex>
    );
}

export default App;
