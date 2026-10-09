import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import { PageHeader } from "../components";
import type { Entry } from "./catalog";
import { CodeBlock } from "./CodeBlock";
import { PhonePreview } from "./PhonePreview";

/* Descriptions mark prop names with backticks, as in a code comment. */
function withCode(text: string) {
  return text.split("`").map((part, index) =>
    index % 2 ? (
      <Box key={index} component="code" sx={{ fontFamily: "monospace", fontSize: "0.9em" }}>
        {part}
      </Box>
    ) : (
      part
    ),
  );
}

/* One catalog entry's page. */
export function Section({ entry, group }: { entry: Entry; group: string }) {
  const { title, description, importFrom, phone, Demo } = entry;
  return (
    <>
      <PageHeader
        title={title}
        description={withCode(description)}
        actions={<PhonePreview title={title} />}
        above={
          <Breadcrumbs>
            <Typography variant="inherit">{group}</Typography>
            <Typography variant="inherit" sx={{ color: "text.primary" }}>
              {title}
            </Typography>
          </Breadcrumbs>
        }
      />
      <Stack spacing={3}>
        {importFrom ? (
          <CodeBlock code={`import { ${title} } from "@exalynt/design/${importFrom}";`} />
        ) : null}
        {phone ? (
          <Alert severity="info" icon={<PhoneIphoneOutlinedIcon fontSize="inherit" />}>
            <AlertTitle>On phones</AlertTitle>
            {withCode(phone)}
          </Alert>
        ) : null}
        <Demo />
      </Stack>
    </>
  );
}
