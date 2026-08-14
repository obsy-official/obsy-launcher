import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  username: string;
  size?: number;
  className?: string;
}

export const ProfileAvatar = ({
  username,
  size = 32,
  className,
}: ProfileAvatarProps) => {
  return (
    <img
      src={`https://mc-heads.net/avatar/${encodeURIComponent(username)}/${size}`}
      alt={username}
      className={cn("bg-muted h-5 w-5 rounded-xs shadow-sm", className)}
      loading="lazy"
    />
  );
};
