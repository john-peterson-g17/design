import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";

/* The width the responsive rule checks at. */
const PHONE_WIDTH = 375;

/*
 * Pops a page out into a 375px frame. It's an iframe of this page in frame
 * mode (?frame=<title>, see App), so media queries and the theme's
 * breakpoints see a phone's width and components switch layout as they
 * would on one. The mode follows the toggle, since MUI syncs it across frames
 * through localStorage.
 *
 * Hidden below md: on a phone, the page already is the preview.
 */
export function PhonePreview({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<PhoneIphoneOutlinedIcon />}
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "none", md: "inline-flex" } }}
      >
        Phone preview
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={false}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pr: 1.5 }}>
          <Box component="span" sx={{ flex: 1 }}>
            {title} at {PHONE_WIDTH}px
          </Box>
          <IconButton aria-label="Close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component="iframe"
            title={`${title} at phone width`}
            src={`?frame=${encodeURIComponent(title)}`}
            sx={{
              display: "block",
              width: PHONE_WIDTH,
              height: "min(760px, calc(100svh - 180px))",
              border: 1,
              borderColor: "divider",
              borderRadius: 4,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
