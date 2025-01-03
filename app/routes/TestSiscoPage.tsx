import type { Route } from "./+types/TestSiscoPage";
import { Testpage } from "~/components/Testpage/Testpage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Test Sisco" },
    { name: "description", content: "Realiza el test Sisco." },
  ];
}

export default function TestSiscoPage() {
  return Testpage({
    icon: "/app/api/src/assets/siscoIcono.svg",
    image: "/app/components/Testpage/assets/siscotest.png",
    buttonpath: "/test-sisco",
  });
}
