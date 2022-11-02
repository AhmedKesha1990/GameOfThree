import React, { useContext, useEffect, useState } from "react";
import { List } from "antd";
import { Socket } from "socket.io-client";
import { SocketContext } from "../../contexts/socket";
import { Player } from "../../types/player";
import { UserComponent } from "./User";
import { Events } from "../../const";
import { useService } from "../../hooks/service";

export const UsersComponent: React.FC<{ me: Player }> = React.memo((props) => {
  const { me } = props;

  const socket: Socket = useContext(SocketContext);
  const { playerService } = useService();

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayer = async () => {
      const players = await playerService.fetchPlayer()
      setPlayers(players);
    };
    fetchPlayer();
  }, [setPlayers, playerService]);

  useEffect(() => {
    socket.on(Events.NEW_PLAYER, (player) => {
      setPlayers((prevState) => [...prevState, player]);
    });
  }, [socket, setPlayers]);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={players}
        style={{
          background: "white",
          padding: " 20px",
          minHeight: "100vh",
        }}
        renderItem={(player: Player) => (
          <List.Item key={player.id}>
            <UserComponent player={player} me={me} />
          </List.Item>
        )}
      ></List>
    </>
  );
});

