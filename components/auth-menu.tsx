import { LangSwitcher } from "./lang-switcher";
import { ThemeSwitcher } from "./theme-switcher";
import { ButtonGroup } from "./ui/button-group";

export function AuthMenu() {
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
