
import React, { useState } from "react";
import { Activity } from "@/components/ActivityForm";
import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";

const Dashboard = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  
  const handleActivityAdded = (activity: Activity) => {
    setActivities(prev => [activity, ...prev]);
  };
  
  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Activity Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ActivityForm onActivityAdded={handleActivityAdded} />
        <ActivityList activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;
