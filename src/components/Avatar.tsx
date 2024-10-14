import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "../store/index";

export function Avatar() {
  const logout = useAuthStore((state) => state.logout);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          className="w-8 h-8 rounded-full cursor-pointer"
          src="https://github.com/shadcn.png"
          alt="User Avatar"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <Button
          onClick={() => logout()}
          className="text-red-600"
          variant={"destructive"}
        >
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
