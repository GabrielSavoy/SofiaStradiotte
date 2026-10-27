"use client";

import { useEffect, useState } from "react";
import {
  DndContext, closestCenter, PointerSensor, TouchSensor, KeyboardSensor, useSensor, useSensors,
} from "@dnd-kit/core";
import {
  SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PhotoCard from "@/components/admin/PhotoCard";
import { reorderPhotos } from "@/app/admin/dashboard/fotos/actions";

function SortableItem({ photo, index, total }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: photo.id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : undefined,
        opacity: isDragging ? 0.85 : 1,
      }}
    >
      <PhotoCard photo={photo} index={index} total={total} handleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}

export default function PhotoGrid({ photos: initial }) {
  const [photos, setPhotos] = useState(initial);
  const [saving, setSaving] = useState(false);
  useEffect(() => setPhotos(initial), [initial]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function onDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const from = photos.findIndex((p) => p.id === active.id);
    const to = photos.findIndex((p) => p.id === over.id);
    const next = arrayMove(photos, from, to);
    setPhotos(next);
    setSaving(true);
    await reorderPhotos(next.map((p) => p.id));
    setSaving(false);
  }

  return (
    <>
      <p className="empty-admin" style={{ margin: "0 0 12px" }}>
        {saving ? "Salvando ordem…" : "Arraste pela foto para mudar a posição."}
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={photos.map((p) => p.id)} strategy={rectSortingStrategy}>
          <div className="admin-photo-grid">
            {photos.map((photo, i) => (
              <SortableItem key={photo.id} photo={photo} index={i} total={photos.length} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
