import { authClient } from "@/app/lib/auth-client";
import {Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Social() {
    const GoogleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

  return (
    <div className="flex flex-col w-full max-w-sm gap-3">
      <Button onClick={GoogleSignIn} className="w-full border border-gray-400 rounded-lg " variant="tertiary">
        <Icon icon="devicon:google" />
       Google দিয়ে চালিয়ে যান
      </Button>
      <Button className="w-full border border-gray-400 rounded-lg " variant="tertiary">
        <Icon icon="mdi:github" />
        GitHub দিয়ে চালিয়ে যান
      </Button>
    </div>
  );
}