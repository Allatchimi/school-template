import { Title } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function Hero() {
  // Next hooks
  const tPage = useTranslations("Pages.help.hero");

  return (
    <section className="w-full mt-6">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center justify-center text-center gap-6">
          <Title
            level={2}
            style={{ margin: "0px" }}
            className="w-full max-w-[600px] text-center"
          >
            {tPage("title", { label: process.env.NEXT_PUBLIC_APP_NAME ?? "" })}
          </Title>
        </div>
      </div>
    </section>
  );
}
