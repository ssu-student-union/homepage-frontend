import { cn } from "@/libs/utils";
import { State } from "../const/state";
import { getStyles } from "../const/style";

interface AuthButtonProps {
    state?: State;
  }

export function AuthButton({ state = State.Onboarding }: AuthButtonProps)  {
    const styles = getStyles(state);

    if (state === State.Login) {
      return (
        <div className={cn(styles.headerItemStyle,"px-10 text-base text-[20px] min-w-fit")}>
          내정보
        </div>
      );
    }
    if (state === State.Logout) {
      return (
        <div className={cn(styles.headerItemStyle,"px-10 text-base text-[20px] min-w-fit")}>
          로그인
        </div>
      );
    }
    return null;
  }