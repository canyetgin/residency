import { ThemeSwitcher } from "./theme-switcher";
import { Card } from "./ui/card";

export default function AuthMenu() {
  return (
    <Card size="sm" className="border-0">
      <ThemeSwitcher />
    </Card>
  );
}
