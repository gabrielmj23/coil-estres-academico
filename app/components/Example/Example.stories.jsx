import Example from "./Example";

// Para hacer el titulo y exportar su componente a la historia de Storybook, se debe hacer lo siguiente:
export default {
  title: "components/Example",
  component: Example,
  //Valores "Por defecto" para el estado inicial del componente
  args: {
    title: "Example 1",
    description: "This is an example component",
  },
};

const Template = (args) => <Example {...args} />;

export const Default = Template.bind({});

//Para añadir distintas versiones de un componente, se puede hacer lo siguiente:
export const Secondary = Template.bind({});

//Darle diferentes valores a los props o estados
Secondary.args = {
  title: "Secondary Title",
};
