import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { SectionCard } from "../../components";

/* A guideline page's rules, one line each. */
export function Rules({ title, items }: { title: string; items: string[] }) {
  return (
    <SectionCard title={title} disableContentPadding>
      <List sx={{ py: 1 }}>
        {items.map((item) => (
          <ListItem key={item} sx={{ alignItems: "flex-start", px: 3 }}>
            <ListItemIcon sx={{ minWidth: 30, mt: "3px" }}>
              <CheckCircleOutlinedIcon sx={{ fontSize: 18, color: "success.main" }} />
            </ListItemIcon>
            <ListItemText
              primary={item}
              sx={{ my: 0 }}
              slotProps={{ primary: { variant: "body2" } }}
            />
          </ListItem>
        ))}
      </List>
    </SectionCard>
  );
}
