import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file');

  // 从数据库或文件系统中获取字幕数据
  // 假设我们有一个函数 getSubtitles 来获取字幕
  const subtitles = await getSubtitles(file);

  return NextResponse.json({ subtitles });
}
