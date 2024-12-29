//Componente de ejemplo
import React from "react";

//Importante definir las props para que aparezcan modificables en el storybook
interface ExampleProps {
  title: string;
  description: string;
}

const Example: React.FC<ExampleProps> = ({ title, description }) => {
  return (
    <div className="example-container">
      <h1 className="example-title">{title}</h1>
      <p className="example-description">{description}</p>
    </div>
  );
};

export default Example;
