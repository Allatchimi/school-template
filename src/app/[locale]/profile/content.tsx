"use client";

import { getDashboardPath } from "@/lib/links/dashboard";
import { ArrowLeftOutlined, PieChartOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import { useState } from "react";
import { CustomContainerMd } from "@/components/container/custom-container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArgsProps } from "antd/es/message";
import { useCustomRouter } from "@/hooks/use-custom-router";
import {
  compareProfileMessageRequestToResponse,
  ProfileMessageRequest,
  ProfileMfaEmailCheckCodeRequest,
  ProfilePasswordCheckCodeRequest,
  ProfilePasswordNewPasswordRequest,
  ProfilePhoneNumberCheckCodeRequest,
  ProfilePhoneNumberNewPhoneNumberRequest,
  ProfileRequest,
  ProfileSettingNotificationRequest,
} from "@/lib/api/user/profile/request";
import {
  getProfile,
  updateProfile,
  updateProfileMessage,
  updateProfileMfaEmailCheckCode,
  updateProfileMfaEmailInit,
  updateProfilePasswordCheckCode,
  updateProfilePasswordInit,
  updateProfilePasswordNewPassword,
  updateProfilePhoneNumberCheckCode,
  updateProfilePhoneNumberInit,
  updateProfilePhoneNumberNewPhoneNumber,
  updateProfileSettingNotification,
} from "@/lib/api/user/profile/routes";
import FormAddUpdateTemplate from "@/components/template/form-add-update-template";
import { UserResponse } from "@/lib/api/user/user/response";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import { HttpStatusCode } from "axios";
import { compareUserInfoRequestToResponse } from "@/lib/api/user/user/request";
import { UserProfileSettings, UserProfile } from "./components/user-profile";
import { FormUpdateProfile } from "./components/form-update-profile";
import ImageFallback from "@/components/image/image-fallback";
import { FormUpdateProfileCheckCode } from "./components/form-update-profile-check-code";
import { FormUpdateProfileNewPassword } from "./components/form-update-profile-new-password";
import { FormUpdateProfileNewPhoneNumber } from "./components/form-update-profile-new-phone-number";
import { App } from "antd";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import { FormUpdateProfileMessage } from "./components/form-update-profile-message";
import {
  FEATURE_ADMIN,
  FEATURE_STUDENT,
  FEATURE_TEACHER,
} from "@/lib/constants/user/feature";
import { SchoolConfig } from "@/config/school";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // React hooks
  const router = useCustomRouter();
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const [updateProfileMessageModalOpen, setUpdateProfileMessageModalOpen] =
    useState(false);
  const [
    updateProfilePasswordCheckCodeModalOpen,
    setUpdateProfilePasswordCheckCodeModalOpen,
  ] = useState(false);
  const [
    updateProfilePasswordNewPasswordModalOpen,
    setUpdateProfilePasswordNewPasswordModalOpen,
  ] = useState(false);
  const [
    updateProfilePhoneNumberCheckCodeModalOpen,
    setUpdateProfilePhoneNumberCheckCodeModalOpen,
  ] = useState(false);
  const [
    updateProfilePhoneNumberNewPhoneNumberModalOpen,
    setUpdateProfilePhoneNumberNewPhoneNumberModalOpen,
  ] = useState(false);
  const [updateProfileMfaEmailModalOpen, setUpdateProfileMfaEmailModalOpen] =
    useState(false);
  const [canSubmitUpdateProfile, setCanSubmitUpdateProfile] = useState(false);
  const [canSubmitUpdateProfileMessage, setCanSubmitUpdateProfileMessage] =
    useState(false);

  // Next hooks
  const session = useSession();
  const tPage = useTranslations("Pages.profile");
  const tSentences = useTranslations("Sentences");
  const tHttpStatus = useTranslations("Sentences.http.error");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (args: ArgsProps) => {
    messageInst.open(args);
  };

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "profile-data";
  const query = useQuery({
    queryKey: [queryKeyData],
    queryFn: async () => getProfile(),
  });
  const mutationUpdateProfile = useMutation({
    mutationFn: async (profile: ProfileRequest) => updateProfile(profile),
    onSuccess(data) {
      session.update({
        user: data.data,
      });
      setCanSubmitUpdateProfile(false);
      setUpdateProfileModalOpen(false);
      invalidateQueries();
      toastMessage({
        type: "success",
        key: "updateProfile",
        duration: 5,
        content: tPage("feedback.updateProfile.success"),
      });
    },
    onError() {
      toastMessage({
        type: "error",
        key: "updateProfile",
        duration: 5,
        content: tPage("feedback.updateProfile.error"),
      });
    },
  });
  const mutationUpdateProfileMessage = useMutation({
    mutationFn: async (profile: ProfileMessageRequest) =>
      updateProfileMessage(profile),
    onSuccess() {
      setCanSubmitUpdateProfileMessage(false);
      setUpdateProfileMessageModalOpen(false);
      invalidateQueries();
      toastMessage({
        type: "success",
        key: "updateProfileMessage",
        duration: 5,
        content: tPage("feedback.updateProfileMessage.success"),
      });
    },
    onError() {
      toastMessage({
        type: "error",
        key: "updateProfileMessage",
        duration: 5,
        content: tPage("feedback.updateProfileMessage.error"),
      });
    },
  });
  const mutationUpdatePasswordInit = useMutation({
    mutationFn: async () => updateProfilePasswordInit(),
    onSuccess() {
      toastMessage({
        type: "info",
        key: "updateProfilePasswordInit",
        duration: 5,
        content: tPage("feedback.updateProfilePasswordInit.success"),
      });
      mutationUpdatePasswordCheckCode.reset();
      setUpdateProfilePasswordCheckCodeModalOpen(true);
    },
    onError() {
      toastMessage({
        type: "error",
        key: "updateProfilePasswordInit",
        duration: 5,
        content: tPage("feedback.updateProfilePasswordInit.error"),
      });
    },
  });
  const mutationUpdatePasswordCheckCode = useMutation({
    mutationFn: async (profile: ProfilePasswordCheckCodeRequest) =>
      updateProfilePasswordCheckCode(profile),
    onSuccess() {
      toastMessage({
        type: "info",
        key: "updateProfilePasswordCheckCode",
        duration: 5,
        content: tPage("feedback.updateProfilePasswordCheckCode.success"),
      });
      mutationUpdatePasswordNewPassword.reset();
      setUpdateProfilePasswordCheckCodeModalOpen(false);
      setUpdateProfilePasswordNewPasswordModalOpen(true);
    },
  });
  const mutationUpdatePasswordNewPassword = useMutation({
    mutationFn: async (profile: ProfilePasswordNewPasswordRequest) =>
      updateProfilePasswordNewPassword(profile),
    onSuccess() {
      toastMessage({
        type: "success",
        key: "updateProfilePasswordNewPassword",
        duration: 5,
        content: tPage("feedback.updateProfilePasswordNewPassword.success"),
      });
      setUpdateProfilePasswordNewPasswordModalOpen(false);
      invalidateQueries();
    },
  });
  const mutationUpdatePhoneNumberInit = useMutation({
    mutationFn: async () => updateProfilePhoneNumberInit(),
    onSuccess() {
      toastMessage({
        type: "info",
        key: "updateProfilePhoneNumberInit",
        duration: 5,
        content: tPage("feedback.updateProfilePhoneNumberInit.success"),
      });
      mutationUpdatePhoneNumberCheckCode.reset();
      setUpdateProfilePhoneNumberCheckCodeModalOpen(true);
    },
    onError() {
      toastMessage({
        type: "error",
        key: "updateProfilePhoneNumberInit",
        duration: 5,
        content: tPage("feedback.updateProfilePhoneNumberInit.error"),
      });
    },
  });
  const mutationUpdatePhoneNumberCheckCode = useMutation({
    mutationFn: async (profile: ProfilePhoneNumberCheckCodeRequest) =>
      updateProfilePhoneNumberCheckCode(profile),
    onSuccess() {
      toastMessage({
        type: "info",
        key: "updateProfilePhoneNumberCheckCode",
        duration: 5,
        content: tPage("feedback.updateProfilePhoneNumberCheckCode.success"),
      });
      mutationUpdatePhoneNumberNewPhoneNumber.reset();
      setUpdateProfilePhoneNumberCheckCodeModalOpen(false);
      setUpdateProfilePhoneNumberNewPhoneNumberModalOpen(true);
    },
  });
  const mutationUpdatePhoneNumberNewPhoneNumber = useMutation({
    mutationFn: async (profile: ProfilePhoneNumberNewPhoneNumberRequest) =>
      updateProfilePhoneNumberNewPhoneNumber(profile),
    onSuccess() {
      toastMessage({
        type: "success",
        key: "updateProfilePhoneNumberNewPhoneNumber",
        duration: 5,
        content: tPage(
          "feedback.updateProfilePhoneNumberNewPhoneNumber.success"
        ),
      });
      setUpdateProfilePhoneNumberNewPhoneNumberModalOpen(false);
      invalidateQueries();
    },
  });
  const mutationUpdateSettingMfaEmailInit = useMutation({
    mutationFn: async () => updateProfileMfaEmailInit(),
    onSuccess() {
      toastMessage({
        type: "info",
        key: "updateProfileMfaEmailInit",
        duration: 5,
        content: tPage("feedback.updateProfileMfaEmailInit.success"),
      });
      mutationUpdateSettingMfaEmailCheckCode.reset();
      setUpdateProfileMfaEmailModalOpen(true);
    },
    onError() {
      toastMessage({
        type: "error",
        key: "updateProfileMfaEmailInit",
        duration: 5,
        content: tPage("feedback.updateProfileMfaEmailInit.error"),
      });
    },
  });
  const mutationUpdateSettingMfaEmailCheckCode = useMutation({
    mutationFn: async (profile: ProfileMfaEmailCheckCodeRequest) =>
      updateProfileMfaEmailCheckCode(profile),
    onSuccess() {
      toastMessage({
        type: "success",
        key: "updateProfileMfaEmailCheckCode",
        duration: 5,
        content: tPage("feedback.updateProfileMfaEmailCheckCode.success"),
      });
      setUpdateProfileMfaEmailModalOpen(false);
      invalidateQueries();
    },
    onError() {
      toastMessage({
        type: "error",
        key: "updateProfileMfaEmailCheckCode",
        duration: 5,
        content: tPage("feedback.updateProfileMfaEmailCheckCode.error"),
      });
    },
  });
  const mutationUpdateSettingNotification = useMutation({
    mutationFn: async (profile: ProfileSettingNotificationRequest) =>
      updateProfileSettingNotification(profile),
    onSuccess() {
      invalidateQueries();
    },
    onError() {
      toastMessage({
        type: "error",
        key: "updateProfileSettingNotification",
        duration: 5,
        content: tPage("feedback.updateProfileSettingNotification.error"),
      });
    },
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeyData],
    });
  };

  const feature = session?.data?.user.feature;
  return (
    <>
      <CustomContainerMd>
        <div
          style={{
            backgroundColor: theme.colorBgContainer,
            borderRadius: theme.borderRadius,
            borderWidth: "0.5px",
            borderColor: theme.colorBorder,
          }}
          className="w-full h-full flex flex-col gap-6 items-center my-6"
        >
          <div
            style={{
              backgroundColor: theme.colorPrimary,
              borderTopLeftRadius: theme.borderRadius,
              borderTopRightRadius: theme.borderRadius,
            }}
            className="w-full background-pattern-white-low"
          >
            <div className="w-full flex flex-wrap justify-between gap-4 p-4">
              <Button
                onClick={() => router.push("/")}
                icon={<ArrowLeftOutlined />}
              >
                {tWords("website")}
              </Button>
              <Button
                htmlType="submit"
                onClick={() => router.push(getDashboardPath(feature ?? ""))}
                icon={<PieChartOutlined />}
              >
                {tWords("dashboard")}
              </Button>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-4 my-4">
              <div className="w-32 h-32">
                <ImageFallback
                  borderRadius={"50%"}
                  src={session.data?.user?.image || undefined}
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <Title
                  level={5}
                  style={{
                    margin: "0px",
                    color: theme.colorWhite,
                  }}
                >
                  {tWords("welcome")} {query.data?.data?.info?.firstName}{" "}
                  {query.data?.data?.info?.lastName}
                </Title>
                <Text
                  type="secondary"
                  style={{
                    color: theme.colorWhite,
                  }}
                >
                  {tWords("role")} {session.data?.user?.role}
                </Text>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-4 px-4 mb-4">
            <div className="w-full h-full flex flex-col ">
              <UserProfile
                disabled={
                  query.isFetching ||
                  feature === FEATURE_TEACHER ||
                  feature === FEATURE_STUDENT
                }
                disabledMessage={
                  query.isFetching ||
                  mutationUpdateProfileMessage.isPending ||
                  !SchoolConfig.schoolID() ||
                  feature === FEATURE_ADMIN
                }
                loadingProfile={mutationUpdateProfile.isPending}
                loadingProfileMessage={mutationUpdateProfileMessage.isPending}
                loadingPhoneNumber={mutationUpdatePhoneNumberInit.isPending}
                item={query.data?.data ?? undefined}
                onEditProfileClicked={() => {
                  setUpdateProfileModalOpen(true);
                }}
                onEditMessageClicked={() =>
                  setUpdateProfileMessageModalOpen(true)
                }
                onUpdatePhoneNumberClicked={() => {
                  if (!mutationUpdatePhoneNumberInit.isPending) {
                    mutationUpdatePhoneNumberInit.mutate();
                  }
                }}
              />
            </div>
            <div className="w-full h-full flex flex-col">
              <UserProfileSettings
                disabled={query.isFetching}
                loadingPassword={mutationUpdatePasswordInit.isPending}
                loadingNotifications={
                  mutationUpdateSettingNotification.isPending
                }
                loadingMfaEmail={mutationUpdateSettingMfaEmailInit.isPending}
                loadingMfaAuthenticator={false}
                isNotificationsEnabled={
                  query.data?.data?.config?.allowNotifications ?? undefined
                }
                isMfaEmailEnabled={
                  query.data?.data?.config?.mfaEmail ?? undefined
                }
                isMfaAuthenticatorEnabled={
                  query.data?.data?.config?.mfaAuthenticator ?? undefined
                }
                onUpdatePasswordClicked={() => {
                  if (!mutationUpdatePasswordInit.isPending) {
                    mutationUpdatePasswordInit.mutate();
                  }
                }}
                onToggleNotifications={() => {
                  if (!mutationUpdateSettingNotification.isPending) {
                    mutationUpdateSettingNotification.mutate({
                      isEnabled:
                        query.data?.data?.config?.allowNotifications === true
                          ? false
                          : true,
                    });
                  }
                }}
                onToggleMfaEmail={() => {
                  if (!mutationUpdateSettingMfaEmailInit.isPending) {
                    mutationUpdateSettingMfaEmailInit.mutate();
                  }
                }}
                onToggleMfaAuthenticator={() => {
                  // TODO
                }}
              />
            </div>
          </div>
        </div>
      </CustomContainerMd>

      {/* Update profile information */}
      <CustomModalWithoutFooter
        title={tSentences("modal.title.update", {
          label: tWords("profile"),
        })}
        content={
          <FormAddUpdateTemplate<ProfileRequest, UserResponse>
            loading={mutationUpdateProfile.isPending}
            canSubmit={canSubmitUpdateProfile}
            canSubmitMessage={tSentences("modal.footer.update")}
            returnFormAddUpdateNode={FormUpdateProfile}
            errorMessage={
              mutationUpdateProfile.isError
                ? HttpMessageFromStatus(
                    (mutationUpdateProfile.error as any)?.response?.data
                      ?.status ?? HttpStatusCode.InternalServerError,
                    tWords("profile"),
                    tHttpStatus
                  )
                : undefined
            }
            item={query.data?.data ?? undefined}
            onValuesChange={(value) => {
              const tmpAreEqual: boolean = compareUserInfoRequestToResponse(
                value,
                query.data?.data ?? undefined
              );
              setCanSubmitUpdateProfile(!tmpAreEqual);
            }}
            onSubmit={(value) => {
              if (!value) {
                return;
              }
              mutationUpdateProfile.mutate(value);
            }}
            onCancel={() => setUpdateProfileModalOpen(false)}
          />
        }
        modalOpen={updateProfileModalOpen}
        width={800}
        onOk={() => setUpdateProfileModalOpen(false)}
        onCancel={() => setUpdateProfileModalOpen(false)}
        maskClosable={false}
      />

      {/* Update profile contact */}
      <CustomModalWithoutFooter
        title={tSentences("modal.title.update", { label: tWords("contact") })}
        content={
          <FormAddUpdateTemplate<ProfileMessageRequest, UserResponse>
            loading={mutationUpdateProfileMessage.isPending}
            canSubmit={canSubmitUpdateProfileMessage}
            canSubmitMessage={tSentences("modal.footer.update")}
            returnFormAddUpdateNode={FormUpdateProfileMessage}
            errorMessage={
              mutationUpdateProfileMessage.isError
                ? HttpMessageFromStatus(
                    (mutationUpdateProfileMessage.error as any)?.response?.data
                      ?.status ?? HttpStatusCode.InternalServerError,
                    tWords("profile"),
                    tHttpStatus
                  )
                : undefined
            }
            item={query.data?.data ?? undefined}
            onValuesChange={(value) => {
              const tmpAreEqual: boolean =
                compareProfileMessageRequestToResponse(
                  value,
                  query.data?.data ?? undefined
                );
              setCanSubmitUpdateProfileMessage(!tmpAreEqual);
            }}
            onSubmit={(value) => {
              if (!value) {
                return;
              }
              mutationUpdateProfileMessage.mutate(value);
            }}
            onCancel={() => setUpdateProfileMessageModalOpen(false)}
          />
        }
        modalOpen={updateProfileMessageModalOpen}
        width={600}
        onOk={() => setUpdateProfileMessageModalOpen(false)}
        onCancel={() => setUpdateProfileMessageModalOpen(false)}
        maskClosable={false}
      />

      {/* Update password check code */}
      <CustomModalWithoutFooter
        title={tPage("modal.title.checkCode")}
        content={
          <FormAddUpdateTemplate<
            ProfilePasswordCheckCodeRequest,
            ProfilePasswordCheckCodeRequest
          >
            loading={mutationUpdatePasswordCheckCode.isPending}
            canSubmit={true}
            returnFormAddUpdateNode={
              FormUpdateProfileCheckCode<ProfilePasswordCheckCodeRequest>
            }
            errorMessage={
              mutationUpdatePasswordCheckCode.isError
                ? HttpMessageFromStatus(
                    (mutationUpdatePasswordCheckCode.error as any)?.response
                      ?.data?.status ?? HttpStatusCode.InternalServerError,
                    tWords("profile"),
                    tHttpStatus
                  )
                : undefined
            }
            onSubmit={(value) => {
              if (!value) {
                return;
              }
              const newValue = value;
              newValue.token = mutationUpdatePasswordInit.data?.data?.token;
              mutationUpdatePasswordCheckCode.mutate(newValue);
            }}
            onCancel={() => setUpdateProfilePasswordCheckCodeModalOpen(false)}
          />
        }
        modalOpen={updateProfilePasswordCheckCodeModalOpen}
        width={600}
        onOk={() => setUpdateProfilePasswordCheckCodeModalOpen(false)}
        onCancel={() => setUpdateProfilePasswordCheckCodeModalOpen(false)}
        maskClosable={false}
      />

      {/* Update password new password */}
      <CustomModalWithoutFooter
        title={tPage("modal.title.setNewPassword")}
        content={
          <FormAddUpdateTemplate<
            ProfilePasswordNewPasswordRequest,
            ProfilePasswordNewPasswordRequest
          >
            loading={mutationUpdatePasswordNewPassword.isPending}
            canSubmit={true}
            returnFormAddUpdateNode={FormUpdateProfileNewPassword}
            errorMessage={
              mutationUpdatePasswordNewPassword.isError
                ? HttpMessageFromStatus(
                    (mutationUpdatePasswordNewPassword.error as any)?.response
                      ?.data?.status ?? HttpStatusCode.InternalServerError,
                    tWords("profile"),
                    tHttpStatus
                  )
                : undefined
            }
            onSubmit={(value) => {
              if (!value) {
                return;
              }
              const newValue = value;
              newValue.token =
                mutationUpdatePasswordCheckCode.data?.data?.token;
              mutationUpdatePasswordNewPassword.mutate(newValue);
            }}
            onCancel={() => setUpdateProfilePasswordNewPasswordModalOpen(false)}
          />
        }
        modalOpen={updateProfilePasswordNewPasswordModalOpen}
        width={600}
        onOk={() => setUpdateProfilePasswordNewPasswordModalOpen(false)}
        onCancel={() => setUpdateProfilePasswordNewPasswordModalOpen(false)}
        maskClosable={false}
      />

      {/* Update phone number check code */}
      <CustomModalWithoutFooter
        title={tPage("modal.title.changePhoneNumber")}
        content={
          <FormAddUpdateTemplate<
            ProfilePhoneNumberCheckCodeRequest,
            ProfilePhoneNumberCheckCodeRequest
          >
            loading={mutationUpdatePhoneNumberCheckCode.isPending}
            canSubmit={true}
            returnFormAddUpdateNode={
              FormUpdateProfileCheckCode<ProfilePhoneNumberCheckCodeRequest>
            }
            errorMessage={
              mutationUpdatePhoneNumberCheckCode.isError
                ? HttpMessageFromStatus(
                    (mutationUpdatePhoneNumberCheckCode.error as any)?.response
                      ?.data?.status ?? HttpStatusCode.InternalServerError,
                    tWords("profile"),
                    tHttpStatus
                  )
                : undefined
            }
            onSubmit={(value) => {
              if (!value) {
                return;
              }
              const newValue = value;
              newValue.token = mutationUpdatePhoneNumberInit.data?.data?.token;
              mutationUpdatePhoneNumberCheckCode.mutate(newValue);
            }}
            onCancel={() =>
              setUpdateProfilePhoneNumberCheckCodeModalOpen(false)
            }
          />
        }
        modalOpen={updateProfilePhoneNumberCheckCodeModalOpen}
        width={600}
        onOk={() => setUpdateProfilePhoneNumberCheckCodeModalOpen(false)}
        onCancel={() => setUpdateProfilePhoneNumberCheckCodeModalOpen(false)}
        maskClosable={false}
      />

      {/* Update phone number new phone number */}
      <CustomModalWithoutFooter
        title={tPage("modal.title.changePhoneNumber")}
        content={
          <FormAddUpdateTemplate<
            ProfilePhoneNumberNewPhoneNumberRequest,
            ProfilePhoneNumberNewPhoneNumberRequest
          >
            loading={mutationUpdatePhoneNumberNewPhoneNumber.isPending}
            canSubmit={true}
            returnFormAddUpdateNode={FormUpdateProfileNewPhoneNumber}
            errorMessage={
              mutationUpdatePhoneNumberNewPhoneNumber.isError
                ? HttpMessageFromStatus(
                    (mutationUpdatePhoneNumberNewPhoneNumber.error as any)
                      ?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    tWords("profile"),
                    tHttpStatus
                  )
                : undefined
            }
            onSubmit={(value) => {
              if (!value) {
                return;
              }
              const newValue = value;
              newValue.token =
                mutationUpdatePhoneNumberCheckCode.data?.data?.token;
              mutationUpdatePhoneNumberNewPhoneNumber.mutate(newValue);
            }}
            onCancel={() =>
              setUpdateProfilePhoneNumberNewPhoneNumberModalOpen(false)
            }
          />
        }
        modalOpen={updateProfilePhoneNumberNewPhoneNumberModalOpen}
        width={600}
        onOk={() => setUpdateProfilePhoneNumberNewPhoneNumberModalOpen(false)}
        onCancel={() =>
          setUpdateProfilePhoneNumberNewPhoneNumberModalOpen(false)
        }
        maskClosable={false}
      />

      {/* Update MFA email check code */}
      <CustomModalWithoutFooter
        title={tPage("modal.title.checkCodeChange2faEmail")}
        content={
          <FormAddUpdateTemplate<
            ProfileMfaEmailCheckCodeRequest,
            ProfileMfaEmailCheckCodeRequest
          >
            loading={mutationUpdateSettingMfaEmailCheckCode.isPending}
            canSubmit={true}
            returnFormAddUpdateNode={
              FormUpdateProfileCheckCode<ProfileMfaEmailCheckCodeRequest>
            }
            errorMessage={
              mutationUpdateSettingMfaEmailCheckCode.isError
                ? HttpMessageFromStatus(
                    (mutationUpdateSettingMfaEmailCheckCode.error as any)
                      ?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    tWords("profile"),
                    tHttpStatus
                  )
                : undefined
            }
            onSubmit={(value) => {
              if (!value) {
                return;
              }
              const newValue = value;
              newValue.token =
                mutationUpdateSettingMfaEmailInit.data?.data?.token;
              mutationUpdateSettingMfaEmailCheckCode.mutate(newValue);
            }}
            onCancel={() => setUpdateProfileMfaEmailModalOpen(false)}
          />
        }
        modalOpen={updateProfileMfaEmailModalOpen}
        width={600}
        onOk={() => setUpdateProfileMfaEmailModalOpen(false)}
        onCancel={() => setUpdateProfileMfaEmailModalOpen(false)}
        maskClosable={false}
      />
    </>
  );
}
