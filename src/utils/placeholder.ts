const COLORS = [
    ['#FF9A9E', '#FAD0C4'], // ピンク系
    ['#96FBC4', '#F9F586'], // ミント青系
    ['#FCCB90', '#D57EEB'], // オレンジ紫系
    ['#F6D365', '#FDA085'], // 黄色オレンジ系
    ['#A6C0FE', '#F68084'], // 青ピンク系
    ['#E0C3FC', '#8EC5FC'], // 紫系
    ['#a8edea', '#fed6e3'], // ソーダ青系
];

function getHash(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

export function getPlaceholderColors(seed: string, forceIndex?: number): [string, string] {
  // カラーテスト用
  if (typeof forceIndex === 'number' && COLORS[forceIndex]) {
    return COLORS[forceIndex] as [string, string];
  }

  // 通常
  const hash = getHash(seed);
  const colorIndex = hash % COLORS.length;

  return COLORS[colorIndex] as [string, string];
}

export const PALETTE_COUNT = COLORS.length;