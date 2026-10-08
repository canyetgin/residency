import LangSwitcher from "./lang-switcher";
import { ThemeSwitcher } from "./theme-switcher";
import { ButtonGroup } from "./ui/button-group";
import { Card } from "./ui/card";

export default function AuthMenu() {
  if (typeof window !== "undefined") {
    console.log("page load:", performance.getEntriesByType("navigation"));
  }
  return (
    <ButtonGroup>
      <ButtonGroup>
        <ThemeSwitcher />
      </ButtonGroup>
      <ButtonGroup>
        <LangSwitcher />
      </ButtonGroup>
    </ButtonGroup>
  );
}
