import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

export function Sortable() {
  const [languages, setLanguages] = useState([
    "JavaScript",
    "Python",
    "TypeScript",
  ]);

  function handleDragEnd(e: DragEndEvent) {
    console.log("Drag end called");
    const { active, over } = e;
    if (active && over) {
      console.log("active : " + active.id);
      console.log("over : " + over.id);
      if (active.id !== over.id) {
        setLanguages((items) => {
          const activeIndex = items.indexOf(active.id.toString());
          const overIndex = items.indexOf(over.id.toString());
          console.log(arrayMove(items, activeIndex, overIndex));
          return arrayMove(items, activeIndex, overIndex);
        });
      }
    }
  }
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={languages} strategy={verticalListSortingStrategy}>
        {languages.map((language) => (
          <SortableItem key={language} id={language}>{language}</SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}

function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  console.log(props.children);
  

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <li className="m-3 text-black border border-black">{props.children}</li>
    </div>
  );
}
