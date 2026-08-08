import { Alert } from "@/ui/antd";

export interface FormAlertDefaultErrorProps {
  errorMessage?: string;
}

export default function FormAlertDefaultError(
  props: FormAlertDefaultErrorProps,
) {
  return (
    <Alert
      showIcon={false}
      style={{
        height:
          props.errorMessage && props.errorMessage.length > 0 ? "auto" : "0px",
        padding:
          props.errorMessage && props.errorMessage.length > 0
            ? "8px 12px"
            : "0px",
        borderWidth:
          props.errorMessage && props.errorMessage.length > 0 ? "1px" : "0px",
        marginBottom:
          props.errorMessage && props.errorMessage.length > 0 ? "10px" : "0px",
      }}
      message={
        props.errorMessage && props.errorMessage.length > 0
          ? props.errorMessage
          : undefined
      }
      type="error"
      className="transition-all duration-150 ease-in-out"
    />
  );
}
