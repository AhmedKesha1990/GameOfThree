import React, { useContext, useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Socket } from "socket.io-client";
import { MinusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import { SocketContext } from "../../contexts/socket";
import { Player } from "../../types/player";
import {
  createPlayerOfflineAction,
  createPlayerOnlineAction,
} from "../../const";

export const UserComponent: React.FC<{ player: Player; me: Player }> = (
  props
) => {
  const { player, me } = props;
  const socket: Socket = useContext(SocketContext);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(player);

  useEffect(() => {
    socket.on(createPlayerOnlineAction(player.id), (player) => {
      setCurrentPlayer(player);
    });
    socket.on(createPlayerOfflineAction(player.id), (player) => {
      setCurrentPlayer(player);
    });
    return () => {
      socket.off(createPlayerOnlineAction(player.id));
      socket.off(createPlayerOfflineAction(player.id));
    };
  }, [player, socket, setCurrentPlayer]);

  return (
    <>
      <Link to={`/game/${currentPlayer.id}`}>
        <UserOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
        {currentPlayer.name} {currentPlayer.id === me.id ? "(You)" : ""}
        {currentPlayer.status === "offline" ? (
          <MinusCircleOutlined
            style={{
              fontSize: "16px",
              marginLeft: "10px",
              color: "red",
            }}
          />
        ) : (
          <CheckCircleOutlined
            style={{
              fontSize: "16px",
              marginLeft: "10px",
              color: "green",
            }}
          />
        )}
      </Link>
    </>
  );
};
