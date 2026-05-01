const PALETTE = {
  s: '#f4c79a',
  S: '#c89270',
  h: '#3a2818',
  b: '#4a90e2',
  B: '#2e6cb8',
  t: '#c8323c',
  T: '#8a1f26',
  L: '#3a2418',
  p: '#2c3e50',
  P: '#1a2530',
  o: '#1a1a1a',
  O: '#000000',
  e: '#101010',
  m: '#7a3a2a',
  '.': null,
};

const PLAYER_FRONT = [
  '................',
  '.....hhhhhh.....',
  '....hhsssshh....',
  '....hssssssh....',
  '....ssssssss....',
  '....ssessess....',
  '....ssssssss....',
  '....sssmmsss....',
  '....SssssssS....',
  '.....SssssS.....',
  '......ssss......',
  '...bbbbttbbbb...',
  '..bbbbbttbbbbb..',
  '..bbBbbttbbBbb..',
  '..bbBbbttbbBbb..',
  '..bbbbbttbbbbb..',
  '..bbbbbTTbbbbb..',
  '...LLLLLLLLLL...',
  '...pppppppppp...',
  '...pppppppppp...',
  '...PPPPPPPPPP...',
  '...pppp..pppp...',
  '...oooo..oooo...',
  '...OOOO..OOOO...',
];

const PLAYER_BACK = [
  '................',
  '.....hhhhhh.....',
  '....hhhhhhhh....',
  '....hhhhhhhh....',
  '....hhhhhhhh....',
  '....hhhhhhhh....',
  '....hhhhhhhh....',
  '....SssssssS....',
  '....SssssssS....',
  '.....SssssS.....',
  '......ssss......',
  '...bbbbbbbbbb...',
  '..bbbbbbbbbbbb..',
  '..bbBbbbbbbBbb..',
  '..bbBbbbbbbBbb..',
  '..bbbbbbbbbbbb..',
  '..bbbbbbbbbbbb..',
  '...LLLLLLLLLL...',
  '...pppppppppp...',
  '...pppppppppp...',
  '...PPPPPPPPPP...',
  '...pppp..pppp...',
  '...oooo..oooo...',
  '...OOOO..OOOO...',
];

const PLAYER_SIDE = [
  '................',
  '.....hhhhhh.....',
  '....hhhhhhhh....',
  '.....hsssssh....',
  '......ssssss....',
  '......seesss....',
  '......sssssS....',
  '......ssmssS....',
  '......SssssS....',
  '.......SssS.....',
  '.......ssss.....',
  '....bbbbbbbbb...',
  '...bbbbtbbbbbb..',
  '...bbBbtbbbBbb..',
  '...bbBbtbbbBbb..',
  '...bbbbtbbbbbb..',
  '....bbbTbbbbbb..',
  '....LLLLLLLLLL..',
  '....pppppppppp..',
  '....pppppppppp..',
  '....PPPPPPPPPP..',
  '....pppp..pppp..',
  '....oooo..oooo..',
  '....OOOO..OOOO..',
];

const PLAYER_SCALE = 2;

export function loadAllTextures(scene) {
  generatePixelTexture(scene, 'player_front', PLAYER_FRONT, PALETTE, PLAYER_SCALE);
  generatePixelTexture(scene, 'player_back', PLAYER_BACK, PALETTE, PLAYER_SCALE);
  generatePixelTexture(scene, 'player_side', PLAYER_SIDE, PALETTE, PLAYER_SCALE);

  drawBathroomTexture(scene, 'bathroom_open', false);
  drawBathroomTexture(scene, 'bathroom_busy', true);

  drawCarpetTile(scene, 'carpet');
  drawWallTrim(scene, 'wall_trim');
  drawDesk(scene, 'desk');
  drawMonitor(scene, 'monitor');
  drawChair(scene, 'chair');
  drawPlant(scene, 'plant');
  drawWaterCooler(scene, 'water_cooler');
  drawPrinter(scene, 'printer');
  drawCubicleWall(scene, 'cubicle_h', 96, 10, 'h');
  drawCubicleWall(scene, 'cubicle_v', 10, 96, 'v');
}

