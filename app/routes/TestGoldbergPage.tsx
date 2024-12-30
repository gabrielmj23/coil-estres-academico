import type { Route } from "./+types/test-goldberg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Test Goldberg" },
    { name: "description", content: "Realiza el test Goldberg." },
  ];
}

export default function TestGoldbergPage() {
  return <h1>Test Goldberg</h1>;
}
