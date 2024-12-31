import type { Route } from "./+types/testcomp";
import { SurveyOption } from "~/components/SurveyOption/SurveyOption";
import { useState } from 'react'
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";

// Define los metadatos de la página
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Survey Page" },
    { name: "description", content: "Choose your survey option!" },
  ];
}

const handleClick = () => {
  console.log("Activado");
};

export default function SurveyPage() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const options = ["Nunca", "Rara vez", "A veces", "Siempre"];
  
    return (
        <div>
      <h1>Survey</h1>
      <p>¿Con qué frecuencia haces algo?</p>
      <div>
          <SurveyOption
            options={options}
            onChange={setSelectedOption}
          />
      </div>
      {selectedOption && <p>Selected: {selectedOption} </p>}
      <PrimaryButton label="Continue →" onClick={handleClick} />
    </div>
  );
}
