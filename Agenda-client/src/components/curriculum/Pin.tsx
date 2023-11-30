import { RiPushpinLine, RiUnpinLine } from 'react-icons/ri';

export default function Pin({
  isPinned,
  onTogglePin,
}: {
  isPinned: boolean;
  onTogglePin: () => void;
}) {
  return isPinned ? (
    <RiUnpinLine
      onClick={onTogglePin}
      className="ml-4 cursor-pointer text-cw-orange"
    />
  ) : (
    <RiPushpinLine
      onClick={onTogglePin}
      className="ml-4 cursor-pointer text-cw-orange"
    />
  );
}
