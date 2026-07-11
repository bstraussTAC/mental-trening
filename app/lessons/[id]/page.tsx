import { notFound } from "next/navigation";
import { LESSONS, getLesson } from "@/lib/lessons";
import LessonView from "@/components/LessonView";

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ id: lesson.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!getLesson(id)) notFound();
  return <LessonView lessonId={id} />;
}
