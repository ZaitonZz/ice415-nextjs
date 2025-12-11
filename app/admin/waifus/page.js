"use client";
import React from "react";
import WaifuManagement from "../../../components/admin/WaifuManagement";
import AdminLayout from "../../../components/layouts/AdminLayout";

const WaifusPage = () => {
  // In NextAuth with cookie session, we don't have a raw token client-side usually.
  // We'll pass a dummy token to bypass the check in WaifuManagement for now,
  // assuming the API will validate the session cookie.
  // The actual validation happens on the server side in the API route.
  
  return (
    <AdminLayout>
      <WaifuManagement />
    </AdminLayout>
  );
};

export default WaifusPage;
