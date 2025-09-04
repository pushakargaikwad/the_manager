import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFrappeGetCall } from "frappe-react-sdk";

type Props = {
  users?: string;
};

const UserAssignees = ({ users }: Props) => {
  const userIDs = JSON.parse(users || "[]");
  return (
    <div>
      {userIDs.map((u: string) => (
        <UserAvatar user={u} key={u} />
      ))}
    </div>
  );
};

interface GetUserAvatarResponse {
  image: string;
  full_name: string;
}

const UserAvatar = ({ user }: { user: string }) => {
  // cool part this is called only once as SWR maintains global state. so even if the avatar component is rendered multiple times, it will only fetch once
  const { data } = useFrappeGetCall<{ message: GetUserAvatarResponse }>(
    "the_manager.api.user.get_user_avatar",
    {
      user,
    },
    undefined,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <Avatar className="h-6 w-6">
      <AvatarImage
        src={data?.message.image}
        alt={data?.message.full_name || user}
      />
      <AvatarFallback>
        {data?.message.full_name.charAt(0) ?? user.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAssignees;
