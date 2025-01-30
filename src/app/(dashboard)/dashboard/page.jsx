"use client";

import { useRouter } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const router = useRouter();
  router.push("/orders");
};

export default DashboardPage;
