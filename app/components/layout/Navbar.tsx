"use client";

import {
  MenuIcon,
  Heart,
  ShoppingCart,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/app/context/CartContext";

const links = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/categories", label: "Categories" },
  { path: "/brands", label: "Brands" },
];

const Navbar = () => {
  const { cartDetails } = useCart();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const initials =
    session?.user?.user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <section className="py-4 border-b">
      <div className="container px-2 md:px-20">
        <nav className="flex items-center justify-between gap-4">
          {/* Left: Brand */}
          <div className="flex-1">
            <Link href="/" className="text-lg font-bold">
              Exclusive
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex gap-6 justify-center">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "font-samibold text-base transition-colors",
                  pathname === link.path
                    ? "text-red-500 underline underline-offset-4"
                    : "text-black hover:text-red-400"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Search, Icons, Auth */}
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Search */}
            <div className="relative hidden lg:block">
              <Input
                placeholder="What are you looking for?"
                className="pl-4 pr-10 w-[250px] bg-gray-100"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            {/* Show Cart & Wishlist only if logged in */}
            {session?.user && (
              <>
                {/* Wishlist */}
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/wishlist">
                    <div className="relative">
                      <Heart className="w-5 h-5" />
                      <Badge className="absolute -top-2 -right-2 rounded-full text-[8px] px-1 py-0.2" variant="destructive">
                        2
                      </Badge>
                    </div>
                  </Link>
                </Button>

                {/* Cart */}
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/cart">
                    <div className="relative">
                      <ShoppingCart className="w-5 h-5" />
                      {!!cartDetails?.numOfCartItems && (
                        <Badge className="absolute -top-2 -right-2 rounded-full text-[8px] px-1 py-0.5" variant="destructive">
                          {cartDetails.numOfCartItems}
                        </Badge>
                      )}
                    </div>
                  </Link>
                </Button>
              </>
            )}

            {/* Auth (Desktop) */}
            {status === "loading" ? (
              <span>Loading...</span>
            ) : status === "unauthenticated" ? (
              <div className="hidden lg:flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            ) : (
              session?.user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 text-center mt-2">
                    <DropdownMenuLabel className="text-sm text-gray-700 mb-1">
                      {session.user.user?.name || session.user.user?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className={cn(
                          "justify-center w-full",
                          pathname === "/profile" &&
                            "text-red-500 underline underline-offset-4"
                        )}
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/orders"
                        className={cn(
                          "justify-center w-full",
                          pathname === "/orders" &&
                            "text-red-500 underline underline-offset-4"
                        )}
                      >
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="text-red-600 cursor-pointer justify-center"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="text-lg font-bold">
                    Exclusive
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4 gap-6">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={cn(
                      "text-sm font-medium",
                      pathname === link.path &&
                        "text-red-500 underline underline-offset-4"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Icons (Mobile) */}
                {session?.user && (
                  <div className="flex gap-4 pt-4">
                    <Link href="/wishlist">
                      <div className="relative">
                        <Heart className="w-5 h-5" />
                        <Badge className="absolute -top-2 -right-2 rounded-full text-[8px] px-1 py-0.2" variant="destructive">
                          2
                        </Badge>
                      </div>
                    </Link>
                    <Link href="/cart">
                      <div className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        {!!cartDetails?.numOfCartItems && (
                          <Badge className="absolute -top-2 -right-2 rounded-full text-[8px] px-1 py-0.5" variant="destructive">
                            {cartDetails.numOfCartItems}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  </div>
                )}

                {/* Auth in Mobile */}
                {status === "unauthenticated" && (
                  <div className="flex flex-col gap-4 pt-4 lg:hidden">
                    <Button variant="outline" asChild>
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </div>
                )}
                {session?.user && (
                  <div className="flex flex-col gap-2 pt-4 max-w-[200px]">
                    <Avatar
                      className="h-8 w-8"
                      title={session.user.user?.name || session.user.user?.email}
                    >
                      <AvatarFallback className="text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <Link href="/profile">
                      <Button
                        variant={pathname === "/profile" ? "outline" : "ghost"}
                        className={cn(
                          "w-full justify-center",
                          pathname === "/profile" &&
                            "text-red-500 underline underline-offset-4"
                        )}
                      >
                        Profile
                      </Button>
                    </Link>
                    <Link href="/orders">
                      <Button
                        variant={pathname === "/orders" ? "outline" : "ghost"}
                        className={cn(
                          "w-full justify-center",
                          pathname === "/orders" &&
                            "text-red-500 underline underline-offset-4"
                        )}
                      >
                        Orders
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
