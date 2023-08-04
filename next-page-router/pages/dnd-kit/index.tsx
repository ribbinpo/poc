import { Draggable } from "@/components/dnd/Draggable";
import { Droppable } from "@/components/dnd/Droppable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
      </DndContext>
    </main>
  );
}
