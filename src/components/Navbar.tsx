import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { FC } from "react";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import SearchBar from "./SearchBar";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Breadit
          </p>
        </Link>

        {/* search bar */}
        <SearchBar />

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link
            href="/sign-in"
            // 調用 ./ui/Button 的 buttonVariants 函數，這個函數會返回我們通過 cva 庫定義的 className ，我們也可以傳入參數去取得我們想要的 className
            // className={buttonVariants({ variant: "outline", size: "xs" })} // 傳入參數到 buttonVariants 指定我們要的 className
            className={buttonVariants()} // 沒有傳入參數拿到的是預設的 defaultVariants
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
