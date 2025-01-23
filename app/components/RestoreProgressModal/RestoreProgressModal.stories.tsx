import type  {Story} from "@ladle/react";
import RestoreProgressModal from "./RestoreProgressModal";

export const RestoreProgressModalStories: Story = () => (
    <RestoreProgressModal isOpen = {true} onClose={() => {}} onContinue={() => {}} />
) ;