function getCanvas(scene, key, w, h) {
  if (scene.textures.exists(key)) scene.textures.remove(key);
  const tex = scene.textures.createCanvas(key, w, h);
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;
  return { tex, ctx };
}

function generatePixelTexture(scene, key, rows, palette, scale) {
  const w = rows[0].length * scale;
  const h = rows.length * scale;
  const { tex, ctx } = getCanvas(scene, key, w, h);
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const c = palette[row[x]];
      if (!c) continue;
      ctx.fillStyle = c;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
  tex.refresh();
}

function drawBathroomTexture(scene, key, busy) {
  const W = 48;
  const H = 48;
  const { tex, ctx } = getCanvas(scene, key, W, H);

  const wallColor = '#cdd5df';
  const wallShade = '#a8b3c0';
  const tileColor = '#e8edf3';
  const tileGrout = '#9aa3af';
  const doorMed = busy ? '#5a3618' : '#a06030';
  const doorDark = busy ? '#2e1a08' : '#623818';
  const doorLight = busy ? '#7a4a24' : '#c88858';
  const signBg = '#1e40af';
  const signFg = '#f8fafc';
  const indicator = busy ? '#dc2626' : '#22c55e';
  const indicatorDark = busy ? '#7f1d1d' : '#15803d';
  const handle = '#facc15';
  const handleDark = '#a16207';

  ctx.fillStyle = wallColor;
  ctx.fillRect(0, 0, W, 38);
  ctx.fillStyle = wallShade;
  ctx.fillRect(0, 36, W, 2);

  ctx.fillStyle = tileColor;
  ctx.fillRect(0, 38, W, 10);
  ctx.fillStyle = tileGrout;
  ctx.fillRect(0, 38, W, 1);
  ctx.fillRect(15, 38, 1, 10);
  ctx.fillRect(31, 38, 1, 10);

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(4, 4, W - 8, 32);
  ctx.fillStyle = doorMed;
  ctx.fillRect(6, 6, W - 12, 30);

  ctx.fillStyle = doorDark;
  ctx.fillRect(6, 6, W - 12, 2);
  ctx.fillRect(6, 34, W - 12, 2);
  ctx.fillRect(6, 6, 2, 30);
  ctx.fillRect(W - 8, 6, 2, 30);
  ctx.fillRect(W / 2 - 1, 8, 1, 26);
  ctx.fillRect(W / 2 + 1, 8, 1, 26);

  ctx.fillStyle = doorLight;
  ctx.fillRect(8, 8, 1, 26);
  ctx.fillRect(W / 2 - 3, 8, 1, 26);
  ctx.fillRect(W / 2 + 3, 8, 1, 26);

  ctx.fillStyle = signBg;
  ctx.fillRect(14, 12, 20, 11);
  ctx.fillStyle = signFg;
  ctx.fillRect(14, 12, 20, 1);
  ctx.fillRect(14, 22, 20, 1);
  ctx.fillRect(14, 12, 1, 11);
  ctx.fillRect(33, 12, 1, 11);
  drawLetterW(ctx, 17, 15, signFg);
  drawLetterC(ctx, 25, 15, signFg);

  ctx.fillStyle = indicatorDark;
  ctx.fillRect(W / 2 - 4, 26, 8, 4);
  ctx.fillStyle = indicator;
  ctx.fillRect(W / 2 - 3, 26, 6, 3);

  ctx.fillStyle = handleDark;
  ctx.fillRect(W - 13, 22, 4, 5);
  ctx.fillStyle = handle;
  ctx.fillRect(W - 12, 22, 2, 4);

  tex.refresh();
}

function drawLetterW(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 5);
  ctx.fillRect(x + 4, y, 1, 5);
  ctx.fillRect(x + 2, y + 2, 1, 3);
  ctx.fillRect(x + 1, y + 4, 1, 1);
  ctx.fillRect(x + 3, y + 4, 1, 1);
}

function drawLetterC(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x + 1, y, 4, 1);
  ctx.fillRect(x, y + 1, 1, 3);
  ctx.fillRect(x + 1, y + 4, 4, 1);
}

