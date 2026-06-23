import { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';
import type { ProtonicDraggableTickerProps } from './DraggableTicker.types';
import styles from './DraggableTicker.module.css';

export function DraggableTicker({
  items,
  height = 60,
  gap = 16,
  className,
}: ProtonicDraggableTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowARef  = useRef<HTMLDivElement>(null);
  const rowBRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const rowA  = rowARef.current;
    const rowB  = rowBRef.current;
    if (!track || !rowA || !rowB) return;

    const SPEED = 0.5;
    let itemWidth = rowA.scrollWidth + gap;
    let offset = 0;
    let velocity = SPEED;
    let isDragging = false;
    let lastX = 0;
    let lastDragVelocity = 0;
    let animFrame = 0;

    const apply = () => {
      rowA.style.transform = `translateX(${offset}px) translateY(-50%)`;
      rowB.style.transform = `translateX(${offset + itemWidth}px) translateY(-50%)`;
    };

    const loop = () => {
      if (!isDragging) {
        velocity += (SPEED - velocity) * 0.05;
        offset -= velocity;
      }
      if (offset <= -itemWidth) offset += itemWidth;
      if (offset > 0) offset -= itemWidth;
      apply();
      animFrame = requestAnimationFrame(loop);
    };

    apply();
    animFrame = requestAnimationFrame(loop);

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastDragVelocity = 0;
      track.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      lastDragVelocity = dx;
      offset += dx;
      lastX = e.clientX;
      if (offset <= -itemWidth) offset += itemWidth;
      if (offset > 0) offset -= itemWidth;
      apply();
    };
    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      velocity = -lastDragVelocity * 0.5 || SPEED;
    };
    const onPointerCancel = () => {
      isDragging = false;
      velocity = SPEED;
    };
    const onResize = () => { itemWidth = rowA.scrollWidth + gap; };

    track.addEventListener('pointerdown',   onPointerDown);
    track.addEventListener('pointermove',   onPointerMove);
    track.addEventListener('pointerup',     onPointerUp);
    track.addEventListener('pointercancel', onPointerCancel);
    window.addEventListener('resize',       onResize);

    return () => {
      cancelAnimationFrame(animFrame);
      track.removeEventListener('pointerdown',   onPointerDown);
      track.removeEventListener('pointermove',   onPointerMove);
      track.removeEventListener('pointerup',     onPointerUp);
      track.removeEventListener('pointercancel', onPointerCancel);
      window.removeEventListener('resize',       onResize);
    };
  }, [gap, items]);

  const renderItems = (keyPrefix: string, ref: React.RefObject<HTMLDivElement>) => (
    <div ref={ref} className={styles.row} style={{ gap: `${gap}px` }} aria-hidden="true">
      {items.map((label, i) => (
        <span
          key={`${keyPrefix}-${i}`}
          className={cn(styles.item, i % 2 === 1 && styles.itemSquare)}
        >
          {label}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn(styles.ticker, className)} style={{ height: `${height}px` }} aria-hidden="true">
      <div ref={trackRef} className={styles.track}>
        {renderItems('a', rowARef)}
        {renderItems('b', rowBRef)}
      </div>
    </div>
  );
}
