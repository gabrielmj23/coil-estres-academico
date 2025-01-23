import type { Story } from "@ladle/react";
import Select from "./Select";

interface SelectProps {
    options: Array<{ value: string; label: string }>;
    selected?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  }

export const SectionPageStory: Story = () => (
    <Select options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ]} />
  );