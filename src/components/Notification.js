import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";

export default function NotificationsBar() {
  const [open, setOpen] = useState(false);

  const notifications = [
    { id: 1, message: "New task assigned", time: "2m ago" },
    { id: 2, message: "Meeting at 3 PM", time: "1h ago" },
    { id: 3, message: "Deadline approaching", time: "5h ago" },
  ];

  return (
    <>
      <IconButton onClick={() => setOpen(true)} color="primary">
        <NotificationsIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div style={{ width: 300, padding: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Notifications</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <List>
            {notifications.map((notif) => (
              <ListItem key={notif.id} divider>
                <ListItemText primary={notif.message} secondary={notif.time} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
