import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useChat from "../../hooks/useChat";

const options = [
  {
    id: "delete-this-chat",
    description: "Delete this chat",
  },
];

const ITEM_HEIGHT = 48;

export default function ThreeDotMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { deleteThisChat, getCurrentChatID } = useChat();
  const open = Boolean(anchorEl);
  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function selectOption(e) {
    if (e.target.id === "delete-this-chat") {
      deleteThisChat(getCurrentChatID());
    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
        sx={{ color: "var(--white)" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} id={option.id} onClick={selectOption}>
            {option.description}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
