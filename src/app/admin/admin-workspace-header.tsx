"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AdminLanguageSwitcher } from "@/app/admin/admin-language-switcher";

/**
 * 登录页不展示；其余管理页在主内容区顶部右侧显示语言切换（工作台区域右上角）。
 */
export function AdminWorkspaceHeader({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return children;
  }

  return (
    <>
      <div className="sticky top-0 z-20 -mt-2 mb-6 flex justify-end border-b border-black/[0.06] bg-[#f7f3ee]/90 pb-4 pt-1 backdrop-blur-md sm:-mt-0 sm:mb-8 sm:pt-2">
        <AdminLanguageSwitcher />
      </div>
      {children}
    </>
  );
}
