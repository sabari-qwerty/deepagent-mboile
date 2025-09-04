import { WorkSpaceScreen } from "@/components/screen/work.space.screen";
import { useAuth } from "@/hooks/useAuth";

export default function Workspace() {
  const { handleLogout } = useAuth();
  return <WorkSpaceScreen />;
}
