import React from "react";
import { notFound } from "next/navigation";
import { projectsData, allProjectsList } from "@/data/projectsData";
import StarlapRocketryView from "@/components/projects/views/StarlapRocketryView";
import CuasAirDefenseView from "@/components/projects/views/CuasAirDefenseView";
import CanalDroneGeospatialView from "@/components/projects/views/CanalDroneGeospatialView";
import AsrroscopeObservatoryView from "@/components/projects/views/AsrroscopeObservatoryView";
import CuetBusTransitView from "@/components/projects/views/CuetBusTransitView";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return allProjectsList.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug];
  if (!project) {
    return {
      title: "Project Not Found | ASRRO",
    };
  }
  return {
    title: `${project.title} — ${project.category} | ASRRO CUET`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  // Render distinct, bespoke views tailored to each project's domain
  switch (slug) {
    case "starlap":
      return <StarlapRocketryView project={project} />;
    case "cuas-uav":
      return <CuasAirDefenseView project={project} />;
    case "canal-drone":
      return <CanalDroneGeospatialView project={project} />;
    case "asrroscope":
      return <AsrroscopeObservatoryView project={project} />;
    case "cuet-bus":
      return <CuetBusTransitView project={project} />;
    default:
      return <ProjectDetailClient project={project} />;
  }
}