function drawCarpetTile(scene, key) {
  const SIZE = 32;
  const { tex, ctx } = getCanvas(scene, key, SIZE, SIZE);

  ctx.fillStyle = '#5b6573';
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.fillStyle = '#525c6b';
  for (let y = 0; y < SIZE; y += 4) {
    for (let x = 0; x < SIZE; x += 4) {
      if (((x / 4) + (y / 4)) % 2 === 0) ctx.fillRect(x, y, 2, 2);
    }
  }

  ctx.fillStyle = '#414957';
  ctx.fillRect(3, 7, 1, 1);
  ctx.fillRect(11, 13, 1, 1);
  ctx.fillRect(19, 5, 1, 1);
  ctx.fillRect(27, 17, 1, 1);
  ctx.fillRect(7, 23, 1, 1);
  ctx.fillRect(15, 29, 1, 1);
  ctx.fillRect(23, 27, 1, 1);

  ctx.fillStyle = '#6b7585';
  ctx.fillRect(8, 4, 1, 1);
  ctx.fillRect(20, 12, 1, 1);
  ctx.fillRect(4, 18, 1, 1);
  ctx.fillRect(28, 24, 1, 1);
  ctx.fillRect(12, 26, 1, 1);

  tex.refresh();
}

function drawWallTrim(scene, key) {
  const SIZE = 16;
  const { tex, ctx } = getCanvas(scene, key, SIZE, SIZE);

  ctx.fillStyle = '#2d2620';
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#3d342a';
  ctx.fillRect(0, 0, SIZE, 4);
  ctx.fillStyle = '#1a1612';
  ctx.fillRect(0, SIZE - 2, SIZE, 2);
  ctx.fillStyle = '#5a4a36';
  ctx.fillRect(0, 4, SIZE, 1);

  tex.refresh();
}

function drawDesk(scene, key) {
  const W = 80;
  const H = 36;
  const { tex, ctx } = getCanvas(scene, key, W, H);

  ctx.fillStyle = '#5a3a1c';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#a06a36';
  ctx.fillRect(2, 2, W - 4, H - 4);

  ctx.fillStyle = '#c08a52';
  ctx.fillRect(3, 3, W - 6, 2);

  ctx.fillStyle = '#7a4a24';
  for (let x = 6; x < W - 6; x += 12) {
    ctx.fillRect(x, 6, 1, H - 12);
  }

  ctx.fillStyle = '#5a3a1c';
  ctx.fillRect(W - 22, H - 14, 18, 10);
  ctx.fillStyle = '#7a4a24';
  ctx.fillRect(W - 21, H - 13, 16, 8);
  ctx.fillStyle = '#3a2210';
  ctx.fillRect(W - 14, H - 10, 4, 1);

  tex.refresh();
}

function drawMonitor(scene, key) {
  const W = 28;
  const H = 26;
  const { tex, ctx } = getCanvas(scene, key, W, H);

  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, W, 20);
  ctx.fillStyle = '#262626';
  ctx.fillRect(1, 1, W - 2, 18);
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(3, 3, W - 6, 14);
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(3, 3, W - 6, 1);
  ctx.fillStyle = '#166534';
  for (let y = 5; y < 16; y += 3) {
    ctx.fillRect(5, y, 8, 1);
  }
  ctx.fillRect(5, 7, 4, 1);
  ctx.fillRect(15, 9, 6, 1);

  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(W / 2 - 5, 20, 10, 3);
  ctx.fillRect(W / 2 - 9, 23, 18, 3);

  tex.refresh();
}

function drawChair(scene, key) {
  const W = 22;
  const H = 22;
  const { tex, ctx } = getCanvas(scene, key, W, H);

  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(2, 2, W - 4, W - 4);
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(3, 3, W - 6, W - 6);
  ctx.fillStyle = '#374151';
  ctx.fillRect(4, 4, W - 8, 6);
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(W / 2 - 2, W / 2 - 2, 4, 4);
  ctx.fillStyle = '#525b6b';
  ctx.fillRect(W / 2 - 1, W / 2 - 1, 2, 2);

  tex.refresh();
}

