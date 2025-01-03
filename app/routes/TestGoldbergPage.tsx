import type { Route } from "./+types/TestGoldbergPage";
import { Testpage } from "~/components/Testpage/Testpage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Test Goldberg" },
    { name: "description", content: "Realiza el test Goldberg." },
  ];
}

export default function TestGoldbergPage() {
  return (Testpage({
    icon: "/app/api/src/assets/goldbergIcono.svg",
    image: "/app/components/Testpage/assets/goldbergtest.png",
    buttonpath: "/test-goldberg",
    }));
}
