import React from "react";
import { NavLink } from "react-router-dom";

interface SwitchProps {
  path: string;
  children: React.ReactNode;
}

export function Switch({ path, children }: SwitchProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `px-4 py-1 font-bold block ${
          isActive ? "text-white bg-primary rounded-sm" : "text-black"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
