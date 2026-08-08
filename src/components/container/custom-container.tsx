import { ReactNode } from "react";

export function CustomContainer({
  children,
}: Readonly<{
  children?: ReactNode;
}>) {
  return (
    <div className="w-full max-w-screen-2xl flex flex-col flex-wrap items-center justify-center mx-auto px-4">
      {children}
    </div>
  );
}

export function CustomContainerXl({
  children,
}: Readonly<{
  children?: ReactNode;
}>) {
  return (
    <div className="w-full max-w-[1650px] flex flex-col flex-wrap items-center justify-center mx-auto px-4">
      {children}
    </div>
  );
}

export function CustomContainerMd({
  children,
}: Readonly<{
  children?: ReactNode;
}>) {
  return (
    <div className="w-full max-w-screen-xl flex flex-col flex-wrap items-center justify-center mx-auto px-4">
      {children}
    </div>
  );
}

export function CustomContainerFullHeight({
  children,
}: Readonly<{
  children?: ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen max-w-screen-xl flex flex-col flex-wrap items-center justify-center mx-auto p-4">
      {children}
    </div>
  );
}

export function CustomContainerFullHeightLg({
  children,
}: Readonly<{
  children?: ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen max-w-screen-2xl flex flex-col flex-wrap items-center justify-center mx-auto p-4">
      {children}
    </div>
  );
}
