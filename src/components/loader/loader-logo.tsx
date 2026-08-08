import Image from "next/image";

export default function LoaderLogo() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <Image
        style={{
          width: "auto",
          height: "auto",
          objectFit: "contain",
        }}
        width={80}
        height={80}
        src={"/assets/images/logos/logo.png"}
        className="me-2"
        alt="Logo"
      />
    </div>
  );
}
