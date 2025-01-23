import type { Story } from "@ladle/react";
import { SurveyOption } from './SurveyOption'

export const SurveyOptionStories: Story = () => (
    <SurveyOption options={[{ idOpcion: 1, contenido: "Titulo del selector", posicion: 1, puntaje: 10 }]} selectedOption={null} onChange={() => {}}/>
  );