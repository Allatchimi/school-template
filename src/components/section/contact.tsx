"use client";

import { SchoolConfig } from "@/config/school";
import { ContactRequest } from "@/lib/api/others/contact/request";
import { postContact } from "@/lib/api/others/contact/routes";
import { useMutation } from "@tanstack/react-query";
import { ArgsProps } from "antd/es/message";
import FormItemInputEmail from "../form-item/input/input-email";
import FormItemInputTextArea from "../form-item/input/input-text-area";
import HelpIcon from "../icon/material/help";
import { MotionRevealFromBottom } from "../motion/reveal";
import FormAlertDefaultError from "../form-item/alert/default-error";
import FormItemInputText from "../form-item/input/input-text";
import { App, antdTheme, Form, FormItem, Button, Title } from "@/ui/antd";
import { useForm } from "antd/es/form/Form";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import { HttpStatusCode } from "axios";
import { useDefaultFormRule } from "@/hooks/use-form-rule";
import { useTranslations } from "next-intl";

export default function Contact() {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback");
  const tHttpStatus = useTranslations("Sentences.http.error");
  const tWords = useTranslations("Words");

  // Ant design hooks
  const [form] = useForm<ContactRequest>();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (args: ArgsProps) => {
    messageInst.open(args);
  };

  // Tanstack hooks
  const mutationAdd = useMutation({
    mutationFn: async (contact: ContactRequest) => postContact(contact),
    onSuccess() {
      form.resetFields();
      toastMessage({
        type: "success",
        key: "mutationAddSuccess",
        duration: 5,
        content: tSentences("add.success", { label: tWords("contact") }),
      });
    },
  });

  return (
    <MotionRevealFromBottom>
      <section className="w-full flex flex-col items-center gap-8">
        <Title level={2} className="w-full text-center">
          {tWords("contactUs")}
        </Title>
        <div
          style={{
            backgroundColor: theme.colorBgContainer,
            borderRadius: theme.borderRadius,
            borderWidth: "0.5px",
            borderColor: theme.colorBorder,
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 10px 50px",
          }}
          className="w-full max-w-screen-lg grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 p-4 lg:p-6"
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div
              style={{
                backgroundColor: theme.colorPrimary,
                borderRadius: theme.borderRadius,
                color: theme.colorTextLightSolid,
              }}
              className="w-full h-[300px] lg:h-[400px] flex items-center justify-center background-pattern-white"
            >
              <HelpIcon width={200} height={200} opacity={0.75} />
            </div>
          </div>

          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full">
              <Form<ContactRequest>
                name="form-add-contact"
                form={form}
                layout={"vertical"}
                onFinish={(item: ContactRequest) => {
                  const newItem = item;
                  newItem.schoolID = SchoolConfig.schoolID();
                  mutationAdd.mutate(newItem);
                }}
                autoComplete="on"
                className="w-full"
              >
                <FormItemInputEmail
                  disabled={mutationAdd.isPending}
                  label={tWords("email")}
                  name={"email"}
                  placeholder={tWords("email")}
                  required={true}
                  size="large"
                />

                <FormItemInputText
                  disabled={mutationAdd.isPending}
                  label={tWords("topic")}
                  name="subject"
                  placeholder={tWords("topic")}
                  size="large"
                  rules={useDefaultFormRule({
                    fielLabel: tWords("topic"),
                    options: {
                      required: true,
                      max: 150,
                    },
                  })}
                />

                <FormItemInputTextArea
                  disabled={mutationAdd.isPending}
                  label={tWords("message")}
                  name="message"
                  placeholder={tWords("message")}
                  size="large"
                  rows={6}
                  rules={useDefaultFormRule({
                    fielLabel: tWords("message"),
                    options: {
                      required: true,
                      max: 500,
                    },
                  })}
                />

                <FormAlertDefaultError
                  errorMessage={
                    mutationAdd.isError
                      ? HttpMessageFromStatus(
                          (mutationAdd.error as any)?.response?.data?.status ??
                            HttpStatusCode.InternalServerError,
                          tWords("contact"),
                          tHttpStatus
                        )
                      : undefined
                  }
                />

                <FormItem noStyle>
                  <Button
                    loading={mutationAdd.isPending}
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className="w-full"
                  >
                    {tWords("submit")}
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </MotionRevealFromBottom>
  );
}
