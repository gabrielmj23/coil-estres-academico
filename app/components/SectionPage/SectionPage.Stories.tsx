import type { Story } from "@ladle/react";
import SectionPage from "./SectionPage";

interface SectionPageProps {
    // props which come from parent to child
    image: string;
    instruction: string;
    onContinue: () => void;
  }

export const SectionPageStory: Story = () => (
    <SectionPage image="" instruction="Hacer algo" onContinue={()=>{}}/>
  );