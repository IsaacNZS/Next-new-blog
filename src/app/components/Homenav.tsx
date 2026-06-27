import Link from "next/link";
import { ModeToggle } from "./theme";

const Homenav = () => {
  return (
    <div className="flex items-center justify-between mb-5">
      <Link
        href={"/"}
        className="font-bold bg-foreground px-2 rounded py-1 text-background text-xl"
      >
        Dev.io
      </Link>
      <div className="flex gap-2 items-center justify-center">
        <Link href={"/posts"} className="rounded-[10px] px-4 py-1 border">
          Posts
        </Link>
        <Link href={"/about"} className="rounded-[10px] px-4 py-1 border">
          About
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Homenav;
