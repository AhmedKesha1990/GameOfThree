import { Radio } from "antd";
import React from "react";
import { Game } from "../../types/game";
import { Movement } from "../../types/movement";
import { Player } from "../../types/player";

export const MovmentButtonsComponent: React.FC<{
  me: Player;
  game: Game;
  movement: Movement;
  onChange: Function;
}> = (props) => {
  const { movement, onChange } = props;
  return (
    <>
      {movement?.possibilities && (
        <Radio.Group
          value={"large"}
          onChange={(e) => onChange({ e, movement })}
        >
          {movement?.possibilities.split(",").map((possibility) => (
            <Radio.Button key={possibility} value={possibility}>
              Press here to add <strong style={{fontSize: "18px", color: 'red'}}>{possibility}</strong>
            </Radio.Button>
          ))}
        </Radio.Group>
      )}
    </>
  );
};
