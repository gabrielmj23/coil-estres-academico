import type { Route } from "./+types/test-sisco";
import { Testpage } from "~/components/Testpage/testpage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Test Sisco" },
    { name: "description", content: "Realiza el test Sisco." },
  ];
}

export default function TestSiscoPage() {
  return (Testpage({
    icon: "/app/api/src/assets/siscoIcono.svg",
    image: "/app/components/Testpage/assets/siscotest.png",
    buttonpath: "/test-sisco",
  }));
}
