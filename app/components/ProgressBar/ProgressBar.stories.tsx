import type { Story } from "@ladle/react";
import ProgressBarComponent from "./ProgressBar";

// Aquí se crea una Story de un componente con valores predefinidos de sus props.
// Puedes crear tantas Story como veas necesario.
export const ProgressBar: Story = () => (
  <ProgressBarComponent progress={50}  />
);

