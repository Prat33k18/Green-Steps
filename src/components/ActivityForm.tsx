
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Car, Laptop, Smartphone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface Activity {
  id: string;
  type: string;
  icon: string;
  duration: number;
  unit: string;
  timestamp: Date;
}

interface ActivityFormProps {
  onActivityAdded: (activity: Activity) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onActivityAdded }) => {
  const [activityType, setActivityType] = useState<string>("laptop");
  const [duration, setDuration] = useState<string>("");
  const [unit, setUnit] = useState<string>("minutes");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!duration || parseFloat(duration) <= 0) {
      toast({
        title: "Invalid duration",
        description: "Please enter a valid duration value",
        variant: "destructive",
      });
      return;
    }
    
    // Create new activity object
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: activityType,
      icon: getIconForActivity(activityType),
      duration: parseFloat(duration),
      unit: unit,
      timestamp: new Date()
    };
    
    // Pass to parent
    onActivityAdded(newActivity);
    
    // Reset form
    setDuration("");
    
    toast({
      title: "Activity added!",
      description: `Added ${duration} ${unit} of ${activityType} usage`,
    });
  };
  
  const getIconForActivity = (type: string): string => {
    switch (type) {
      case "oven": return "Flame";
      case "driving": return "Car";
      case "laptop": return "Laptop";
      case "mobile": return "Smartphone";
      default: return "Activity";
    }
  };
  
  return (
    <Card className="w-full shadow-md animate-scale-in">
      <CardHeader>
        <CardTitle>Log New Activity</CardTitle>
        <CardDescription>
          Track your daily activities and their environmental impact
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="laptop" value={activityType} onValueChange={setActivityType}>
            <TabsList className="grid grid-cols-4 mb-2">
              <TabsTrigger value="laptop" className="flex flex-col items-center py-3 px-1 gap-1">
                <Laptop className="h-5 w-5" />
                <span className="text-xs">Laptop</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex flex-col items-center py-3 px-1 gap-1">
                <Smartphone className="h-5 w-5" />
                <span className="text-xs">Mobile</span>
              </TabsTrigger>
              <TabsTrigger value="oven" className="flex flex-col items-center py-3 px-1 gap-1">
                <Flame className="h-5 w-5" />
                <span className="text-xs">Oven</span>
              </TabsTrigger>
              <TabsTrigger value="driving" className="flex flex-col items-center py-3 px-1 gap-1">
                <Car className="h-5 w-5" />
                <span className="text-xs">Driving</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="laptop" className="space-y-4">
              <div>
                <Label htmlFor="laptop-time">Time used</Label>
                <div className="flex space-x-2 mt-1.5">
                  <Input 
                    id="laptop-time" 
                    type="number"
                    min="0"
                    step="0.1" 
                    placeholder="Enter time"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="flex-1"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="bg-background border rounded px-3 py-2"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mobile" className="space-y-4">
              <div>
                <Label htmlFor="mobile-time">Time used</Label>
                <div className="flex space-x-2 mt-1.5">
                  <Input 
                    id="mobile-time" 
                    type="number"
                    min="0"
                    step="0.1" 
                    placeholder="Enter time"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="flex-1"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="bg-background border rounded px-3 py-2"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="oven" className="space-y-4">
              <div>
                <Label htmlFor="oven-time">Time used</Label>
                <div className="flex space-x-2 mt-1.5">
                  <Input 
                    id="oven-time" 
                    type="number"
                    min="0"
                    step="0.1" 
                    placeholder="Enter time"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="flex-1"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="bg-background border rounded px-3 py-2"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="driving" className="space-y-4">
              <div>
                <Label htmlFor="driving-value">Distance/Time</Label>
                <div className="flex space-x-2 mt-1.5">
                  <Input 
                    id="driving-value" 
                    type="number"
                    min="0"
                    step="0.1" 
                    placeholder="Enter value"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="flex-1"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="bg-background border rounded px-3 py-2"
                  >
                    <option value="km">Kilometers</option>
                    <option value="miles">Miles</option>
                    <option value="hours">Hours</option>
                  </select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button type="submit" className="w-full">Add Activity</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
