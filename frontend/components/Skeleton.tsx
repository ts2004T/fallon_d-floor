import type { CSSProperties } from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ className = "", style }: SkeletonProps) {
  return <div className={`${styles.skeleton} ${className}`} style={style} aria-hidden="true" />;
}

interface CardSkeletonProps {
  height?: number;
  titleWidth?: number;
  className?: string;
}

export function CardSkeleton({ height = 280, titleWidth = 140, className = "" }: CardSkeletonProps) {
  return (
    <div className={`card pad ${className}`} aria-hidden="true">
      <Skeleton style={{ width: titleWidth, height: 12 }} />
      <Skeleton style={{ width: "100%", height: height - 50, marginTop: 16 }} />
    </div>
  );
}
