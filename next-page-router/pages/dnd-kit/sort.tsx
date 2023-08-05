import React, { useState } from "react";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";

import { Sortable } from "@/components/sort/Sortable";

const props = {
  strategy: verticalListSortingStrategy,
  itemCount: 50,
};

export const ScrollContainer = () => (
  <div
    style={{
      height: "50vh",
      margin: "200px auto 0",
      overflow: "auto",
    }}
    className="bg-white"
  >
    <Sortable />
  </div>
);

export default function Sort() {
  return <ScrollContainer />;
}
