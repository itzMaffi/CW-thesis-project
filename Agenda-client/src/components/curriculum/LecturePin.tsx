import Pin from './Pin';
import { pinLecture, unPinLecture } from '../../services/LectureService';
import { useEffect, useState } from 'react';
import curriculumDb from './data/curriculumDb';

export default function LecturePin({ lectureId }: { lectureId: number }) {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    (async () => setPinned(await curriculumDb.isLecturePinned(lectureId)))();
  }, [lectureId]);

  async function onPin() {
    setPinned(!pinned);

    if (pinned) {
      await unPinLecture(lectureId);
      return;
    }

    await pinLecture(lectureId);
  }
  return <Pin isPinned={pinned} onTogglePin={onPin}></Pin>;
}
