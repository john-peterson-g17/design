import Stack from "@mui/material/Stack";
import { Example } from "../docs/Example";
import { Brand } from "./Brand";

export function BrandDemo() {
  return (
    <Example title="Every tool">
      <Stack spacing={3}>
        <Brand />
        <Brand product="Portal" />
        <Brand product="Console" />
        <Brand product="Admin" />
      </Stack>
    </Example>
  );
}
