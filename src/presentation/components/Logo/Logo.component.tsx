import { HeartHandshake } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex flex-col gap-0 items-center">
      <HeartHandshake size={16} className="w-10 h-10 mb-1 text-[#FFF2F2] mt-2" />
      <span className="text-2xl leading-tight text-center font-extrabold text-[#7886C7]">
        CONEXÃO
      </span>
      <span className="text-lg leading-tight text-center text-[#A9B5DF] mb-2">
        SOLIDÁRIA
      </span>
    </div>
  );
};

export default Logo;
