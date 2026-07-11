"use client";

import type { ExerciseKind } from "@/lib/lessons";
import Breathing from "./Breathing";
import Checkin from "./Checkin";
import Confidence from "./Confidence";
import Focus from "./Focus";
import Goals from "./Goals";
import Imagery from "./Imagery";
import Routine from "./Routine";
import SelfTalk from "./SelfTalk";

export default function Exercise({ kind }: { kind: ExerciseKind }) {
  switch (kind) {
    case "breathing":
      return <Breathing />;
    case "checkin":
      return <Checkin />;
    case "confidence":
      return <Confidence />;
    case "focus":
      return <Focus />;
    case "goals":
      return <Goals />;
    case "imagery":
      return <Imagery />;
    case "routine":
      return <Routine />;
    case "selftalk":
      return <SelfTalk />;
  }
}
