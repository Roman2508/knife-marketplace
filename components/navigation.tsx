"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Watch,
  PocketKnife as Knife,
  MessageSquare,
  User,
  LogOut,
  Shield,
  Plus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  // { href: "/browse", label: "Browse", icon: null },
  { href: "/browse?category=knife", label: "Ножі", icon: Knife },
  { href: "/browse?category=watch", label: "Аксесуари", icon: Watch },
  { href: "#", label: "Блог", icon: null },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout, conversations } = useAppStore();

  const unreadMessages = conversations.reduce(
    (acc, c) => acc + c.unreadCount,
    0
  );

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-[95rem] bg-background border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" className="group flex items-center gap-3">
            <div className="border-4 border-foreground bg-primary px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              {/* desktop */}
              <span className="font-mono text-2xl font-black tracking-tighter text-primary-foreground uppercase hidden sm:inline">
                EDGE
              </span>

              {/* mobile */}
              <span className="font-mono text-2xl font-black tracking-tighter text-primary-foreground uppercase inline sm:hidden">
                E
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 border-2 border-foreground px-5 py-2 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
                  pathname === link.href ||
                    pathname.startsWith(link.href.split("?")[0])
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground"
                )}
              >
                {/* {link.icon && <link.icon className="h-4 w-4" />} */}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 justify-end">
            <ThemeToggle />

            {currentUser ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="hidden border-2 rounded-none border-foreground bg-background px-4 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] sm:flex"
                >
                  <Link href="/sell">
                    <Plus className="mr-2 h-4 w-4" />
                    ПРОДАТИ
                  </Link>
                </Button>

                <Link
                  href="/messages"
                  className="relative flex h-9 w-9 items-center justify-center border-2 border-foreground bg-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]"
                >
                  <MessageSquare className="h-4 w-4" />
                  {unreadMessages > 0 && (
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center border-2 border-foreground bg-destructive text-xs font-black text-destructive-foreground">
                      {unreadMessages}
                    </div>
                  )}
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 w-9 rounded-none border-2 border-foreground bg-background p-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-primary hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]"
                    >
                      <Avatar className="h-8 w-8 rounded-none">
                        <AvatarImage
                          src={currentUser.avatar || "/placeholder.svg"}
                          alt={currentUser.username}
                        />
                        <AvatarFallback className="font-black uppercase">
                          {currentUser.username[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
                  >
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={currentUser.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {currentUser.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {currentUser.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {currentUser.email}
                        </span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Профіль
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-listings" className="cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        Мої оголошення
                      </Link>
                    </DropdownMenuItem>
                    {currentUser.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/moderation" className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          Модерація
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="hidden md:inline border-2 rounded-none border-foreground bg-background px-4 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:text-foreground transition-all hover:-translate-y-0.5 hover:bg-background hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]"
                >
                  <Link href="/login">Вхід</Link>
                </Button>
                <Button
                  asChild
                  className="hidden md:inline border-2 rounded-none border-foreground bg-primary px-4 py-2 text-xs font-black uppercase tracking-wider text-primary-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-primary hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]"
                >
                  <Link href="/register">Реєстрація</Link>
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              className="border-2 rounded-none border-foreground bg-background p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mt-2 border-4 border-foreground bg-background p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 border-2 border-foreground px-4 py-3 text-sm font-black uppercase tracking-wider transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "bg-background"
                )}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <Link
                href="/sell"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 border-2 border-foreground bg-primary px-4 py-3 text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                <Plus className="h-4 w-4" />
                Продати
              </Link>
            ) : (
              <>
                <hr className="my-2" />
                <Link
                  href="/sell"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 border-2 border-foreground bg-accent px-4 py-3 text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                >
                  Увійти
                </Link>
                <Link
                  href="/sell"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 border-2 border-foreground bg-primary px-4 py-3 text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                >
                  Реєстрація
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
