"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Admin = () => {
  useEffect(() => {
    redirect("/admin/books");
  });
  return <></>;
};

export default Admin;
