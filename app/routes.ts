import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/LandingPage.tsx"), // Ruta principal "/"
  route("iniciar-sesion", "./routes/LoginPage.tsx"), // Ruta "/iniciar-sesion"
  route("registrarse", "./routes/RegisterPage.tsx"), // Ruta "/registrarse"
  route("seleccion-de-prueba", "./routes/TestSelectionPage.tsx"), // Ruta "/seleccion-de-prueba"
  
  // Rutas para los cuestionarios
  route("prueba-sisco", "./routes/TestSiscoPage.tsx"), // Ruta "/prueba-sisco"
  route("prueba-goldberg", "./routes/TestGoldbergPage.tsx"), // Ruta "/prueba-goldberg"
  
  // Cuestionarios: Sisco y Goldberg
  route("cuestionario-sisco", "./routes/QuestionnaireSiscoPage.tsx"), // Ruta "/cuestionario-sisco"
  route("cuestionario-goldberg", "./routes/QuestionnaireGoldbergPage.tsx"), // Ruta "/cuestionario-goldberg"
  
  // Completado del cuestionario
  route("completado-cuestionario", "./routes/QuestionnaireCompletionPage.tsx"), // Ruta "/completado-cuestionario"
  
  // Página de recomendaciones y aviso psicológico
  route("recomendaciones", "./routes/RecommendationsPage.tsx"), // Ruta "/recomendaciones"
  route("aviso-psicologico", "./routes/PsychologicalWarningPage.tsx"), // Ruta "/aviso-psicologico"
  
  //Test componente
  route("testcomp", "./routes/testcomp.tsx")
] satisfies RouteConfig;