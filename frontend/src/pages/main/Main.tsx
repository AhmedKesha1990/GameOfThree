import { Layout } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Socket } from "socket.io-client";
import { GameComponent } from "../../components/game/Game";

import { InfoComponent } from "../../components/info/Info";
import { UsersComponent } from "../../components/users/Users";
import { SocketContext } from "../../contexts/socket";

import "./main.css";
import { Events } from "../../const";

const { Header, Content, Sider } = Layout;

const MainPage: React.FC = () => {
  const socket: Socket = useContext(SocketContext);
  const [cookies, setCookies] = useCookies(["playerId"]);

  const [me, setMe] = useState<any>();

  useEffect(() => {
    socket.emit(Events.PLAYER_JOIN, { playerId: cookies.playerId });
    socket.on(Events.JOIN_SUCCESSFULLY, (data) => {
      const player = data.player;
      player.status = "online";
      setMe(player);
      setCookies("playerId", player.id);
    });

    return () => {
      socket.off(Events.JOIN_SUCCESSFULLY);
    };
  }, [cookies.playerId, setCookies, socket, setMe]);

  return (
    <Layout>
      <Header className="header">
        <h1 className="header-title">Game of three</h1>
      </Header>
      <Layout>
        <Sider width={300} className="site-layout-background">
          {me?.id && <UsersComponent me={me} />}
        </Sider>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 10,
              margin: 0,
              minHeight: "100vh",
            }}
          >
            <Routes>
              <Route index element={<InfoComponent />} />
              <Route path="/game/:id" element={<GameComponent me={me} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainPage;
