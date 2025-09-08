import { FormStep } from "@/types/internship";
import { CheckCircle2, Circle, User, Target } from "lucide-react";

interface ProgressIndicatorProps {
  steps: FormStep[];
  currentStep: number;
}

const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  const getStepIcon = (index: number, completed: boolean, current: boolean) => {
    if (completed) return <CheckCircle2 className="h-10 w-10 text-success" />;
    if (current) return index === 0 ? 
      <User className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" /> :
      <Target className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />;
    return <Circle className="h-10 w-10 text-muted-foreground" />;
  };

  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
              {getStepIcon(index, step.completed, currentStep === index)}
              <span className="text-sm font-medium mt-2 text-center">
                {step.title}
              </span>
              {step.completed && (
                <span className="text-xs text-success mt-1">Completed</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-4 rounded-full transition-all duration-500 ${
                step.completed ? 'bg-success' : 'bg-border'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;