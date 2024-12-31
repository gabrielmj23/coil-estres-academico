import type { Route } from "./+types/test-sisco";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Test Sisco" },
    { name: "description", content: "Realiza el test Sisco." },
  ];
}

export default function TestSiscoPage() {
  return <h1>Test Sisco</h1>;
}
