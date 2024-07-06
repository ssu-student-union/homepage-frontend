import { Ssua } from "@/components/Logo/Ssua";
import { RegisterSuccessSection } from "@/pages/general/containers/RegisterSuccessSection";
import { RegisterFailedSection } from "@/pages/general/containers/RegisterFailedSections";
import PropTypes from 'prop-types';


// Define an enum for the result states
enum ResultEnum {
  SUCCESS = 'success',
  FAILED = 'failed'
}

// Define the props for the component
interface RegisterSsuaSectionProps {
  result: ResultEnum;
}

export function RegisterSsuaSection({ result }: RegisterSsuaSectionProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4 flex flex-col items-center">
        <div className="flex w-[638px] h-[402px] flex-col justify-center items-center rounded-[20px] border-[1px] border-solid border-[#929292]">
          {result === ResultEnum.SUCCESS && <RegisterSuccessSection />}
          {result === ResultEnum.FAILED && <RegisterFailedSection />}
        </div>
        <div className="absolute top-[12vh] right-[56vh] transform -translate-x-1/6 -translate-y-1/6">
          <Ssua />
        </div>
      </div>
    </div>
  );
}

// Export the enum to be used in other components
export { ResultEnum };
