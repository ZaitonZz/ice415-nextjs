"use client";
import React from "react";
import AuthenticatedLayout from "../../components/layouts/AuthenticatedLayout";
import AppRoot from "../../components/AppRoot";
import NotificationPortal from "../../components/ui/NotificationPortal";

export default function GamePage() {
  return (
    <AuthenticatedLayout>
      <div className="h-[calc(100vh-4rem)]"> {/* Adjust height to account for navbar */}
        <AppRoot />
        <NotificationPortal />
      </div>
    </AuthenticatedLayout>
  );
}
