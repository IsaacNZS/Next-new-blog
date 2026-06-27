import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const posts = [
  {
    title: "First Post",
    des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore rem commodi, ipsa iste aspernatur dolor nesciunt eaque non necessitatibus rerum minima illo molestias excepturi quisquam provident? Adipisci assumenda reprehenderit deleniti!",
  },
  {
    title: "Second Post",
    des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore rem commodi, ipsa iste aspernatur dolor nesciunt eaque non necessitatibus rerum minima illo molestias excepturi quisquam provident? Adipisci assumenda reprehenderit deleniti!",
  },
  {
    title: "Third Post",
    des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore rem commodi, ipsa iste aspernatur dolor nesciunt eaque non necessitatibus rerum minima illo molestias excepturi quisquam provident? Adipisci assumenda reprehenderit deleniti!",
  },
  {
    title: "Fourth Post",
    des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore rem commodi, ipsa iste aspernatur dolor nesciunt eaque non necessitatibus rerum minima illo molestias excepturi quisquam provident? Adipisci assumenda reprehenderit deleniti!",
  },
  {
    title: "Fivth Post",
    des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore rem commodi, ipsa iste aspernatur dolor nesciunt eaque non necessitatibus rerum minima illo molestias excepturi quisquam provident? Adipisci assumenda reprehenderit deleniti!",
  },
];

const seed = async () => {
  await prisma.post.deleteMany();
  await prisma.post.createMany({
    data: posts,
  });
  console.log("Data Seeded");
};
seed();
