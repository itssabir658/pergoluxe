"use client";

import { createContext, useContext } from "react";

type HeaderThemeValue = {
  /** True only while the header is unscrolled *and* the page opted into a
   * transparent-over-hero header. Lets Logo/PrimaryNav/HeaderActions pick
   * a light-over-imagery text color without each of them re-deriving
   * scroll state independently. */
  transparent: boolean;
};

const HeaderThemeContext = createContext<HeaderThemeValue>({ transparent: false });

export const HeaderThemeProvider = HeaderThemeContext.Provider;

export function useHeaderTheme() {
  return useContext(HeaderThemeContext);
}
