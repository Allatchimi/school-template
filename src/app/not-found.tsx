import Link from "next/link";
import ImageFallback from "@/components/image/image-fallback";
import { Result, Button } from "@/ui/antd";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "404 - Not found",
  description: "404 - Not found.",
  keywords: [
    process.env.NEXT_PUBLIC_APP_NAME || "",
    "Not found",
    "404",
    "Error",
  ],
};

export default function PageContent() {
  // Next hooks
  const tPage = useTranslations("Pages.notFound");
  const tWords = useTranslations("Words");

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center">
      <div className="w-auto absolute top-0 left-1/2 transform -translate-x-1/2 p-4">
        <Link href="/">
          <div
            style={{
              width: "150px",
              height: "70px",
            }}
          >
            <ImageFallback
              objectFit="contain"
              src={"/assets/images/logos/logo.png"}
            />
          </div>
        </Link>
      </div>
      <Result
        icon={
          <div className="w-full">
            <h1 className="w-full text-center text-7xl font-bold">404</h1>
          </div>
        }
        title={tPage("title")}
        subTitle={tPage("subtitle")}
        extra={
          <div className="w-full flex items-center flex-wrap gap-4">
            <Link href={"/"} className="w-full">
              <Button type="primary" className="w-full">
                {tWords("backToHome")}
              </Button>
            </Link>
            <Link href={"/help"} className="w-full">
              <Button type="default" className="w-full">
                {tWords("help")}
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