function drawPlant(scene, key) {
  const W = 28;
  const H = 38;
  const { tex, ctx } = getCanvas(scene, key, W, H);

  ctx.fillStyle = '#7a3a14';
  ctx.fillRect(6, 26, 16, 12);
  ctx.fillStyle = '#a0541e';
  ctx.fillRect(7, 27, 14, 10);
  ctx.fillStyle = '#5a2a0c';
  ctx.fillRect(7, 27, 14, 2);
  ctx.fillStyle = '#7a3a14';
  ctx.fillRect(7, 35, 14, 1);

  ctx.fillStyle = '#15803d';
  ctx.fillRect(8, 14, 12, 14);
  ctx.fillRect(4, 18, 4, 8);
  ctx.fillRect(20, 18, 4, 8);
  ctx.fillRect(10, 8, 8, 8);
  ctx.fillRect(6, 12, 4, 4);
  ctx.fillRect(18, 12, 4, 4);
  ctx.fillRect(12, 4, 4, 6);

  ctx.fillStyle = '#22c55e';
  ctx.fillRect(10, 10, 2, 2);
  ctx.fillRect(16, 16, 2, 2);
  ctx.fillRect(8, 20, 2, 2);
  ctx.fillRect(18, 22, 2, 2);
  ctx.fillRect(13, 6, 2, 2);

  ctx.fillStyle = '#166534';
  ctx.fillRect(14, 14, 2, 4);
  ctx.fillRect(11, 22, 2, 4);

  tex.refresh();
}

function drawWaterCooler(scene, key) {
  const W = 22;
  const H = 40;
  const { tex, ctx } = getCanvas(scene, key, W, H);

  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(2, 18, W - 4, 22);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(3, 19, W - 6, 20);
  ctx.fillStyle = '#475569';
  ctx.fillRect(2, 38, W - 4, 2);

  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(W / 2 - 2, 26, 4, 2);
  ctx.fillStyle = '#1e40af';
  ctx.fillRect(W / 2 - 2, 28, 4, 1);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(W / 2 - 4, 26, 1, 2);
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(W / 2 + 3, 26, 1, 2);

  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(2, 2, W - 4, 16);
  ctx.fillStyle = '#60a5fa';
  ctx.fillRect(3, 3, W - 6, 14);
  ctx.fillStyle = '#bfdbfe';
  ctx.fillRect(4, 4, W - 8, 4);
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(2, 0, W - 4, 4);

  tex.refresh();
}

function drawPrinter(scene, key) {
  const W = 36;
  const H = 26;
  const { tex, ctx } = getCanvas(scene, key, W, H);

  ctx.fillStyle = '#1f2937';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#374151';
  ctx.fillRect(1, 1, W - 2, H - 2);
  ctx.fillStyle = '#4b5563';
  ctx.fillRect(2, 2, W - 4, 6);
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(2, 8, W - 4, 1);

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(8, 11, W - 16, 4);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(8, 14, W - 16, 1);

  ctx.fillStyle = '#22c55e';
  ctx.fillRect(W - 6, 4, 2, 2);
  ctx.fillStyle = '#facc15';
  ctx.fillRect(W - 6, 7, 2, 2);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(2, H - 6, W - 4, 4);

  tex.refresh();
}

function drawCubicleWall(scene, key, w, h, orientation) {
  const { tex, ctx } = getCanvas(scene, key, w, h);

  ctx.fillStyle = '#475569';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(1, 1, w - 2, h - 2);

  ctx.fillStyle = '#cbd5e1';
  if (orientation === 'h') {
    ctx.fillRect(1, 1, w - 2, 2);
  } else {
    ctx.fillRect(1, 1, 2, h - 2);
  }

  ctx.fillStyle = '#64748b';
  if (orientation === 'h') {
    for (let x = 6; x < w - 4; x += 8) {
      ctx.fillRect(x, 3, 1, h - 6);
    }
  } else {
    for (let y = 6; y < h - 4; y += 8) {
      ctx.fillRect(3, y, w - 6, 1);
    }
  }

  ctx.fillStyle = '#334155';
  if (orientation === 'h') {
    ctx.fillRect(0, h - 2, w, 2);
  } else {
    ctx.fillRect(w - 2, 0, 2, h);
  }

  tex.refresh();
}
