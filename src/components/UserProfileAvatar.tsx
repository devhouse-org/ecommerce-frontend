import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "../store/index";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// User type based on the Prisma schema
type User = {
  id: string;
  email: string;
  image: string | null;
  role: 'USER' | 'ADMIN'; // Assuming these are the possible roles
  password: string;
  name: string | null;
  phone: string | null;
  createdAt: string; // Using string as DateTime is serialized to string in JSON
  updatedAt: string;
};

export default function UserProfileAvatar() {
  const logout = useAuthStore((state) => state.logout);
  const userId = localStorage.getItem('userId');

  const { data: userData, isLoading } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => axiosInstance.get(`/users/${userId}`).then(res => res.data),
    enabled: !!userId,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoading ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarImage
              src={userData?.image ? userData.image : undefined}
              alt="User Avatar"
            />
            <AvatarFallback className="bg-slate-100">{userData?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
        )}
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
