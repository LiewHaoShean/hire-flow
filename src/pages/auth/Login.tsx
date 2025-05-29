import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import AuthCard from "@/components/auth/AuthCard";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Determine initial tab from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const initialRole = searchParams.get("role") || "applicant";
  const [activeRole, setActiveRole] = useState(initialRole);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to HireFlow!",
      });
      
      // Redirect based on active role
      if (activeRole === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/applicant/dashboard");
      }
      
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthCard
      title="Welcome Back"
      description="Log in to your account to continue."
      footer={
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-hr-blue hover:underline">
            Create an account
          </Link>
        </div>
      }
    >
      <Tabs defaultValue={initialRole} onValueChange={setActiveRole} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="applicant">I'm a Job Seeker</TabsTrigger>
          <TabsTrigger value="recruiter">I'm a Recruiter</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applicant" className="mt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        type="email" 
                        autoComplete="email"
                        disabled={isLoading} 
                        className={cn(form.formState.errors.email && "border-red-500")} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <Link to="/" className="text-sm text-hr-blue hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        autoComplete="current-password"
                        disabled={isLoading} 
                        className={cn(form.formState.errors.password && "border-red-500")} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="recruiter" className="mt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@company.com" 
                        type="email" 
                        autoComplete="email"
                        disabled={isLoading} 
                        className={cn(form.formState.errors.email && "border-red-500")} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <Link to="/" className="text-sm text-hr-blue hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        autoComplete="current-password"
                        disabled={isLoading} 
                        className={cn(form.formState.errors.password && "border-red-500")} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </AuthCard>
  );
}
