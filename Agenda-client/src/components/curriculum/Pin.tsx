import { RiPushpinLine, RiUnpinLine } from 'react-icons/ri';

export default function Pin({
  isPinned,
  onTogglePin,
  className,
}: {
  isPinned: boolean;
  onTogglePin: () => void;
  className: string;
}) {
  return isPinned ? (
    <RiUnpinLine
      onClick={onTogglePin}
      className={`cursor-pointer ${className}`}
    />
  ) : (
    <RiPushpinLine
      onClick={onTogglePin}
      className={`cursor-pointer ${className}`}
    />
  );
}
