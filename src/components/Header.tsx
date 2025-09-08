import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PM</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">PM Internship Scheme</h1>
              <p className="text-sm text-muted-foreground">Smart Internship Recommendations</p>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            AI Powered
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;