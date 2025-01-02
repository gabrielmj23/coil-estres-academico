import type { Route } from "./+types/test-goldberg";
import { Testpage } from "~/components/Testpage/testpage";

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
