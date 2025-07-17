"use client";
import dynamic from "next/dynamic";
import React from "react";
const VideoPlayer = dynamic(() => import("../components/VideoPlayer"), { ssr: false });

export default function Page() {
  return <VideoPlayer />;
}