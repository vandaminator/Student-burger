import { fetchComments } from "@/types";

type Props = { comments: fetchComments };

const Comments = ({ comments }: Props) => {
  return comments.length !== 0 ? (
    <ul className="flex flex-col gap-3">
      {comments.map((c) => {
        return (
          <li className="flex flex-col gap-1" key={c.id}>
            <h4>
              {c.Users != null
                ? `${c.Users.firstName} ${c.Users.lastName}`
                : "Anonamas"}
            </h4>
            <p>{c.message}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <>No comments ....</>
  );
};

export default Comments;
