import ImageFallback from "../image/image-fallback";

interface LogoHeaderProps {
  height?: number;
  width?: number;
}

export default function LogoHeader({
  width = 50,
  height = 50,
}: LogoHeaderProps) {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      <ImageFallback
        backgroundColor="transparent"
        objectFit="contain"
        src={"/assets/images/logos/logo.png"}
        size={width}
      />
    </div>
  );
}
