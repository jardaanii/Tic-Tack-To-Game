/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
export default function Player(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setNewName] = useState(props.player);

  const handelEditClick = () => {
    setIsEditing((asd) => !asd);
  };

  const changeName = (event) => {
    setNewName((editting) => event.target.value);
  };

  let playerName = <span className="player-name">{editedName}</span>;

  if (isEditing) {
    playerName = (
      <input type="text" required value={editedName} onChange={changeName} />
    );
  }

  return (
    <li className={props.isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{props.symbol}</span>
      </span>
      <button onClick={handelEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
