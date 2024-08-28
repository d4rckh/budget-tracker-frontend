import {Inter} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {Toaster} from "@/components/ui/toaster";
import {Button} from "@/components/ui/button";
import {getUserDetails} from "@/actions/userActions";

const inter = Inter({subsets: ["latin"]});

export default async function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const {data: user} = await getUserDetails();


  return (
    <html lang="en">
    <body className={inter.className + " dark"}>
    <div className={"flex flex-row gap-2 pt-3 pl-3"}>
      <Button asChild variant={"outline"}>
        <Link href={"/"}>Home</Link>
      </Button>

      {
        user && <Button asChild variant={"outline"}>
              <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
      }
      {
        user && <Button asChild variant={"outline"}>
              <Link href={"/categories"}>Categories</Link>
          </Button>
      }
      {
        user && <Button asChild variant={"outline"}>
              <Link href={"/account"}>Account</Link>
          </Button>
      }
      {
        user == null && <Button asChild variant={"outline"}>
              <Link href={"/login"}>Login</Link>
          </Button>
      }


    </div>
    <main className={"mt-10 max-w-[1200px] px-7 mr-auto ml-auto"}>
      {children}
    </main>
    <Toaster/>
    </body>
    </html>
  );
}
