import { redirect } from "next/navigation";
export default function Home() {
  redirect("/shop?outOfStock=true&inStock=true&rating=0&price=3000&sort=defaultSort&page=1");
  return null;
}