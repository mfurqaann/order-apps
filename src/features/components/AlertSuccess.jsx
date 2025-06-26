import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

const AlertSuccess = () => {
  return (
    <div className="w-[400px] max-auto mt-5">
      <Alert className="bg-green-500">
        <CheckCircle2Icon color="green" />
        <AlertTitle className="text-white">
          Your order has been created successfuly!
        </AlertTitle>
      </Alert>
    </div>
  );
};

export default AlertSuccess;
