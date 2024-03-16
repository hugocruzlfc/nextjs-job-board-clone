import { formatDistanceToNow } from "date-fns";
export function relativeDate(from: Date) {
  return formatDistanceToNow(from, { addSuffix: true });
}
