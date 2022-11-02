import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, List, RadioChangeEvent, Tag } from "antd";
import { MovmentButtonsComponent } from "../movement-buttons/MovementButtons";
import { useService } from "../../hooks/service";
import { Movement } from "../../types/movement";
import { Game, GameStatus } from "../../types/game";
import { Player } from "../../types/player";
import { UserComponent } from "../users/User";
import { SocketContext } from "../../contexts/socket";
import { Socket } from "socket.io-client";
import { createChangeAction, createRestAction, Events } from "../../const";
import { InfoComponent } from "../info/Info";

export const GameComponent: React.FC<{ me: Player }> = (props) => {
  const { id } = useParams();
  const { me } = props;
  const [game, setGame] = useState<Game>();
  const [gameId, setGameId] = useState<number>();
  const { gameService } = useService();
  const socket: Socket = useContext(SocketContext);

  useEffect(() => {
    const changeEventName = createChangeAction(gameId!);
    socket.on(changeEventName, (game: Game) => {
      setGame(game);
    });
    const resetEventName = createRestAction(gameId!);
    socket.on(resetEventName, () => {
      window.location.reload();
    });
    return () => {
      socket.off(changeEventName);
      socket.off(changeEventName);
    };
  }, [gameId, socket, setGame]);

  useEffect(() => {
    const fetchGame = async () => {
      const loadedGame = await gameService.fetchGame({
        playerOneId: me.id,
        playerTwoId: Number(id),
      });
      setGame(loadedGame);
      socket.emit(Events.JOIN_GAME, { gameId: loadedGame.id });
      setGameId(loadedGame.id);
    };
    me && fetchGame();
  }, [me, setGame, socket, setGameId, gameService, id]);

  const reset = () => {
    socket.emit(Events.GAME_RESET, { gameId: game?.id });
  };

  const onMovementsChaged = (props: {
    e: RadioChangeEvent;
    movement: Movement;
  }) => {
    gameService
      .addMovment({
        movement: props.movement,
        player: me,
        game: game!,
        valueAdded: Number(props.e.target?.value),
      })
      .then((game: Game) => {
        setGame(game);
        socket.emit(Events.GAME_CHANGE, { gameId: game?.id });
      });
  };

  return (
    <>
      {me?.id === Number(id) ? (
        <InfoComponent />
      ) : (
        <>
          <List
            itemLayout="horizontal"
            style={{
              background: "white",
              padding: "20px",
              minHeight: "80vh",
            }}
            dataSource={game?.movements?.sort((a, b) => b.value - a.value)}
            renderItem={(item: Movement, index: number) => (
              <List.Item key={item.id}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent:
                        index % 2 === 0 ? "flex-start" : "flex-end",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <UserComponent player={item.player} me={me} />
                      <Tag
                        color="blue"
                        style={{
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        {index === 0 ? (
                          item.value
                        ) : (
                          <>
                            Old value was <strong>{item.oldValue}</strong> &
                            Value added <strong>{item.valueAdded}</strong> &
                            current value <strong>{item?.value}</strong>
                          </>
                        )}
                      </Tag>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent:
                        index % 2 === 0 ? "flex-end" : "flex-start",
                    }}
                  >
                    <div>
                      {item.isLast && item.player.id !== me?.id && (
                        <MovmentButtonsComponent
                          movement={item}
                          game={game!}
                          me={me}
                          onChange={onMovementsChaged}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
          {game?.status === GameStatus.COMPLETED && (
            <Button type="primary" block onClick={reset}>
              Reset
            </Button>
          )}
        </>
      )}
    </>
  );
};
