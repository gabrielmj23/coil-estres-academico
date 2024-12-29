import type { Route } from "./+types/testcomp";
import { SurveyOption } from "~/components/SurveyOption/SurveyOption";

// Define los metadatos de la página
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Survey Page" },
    { name: "description", content: "Choose your survey option!" },
  ];
}

export default function SurveyPage() {
    const options = ["Nunca", "Rara vez", "A veces", "Siempre"];
  
    return (
        <div>
      <h1>Survey</h1>
      <p>¿Con qué frecuencia haces algo?</p>
      <div>
          <SurveyOption
            options={options}
          />
      </div>
    </div>
    );
}
