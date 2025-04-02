
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flame, Car, Laptop, Smartphone, CalendarIcon, Clock } from "lucide-react";
import { Activity } from "./ActivityForm";
import { format } from "date-fns";

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="h-5 w-5" />;
      case "Car":
        return <Car className="h-5 w-5" />;
      case "Laptop":
        return <Laptop className="h-5 w-5" />;
      case "Smartphone":
        return <Smartphone className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  if (activities.length === 0) {
    return (
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Your Activities</CardTitle>
          <CardDescription>
            Track your recent activities here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No activities recorded yet</p>
          <p className="text-sm text-muted-foreground">Add an activity to get started</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Your Activities</CardTitle>
        <CardDescription>
          Your recent activity history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="bg-muted/40">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {getActivityIcon(activity.icon)}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{activity.type} Usage</p>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {activity.duration} {activity.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{format(activity.timestamp, "MMM d")}</p>
                      <p>{format(activity.timestamp, "h:mm a")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityList;
