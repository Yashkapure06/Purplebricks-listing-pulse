import { Badge } from "@/components/ui/badge";
import type { Tone } from "@/types/listing";

export function StatusBadge({
  tone,
  children,
}: {
  tone: Tone;
  children: React.ReactNode;
}) {
  return <Badge variant={tone}>{children}</Badge>;
}
