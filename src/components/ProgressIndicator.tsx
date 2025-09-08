import { FormStep } from "@/types/internship";
import { CheckCircle2, Circle } from "lucide-react";

interface ProgressIndicatorProps {
  steps: FormStep[];
  currentStep: number;
}

const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            {step.completed ? (
              <CheckCircle2 className="h-8 w-8 text-success" />
            ) : currentStep === index ? (
              <Circle className="h-8 w-8 text-primary fill-primary/20" />
            ) : (
              <Circle className="h-8 w-8 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground mt-1 text-center max-w-16">
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-8 h-0.5 bg-border mx-2 mt-[-20px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;