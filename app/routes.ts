import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/LandingPage.tsx"), // Ruta principal "/"
  route("login", "./routes/LoginPage.tsx"), // Ruta "/login"
  route("register", "./routes/RegisterPage.tsx"), // Ruta "/register"
  route("test-selection", "./routes/TestSelectionPage.tsx"), // Ruta "/test-selection"
  
  // Rutas para los cuestionarios
  route("test-sisco", "./routes/TestSiscoPage.tsx"), // Ruta "/test-sisco"
  route("test-goldberg", "./routes/TestGoldbergPage.tsx"), // Ruta "/test-goldberg"
  
  // Cuestionarios: Sisco y Goldberg
  route("questionnaire-sisco", "./routes/QuestionnaireSiscoPage.tsx"), // Ruta "/questionnaire-sisco"
  route("questionnaire-goldberg", "./routes/QuestionnaireGoldbergPage.tsx"), // Ruta "/questionnaire-goldberg"
  
  // Completado del cuestionario
  route("questionnaire-completion", "./routes/QuestionnaireCompletionPage.tsx"), // Ruta "/questionnaire-completion"
  
  // Página de recomendaciones y aviso psicológico
  route("recommendations", "./routes/RecommendationsPage.tsx"), // Ruta "/recommendations"
  route("psychological-warning", "./routes/PsychologicalWarningPage.tsx"), // Ruta "/psychological-warning"
] satisfies RouteConfig;