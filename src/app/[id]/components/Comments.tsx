import { fetchComments } from "@/types";
import { FaRegUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

type Props = { comments: fetchComments };

const Comments = ({ comments }: Props) => {
  return comments.length !== 0 ? (
    <ul className="flex flex-col gap-3">
      {comments.map((c) => {
        return (
          <li
            className="flex items-center gap-3 border border-x-0 border-b-3 border-t-0 border-primary px-2 pb-2 pt-1 w-full"
            key={c.id}
          >
            <FaRegUserCircle size={36} className=""/>
            <div className="flex-col justify-between grow">
              <h4 className="font-semibold">
                {c.Users != null
                  ? `${c.Users.firstName} ${c.Users.lastName}`
                  : "Anonymous"}
              </h4>
              <div className="grid grid-cols-2 justify-around">
                <p className="flex gap-1 items-center">
                  <span>
                    <FaStar size={18}/>
                  </span>
                  {c.rating}
                </p>
                <p className="text-sm">{new Date(c.created_at).toDateString()}</p>
              </div>
              <p className="mt-3 text-xl">{c.message}</p>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <>No comments ....</>
  );
};

export default Comments;
