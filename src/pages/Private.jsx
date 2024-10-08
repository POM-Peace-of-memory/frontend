import { useParams } from "react-router-dom";
import Header from "@components/all/Header";
import PrivateComponent from "@components/all/Private";

export default function Private({ variant }) {
  let id;
  if (variant === "groups") id = useParams().groupId;
  else id = useParams().postId; /* 임시 작성 */

  return (
    <>
      <Header />
      <PrivateComponent id={id} variant={variant} />
    </>
  );
}
