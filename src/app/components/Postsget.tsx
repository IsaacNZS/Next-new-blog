import { Pencil, Wand } from "lucide-react";
import Link from "next/link";
import { Allposts } from "../features/posts/getAll";
import { Badge } from "@/components/ui/badge";
export const revalidate = 3;
const Postsget = async () => {
  const posts = await Allposts();

  return (
    <div className="flex flex-col gap-2">
      <h1>Posts Counts - {posts.length}</h1>
      {posts.map((p) => (
        <div
          className="flex bg-sidebar relative rounded-[8px] px-3 py-2 flex-col gap-1"
          key={p.id}
        >
          <p className="text-[15px] font-bold">{p.title}</p>
          <p className="text-chart-2">{p.des}</p>
          {p.status === "DONE" ? (
            <Badge className="bg-green-50 absolute top-0 right-0 text-green-700 dark:bg-green-950 dark:text-green-300">
              DONE{" "}
            </Badge>
          ) : (
            <Badge className="bg-sky-50 absolute top-0 right-0 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              IN_PROGRESS
            </Badge>
          )}

          <div className="flex gap-2">
            {" "}
            <button>
              <Link
                className="flex w-20 border-chart-3 border-2 bg-sidebar text-foreground gap-1 rounded-[10px] px-2"
                href={`/posts/${p.id}?edit=noedit`}
              >
                {" "}
                <Wand className="w-3" /> Read
              </Link>
            </button>
            <button>
              <Link
                className="flex w-20 border-chart-3 border-2 bg-sidebar text-foreground gap-1 rounded-[10px] px-2"
                href={`/posts/${p.id}?edit=yesedit`}
              >
                {" "}
                <Pencil className="w-3" /> Edit
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Postsget;
