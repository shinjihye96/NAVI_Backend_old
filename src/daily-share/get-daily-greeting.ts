import { GREETING_MESSAGES } from './greeting-messages';
import { MoodType } from './mood-type.enum';

/**
 * 오늘 날짜(YYYY-MM-DD)를 문자열 해시로 변환하여
 * 0~(n-1) 사이 인덱스를 결정하고,
 * 해당 moodType의 메시지를 반환합니다.
 */
export function getDailyGreeting(mood: MoodType): string {
  const msgs = GREETING_MESSAGES[mood];
  if (!msgs || msgs.length === 0) return '';

  // 1) 오늘 날짜 문자열
  const today = new Date().toISOString().slice(0, 10); // "2025-04-27"

  // 2) 간단한 해시 함수 (문자열 → Integer)
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash * 31 + today.charCodeAt(i)) & 0x7fffffff;
  }

  // 3) 해시값 mod 메시지 개수 → 인덱스
  const idx = hash % msgs.length;
  return msgs[idx];
}