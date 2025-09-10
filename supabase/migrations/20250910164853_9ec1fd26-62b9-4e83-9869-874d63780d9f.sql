-- Create internships table
CREATE TABLE public.internships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  sector TEXT NOT NULL,
  duration TEXT NOT NULL,
  stipend TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Anyone can view internships" 
ON public.internships 
FOR SELECT 
USING (true);

-- Insert sample data
INSERT INTO public.internships (title, company, location, sector, duration, stipend, description, requirements) VALUES
('Data Science Intern', 'TechCorp', 'Bangalore', 'Technology', '3 months', '₹25,000/month', 'Work on machine learning projects and data analysis', ARRAY['Python', 'SQL', 'Machine Learning', 'Statistics']),
('Marketing Intern', 'AdVenture', 'Mumbai', 'Marketing', '2 months', '₹20,000/month', 'Digital marketing and social media campaigns', ARRAY['Digital Marketing', 'Social Media', 'Content Creation', 'Analytics']),
('Software Development Intern', 'StartupXYZ', 'Hyderabad', 'Technology', '6 months', '₹30,000/month', 'Full-stack web development using modern technologies', ARRAY['JavaScript', 'React', 'Node.js', 'Database Management']),
('Finance Intern', 'FinanceHub', 'Delhi', 'Finance', '4 months', '₹22,000/month', 'Financial analysis and reporting', ARRAY['Excel', 'Financial Analysis', 'Accounting', 'Business Analytics']),
('Design Intern', 'CreativeStudio', 'Pune', 'Design', '3 months', '₹18,000/month', 'UI/UX design for mobile and web applications', ARRAY['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Prototyping']);