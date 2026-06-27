import { CreateEdit } from "../components/Create&Edit";
import Postsget from "../components/Postsget";

const Postpage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {" "}
        <div>
          <p className="font-bold text-lg">All posts</p>
          <p className="text-chart-2">View all forum posts.</p>
        </div>
        <CreateEdit />
      </div>
      <Postsget />
    </div>
  );
};

export default Postpage;
