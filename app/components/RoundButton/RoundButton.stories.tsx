import type  {Story} from "@ladle/react";
import RoundButton  from "./RoundButton";
import type { JSX } from "react";
import { uptime } from "process";

export const RoundButtonStory: Story = () => (
    <RoundButton icon={<p>Icono</p>} onClick={() => {}} />
) ;