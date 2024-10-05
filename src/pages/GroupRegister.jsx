import Header from "@components/all/Header";
import GroupSetup from "@components/group/shared/GroupSetup";

export default function GroupRegister() {
  return (
    <>
      <Header />
      <GroupSetup variant="create" />
    </>
  );
}
