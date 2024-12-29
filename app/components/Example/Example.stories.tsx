import type { Story } from "@ladle/react";
import Example from "./Example";

// Aquí se crea una Story de un componente con valores predefinidos de sus props.
// Puedes crear tantas Story como veas necesario.
export const ExampleStory: Story = () => (
  <Example title="Hola" description="mundo" />
);
