import { CreateEdit } from "@/app/components/Create&Edit";
import DeleteComfirm from "@/app/components/DeleteComfirm";
import { Onepost } from "@/app/features/posts/getAll";
import { Badge } from "@/components/ui/badge";

type Prop = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit: string }>;
};

const Detailpage = async ({ params, searchParams }: Prop) => {
  const { id } = await params;
  const { edit } = await searchParams;
  const post = await Onepost(id);

  return (
    <>
      {edit !== "yesedit" ? (
        <div className="flex bg-sidebar relative rounded-[8px] px-3 py-2 flex-col gap-1">
          <p className="text-[15px] font-bold">{post?.title}</p>
          <p className="text-chart-2">{post?.des}</p>
          {post?.status === "DONE" ? (
            <Badge className="bg-green-50 absolute top-0 right-0 text-green-700 dark:bg-green-950 dark:text-green-300">
              DONE
            </Badge>
          ) : (
            <Badge className="bg-sky-50 absolute top-0 right-0 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              IN_PROGRESS
            </Badge>
          )}
          <DeleteComfirm id={id} />
        </div>
      ) : (
        <CreateEdit id={post?.id!} />
      )}
    </>
  );
};

export default Detailpage;
