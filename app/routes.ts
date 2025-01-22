import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/LandingPage.tsx"), // Ruta principal "/"
  route("iniciar-sesion", "./routes/LoginPage.tsx"), // Ruta "/iniciar-sesion"
  route("registrarse", "./routes/RegisterPage.tsx"), // Ruta "/registrarse"
  route("seleccion-de-prueba", "./routes/TestSelectionPage.tsx"), // Ruta "/seleccion-de-prueba"

  // Perfil de usuario
  route("configurar-perfil", "./routes/ProfileConfigurationPage.tsx"), // Ruta "/configurar-perfil"

  // Cuestionarios: Sisco y Goldberg
  route("cuestionario-sisco", "./routes/QuestionnaireSiscoPage.tsx"), // Ruta "/cuestionario-sisco"
  route("cuestionario-goldberg", "./routes/QuestionnaireGoldbergPage.tsx"), // Ruta "/cuestionario-goldberg"

  // Completado del cuestionario
  route("cuestionario-completado", "./routes/QuestionnaireCompletionPage.tsx"), // Ruta "/cuestionario-completado"

  // Página de recomendaciones y aviso psicológico
  route("recomendaciones", "./routes/RecommendationsPage.tsx"), // Ruta "/recomendaciones"
  route("aviso-psicologico", "./routes/PsychologicalWarningPage.tsx"), // Ruta "/aviso-psicologico"

  // Historial de cuestionarios
  route("historial", "./routes/TestHistoryPage.tsx"),
] satisfies RouteConfig;
